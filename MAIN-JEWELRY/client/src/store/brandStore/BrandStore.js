import { BrandService } from "@/service/brand/BrandService";
import { create } from "zustand";

export const BrandStore = create(() => ({
    createBrand: async (name) => {
        const newBrand = await BrandService.createBrand(name)
        console.log(">>> newBrand", newBrand);
        return newBrand
    },
    updateBrand: async (name, id) => {
        const updateBrand = await BrandService.updateBrand(name, id)
        return updateBrand
    },
    deleteBrand: async (id) => {
        const deleteBrand = await BrandService.deleteBrand(id)
        return deleteBrand
    }
}))