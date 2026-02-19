import mongoose from "mongoose";
const Schema = mongoose.Schema
const CouponSchema = new Schema(
    {
        code: {
            type: String,
            required: true,
            unique: true,
            uppercase: true,
            trim: true
        },
        discountType: {
            type: String,
            enum: ["percent", "fixed"],
            required: true
        },
        discountValue: {
            type: Number,
            required: true
        },
        minOrderValue: {
            type: Number,
            default: 0
        },
        startDate: {
            type: Date,
            default: null
        },
        endDate: {
            type: Date,
            default: null
        },
        isActive: {
            type: Boolean,
            default: false
        }
    }, {
    timestamps: true
}
)
export default mongoose.model("coupon", CouponSchema)