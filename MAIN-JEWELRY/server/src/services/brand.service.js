import { BadRequest, Conflict, NotFound } from "../core/error.response.js";
import { toSlug } from "../libs/toSlug.js";
import brandModel from "../models/brand.model.js";

class BrandService {
    async getAllBrand(page, limit, search) {
        const skip = (page - 1) * limit;
        const query = { $and: [] };

        if (search) {
            query.$and.push({ name: { $regex: search, $options: "i" } });
        }

        const [allBrand, totalItem] = await Promise.all([
            brandModel
                .find(query)
                .sort({ createdAt: -1 })
                .limit(limit)
                .skip(skip),
            brandModel.countDocuments(query)
        ]);

        const totalPage = Math.ceil(totalItem / limit);

        return {
            currentPage: page,
            totalItem,
            totalPage,
            limit,
            brand: allBrand
        };
    }

    async createBrand(name) {
        if (!name) {
            throw new BadRequest("Thiếu thông tin");
        }

        const slug = toSlug(name);

        const exist = await brandModel.findOne({ slug });
        if (exist) {
            throw new Conflict("Thương hiệu đã tồn tại");
        }
        return await brandModel.create({ name, slug });
    }

    async updateBrand(id, name) {
        const brand = await brandModel.findById(id);

        if (!brand) {
            throw new NotFound("Không tìm thấy thương hiệu");
        }

        return await brandModel.findByIdAndUpdate(
            id,
            { name, slug: toSlug(name) },
            { new: true }
        );
    }

    async deleteBrand(id) {
        const deleted = await brandModel.findByIdAndDelete(id);

        if (!deleted) {
            throw new NotFound("Không tìm thấy thương hiệu");
        }

        return deleted;
    }
}

export default new BrandService();
