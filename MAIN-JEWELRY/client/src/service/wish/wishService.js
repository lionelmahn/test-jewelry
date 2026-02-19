import { API_CREATE_WISH, API_DELETE_WISH, API_GET_WISH } from "@/api/api"
import axiosClient from "../axiosClient"

export const wishService = {
    getWish: async (params) => {
        try {
            const res = await axiosClient.get(API_GET_WISH, { params })
            if (res.status === 200) {
                return res;
            }
        } catch (error) {
            throw error
        }
    },
    createWish: async (id) => {
        try {
            const res = await axiosClient.post(API_CREATE_WISH, { id })
            if (res.status === 201) {
                return res;
            }
        } catch (error) {
            throw error
        }
    },
    deleteWish: async (id) => {
        try {
            const res = await axiosClient.delete(`${API_DELETE_WISH}/${id}`)
            if (res.status === 200) {
                return res;
            }
        } catch (error) {
            throw error
        }
    }
}