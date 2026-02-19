import mongoose from "mongoose"
const Schema = mongoose.Schema;
const WishItemSchema = new Schema(
    {
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "product",
            required: true
        },
        images: [
            {
                url: { type: String, required: true },
                isMain: { type: Boolean, default: false },
            },
        ],
        price: { type: Number, required: true },
    },
    { _id: false }
)
const WishSchema = new Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            required: true,
            unique: true,
        },
        items: [WishItemSchema]
    },
    {
        timestamps: true
    }
)
export default mongoose.model("wish", WishSchema)