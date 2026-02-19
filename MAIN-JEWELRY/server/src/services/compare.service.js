import { BadRequest, NotFound } from "../core/error.response.js";
import compareModel from "../models/compare.model.js";
import productModel from "../models/product.model.js";

class CompareService {
    async getCompare(userId) {
        if (!userId) {
            throw new BadRequest("Thiếu thông tin người dùng")
        }
        const compare = await compareModel.findOne({ userId }).populate({
            path: "items.productId",
            populate: [
                { path: "brandId" },
                { path: "categoryId" },
                { path: "subCategoryId" }
            ]
        });
        if (!compare) {
            return {
                items: []
            };
        }
        const now = new Date();
        let option
        for (const item of compare.items) {
            const product = await productModel.findById(item.productId._id)
            for (const variant of product.variants) {
                option = variant.options.find(o => o.sku === item.sku);
                if (option) break;
            }
            if (!option) continue;
            if (
                product.promotion?.isActive
                && product.promotion?.endAt
                && new Date(product.promotion?.endAt) <= now
            ) {
                product.promotion.isActive = false;
                product.promotion.discount = 0;
                option.finalPrice = option.originalPrice;
            }
            item.originalPrice = option.originalPrice;
            item.salePrice = option.finalPrice;
        }
        return {
            data: compare
        }
    }
    async createCompare(userId, productId, sku) {
        if (!sku) {
            throw new BadRequest("Thiếu thông tin chưa chọn chất liệu và giá trị sản phẩm")
        }
        const products = await productModel.findById(productId).populate("brandId")
            .populate("categoryId")
            .populate("subCategoryId");
        console.log(">>> products", products)
        if (!products) throw new Error("Không tìm thấy sản phẩm");
        let com = await compareModel.findOne({ userId })
        if (!com) {
            com = await compareModel.create({
                userId,
                items: []
            })
        }
        if (com.items.length >= 3) {
            throw new Error("Đã thêm tối đa sản phẩm để so sánh")
        }
        let existCompare = com.items.find((i) => i.sku === sku)
        console.log(existCompare, ">>> existCompareexistCompare")
        let a;
        products.variants.forEach((item) => {
            const option = item.options.find((o) => o.sku === sku)
            if (option) {
                a = { color: item.color, option }
            }
        })
        if (!a) throw new Error("Invalid SKU");
        if (!existCompare) {
            com.items.push({
                productId,
                color: a.color,
                sku: sku,
                type: a.option.type,
                value: a.option.value,
                purity: a.option.purity || null,
                originalPrice: a.option.originalPrice,
                salePrice: a.option.finalPrice
            })
        } else {
            throw new Error("Sản phẩm đã có")
        }
        await com.save();
        return com
    }
    async deleteItemCompare(userId, sku) {
        const compare = await compareModel.findOne({ userId })
        if (!compare) {
            throw new NotFound("Không tim thấy")
        }
        const item = compare.items.find(i => i.sku === sku);
        if (!item) throw new NotFound("Không tìm thấy sản phẩm");
        compare.items = compare.items.filter(i => i.sku !== sku);
        await compare.save();
        return compare
    }
    async clearCompare(userId) {
        const compare = await compareModel.findOne({ userId })
        if (!compare) {
            throw new NotFound("Không tim thấy")
        }
        compare.items = [];
        await compare.save();
        return compare
    }
}
export default new CompareService()