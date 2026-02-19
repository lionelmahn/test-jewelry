import { API_CREATE_GEMSTONE, API_DELETE_GEMSTONE, API_GET_GEMSTONE, API_UPDATE_GEMSTONE } from "@/api/api"
import axiosClient from "../axiosClient"
import { toast } from "sonner";

export const GemStoneService = {
    getGemStone: async (params) => {
        try {
            const res = await axiosClient.get(API_GET_GEMSTONE, { params })
            if (res.status === 200) {
                return res;
            }
        } catch (error) {
            console.log(error)
        }
    },
    createGemStone: async (payload) => {
        try {
            const res = await axiosClient.post(API_CREATE_GEMSTONE, payload)
            if (res.status === 201) {
                toast.success("Thêm thành công")
                return res;
            }
        } catch (error) {
            console.log(error)
        }
    },
    updateGemStone: async (id, payload) => {
        try {
            const res = await axiosClient.put(`${API_UPDATE_GEMSTONE}/${id}`, payload)
            if (res.status === 200) {
                toast.success("cập nhật thành công");
                return res;
            }
        } catch (error) {
            toast.error("Cập nhật thất bại")
            console.log(error)
        }
    },
    deleteGemStone: async (id) => {
        try {
            const res = await axiosClient.delete(`${API_DELETE_GEMSTONE}/${id}`)
            if (res.status === 200) {
                toast.success("Xóa thành công")
                return res;
            }
        } catch (error) {
            toast.error("Xóa thất bại")
            console.log(error)
        }
    }
}