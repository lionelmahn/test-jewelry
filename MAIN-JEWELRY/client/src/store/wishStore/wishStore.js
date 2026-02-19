import { wishService } from "@/service/wish/wishService";
import { create } from "zustand";

export const wishStore = create((set, get) => ({
    wish: [],
    setWishFromServer: (count) =>
        set({
            wish: Array.from({ length: count }, () => ({ img: "" }))
        }),
    addWish: (item) =>
        set((state) => ({
            wish: [...state.wish, item]
        })),
    removeWish: () => set((state) => ({
        wish: state.wish.slice(0, -1)
    })),
    createWish: async (id) => {
        const res = await wishService.createWish(id)
        return res;
    },
    deleteWish: async (id) => {
        const res = await wishService.deleteWish(id)
        return res;
    }
}))