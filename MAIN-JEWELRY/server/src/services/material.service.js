import { BadRequest, Conflict, NotFound } from "../core/error.response.js";
import { toSlug } from "../libs/toSlug.js";
import materialModel from "../models/material.model.js";

class MaterialService {
    async getAllMaterial(page, limit, search) {
        const skip = (page - 1) * limit
        const query = {
            $and: []
        };
        if (search) {
            query.$and.push({ "name": { $regex: search, $options: "i" } })
        }
        const [material, totalItems] = await Promise.all(
            [
                materialModel.find(query).skip(skip).limit(limit).sort({ createdAt: -1 }),
                materialModel.countDocuments(query)
            ]
        )
        const totalPage = Math.ceil(totalItems / limit);
        return {
            currentPage: page,
            totalItems,
            totalPage,
            limit,
            material
        }
    }
    async createMaterial(name, purity, pricePerUnit, active) {
        if (!name || !purity || !pricePerUnit || !active) {
            throw new BadRequest("Thiếu thông tin")
        }
        const slug = toSlug(name)
        const exit = await materialModel.findOne({ slug })
        if (exit) {
            throw new Conflict("Chất liệu đã tồn tại")
        }
        const materialItem = await materialModel.create({ name, slug, purity, pricePerUnit, active })
        return materialItem
    }
    async updateMaterial(id, name, purity, pricePerUnit, active) {
        const dataMaterial = await materialModel.findById(id)
        if (!dataMaterial) {
            throw new NotFound("Không tìm thấy chất liệu để sửa")
        }
        const updateMa = await materialModel.findByIdAndUpdate(id, {
            name, slug: toSlug(name), purity, pricePerUnit, active
        }, { new: true })
        return updateMa
    }
    async deleteMaterial(id) {
        const deleted = await materialModel.findByIdAndDelete(id);
        if (!deleted) {
            throw new NotFound("Không tìm thấy chất liệu để xóa")
        }
        return deleted
    }
}
export default new MaterialService()