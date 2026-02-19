import mongoose from "mongoose";
const Schema = mongoose.Schema;
const userSchema = new Schema(
    {
        fullName: { type: String, required: true, },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: false },
        phone: { type: String, required: false },
        role: { type: String, enum: ["user", "admin"], default: "user" },
        avatar: { type: String, required: true, default: "https://cdn-icons-png.flaticon.com/512/6596/6596121.png" },
        address: { type: String, required: false },
        provider: { type: String, default: "local" },
    },
    {
        timestamps: true,
    }
)
export default mongoose.model('user', userSchema);