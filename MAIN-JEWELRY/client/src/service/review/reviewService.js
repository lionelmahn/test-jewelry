import { API_CREATE_REVIEW, API_GET_ALL_VIEW, API_GET_REVIEW } from "@/api/api"
import axiosClient from "../axiosClient"

export const reviewService = {
    getAllReview: async (params) => {
        try {
            const res = await axiosClient.get(API_GET_ALL_VIEW, { params })
            if (res.status === 200) {
                return res;
            }
        } catch (error) {
            throw error
        }
    },
    getReviewByProductId: async (params) => {
        console.log(params, "paramsparamsparams")
        try {
            const res = await axiosClient.get(API_GET_REVIEW, { params })
            console.log(res, "resresv")
            if (res.status === 200) {
                return res;
            }
        } catch (error) {
            throw error
        }
    },
    createReview: async (productId, orderItemId, rating, comment) => {
        try {
            console.log(productId, orderItemId, rating, comment, "vmfnmfmbfb")
            const res = await axiosClient.post(API_CREATE_REVIEW, { productId, orderItemId, rating, comment })
            if (res.status === 201) {
                return res;
            }
        } catch (error) {
            throw error
        }
    }
}