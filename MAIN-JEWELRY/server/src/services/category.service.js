import { BadRequest, Conflict, NotFound } from "../core/error.response.js";
import { toSlug } from "../libs/toSlug.js";
import categoryModel from "../models/category.model.js";

class CategoryService {
    async getAllCate(page, limit, search) {
        const skip = (page - 1) * limit
        const query = {
            $and: []
        }
        if (search) {
            query.$and.push({ name: { $regex: search, $options: "i" } });
        }
        const [allCate, totalItem] = await Promise.all([
            categoryModel
                .find(query)
                .sort({ createdAt: -1 })
                .limit(limit)
                .skip(skip),
            categoryModel.countDocuments(query)
        ])
        const totalPage = Math.ceil(totalItem / limit);
        return {
            currentPage: page,
            totalItem,
            totalPage,
            limit,
            category: allCate
        }
    }
    async createCate({ name, description }) {
        if (!name || !description) {
            throw new BadRequest("Thiếu thông tin")
        }
        const slug = toSlug(name);
        const exist = await categoryModel.findOne({ slug });
        if (exist) {
            throw new Conflict("Danh mục đã tồn tại")
        }

        const newCategory = await categoryModel.create({
            name,
            slug,
            description,
        })
        return newCategory;
    }
    async updateCate(id, name, description) {
        const findCate = await categoryModel.findById(id);
        if (!findCate) {
            throw new NotFound("Không tìm thấy")
        }
        const newSlug = name ? toSlug(name) : findCate.slug;
        const updateCate = await categoryModel.findByIdAndUpdate(id, { name, slug: newSlug, description }, { new: true })
        return updateCate
    }
    async deleteCate(id) {
        const deleted = await categoryModel.findByIdAndDelete(id);
        if (!deleted) {
            throw new NotFound("Không tìm thấy")
        }
        return deleted
    }
}
export default new CategoryService()