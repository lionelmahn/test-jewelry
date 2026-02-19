import orderService from "../services/order.service.js";
import BaseController from "./base.controller.js";

class OrderController extends BaseController {
    getAllOrder = async (req, res) => {
        try {
            const page = Number(req?.query?.page) || 1;
            const limit = Number(req?.query?.limit) || 10;
            const status = req?.query?.status?.trim() || "ALL"
            const data = await orderService.getAllOrder(page, limit, status);
            return this.ok(res, data, "Lấy danh sách đơn hàng thành công");
        } catch (error) {
            return this.handleErr(res, error);
        }
    }
    previewOrder = async (req, res) => {
        try {
            const userId = req.user.id;
            const items = req.body.items
            console.log(items, "itemsitemsitems")
            const data = await orderService.previewOrder(userId, { items });
            return this.ok(res, data, "Xem trước đơn hàng thành công");
        } catch (error) {
            return this.handleErr(res, error);
        }
    }
    useCoupon = async (req, res) => {
        try {
            const userId = req.user.id;
            const { code, totalPrice } = req.body;
            console.log(code, totalPrice, 'fvjffjg')
            const data = await orderService.useCoupon(userId, code, totalPrice);
            return this.ok(res, data, "Áp dụng mã giảm giá thành công");
        } catch (error) {
            return this.handleErr(res, error);
        }
    }
    createOrder = async (req, res) => {
        try {
            const userId = req.user.id;
            const { items, shippingAddress, paymentMethod = "CASH", coupon, notes } = req.body;
            const data = await orderService.createOrder(userId, { items, shippingAddress, paymentMethod, coupon, notes });
            return this.created(res, data, "Tạo đơn hàng thành công");
        } catch (error) {
            return this.handleErr(res, error);
        }
    }
    getOrderById = async (req, res) => {
        try {
            const { id } = req.params;
            const data = await orderService.getOrderById(id);
            return this.ok(res, data, "Lấy đơn hàng thành công");
        } catch (error) {
            return this.handleErr(res, error);
        }
    }
    getOrdersByUserId = async (req, res) => {
        try {
            const userId = req.user.id;
            const page = Number(req?.query?.page) || 1
            const limit = Number(req?.query?.limit) || 10
            const status = req?.query?.status?.trim() || 'ALL'
            console.log(userId, page, limit, status, "userId, page, limit")
            const data = await orderService.getOrdersByUserId(userId, page, limit, status);
            return this.ok(res, data, "Lấy đơn hàng thành công");
        } catch (error) {
            return this.handleErr(res, error);
        }
    }
    getOrderByStatus = async (req, res) => {
        try {
            const userId = req.user.id;
            const page = Number(req?.query?.page) || 1
            const limit = Number(req?.query?.limit) || 10
            let status = req?.query?.status;
            if (status) {
                status = status?.trim()?.toUpperCase();
            }
            const data = await orderService.getOrderByStatus(userId, status, page, limit)
            return this.ok(res, data, "Lấy trạng thái thành công")
        } catch (error) {
            return this.handleErr(res, error)
        }
    }
    updateOrderStatus = async (req, res) => {
        try {
            const { id } = req.params;
            const adminId = req.user.id
            const { status } = req.body;
            const data = await orderService.updateOrderStatus(id, status, adminId);
            return this.ok(res, data, "Cập nhật trạng thái đơn hàng thành công");
        } catch (error) {
            return this.handleErr(res, error);
        }
    }
    updatePaymentStatus = async (req, res) => {
        try {
            const { id } = req.params;
            const { paymentStatus } = req.body;
            const data = await orderService.updatePaymentStatus(id, paymentStatus);
            return this.ok(res, data, "Cập nhật trạng thái thanh toán đơn hàng thành công");
        } catch (error) {
            return this.handleErr(res, error);
        }
    }
    cancelOrder = async (req, res) => {
        try {
            const { id } = req.params;
            const userId = req.user.id;
            const { reason } = req.body;
            await orderService.cancelOrder(id, userId, reason);
            return this.ok(res, null, "Hủy đơn hàng thành công");
        } catch (error) {
            return this.handleErr(res, error);
        }
    }
}
export default new OrderController()