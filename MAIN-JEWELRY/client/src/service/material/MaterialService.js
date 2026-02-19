import { API_CREATE_MATERIAL, API_DELETE_MATERIAL, API_GET_MATERIAL, API_UPDATE_MATERIAL } from "@/api/api"
import axiosClient from "../axiosClient"
import { toast } from "sonner";

export const MaterialService = {
    getMateral: async (params) => {
        try {
            const res = await axiosClient.get(API_GET_MATERIAL, { params })
            if (res.status === 200) {
                return res;
            }
        } catch (error) {
            console.log(error)
        }
    },
    createMaterial: async (payload) => {
        try {
            const res = await axiosClient.post(API_CREATE_MATERIAL, payload)
            if (res.status === 201) {
                toast.success("Thêm thành công")
                return res;
            }
        } catch (error) {
            toast.error("Thêm thất bại")
            console.log(error)
        }
    },
    updateMaterial: async (id, payload) => {
        try {
            const res = await axiosClient.put(`${API_UPDATE_MATERIAL}/${id}`, payload)
            if (res.status === 200) {
                toast.success("Cập nhật thành công")
                return res
            }
        } catch (error) {
            toast.error("Cập nhật thất bại")
            console.log(error)
        }
    },
    deleteMaterial: async (id) => {
        try {
            const res = await axiosClient.delete(`${API_DELETE_MATERIAL}/${id}`)
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