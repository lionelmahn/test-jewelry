import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema(
    {
        roomId: { type: String, required: true, unique: true },
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
        messages: [
            {
                from: { type: String, enum: ["customer", "admin"], required: true },
                message: { type: String, required: true },
                createdAt: { type: Date, default: Date.now },
                isReadByAdmin: { type: Boolean, default: false }
            }
        ]
    },
    { timestamps: true }
);

export default mongoose.model("Conversation", conversationSchema);
