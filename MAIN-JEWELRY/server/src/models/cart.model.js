import mongoose from "mongoose";
const Schema = mongoose.Schema;
const CartItemSchema = new Schema(
    {
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "product",
            required: true,
        },
        color: { type: String },
        sku: { type: String, required: false },
        type: {
            type: String,
            enum: ["CARAT", "GRAM", "MM", "GRAM+CARAT", "GRAM+MM", "CARAT+GRAM", "CARAT+MM", "NONE"],
            default: "NONE",
        },
        value: { type: Number },
        purity: { type: String },
        unitPrice: { type: Number, required: true },
        totalPrice: { type: Number },
        quantity: {
            type: Number,
            required: true,
            min: 1,
            default: 1,
        },
        stockQuantity: {
            type: Number
        }
    },
    { _id: false }
);

const CartSchema = new Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            required: true,
            unique: true,
        },
        items: [CartItemSchema],
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("cart", CartSchema);
