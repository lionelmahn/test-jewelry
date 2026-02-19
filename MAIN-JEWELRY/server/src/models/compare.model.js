import mongoose from "mongoose"
const Schema = mongoose.Schema;
const CompareItemSchema = new Schema(
    {
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "product",
            required: true
        },
        color: { type: String },
        sku: { type: String, required: true },
        type: { type: String, enum: ["CARAT", "GRAM", "MM", "NONE"], default: "NONE" },
        value: { type: Number },
        purity: { type: String },
        originalPrice: { type: Number, required: true },
        salePrice: { type: Number }
    },
    { _id: false }
)
const CompareSchema = new Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            required: true,
            unique: true,
        },
        items: [CompareItemSchema]
    },
    {
        timestamps: true
    }
)
export default mongoose.model("compare", CompareSchema)