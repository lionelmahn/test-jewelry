import modelUser from "../models/user.model.js";
import bcrypt from "bcrypt";
import cloudinary from "../config/configCloudDinary.js";
import fs from "fs/promises";
import session from "../models/session.model.js";
import { createToken, createRefershToken, verifyToken } from "./token.service.js";
import { getPublicId } from "../libs/publicId.js";
import { BadRequest, Conflict, NotFound, Unauthorized } from "../core/error.response.js";
import userModel from "../models/user.model.js";

class UserService {

    async getAllUser(page, limit, search) {
        const skip = (page - 1) * limit;
        const query = {
            $and: []
        }
        if (search) {
            query.$and.push({ name: { $regex: search, $options: "i" } })
        }
        const [allUser, totalUser] = await Promise.all([
            modelUser
                .find(query)
                .sort({ createdAt: -1 })
                .limit(limit)
                .skip(skip),
            modelUser.countDocuments(query)
        ])
        const totalPage = Math.ceil(totalUser / limit)
        return {
            currentPage: page,
            totalUser,
            totalPage,
            limit,
            user: allUser
        };
    }

    async register(data) {
        const { fullName, email, password } = data
        if (!fullName || !email || !password) {
            throw new BadRequest("Thiếu thông tin");
        }

        const user = await modelUser.findOne({ email });
        if (user) {
            throw new Conflict("Người dùng đã tồn tại");
        }

        const salt = bcrypt.genSaltSync(10);
        const passwordHash = bcrypt.hashSync(password, salt);

        return await modelUser.create({
            fullName,
            email,
            password: passwordHash,
            provider: "local"
        });
    }

    async login(data) {
        const { email, password } = data
        if (!email || !password) {
            throw new BadRequest("Thiếu thông tin");
        }

        const findUser = await modelUser.findOne({ email }).lean();
        if (!findUser) {
            throw new Unauthorized("Thông tin tài khoản mật khẩu không chính xác");
        }
        const result = await bcrypt.compare(password, findUser.password);
        if (!result) {
            throw new Unauthorized("Thông tin tài khoản mật khẩu không chính xác");
        }
        await session.deleteMany({ userId: findUser._id });

        const accessToken = await createToken({ id: findUser._id, role: findUser.role });
        const refreshToken = await createRefershToken({ id: findUser._id });

        await session.create({
            userId: findUser._id,
            refreshToken,
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
        });

        const { password: hashPwd, ...userRes } = findUser;

        return { user: userRes, accessToken, refreshToken };
    }

    async loginGoogle(access_token) {
        if (!access_token) throw new BadRequest("Thiếu access_token");

        const googleResponse = await fetch(
            `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`
        );
        const googleUser = await googleResponse.json();

        const { email, name, picture } = googleUser;

        let findUser = await modelUser.findOne({ email });

        if (!findUser) {
            findUser = await modelUser.create({
                fullName: name,
                email,
                avatar: picture,
                provider: "google"
            });
        }

        await session.deleteMany({ userId: findUser._id });

        const accessToken = await createToken({ id: findUser._id, role: findUser.role });
        const refreshToken = await createRefershToken({ id: findUser._id });

        await session.create({
            userId: findUser._id,
            refreshToken,
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
        });

        return { user: findUser, accessToken, refreshToken };
    }

    async updateUser(id, updateValue) {
        const updated = await modelUser.findByIdAndUpdate(id, updateValue, { new: true });
        if (!updated) throw new BadRequest("Cập nhật không thành công");
        return updated;
    }

    async updateRole(userId, role) {
        if (role === "") {
            throw new BadRequest("Thiếu thông tin")
        }
        const updated = await modelUser.findByIdAndUpdate(
            userId,
            { role: role === "admin" ? "admin" : "user" },
            { new: true }
        );

        if (!updated) throw new BadRequest("Cập nhật không thành công");
        return updated;
    }

    async refresh(refreshToken) {
        if (!refreshToken) throw new Unauthorized("No refresh token");

        const decoded = await verifyToken(refreshToken);
        if (!decoded) throw new Unauthorized("Invalid refresh token");

        const user = await modelUser.findById(decoded.id);
        if (!user) throw new Unauthorized("User not found");

        const accessToken = await createToken({ id: user._id, role: user.role });
        return accessToken;
    }

    async logout(id) {
        await session.deleteMany({ userId: id });
    }

    async updatePassword(id, oldPassword, newPassword) {
        const findUser = await modelUser.findById(id);

        const result = await bcrypt.compare(oldPassword, findUser.password);
        if (!result) throw new NotFound("Mật khẩu cũ không chính xác");

        const salt = bcrypt.genSaltSync(10);
        const passwordHash = bcrypt.hashSync(newPassword, salt);

        const updated = await modelUser.findByIdAndUpdate(
            id,
            { password: passwordHash },
            { new: true }
        );

        if (!updated) throw new NotFound("Cập nhật thất bại");

        return true;
    }

    async uploadAvatar(id, file) {
        if (!file) throw new BadRequest("Vui lòng chọn ảnh đại diện");
        const findUser = await modelUser.findById(id);

        if (findUser.avatar === "https://cdn-icons-png.flaticon.com/512/6596/6596121.png") {
            const result = await cloudinary.uploader.upload(file.path);
            await fs.unlink(file.path);
            return await modelUser.findByIdAndUpdate(
                id,
                { avatar: result.secure_url },
                { new: true }
            );
        }
        const publicId = getPublicId(findUser.avatar);
        await cloudinary.uploader.destroy(publicId);
        const result = await cloudinary.uploader.upload(file.path, { folder: "avatar" });
        await fs.unlink(file.path);
        return await modelUser.findByIdAndUpdate(
            id,
            { avatar: result.secure_url },
            { new: true }
        );
    }
    async deleteUser(id) {
        if (!id) {
            throw new BadRequest("Thiếu id người dùng")
        }
        const user = await userModel.findByIdAndDelete(id)
        if (!user) {
            throw new NotFound("Không tìm thấy người dùng")
        }
        return user;
    }
}

export default new UserService();
