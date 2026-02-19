import { ProductService } from "@/service/product/ProductService";
import { create } from "zustand";

export const ProductStore = create(() => ({
    getAllProduct: async (params) => {
        const data = await ProductService.getAllProduct(params);
        return data;
    },
    getProductById: async (id) => {
        const dataById = await ProductService.getProductById(id)
        return dataById
    },
    getOnTime: async (params) => {
        console.log(params, "vfvfbfbvfvfb")
        const data = await ProductService.getOntime(params)
        return data;
    },
    createProduct: async (payload) => {
        const newData = await ProductService.createProduct(payload)
        return newData
    },
    upFileProduct: async (payload) => {
        const dataUp = await ProductService.upFileProduct(payload)
        return dataUp
    },
    previewUpFile: async (payload) => {
        const previewData = await ProductService.previewUpFile(payload)
        return previewData
    },
    updateProduct: async (id, payload) => {
        const editData = await ProductService.updateProduct(id, payload)
        return editData;
    },
    deleteProduct: async (id) => {
        const deleteProduct = await ProductService.deleteProduct(id);
        return deleteProduct
    },
    uploadImgProduct: async (payload) => {
        const upImg = await ProductService.uploadImg(payload)
        return upImg
    },
    deleteImgProduct: async (id, payload) => {
        const removeImg = await ProductService.deleteImgProduct(id, payload)
        return removeImg
    },
    deleteImgProTem: async (url) => {
        const deleteImgTem = await ProductService.deleteImgTem(url);
        return deleteImgTem
    }
}))