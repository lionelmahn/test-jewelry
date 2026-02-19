import { reviewService } from "@/service/review/reviewService";
import { create } from "zustand";

export const reviewStore = create((set, get) => ({
    createReview: async (productId, orderItemId, rating, comment) => {
        console.log(productId, orderItemId, rating, comment, "fbmfbg,n,")
        const res = await reviewService.createReview(productId, orderItemId, rating, comment)
        return res;
    }
}))