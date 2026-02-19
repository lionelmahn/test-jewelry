
import { API_COMMUNES, API_PROVINCES } from "@/api/api";
import axiosClient from "../axiosClient";

export const provincesService = {
    getProvinces: async () => {
        try {
            const res = await axiosClient.get(API_PROVINCES)
            console.log("Provinces Response:", res)
            return res;
        } catch (error) {
            console.log("Error fetching provinces:", error)
            throw error;
        }
    },
    getCommunes: async (province_code) => {
        try {
            const res = await axiosClient.get(`${API_COMMUNES}/${province_code}/communes`)
            console.log("Communes Response:", res)
            return res;
        } catch (error) {
            console.log("Error fetching provinces:", error)
            throw error;
        }
    }
}