import compareService from "../services/compare.service.js";
import BaseController from "./base.controller.js";

class CompareController extends BaseController {
    getCompare = async (req, res) => {
        try {
            const userId = req.user.id
            const data = await compareService.getCompare(userId);
            return this.ok(res, data, "Lấy thành công")
        } catch (error) {
            return this.handleErr(res, error)
        }
    }
    createItemCompare = async (req, res) => {
        try {
            const userId = req.user.id
            const { productId, sku } = req.body
            console.log(productId, sku, userId, "bkgmbgmbkgmb")
            const data = await compareService.createCompare(userId, productId, sku)
            return this.created(res, data, "Thêm thành công")
        } catch (error) {
            return this.handleErr(res, error)
        }
    }
    deleteItemCompare = async (req, res) => {
        try {
            const userId = req.user.id
            const { sku } = req.params
            const data = await compareService.deleteItemCompare(userId, sku)
            return this.ok(res, data, "Xóa thành công")
        } catch (error) {
            return this.handleErr(res, error)
        }
    }
    clearCompare = async (req, res) => {
        try {
            const userId = req.user.id
            const data = await compareService.clearCompare(userId)
            return this.ok(res, data, "Xóa so sánh thành công")
        } catch (error) {
            return this.handleErr(res, error)
        }
    }
}
export default new CompareController()