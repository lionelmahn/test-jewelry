import mongoose from "mongoose";

const materialSchema = new mongoose.Schema({
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    type: {
        type: String,
        enum: ["METAL"],
        default: "METAL"
    },
    purity: { type: String, required: true },
    unit: {
        type: String,
        enum: ["GRAM"],
        default: "GRAM"
    },
    pricePerUnit: { type: Number, required: true },
    active: { type: Boolean, default: true },
}, { timestamps: true });

export default mongoose.model("material", materialSchema);
