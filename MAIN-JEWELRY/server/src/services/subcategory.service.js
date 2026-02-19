import cloudinary from "../config/configCloudDinary.js";
import { BadRequest, Conflict, NotFound } from "../core/error.response.js";
import { getPublicId } from "../libs/publicId.js";
import { toSlug } from "../libs/toSlug.js";
import categoryModel from "../models/category.model.js";
import subcategoryModel from "../models/subcategory.model.js";

class SubcategoryService {
    async getAllSubCate(page, limit, search, slug) {
        const skip = (page - 1) * limit;
        const query = {
            $and: []
        };
        if (search) {
            query.$and.push({ name: { $regex: search, $options: "i" } })
        }
        if (slug) {
            query.$and.push({ slug: { $regex: slug, $options: "i" } })
        }
        const [allSub, totalItem] = await Promise.all([
            subcategoryModel.
                find(query)
                .populate("categoryId")
                .sort({ createdAt: -1 })
                .limit(limit)
                .skip(skip),
            subcategoryModel.countDocuments(query)
        ])
        const totalPages = Math.ceil(totalItem / limit);
        return {
            currentPage: page,
            limit,
            totalItem,
            totalPages,
            subcategory: allSub
        }
    }
    async createSubCate(name, description, categoryId, images) {
        if (!name || !description || !categoryId) {
            throw new BadRequest("Thiếu thông tin")
        }
        console.log(images, ">>> images")
        if (!Array.isArray(images) || images.length <= 0) {
            throw new BadRequest("Phải có ít nhất 1 ảnh")
        }
        if (!images.some(img => img.isMain)) {
            images[0].isMain = true;
        }
        const slug = toSlug(name);
        const exitSlug = await subcategoryModel.findOne({ slug });
        if (exitSlug) {
            throw new Conflict("Danh mục đã tồn tại")
        }
        const existCategory = await categoryModel.findById(categoryId);
        if (!existCategory) {
            throw new NotFound("Không tìm thấy danh mục cha")
        }
        const newSub = await subcategoryModel.create({
            name,
            slug,
            categoryId,
            images,
            description
        })
        return newSub
    }
    async createImgSub(files) {
        if (!files || files.length === 0) {
            throw new BadRequest("Vui lòng chọn ảnh");
        }
        const up = files.map(async (item) => {
            const result = await cloudinary.uploader.upload(item.path, {
                folder: "subcategory"
            })
            return { url: result.secure_url }
        })
        const results = await Promise.all(up);
        return results
    }
    async removeImgSub(id, url) {
        const findSub = await subcategoryModel.findById(id);
        if (!findSub) {
            throw new NotFound("Không tìm thấy danh mục con")
        }
        const publicId = getPublicId(url);
        findSub.images = findSub.images.filter((item) => item !== url)
        findSub.markModified("images");
        await Promise.all([
            cloudinary.uploader.destroy(publicId),
            findSub.save()
        ]);
        return findSub.images;
    }
    async removeImgTem(url) {
        if (!url) throw new BadRequest("Thiếu URL");
        const publicId = getPublicId(url);
        console.log("publicId", publicId)
        await cloudinary.uploader.destroy(publicId);
        return url
    }
    async updateSubCate(id, name, description, categoryId, images) {
        const findSub = await subcategoryModel.findById(id);
        if (!findSub) {
            throw new NotFound("Không tìm thấy Subcategory")
        }
        if (categoryId) {
            const categoryExists = await categoryModel.findById(categoryId);
            if (!categoryExists) {
                throw new NotFound("Không tìm thấy Category")
            }
        }
        if (!Array.isArray(images) || images.length === 0) {
            throw new BadRequest("Phải có ít nhất 1 ảnh")
        }
        const newSlug = name ? toSlug(name) : findSub.slug;
        const newImg = [...images, ...findSub.images]
        const p = [];
        newImg.forEach((item) => {
            if (!p.some((img) => img.url === item.url)) {
                p.push(item)
            }
        })
        console.log(">>> p", p)
        const updatedSub = await subcategoryModel.findByIdAndUpdate(
            id,
            {
                name,
                slug: newSlug,
                categoryId,
                images: p,
                description,
            },
            { new: true }
        );
        return updatedSub
    }
    async deleteSubCate(id) {
        const removeSubCate = await subcategoryModel.findByIdAndDelete(id);
        if (!removeSubCate) {
            throw new NotFound("Không tìm thấy Subcategory")
        }
        return removeSubCate
    }
}
export default new SubcategoryService()