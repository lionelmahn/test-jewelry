import { BadRequest, NotFound } from "../core/error.response.js";
import { baseGramBySize, snapCarat } from "../libs/estimateCustom.js";
import couponModel from "../models/coupon.model.js";
import customModel from "../models/custom.model.js";
import gemstoneModel from "../models/gemstone.model.js";
import materialModel from "../models/material.model.js";

class CustomService {
    async getCustom(page, limit) {
        const skip = (page - 1) * 10
        const [dataCustom, totalItem] = await Promise.all([
            customModel.
                find().
                sort({ createdAt: -1 }).
                populate("material").
                populate("gem").
                skip(skip).
                limit(limit),
            customModel.countDocuments()
        ])
        if (!dataCustom) {
            throw new NotFound("Không tìm thấy")
        }
        const totalPage = Math.ceil(totalItem / limit);
        return {
            page: page,
            limit: limit,
            customs: dataCustom,
            totalItem,
            totalPage: totalPage
        }
    }
    async getCustomById(userId, page, limit) {
        const skip = (page - 1) * 10
        if (!userId) {
            throw new BadRequest("Thiếu thông tin người dùng")
        }
        const [dataCustom, totalItem] = await Promise.all([
            customModel.
                find({ userId }).
                sort({ createdAt: -1 }).
                populate("material").
                populate("gem").
                skip(skip).
                limit(limit),
            customModel.countDocuments({ userId })
        ])
        if (!dataCustom) {
            throw new NotFound("Không tìm thấy")
        }
        const totalPage = Math.ceil(totalItem / limit);
        return {
            page: page,
            limit: limit,
            customs: dataCustom,
            totalItem,
            totalPage: totalPage
        }
    }
    async previewDesign(userId, id, material, gem, quantity = 1) {
        if (!userId) {
            throw new BadRequest("Thiếu thông tin người dùng")
        }
        const cus = await customModel.findById(id)
        if (!cus) {
            throw new NotFound("Không tìm thấy")
        }
        const TAX_RATE = 0.05;
        const tax = Math.round(cus.subTotal * TAX_RATE * 100) / 100;
        const total = cus.subTotal * quantity + tax;
        return {
            id: cus._id,
            userId,
            jewelryType: cus.jewelryType,
            material,
            gem,
            tax,
            size: cus.size,
            gram: cus.gram,
            carat: cus.carat,
            quantity,
            subtotal: cus.subTotal,
            total
        }
    }
    async updateCustom(userId,
        id, shippingAddress, paymentMethod, paymentStatus, codeCou, quantity) {
        if (!userId) {
            throw new BadRequest("Thiếu thông tin người dùng")
        }
        const cus = await customModel.findById(id)
        if (!cus) {
            throw new NotFound("Không tìm thấy")
        }
        const TAX_RATE = 0.05;
        let coo = null
        const tax = Math.round(cus.subTotal * TAX_RATE * 100) / 100;
        let total = cus.subTotal * quantity + tax;
        if (codeCou) {
            const cou = await couponModel.findOne({ code: codeCou, isActive: true });
            coo = cou._id
            let discountAmount = 0;
            if (cou.discountType === "percent") {
                discountAmount = total * (cou.discountValue / 100);
            } else {
                discountAmount = cou.discountValue;
            }
            total = total - discountAmount;
        }
        const cuss = await customModel.findByIdAndUpdate(id, { shippingAddress, paymentMethod, paymentStatus, quantity, total, coupon: coo, tax }, { new: true })
        return cuss
    }
    async addCustom(
        userId,
        jewelryType,
        materialId,
        gemId,
        size,
        budget,
        coupon
    ) {
        console.log(userId,
            jewelryType,
            materialId,
            gemId,
            size,
            budget)
        if (!userId || !jewelryType || !size || !budget || !materialId || !gemId) {
            throw new BadRequest("Thiếu thông tin")
        }
        const material = await materialModel.findById(materialId)
        if (!material) throw new NotFound("Không tìm thấy vật liệu")

        const gem = await gemstoneModel.findById(gemId)
        if (!gem) throw new NotFound("Không tìm thấy đá quý")
        const diamondBudget = budget * 0.6
        const metalBudget = budget * 0.4
        const rawCarat = diamondBudget / gem.pricePerUnit
        const carat = snapCarat(rawCarat)
        const gram =
            baseGramBySize(size) * 1.15
        if (gram * material.pricePerUnit > metalBudget) {
            throw new BadRequest(
                "Ngân sách kim loại không đủ cho thiết kế này"
            )
        }
        const subTotal =
            gram * material.pricePerUnit +
            carat * gem.pricePerUnit

        if (subTotal > budget) {
            throw new BadRequest("Ngân sách không đủ cho cấu hình này")
        }

        return await customModel.create({
            userId,
            jewelryType,
            material: material,
            gem: gem,
            size,
            gram: Number(gram.toFixed(2)),
            carat,
            subTotal: Math.round(subTotal),
        })
    }
    async calcuate(userId,
        jewelryType,
        materialId,
        gemId,
        size,
        budget,) {
        if (!userId || !jewelryType || !size || !budget || !materialId || !gemId) {
            throw new BadRequest("Thiếu thông tin")
        }
        const material = await materialModel.findById(materialId)
        if (!material) throw new NotFound("Không tìm thấy vật liệu")

        const gem = await gemstoneModel.findById(gemId)
        if (!gem) throw new NotFound("Không tìm thấy đá quý")
        const diamondBudget = budget * 0.6
        const metalBudget = budget * 0.4
        const rawCarat = diamondBudget / gem.pricePerUnit
        const carat = snapCarat(rawCarat)
        const gram =
            baseGramBySize(size) * 1.15
        if (gram * material.pricePerUnit > metalBudget) {
            throw new BadRequest(
                "Ngân sách kim loại không đủ cho thiết kế này"
            )
        }
        const subTotal =
            gram * material.pricePerUnit +
            carat * gem.pricePerUnit

        if (subTotal > budget) {
            throw new BadRequest("Ngân sách không đủ cho cấu hình này")
        }

        return {
            userId,
            jewelryType,
            material: material,
            gem: gem,
            size,
            gram: Number(gram.toFixed(2)),
            carat,
            subTotal: Math.round(subTotal)
        }
    }
    async updateStatus(userId, id, status) {
        if (!userId) {
            throw new BadRequest("Thiếu thông tin")
        }
        if (!id) {
            throw new BadRequest("Thiếu thông tin")
        }
        const update = await customModel.findByIdAndUpdate(id, { status }, { new: true })
        if (!update) {
            throw new NotFound("Không tìm thấy")
        }
        return update
    }
}
export default new CustomService()