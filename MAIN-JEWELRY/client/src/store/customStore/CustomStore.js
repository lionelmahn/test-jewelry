import { CustomService } from "@/service/custom/CustomService";
import { create } from "zustand";

export const CustomStore = create(() => ({
    previewCustom: {},
    setPreviewCustom: (data) => {
        CustomStore.setState({ previewCustom: data });
    },
    addCustom: async (payload) => {
        const res = await CustomService.addCustom(payload)
        return res;
    },
    calculateCustom: async (payload) => {
        const res = await CustomService.calculate(payload)
        return res;
    },
    updateStatus: async (id, status) => {
        const res = await CustomService.updateStatus(id, status)
        return res;
    },
    updateCustom: async (id, shippingAddress, paymentMethod, paymentStatus, codeCou, quantity = 1) => {
        const res = await CustomService.updateCustom(id, shippingAddress, paymentMethod, paymentStatus, codeCou, quantity)
        return res;
    },
    previewDeign: async (id, material, gem, quantity) => {
        const res = await CustomService.previewCustom(id, material, gem, quantity)
        return res;
    }
}))