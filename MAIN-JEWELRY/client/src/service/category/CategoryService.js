import { API_CREATE_CATEGORY, API_EDIT_CATEGORY, API_GET_CATEGORY } from "@/api/api";
import axiosClient from "../axiosClient";
import { toast } from "sonner";

export const CategoryService = {
    getCategory: async (params) => {
        try {
            const res = await axiosClient.get(API_GET_CATEGORY, { params });
            if (res.status === 200) {
                return res.data
            }
        } catch (error) {
            console.log(error)
        }
    },
    createCategory: async (name, description) => {
        try {
            const res = await axiosClient.post(API_CREATE_CATEGORY, { name, description })
            if (res.status === 201) {
                toast.success("Thêm thành công")
                return res.data;
            }
        } catch (error) {
            toast.error("Thêm thất bại")
            console.log(error)
        }
    },
    updateCategory: async (name, description, id) => {
        try {
            const res = await axiosClient.put(`${API_EDIT_CATEGORY}/${id}`, { name, description });
            if (res.status === 200) {
                toast.success("Cập nhật thành công")
                return res.data;
            }
        } catch (error) {
            toast.error("Cập nhật thất bại")
            console.log(error)
        }
    },
    deleteCategory: async (id) => {
        try {
            const res = await axiosClient.delete(`${API_DELETE_CATEGORY}/${id}`);
            if (res.status === 200) {
                toast.success("Xóa thành công")
                return res.data;
            }
        } catch (error) {
            toast.error("Xóa thất bại")
            console.log(error)
        }
    }
}