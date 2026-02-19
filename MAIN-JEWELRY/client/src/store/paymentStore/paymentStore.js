import { PaymentService } from "@/service/payment/payment.service";
import { create } from "zustand";

export const paymentStore = create(() => ({
    createPayment: async (orderId) => {
        const res = await PaymentService.createPayment(orderId)
        return res
    },
    createPaymentCustom: async (id) => {
        const res = await PaymentService.createPaymentCustom(id)
        return res;
    }
}))