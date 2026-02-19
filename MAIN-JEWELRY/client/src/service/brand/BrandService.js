import { toast } from "sonner"
import axiosClient from "../axiosClient"
import { API_CREATE_BRAND, API_DELETE_BRAND, API_EDIT_BRAND, API_GET_BRAND } from "@/api/api"


export const BrandService = {
    getBrand: async (params) => {
        try {
            const res = await axiosClient.get(API_GET_BRAND, { params })
            if (res.status === 200) {
                return res.data
            }
        } catch (error) {
            console.log(error)
        }
    },
    createBrand: async (name) => {
        try {
            const res = await axiosClient.post(API_CREATE_BRAND, { name })
            if (res.status === 201) {
                toast.success("Thêm thành công")
                return res.data
            }
        } catch (error) {
            toast.error("Thêm thất bại")
            console.log(error)
        }
    },
    updateBrand: async (name, id) => {
        try {
            const res = await axiosClient.put(`${API_EDIT_BRAND}/${id}`, { name })
            if (res.status === 201) {
                toast.success("Cập nhật thành công")
                return res.data
            }
        } catch (error) {
            toast.error("Cập nhật thất bại")
            console.log(error)
        }
    },
    deleteBrand: async (id) => {
        try {
            const res = await axiosClient.delete(`${API_DELETE_BRAND}/${id}`)
            if (res.status === 200) {
                toast.success("Xóa thành công")
                return res.data
            }
        } catch (error) {
            toast.error("Xóa thất bại")
            console.log(error)
        }
    }
}