import { API_DELETE_USER, API_GET_ALL_USERS, API_LOGOUT, API_SIGN_IN, API_SIGN_UP, API_UPDATE_ROLE } from "@/api/api"
import axiosClient from "../axiosClient"

export const userService = {
    getAllUsers: async (params) => {
        try {
            const res = await axiosClient.get(API_GET_ALL_USERS, { params })
            if (res.status === 200) {
                return res;
            }
        } catch (error) {
            throw error
        }
    },
    signUp: async (fullName, email, password) => {
        try {
            const res = await axiosClient.post(API_SIGN_UP, { fullName, email, password })
            if (res.status === 201) {
                return res;
            }
        } catch (error) {
            return error.response.data.message
        }
    },
    login: async (email, password) => {
        try {
            const res = await axiosClient.post(API_SIGN_IN, { email, password })
            if (res.status === 200) {
                return res
            }
        } catch (error) {
            return error.response.data.message
        }
    },
    logout: async () => {
        try {
            const res = await axiosClient.get(API_LOGOUT)
            if (res.status === 200) {
                return res;
            }
        } catch (error) {
            console.log(error)
        }
    },
    updateRole: async (id, role) => {
        try {
            const res = await axiosClient.put(`${API_UPDATE_ROLE}/${id}`, { role })
            if (res.status === 200) {
                return res;
            }
        } catch (error) {
            throw error
        }
    },
    deleteUser: async (id) => {
        try {
            const res = await axiosClient.delete(`${API_DELETE_USER}/${id}`);
            if (res.status === 200) {
                return res;
            }
        } catch (error) {
            throw error
        }
    }
}