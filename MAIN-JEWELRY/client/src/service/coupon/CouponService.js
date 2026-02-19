import { API_CREATE_COUPON, API_DELETE_COUPON, API_GET_COUPON, API_UPDATE_COUPON } from "@/api/api"
import axiosClient from "../axiosClient"
import { toast } from "sonner"

export const CouponService = {
    getCoupon: async (params) => {
        try {
            const res = await axiosClient.get(API_GET_COUPON, { params })
            if (res.status === 200) {
                return res;
            }
        } catch (error) {
            console.log(error)
        }
    },
    createCoupon: async (payload) => {
        try {
            const res = await axiosClient.post(API_CREATE_COUPON, payload)
            if (res.status === 201) {
                toast.success("Thêm thành công")
                return res;
            }
        } catch (error) {
            toast.error("Thêm thất bại")
            console.log(error)
        }
    },
    updateCoupon: async (id, payload) => {
        try {
            const res = await axiosClient.put(`${API_UPDATE_COUPON}/${id}`, payload)
            if (res.status === 200) {
                toast.success("Sửa thành công")
                return res;
            }
        } catch (error) {
            toast.error("Sửa thất bại")
            console.log(error)
        }
    },
    deleteCoupon: async (id) => {
        try {
            const res = await axiosClient.delete(`${API_DELETE_COUPON}/${id}`)
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