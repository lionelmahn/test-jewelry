import mongoose from "mongoose";
const Schema = mongoose.Schema;
const SubcategorySchema = new Schema(
    {
        name: { type: String, required: true },
        slug: { type: String, required: true, unique: true },
        categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "category", required: true },
        images: [
            {
                url: { type: String, required: true },
                isMain: { type: Boolean, default: false },
            },
        ],
        description: { type: String, required: true }
    },
    {
        timestamps: true
    }
)
export default mongoose.model("subcategory", SubcategorySchema);