import { CategoryService } from "@/service/category/CategoryService";
import { create } from "zustand";
export const CategoryStore = create(() => ({
    createCategory: async (name, description) => {
        const newCate = await CategoryService.createCategory(name, description)
        console.log(">>> newCate", newCate);
        return newCate;
    },
    updateCategory: async (name, description, id) => {
        const updateCate = await CategoryService.updateCategory(name, description, id)
        return updateCate
    },
    deleteCategory: async (id) => {
        const deleteCate = await CategoryService.deleteCategory(id);
        return deleteCate
    }
}))