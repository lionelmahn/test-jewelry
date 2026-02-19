import wishService from "../services/wish.service.js";
import BaseController from "./base.controller.js";

class WishController extends BaseController {
    getWish = async (req, res) => {
        try {
            const userId = req.user.id
            const page = Number(req?.query?.page) || 1;
            const limit = Number(req?.query?.limit) || 10;
            const data = await wishService.getWish(userId, page, limit)
            return this.ok(res, data, "Lấy sản phẩm yêu thích thành công")
        } catch (error) {
            return this.handleErr(res, error)
        }
    }
    createWish = async (req, res) => {
        try {
            const userId = req.user.id
            const { id } = req.body
            const data = await wishService.createWish(userId, id)
            return this.created(res, data, "Thêm sản phẩm yêu thích thành công")
        } catch (error) {
            return this.handleErr(res, error)
        }
    }
    deleteWish = async (req, res) => {
        try {
            const userId = req.user.id;
            const { id } = req.params
            const data = await wishService.deleteItemWish(userId, id)
            return this.ok(res, data, "Xóa sản phẩm yêu thích thành công")
        } catch (error) {
            return this.handleErr(res, error)
        }
    }
}
export default new WishController()