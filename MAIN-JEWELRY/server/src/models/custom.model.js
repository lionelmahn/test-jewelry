import mongoose from "mongoose";
const Schema = mongoose.Schema
const ShippingAddressSchema = new Schema(
    {
        name: { type: String },
        phone: { type: String },
        address: { type: String },
        city: { type: String },
        ward: { type: String },
        country: { type: String, default: "VN" },
    },
    { _id: false }
);
const OrderLogSchema = new Schema(
    {
        status: { type: String },
        by: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
        note: { type: String },
        at: { type: Date, default: Date.now },
    },
    { _id: false }
);
const customSchema = new Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            required: true,
        },
        orderCode: { type: String, unique: true, index: true },
        jewelryType: { type: String, required: true },
        material: { type: mongoose.Schema.Types.ObjectId, ref: "material", required: true },
        gem: { type: mongoose.Schema.Types.ObjectId, ref: "gemstone", required: true },
        size: { type: Number, required: true },
        quantity: { type: Number },
        gram: { type: Number, required: true },
        carat: { type: Number, required: true },
        subTotal: { type: Number, required: true },
        total: { type: Number },
        coupon: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "coupon",
        },
        tax: { type: Number, default: 0 },
        status: { type: String, enum: ["PENDING", "APPROVED", "CANCEL"], default: "PENDING" },
        shippingAddress: ShippingAddressSchema,
        paymentMethod: {
            type: String,
            enum: ["TRANSFER"],
            default: "TRANSFER",
        },
        paymentStatus: {
            type: String,
            enum: ["PENDING", "PAID", "FAILED"],
            default: "PENDING",
        },
        active: {
            type: String,
            enum: [
                "PENDING",
                "CONFIRMED",
                "PROCESSING",
                "SHIPPED",
                "CANCELLED",
                "REFUNDED",
            ],
            default: "PENDING",
        },
        isPaid: { type: Boolean, default: false },
        paidAt: { type: Date },
        shippedAt: { type: Date },
        cancelledAt: { type: Date },
        notes: { type: String },
        logs: [OrderLogSchema],

    },
    {
        timestamps: true
    }
)
export default mongoose.model("custom", customSchema)