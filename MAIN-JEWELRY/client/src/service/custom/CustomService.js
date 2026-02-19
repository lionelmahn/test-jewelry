import { API_ADD_CUSTOM, API_CAL_CUSTOM, API_EDIT_CUSTOM, API_GET_CUSTOM, API_GET_CUSTOM_BY_ID, API_PREVIEW_CUSTOM, API_UPDATE_CUSTOM } from "@/api/api"
import axiosClient from "../axiosClient"

export const CustomService = {
    getCustom: async (params) => {
        try {
            const res = await axiosClient.get(API_GET_CUSTOM, { params })
            if (res.status === 200) {
                return res;
            }
        } catch (error) {
            throw error
        }
    },
    getCustomById: async (params) => {
        try {
            const res = await axiosClient.get(API_GET_CUSTOM_BY_ID, { params })
            if (res.status === 200) {
                return res;
            }
        } catch (error) {
            throw error
        }
    },
    previewCustom: async (id, material, gem, quantity) => {
        try {
            const res = await axiosClient.post(`${API_PREVIEW_CUSTOM}/${id}`, { material, gem, quantity })
            if (res.status === 200) {
                return res;
            }
        } catch (error) {
            throw error
        }
    },
    updateCustom: async (id, shippingAddress, paymentMethod, paymentStatus, codeCou, quantity) => {
        try {
            const res = await axiosClient.put(`${API_UPDATE_CUSTOM}/${id}`, { shippingAddress, paymentMethod, paymentStatus, codeCou, quantity })
            if (res.status === 200) {
                return res;
            }
        } catch (error) {
            throw error
        }
    },
    addCustom: async (payload) => {
        try {
            const res = await axiosClient.post(API_ADD_CUSTOM, payload)
            if (res.status === 201) {
                return res;
            }
        } catch (error) {
            throw error
        }
    },
    calculate: async (payload) => {
        try {
            const res = await axiosClient.post(API_CAL_CUSTOM, payload)
            if (res.status === 200) {
                return res;
            }
        } catch (error) {
            throw error
        }
    },
    updateStatus: async (id, status) => {
        try {
            const res = await axiosClient.put(`${API_EDIT_CUSTOM}/${id}`, { status })
            if (res.status === 200) {
                return res;
            }
        } catch (error) {
            throw error
        }
    }
}