import express from "express";
import orderController from "../controller/order.controller.js";
import { checkRole } from "../auth/checkRole.js";
const route = express.Router();
route.get("/list-order", orderController.getOrdersByUserId)
route.get("/", checkRole("admin"), orderController.getAllOrder)
route.post("/preview", orderController.previewOrder)
route.post("/use-coupon", orderController.useCoupon)
route.post("/", orderController.createOrder)

route.get("/:id", orderController.getOrderById)
route.put("/:id/status", checkRole("admin"), orderController.updateOrderStatus)
route.put("/:id/payment-status", orderController.updatePaymentStatus)
route.delete("/:id", orderController.cancelOrder)
export default route