import { BadRequest, NotFound } from "../core/error.response.js";
import productModel from "../models/product.model.js";
import wishModel from "../models/wish.model.js";

class WishService {
    async getWish(userId, page, limit) {
        const skip = (page - 1) * 10
        if (!userId) throw new BadRequest("Thiếu thông tin người dùng");

        const wishs = await
            wishModel
                .findOne({ userId })
                .sort({ createdAt: -1 })
                .limit(limit)
                .skip(skip)
                .populate("userId")
                .populate({
                    path: "items.productId",
                    populate: ["brandId", "categoryId", "subCategoryId"]
                })
        const totalItem = wishs.items.length
        return {
            data: wishs,
            page: page,
            limit,
            totalPage: Math.ceil(totalItem / 10),
            totalItem
        };
    }
    async createWish(userId, productId) {
        if (!userId || !productId) {
            throw new BadRequest("Thiếu thông tin");
        }

        const product = await productModel.findById(productId);
        if (!product) throw new NotFound("Không tìm thấy sản phẩm");

        let wish = await wishModel.findOne({ userId });
        if (!wish) {
            wish = await wishModel.create({ userId, items: [] });
        }

        const existed = wish.items.find(i =>
            i.productId.equals(productId)
        );
        if (existed) {
            throw new BadRequest("Sản phẩm đã có trong danh sách yêu thích");
        }

        const price = Math.min(
            ...product.variants.flatMap(v =>
                v.options.map(o => o.finalPrice ?? o.originalPrice)
            )
        );

        wish.items.push({ productId, price, images: product.images });
        await wish.save();
        return wish;
    }
    async deleteItemWish(userId, productId) {
        const wish = await wishModel.findOne({ userId })
        if (!wish) {
            throw new NotFound("Không tim thấy")
        }
        const existed = wish.items.find(i =>
            i.productId.equals(productId)
        );
        if (!existed) {
            throw new NotFound("Không tìm thấy sản phẩm");
        }
        wish.items = wish.items.filter(
            i => !i.productId.equals(productId)
        );
        await wish.save();
        return wish
    }
}
export default new WishService()