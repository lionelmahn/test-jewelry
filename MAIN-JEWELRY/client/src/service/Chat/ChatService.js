import { API_CHAT, API_CHAT_ME } from "@/api/api"
import axiosClient from "../axiosClient"

export const ChatService = {
    getAllMessage: async (params) => {
        try {
            const res = await axiosClient.get(API_CHAT, { params })
            if (res.status === 200) {
                return res
            }
        } catch (error) {
            console.log(error)
        }
    },
    getMessageById: async () => {
        try {
            const res = await axiosClient(API_CHAT_ME)
            if (res.status === 200) {
                return res
            }
        } catch (error) {
            console.log(error)
        }
    }
}