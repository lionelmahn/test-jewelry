import mongoose from "mongoose";
const Schema = mongoose.Schema;

const OrderItemSchema = new Schema(
    {
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "product",
            required: true,
        },
        sku: { type: String },
        name: { type: String },
        images: [{ type: String }],
        type: {
            type: String,
            enum: ["CARAT", "GRAM", "MM", "GRAM+CARAT", "GRAM+MM", "CARAT+GRAM", "CARAT+MM", "NONE"],
            default: "NONE",
        },
        value: { type: Number },
        purity: { type: String },
        unitPrice: { type: Number, required: true },
        quantity: { type: Number, required: true, min: 1, default: 1 },
        discount: { type: Number, default: 0 },
        totalPrice: { type: Number, required: true },
    },
    { _id: false }
);

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

const OrderSchema = new Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            required: true,
        },
        orderCode: { type: String, unique: true, index: true },
        items: [OrderItemSchema],
        shippingAddress: ShippingAddressSchema,
        subtotal: { type: Number, required: true },
        tax: { type: Number, default: 0 },
        total: { type: Number, required: true },
        currency: { type: String, default: "VND" },
        coupon: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "coupon",
        },
        paymentMethod: {
            type: String,
            enum: ["CASH", "TRANSFER"],
            default: "CASH",
        },
        paymentStatus: {
            type: String,
            enum: ["PENDING", "PAID", "FAILED", "REFUNDED"],
            default: "PENDING",
        },
        status: {
            type: String,
            enum: [
                "PENDING",
                "CONFIRMED",
                "PACKAGING",
                "SHIPPED",
                "COMPLETED",
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
        timestamps: true,
    }
);
OrderSchema.pre("save", function (next) {
    if (!this.orderCode) {
        const time = Date.now().toString(36).toUpperCase();
        const rand = Math.random().toString(36).slice(2, 8).toUpperCase();
        this.orderCode = `ORD-${time}-${rand}`;
    }
    next();
});

export default mongoose.model("order", OrderSchema);
