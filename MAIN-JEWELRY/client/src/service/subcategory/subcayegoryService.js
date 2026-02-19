import { API_CREATE_SUBCATE, API_DELETE_IMG_SUBCATE_TEM, API_DELETE_SUBCATE, API_EDIT_SUBCATE, API_GET_SUBCATE, API_UPLOAD_IMG_SUBCATE } from "@/api/api"
import axiosClient from "../axiosClient"
import { toast } from "sonner";

export const subcategoryService = {
    getSubcategory: async (params) => {
        try {
            const res = await axiosClient.get(API_GET_SUBCATE, { params });
            if (res.status === 200) {
                return res
            }
        } catch (error) {
            toast.error("Thất bại")
            console.log(error)
        }
    },
    createSubcategory: async (name, description, categoryId, images) => {
        try {
            console.log(images, "kkkkkkkk")
            const res = await axiosClient.post(API_CREATE_SUBCATE, { name, description, categoryId, images })
            if (res.status === 201) {
                toast.success("Thêm thành công")
                return res
            }
        } catch (error) {
            toast.error("Thêm thất bại")
            console.log(error)
        }
    },
    uploadImgSubTem: async (payload) => {
        try {
            const res = await axiosClient.post(API_UPLOAD_IMG_SUBCATE, payload)
            if (res.status === 201) {
                toast.success("Thêm thành công")
                return res;
            }
        } catch (error) {
            toast.error("Thêm thất bại")
            console.log(error)
        }
    },
    deleteImgSubTem: async (url) => {
        try {
            const res = await axiosClient.delete(API_DELETE_IMG_SUBCATE_TEM, { data: { url } })
            if (res.status === 200) {
                toast.success("Xóa thành công")
                return res;
            }
        } catch (error) {
            toast.error("Xóa thất bại")
            console.log(error)
        }
    },
    updateSubCate: async (id, name, description, categoryId, images) => {
        try {
            const res = await axiosClient.put(`${API_EDIT_SUBCATE}/${id}`, { name, description, categoryId, images })
            if (res.status === 200) {
                toast.success("Sửa thành công")
                return res;
            }
        } catch (error) {
            toast.error("Sửa thất bại")
            console.log(error)
        }
    },
    deleteSubcate: async (id) => {
        try {
            const res = await axiosClient.delete(`${API_DELETE_SUBCATE}/${id}`)
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