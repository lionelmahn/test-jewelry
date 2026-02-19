import { subcategoryService } from "@/service/subcategory/subcayegoryService";
import { create } from "zustand";

export const subcategoryStore = create(() => ({
    createSubCategory: async (name, description, categoryId, images) => {
        const newSub = await subcategoryService.createSubcategory(name, description, categoryId, images)
        return newSub;
    },
    uploadImgSub: async (payload) => {
        const imgSub = await subcategoryService.uploadImgSubTem(payload)
        return imgSub
    },
    deleteImgTem: async (url) => {
        const removeImg = await subcategoryService.deleteImgSubTem(url);
        return removeImg
    },
    updateSubcate: async (id, name, description, categoryId, images) => {
        const update = await subcategoryService.updateSubCate(id, name, description, categoryId, images)
        return update
    },
    deleteSubcate: async (id) => {
        const deleteSub = await subcategoryService.deleteSubcate(id);
        return deleteSub
    }
}))