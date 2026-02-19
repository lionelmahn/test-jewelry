import userService from "../services/user.service.js";
import BaseController from "./base.controller.js";

class UserController extends BaseController {

    getAllUser = async (req, res) => {
        try {
            const page = Number(req.query.page || 1);
            const limit = Number(req.query.limit || 10);
            const search = req?.query?.search?.trim() || ""
            const data = await userService.getAllUser(page, limit, search);
            return this.ok(res, data, "Lấy danh sách người dùng thành công");
        } catch (err) {
            return this.handleErr(res, err);
        }
    };

    register = async (req, res) => {
        const { fullName, email, password } = req.body;
        try {
            const data = await userService.register({ fullName, email, password });
            return this.created(res, data, "Đăng ký thành công");
        } catch (err) {
            return this.handleErr(res, err);
        }
    };

    loggin = async (req, res) => {
        try {
            const { email, password } = req.body;
            const { user, accessToken, refreshToken } = await userService.login({ email, password });

            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                secure: false,
                sameSite: "Lax",
                maxAge: 7 * 24 * 60 * 60 * 1000,
            });

            return this.ok(res, { ...user, accessToken }, "Đăng nhập thành công");
        } catch (err) {
            return this.handleErr(res, err);
        }
    };

    loginGoogle = async (req, res) => {
        try {
            const { access_token } = req.body;

            const { user, accessToken, refreshToken } =
                await userService.loginGoogle(access_token);

            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                secure: false,
                sameSite: "Lax",
                maxAge: 7 * 24 * 60 * 60 * 1000,
            });

            return this.ok(res, { user, accessToken }, "Đăng nhập thành công");
        } catch (err) {
            return this.handleErr(res, err);
        }
    };

    updateUser = async (req, res) => {
        try {
            const userId = req.user.id;
            const data = await userService.updateUser(userId, req.body);
            return this.ok(res, data, "Cập nhật thành công");
        } catch (err) {
            return this.handleErr(res, err);
        }
    };

    updateRole = async (req, res) => {
        try {
            const { id } = req.params;
            const { role } = req.body;
            const data = await userService.updateRole(id, role);
            return this.ok(res, data, "Cập nhật thành công");
        } catch (err) {
            return this.handleErr(res, err);
        }
    };

    refreshToken = async (req, res) => {
        try {
            const refreshToken = req.cookies.refreshToken;
            const accessToken = await userService.refresh(refreshToken);
            return this.ok(res, { accessToken }, "Refresh token thành công");
        } catch (err) {
            return this.handleErr(res, err);
        }
    };

    logout = async (req, res) => {
        try {
            const userId = req.user.id;
            await userService.logout(userId);
            res.clearCookie("refreshToken");
            return this.ok(res, null, "Đăng xuất thành công");
        } catch (err) {
            return this.handleErr(res, err);
        }
    };

    updatePassword = async (req, res) => {
        try {
            const { oldPassword, newPassword } = req.body;
            const userId = req.user.id;
            await userService.updatePassword(userId, oldPassword, newPassword);
            return this.ok(res, null, "Cập nhật mật khẩu thành công");
        } catch (err) {
            return this.handleErr(res, err);
        }
    };

    uploadAvatar = async (req, res) => {
        try {
            const file = req.file;
            const userId = req.user.id;
            const data = await userService.uploadAvatar(userId, file);
            return this.ok(res, data, "Cập nhật thành công");
        } catch (err) {
            return this.handleErr(res, err);
        }
    };
    deleteUser = async (req, res) => {
        try {
            const id = req.params.id;
            const data = await userService.deleteUser(id)
            return this.ok(res, data, "Xóa người dùng thành công")
        } catch (error) {
            return this.handleErr(res, error)
        }
    }
}

export default new UserController();
