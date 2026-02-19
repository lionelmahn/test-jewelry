import { API_PAYMENT, API_PAYMENT_CUSTOM } from "@/api/api";
import axiosClient from "../axiosClient";

export const PaymentService = {
    createPayment: async (orderId) => {
        try {
            const res = await axiosClient.post(API_PAYMENT, {
                orderId,
            });
            console.log(res, "fbmkgmbkgmknm")
            return res;
        } catch (error) {
            throw error
        }
    },
    createPaymentCustom: async (id) => {
        try {
            const res = await axiosClient.post(API_PAYMENT_CUSTOM, { id })
            console.log(res, "resresres")
            return res;
        } catch (error) {
            console.log(error, "errorerrorerror")
            throw error
        }
    }
}
