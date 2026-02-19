import { API_CREATE_PRODUCT, API_DELETE_IMG_PRODUCT, API_DELETE_PRODUCT, API_EDIT_PRODUCT, API_GET_ONTIME_PRODUCT, API_GET_PRODUCT, API_GET_PRODUCT_BY_ID, API_UPLOAD_FILE_PRODUCT, API_UPLOAD_FILE_PRODUCT_PREVIEW, API_UPLOAD_IMG_PRODUCT } from "@/api/api"
import axiosClient from "../axiosClient"
import { toast } from "sonner"

export const ProductService = {
    getAllProduct: async (params) => {
        try {
            const res = await axiosClient.get(API_GET_PRODUCT, { params })
            if (res.status === 200) {
                return res;
            }
        } catch (error) {
            console.log(error)
        }
    },
    getProductById: async (id) => {
        try {
            const res = await axiosClient.get(`${API_GET_PRODUCT_BY_ID}/${id}`)
            if (res.status) {
                return res;
            }
        } catch (error) {
            console.log(error)
        }
    },
    getOntime: async (params) => {
        try {
            console.log(params, "paramsparams")
            const res = await axiosClient.get(API_GET_ONTIME_PRODUCT, { params })
            console.log(res, "vfvfbfb")
            if (res.status === 200) {
                return res;
            }
        } catch (error) {
            console.log(error)
        }
    },
    createProduct: async (payload) => {
        try {
            console.log('payload', payload)
            const res = await axiosClient.post(API_CREATE_PRODUCT, payload)
            if (res.status === 201) {
                toast.success("Thêm sản phẩm thành công")
                return res;
            }
        } catch (error) {
            toast.error("Thêm sản phẩm thất bại")
            console.log(error)
        }
    },
    upFileProduct: async (payload) => {
        try {
            const res = await axiosClient.post(API_UPLOAD_FILE_PRODUCT, payload)
            if (res.status === 200) {
                return res;
            }
        } catch (error) {
            throw error
        }
    },
    previewUpFile: async (payload) => {
        try {
            const res = await axiosClient.post(API_UPLOAD_FILE_PRODUCT_PREVIEW, payload)
            if (res.status === 200) {
                return res;
            }
        } catch (error) {
            throw error
        }
    },
    updateProduct: async (id, payload) => {
        try {
            console.log(id, payload, "vfdnkvfkbgnlhjkuk")
            const res = await axiosClient.put(`${API_EDIT_PRODUCT}/${id}`, payload)
            if (res.status === 200) {
                toast.success("Sửa sản phẩm thành công")
                return res
            }
        } catch (error) {
            toast.error("Sửa sản phẩm thất bại")
            console.log(error)
        }
    },
    uploadImg: async (payload) => {
        try {
            const res = await axiosClient.post(API_UPLOAD_IMG_PRODUCT, payload)
            if (res.status === 201) {
                toast.success("Tải ảnh thành công")
                return res;
            }
        } catch (error) {
            toast.error("Tải ảnh thất bại")
            console.log(error)
        }
    },
    deleteProduct: async (id) => {
        try {
            const res = await axiosClient.delete(`${API_DELETE_PRODUCT}/${id}`)
            if (res.status === 200) {
                toast.success("Xóa sản phẩm thành công")
                return res;
            }
        } catch (error) {
            toast.error("Xóa sản phẩm thất bại")
        }
    },
    deleteImgProduct: async (id, url) => {
        try {
            const res = await axiosClient.delete(`${API_DELETE_PRODUCT}/${id}/image`, { data: { url } })
            if (res.status === 200) {
                toast.success("Xóa ảnh thành công")
                return res;
            }
        } catch (error) {
            toast.error("Xóa ảnh thất bại")
            console.log(error)
        }
    },
    deleteImgTem: async (url) => {
        try {
            const res = await axiosClient.delete(API_DELETE_IMG_PRODUCT, { data: { url } })
            if (res.status === 200) {
                toast.success("Xóa ảnh thành công")
                return res;
            }
        } catch (error) {
            toast.error("Xóa ảnh thất bại")
            console.log(error)
        }
    }
}