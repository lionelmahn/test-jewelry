import { CouponService } from "@/service/coupon/CouponService";
import { create } from "zustand";

export const CouponStore = create(() => ({
    createCoupon: async (payload) => {
        const couponNew = await CouponService.createCoupon(payload)
        return couponNew
    },
    updateCoupon: async (id, payload) => {
        const couponEdit = await CouponService.updateCoupon(id, payload)
        return couponEdit
    },
    deleteCoupon: async (id) => {
        const couponDelete = await CouponService.deleteCoupon(id)
        return couponDelete
    }
}))