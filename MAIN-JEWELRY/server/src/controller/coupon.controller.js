import couponService from "../services/coupon.service.js"
import BaseController from "./base.controller.js"

class CouponController extends BaseController {
    getCoupon = async (req, res) => {
        try {
            const page = Number(req?.query?.page) || 1
            const limit = Number(req?.query?.limit) || 10
            const search = req?.query?.search?.trim() || ""
            const data = await couponService.getCoupon(page, limit, search)
            return this.ok(res, data, "Lấy thành công")
        } catch (error) {
            return this.handleErr(res, error)
        }
    }
    createCoupon = async (req, res) => {
        try {
            const { code, discountType, discountValue, minOrderValue, startDate, endDate, isActive } = req.body
            const data = await couponService.createCoupon(code, discountType, discountValue, minOrderValue, startDate, endDate, isActive)
            return this.created(res, data, "Tạo mã giảm giá thành công")
        } catch (error) {
            return this.handleErr(res, error)
        }
    }
    updateCoupon = async (req, res) => {
        try {
            const { id } = req.params
            const { code, discountType, discountValue, minOrderValue, startDate, endDate, isActive } = req.body
            console.log(code, discountType, discountValue, minOrderValue, startDate, endDate, isActive)
            const data = await couponService.updateCoupon(id, code, discountType, discountValue, minOrderValue, startDate, endDate, isActive)
            return this.ok(res, data, "Sửa mã giảm giá thành công")
        } catch (error) {
            return this.handleErr(res, error)
        }
    }
    deleteCoupon = async (req, res) => {
        try {
            const { id } = req.params
            const data = await couponService.deleteCoupon(id)
            return this.ok(res, data, "Xóa mã giảm giá thành công")
        } catch (error) {
            return this.handleErr(res, error)
        }
    }
}
export default new CouponController()