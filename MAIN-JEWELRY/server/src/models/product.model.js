import mongoose from "mongoose";
const Schema = mongoose.Schema;
const ProductSchema = new Schema(
    {
        slug: { type: String, required: true, unique: true },
        name: { type: String, required: true },
        brandId: { type: mongoose.Schema.Types.ObjectId, ref: "brand", required: true },
        categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "category", required: true },
        subCategoryId: { type: mongoose.Schema.Types.ObjectId, ref: "subcategory", required: true },
        promotion: {
            discount: { type: Number, min: 0, max: 100, default: 0 },
            startAt: { type: Date, default: null },
            endAt: { type: Date, default: null },
            isActive: { type: Boolean, default: false },
            durationHours: { type: Number, default: null },
            durationDays: { type: Number, default: null },
        },
        variants: [
            {
                color: { type: String, required: false },
                options: [
                    {
                        sku: { type: String, required: true },
                        itemId: { type: String, required: true },
                        type: { type: String, enum: ["CARAT", "GRAM", "NONE"], required: true, default: "NONE" },
                        value: { type: Number },
                        purity: { type: String },
                        originalPrice: { type: Number, required: true },
                        finalPrice: { type: Number, required: false },
                        stockQuantity: { type: Number, default: 0 }
                    }
                ]
            }
        ],
        images: [
            {
                url: { type: String, required: true },
                isMain: { type: Boolean, default: false },
            },
        ],
        description: { type: String },
        isFeatured: { type: Boolean, default: false },
        isNewProduct: { type: Boolean, default: false },
        rating: { type: Number, default: 0 },
        reviewCount: { type: Number, default: 0 },
    },
    {
        timestamps: true
    }
)
export default mongoose.model("product", ProductSchema);