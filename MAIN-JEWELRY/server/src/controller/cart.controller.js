import cartService from "../services/cart.service.js";
import BaseController from "./base.controller.js";

class CartController extends BaseController {
    getCart = async (req, res) => {
        try {
            const userId = req.user.id
            const page = Number(req?.query?.page) || 1
            const limit = Number(req?.query?.limit) || 10
            const result = await cartService.getCart(userId, page, limit)
            return this.ok(res, result, "Lấy giỏ hàng thành công")
        } catch (error) {
            return this.handleErr(res, error)
        }
    }
    createCart = async (req, res) => {
        try {
            const userId = req.user.id
            const { productId, color, quantity } = req.body
            const cartItem = await cartService.createCart(userId, productId, color, quantity)
            return this.created(res, cartItem, "Thêm giỏ hàng thành công")
        } catch (error) {
            return this.handleErr(res, error)
        }
    }
    updateCart = async (req, res) => {
        try {
            const userId = req.user.id
            const { sku } = req.params
            const { quantity } = req.body
            const updateCart = await cartService.updateCart(userId, sku, quantity)
            return this.ok(res, updateCart, "Cập nhật giỏ hàng thành công")
        } catch (error) {
            return this.handleErr(res, error)
        }
    }
    deleteCart = async (req, res) => {
        try {
            const userId = req.user.id
            const { sku } = req.params
            const removeCart = await cartService.deleteCart(userId, sku);
            return this.ok(res, removeCart, "Xóa đơn hàng thành công")
        } catch (error) {
            return this.handleErr(res, error)
        }
    }
    clearCart = async (req, res) => {
        try {
            const userId = req.user.id
            const clearData = await cartService.createCart(userId)
            return this.ok(res, clearData, "Xóa giỏ hàng thành công")
        } catch (error) {
            return this.handleErr(res, error)
        }
    }
}
export default new CartController()