import { API_CLEAR_COMPARE, API_CREATE_COMPARE, API_DELETE_COMPARE, API_GET_COMPARE } from "@/api/api"
import axiosClient from "../axiosClient"
import { toast } from "sonner";

export const compareService = {
    getCompare: async () => {
        try {
            const res = await axiosClient.get(API_GET_COMPARE)
            if (res.status === 200) {
                return res;
            }
        } catch (error) {
            console.log(error)
        }
    },
    createItemCompare: async (productId, sku) => {
        try {
            console.log(productId, sku, "productId, sku")
            const res = await axiosClient.post(API_CREATE_COMPARE, { productId, sku })
            if (res.status === 201) {
                toast.success("Thêm vào thành công")
                return res;
            }
        } catch (error) {
            toast.error("Thêm vào thất bại")
            console.log(error)
        }
    },
    deleteItemCompare: async (sku) => {
        try {
            const res = await axiosClient.delete(`${API_DELETE_COMPARE}/${sku}`)
            if (res.status === 200) {
                return res;
            }
        } catch (error) {
            console.log(error)
        }
    },
    clearCompare: async () => {
        try {
            const res = await axiosClient.delete(API_CLEAR_COMPARE)
            if (res.status === 200) {
                return res;
            }
        } catch (error) {
            console.log(error)
        }
    }
}