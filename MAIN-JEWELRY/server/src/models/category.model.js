import mongoose from "mongoose";
const Schema = mongoose.Schema;
const CategorySchema = new Schema(
    {
        name: { type: String, required: true },
        slug: { type: String, required: true, unique: true },
        description: { type: String, required: true }
    },
    {
        timestamps: true
    }
)
export default mongoose.model("category", CategorySchema);