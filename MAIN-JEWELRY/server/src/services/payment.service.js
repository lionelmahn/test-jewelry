import { payos } from "../config/payos.config.js";
import { NotFound } from "../core/error.response.js";
import customModel from "../models/custom.model.js";
import orderModel from "../models/order.model.js";

class PaymentService {
    async createPaymentCustom(id) {
        const cus = await customModel.findById(id)
        if (!cus) {
            throw new NotFound("Không tìm thấy")
        }
        const orderCode = Math.floor(Date.now() / 1000);
        const expiredAt = Math.floor((Date.now() + 15 * 60 * 1000) / 1000);
        const result = await payos.paymentRequests.create({
            orderCode,
            amount: Number(Math.round(cus.total)),
            description: `DH${orderCode}`,
            expiredAt,
            returnUrl: 'http://localhost:5173/payment/success/custom',
            cancelUrl: 'http://localhost:5173/payment/cancel',
        });
        await customModel.findByIdAndUpdate(id, { orderCode });
        return {
            id: id.toString(),
            orderCode: orderCode.toString(),
            checkoutUrl: result.checkoutUrl,
            qrCode: result.qrCode,
            expiredAt: expiredAt * 1000,
        };
    }
    async createPaymentIntent(orderId) {
        const order = await orderModel.findById(orderId);
        if (!order) throw new Error("Order not found");
        const orderCode = Math.floor(Date.now() / 1000);
        const expiredAt = Math.floor((Date.now() + 15 * 60 * 1000) / 1000);

        const result = await payos.paymentRequests.create({
            orderCode,
            amount: Number(Math.round(order.total)),
            description: `DH${orderCode}`,
            expiredAt,
            returnUrl: 'http://localhost:5173/payment/success',
            cancelUrl: 'http://localhost:5173/payment/cancel',
        });

        await orderModel.findByIdAndUpdate(orderId, { orderCode });

        return {
            orderId: orderId.toString(),
            orderCode: orderCode.toString(),
            checkoutUrl: result.checkoutUrl,
            qrCode: result.qrCode,
            expiredAt: expiredAt * 1000,
        };
    }
    async handlePaymentCallbackCustom(params) {
        const { code, id, cancel, status, orderCode } = params;
        if (!orderCode) {
            throw new Error("Missing orderCode");
        }
        const cus = await customModel.findOne({ orderCode: String(orderCode) });
        if (!cus) {
            throw new Error("Order not found");
        }
        let paymentStatus = "PENDING";
        let isPaid = false;
        if (code === "00" && !cancel && (status === "PAID" || status === "CONFIRMED" || status === "SUCCESS")) {
            paymentStatus = "PAID";
            isPaid = true;
        } else if (cancel === true || status === "CANCELLED") {
            paymentStatus = "FAILED";
            isPaid = false;
        }
        await customModel.findByIdAndUpdate(cus._id, {
            paymentStatus,
            isPaid,
            paidAt: isPaid ? new Date() : undefined,
        });
        return {
            success: isPaid,
            message: isPaid ? "Thanh toán thành công" : "Thanh toán thất bại hoặc bị huỷ",
            paymentStatus,
        };
    }
    async handlePaymentCallback(params) {
        try {
            const { code, id, cancel, status, orderCode } = params;
            console.log("Payment callback params:", params);

            if (!orderCode) {
                throw new Error("Missing orderCode");
            }
            const order = await orderModel.findOne({ orderCode: String(orderCode) });
            if (!order) {
                throw new Error("Order not found");
            }

            let paymentStatus = "PENDING";
            let isPaid = false;
            if (code === "00" && !cancel && (status === "PAID" || status === "CONFIRMED" || status === "SUCCESS")) {
                paymentStatus = "PAID";
                isPaid = true;
            } else if (cancel === true || status === "CANCELLED") {
                paymentStatus = "FAILED";
                isPaid = false;
            }
            await orderModel.findByIdAndUpdate(order._id, {
                paymentStatus,
                isPaid,
                paidAt: isPaid ? new Date() : undefined,
            });

            console.log(`Order ${orderCode} payment callback processed: ${paymentStatus}`);

            return {
                success: isPaid,
                message: isPaid ? "Thanh toán thành công" : "Thanh toán thất bại hoặc bị huỷ",
                paymentStatus,
            };
        } catch (error) {
            console.error("Payment callback error:", error);
            return {
                success: false,
                message: error.message,
                paymentStatus: "FAILED",
            };
        }
    }

    async handleWebhook(body) {
        try {
            console.log("PayOS Webhook received:", body);

            if (!body?.data?.orderCode) {
                throw new Error("Invalid webhook payload: missing orderCode");
            }

            const { orderCode, amount, status } = body.data;

            const order = await orderModel.findOne({ orderCode: orderCode.toString() });
            if (!order) {
                console.warn(`Order not found for orderCode: ${orderCode}`);
                return { success: false, message: "Order not found" };
            }

            if (status === "PAID") {
                order.paymentStatus = "PAID";
                await order.save();
            }

            return {
                success: true,
                message: "Webhook processed successfully",
            };
        } catch (error) {
            console.error("Webhook processing error:", error);
            return {
                success: false,
                message: error.message,
            };
        }
    }
}

export default new PaymentService();