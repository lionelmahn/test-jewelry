import { API_GET_ITEMS } from "@/api/api"
import axiosClient from "../axiosClient"

export const ItemService = {
    getItem: async () => {
        try {
            const res = await axiosClient.get(API_GET_ITEMS)
            if (res.status === 200) {
                return res;
            }
        } catch (error) {
            console.log(error)
        }
    }
}