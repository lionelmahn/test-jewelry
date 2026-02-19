import mongoose from "mongoose";
const gemstoneSchema = new mongoose.Schema({
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    type: {
        type: String,
        enum: ["GEMSTONE"],
        default: "GEMSTONE"
    },
    unit: {
        type: String,
        enum: ["CARAT"],
        default: "CARAT"
    },
    pricePerUnit: { type: Number, required: true },
    active: { type: Boolean, default: true },
}, { timestamps: true });

export default mongoose.model("gemstone", gemstoneSchema);
