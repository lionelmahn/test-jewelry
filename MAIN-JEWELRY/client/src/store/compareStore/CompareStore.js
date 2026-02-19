import { compareService } from "@/service/compare/compareService";
import { create } from "zustand";

export const CompareStore = create((set, get) => ({
    getCompare: async () => {
        const getData = await compareService.getCompare()
        return getData;
    },
    createCompare: async (productId, sku) => {
        const createData = await compareService.createItemCompare(productId, sku)
        return createData
    },
    deleteCompare: async (sku) => {
        const deleteData = await compareService.deleteItemCompare(sku);
        return deleteData
    },
    clearCompare: async () => {
        const clearData = await compareService.clearCompare();
        return clearData
    }
}))