import { API_CLEAR_CART, API_CREATE_CART, API_DELETE_CART, API_GET_CART, API_UPDATE_CART } from "@/api/api"
import axiosClient from "../axiosClient"

export const CartService = {
    getCart: async (params) => {
        try {
            const res = await axiosClient.get(API_GET_CART, { params })
            if (res.status === 200) {
                return res
            }
        } catch (error) {
            console.log(error)
        }
    },
    createCart: async (productId, color, quantity) => {
        try {
            const res = await axiosClient.post(API_CREATE_CART, { productId, color, quantity })
            if (res.status === 201) {
                return res
            }
        } catch (error) {
            console.log(error)
        }
    },
    updateCart: async (sku, quantity) => {
        try {
            const res = await axiosClient.patch(`${API_UPDATE_CART}/${sku}`, { quantity })
            if (res.status === 200) {
                return res
            }
        } catch (error) {
            console.log(error)
        }
    },
    deleteCart: async (sku) => {
        try {
            const res = await axiosClient.delete(`${API_DELETE_CART}/${sku}`)
            if (res.status === 200) {
                return res;
            }
        } catch (error) {
            console.log(error)
        }
    },
    clearCart: async () => {
        try {
            const res = await axiosClient.delete(API_CLEAR_CART);
            if (res.status === 200) {
                return res;
            }
        } catch (error) {
            console.log(error)
        }
    }
}