import { BadRequest, Conflict, NotFound } from "../core/error.response.js";
import { toSlug } from "../libs/toSlug.js";
import gemstoneModel from "../models/gemstone.model.js";

class GemstoneService {
    async getAllGemstones(page, limit, search) {
        const skip = (page - 1) * limit;

        const query = {
            $and: []
        };

        if (search) {
            query.$and.push({ name: { $regex: search, $options: "i" } });
        }

        const [gemstones, totalItems] = await Promise.all([
            gemstoneModel.find(query).skip(skip).limit(limit).sort({ createdAt: -1 }),
            gemstoneModel.countDocuments(query)
        ]);

        const totalPage = Math.ceil(totalItems / limit);

        return {
            currentPage: page,
            totalItems,
            totalPage,
            limit,
            gemstones
        };
    }

    async createGemstone(name, pricePerUnit, active) {
        if (!name || !pricePerUnit) {
            throw new BadRequest("Thiếu thông tin");
        }

        const slug = toSlug(name);

        const exists = await gemstoneModel.findOne({ slug });
        if (exists) {
            throw new Conflict("Đá quý đã tồn tại");
        }

        const gemstoneItem = await gemstoneModel.create({
            name,
            slug,
            pricePerUnit,
            active
        });

        return gemstoneItem;
    }

    async updateGemstone(id, name, pricePerUnit, active) {
        const gemstoneData = await gemstoneModel.findById(id);
        if (!gemstoneData) {
            throw new NotFound("Không tìm thấy đá quý để sửa");
        }

        const updateGems = await gemstoneModel.findByIdAndUpdate(
            id,
            { name, slug: toSlug(name), pricePerUnit, active },
            { new: true }
        );

        return updateGems;
    }

    async deleteGemstone(id) {
        const deleted = await gemstoneModel.findByIdAndDelete(id);
        if (!deleted) {
            throw new NotFound("Không tìm thấy đá quý để xóa");
        }
        return deleted;
    }
}

export default new GemstoneService();
