import { BadRequest, NotFound } from "../core/error.response.js";
import { toSlug } from "../libs/toSlug.js";
import cartModel from "../models/cart.model.js";
import productModel from "../models/product.model.js";

class CartService {
    async getCart(userId, page, limit) {
        if (!userId) {
            throw new BadRequest("Thiếu thông tin người dùng")
        }
        const skip = (page - 1) * limit;
        const cart = await cartModel
            .findOne({ userId })
            .populate({
                path: "items.productId",
                populate: [
                    { path: "brandId" },
                    { path: "categoryId" },
                    { path: "subCategoryId" }
                ]
            });
        if (!cart) {
            return {
                items: [],
                totalItems: 0,
                toatlPrice: 0,
                total: 0,
                tax: 0,
                page,
                limit
            };
        }
        const totalItems = cart.items.length
        const paginatedItems = cart.items.slice(skip, skip + limit);
        const toatlPrice = cart.items.reduce((acc, ele) => acc += ele.unitPrice * ele.quantity, 0)
        const TAX_RATE = 0.05;
        const tax = toatlPrice * TAX_RATE;
        const total = toatlPrice + tax;
        console.log(toatlPrice)
        return {
            data: paginatedItems,
            totalItems,
            toatlPrice,
            tax,
            total,
            page,
            limit
        };
    }
    async createCart(userId, productId, color, quantity) {

        if (!color) throw new Error("Thiếu màu sản phẩm");

        const product = await productModel.findById(productId);
        if (!product) throw new Error("Không tìm thấy sản phẩm");

        let cart = await cartModel.findOne({ userId });
        if (!cart) {
            cart = await cartModel.create({
                userId,
                items: [],
            });
        }
        const variant = product.variants.find(
            v => v.color && v.color.toLowerCase() === color.toLowerCase()
        );

        if (!variant) throw new Error("Không tìm thấy màu");

        const totalOriginal = variant.options.reduce(
            (sum, op) => sum + (op.originalPrice || 0),
            0
        );

        const totalFinal = variant.options.reduce(
            (sum, op) => sum + (op.finalPrice || 0),
            0
        );

        const mergedType = variant.options.map(op => op.type).join("+");
        const mergedValue = variant.options.reduce((acc, op) => acc + op.value, 0);

        const stockQuantity = Math.min(
            ...variant.options.map(op => op.stockQuantity)
        );

        const existingItem = cart.items.find(
            i =>
                i.productId.toString() === productId.toString() &&
                i.color &&
                i.color.toLowerCase() === color.toLowerCase()
        );
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.items.push({
                productId: product._id,
                sku: `${toSlug(product.name).toUpperCase().slice(0, 3)}-${variant.color ? variant.color.toUpperCase().slice(0, 2) : "NO"}`,
                color: variant.color,
                type: mergedType,
                value: mergedValue,
                unitPrice: totalFinal,
                originalPrice: totalOriginal,
                quantity,
                stockQuantity
            });
        }
        await cart.save();
        return cart;
    }
    async updateCart(userId, sku, quantity) {
        const cart = await cartModel.findOne({ userId });
        if (!cart) throw new NotFound("Không tìm thấy cart");
        const item = cart.items.find(i => i.sku === sku);
        if (!item) throw new NotFound("Không tìm thấy đơn hàng");
        if (quantity <= 0) {
            cart.items = cart.items.filter(i => i.sku !== sku);
        } else {
            item.quantity = quantity;
        }
        await cart.save();
        return cart
    }
    async deleteCart(userId, sku) {
        const cart = await cartModel.findOne({ userId })
        if (!cart) throw new NotFound("Không tìm thấy cart");
        const item = cart.items.find(i => i.sku === sku);
        if (!item) throw new NotFound("Không tìm thấy sản phẩm");
        cart.items = cart.items.filter(i => i.sku !== sku);
        await cart.save();
        return cart
    }
    async clearCart(userId) {
        const cart = await cartModel.findOne({ userId })
        if (!cart) {
            throw new NotFound("Không tìm thấy cart");
        }
        cart.items = [];
        await cart.save()
        return cart
    }
}
export default new CartService()