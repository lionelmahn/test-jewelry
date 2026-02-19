import { API_CHAT_BOX, API_GET_CHAT_BOX } from "@/api/api"
import axiosClient from "../axiosClient"

export const ChatBoxService = {
    getAllMessage: async (params) => {
        try {
            const res = await axiosClient.get(API_GET_CHAT_BOX, { params })
            if (res.status === 200) {
                return res
            }
        } catch (error) {
            console.log(error)
        }
    },
    createMessage: async (message) => {
        try {
            const res = await axiosClient.post(API_CHAT_BOX, { message })
            if (res.status === 200) {
                return res;
            }
        } catch (error) {
            console.log(error)
        }
    }
}