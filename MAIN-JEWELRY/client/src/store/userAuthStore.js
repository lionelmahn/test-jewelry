import { userService } from "@/service/user/userService";
import { create } from "zustand";

export const UserAuthStore = create((set, get) => ({
    accessToken: null,
    user: (() => {
        const userStr = localStorage.getItem("user")
        return userStr ? JSON.parse(userStr) : null;
    })(),
    loading: false,
    setAccessToken: (accessToken) => {
        set({ accessToken });
    },
    clearState: () => {
        set({ accessToken: null, user: null, loading: false });
        localStorage.removeItem("user");
        window.location.href = "/";
    },
    signUp: async (fullName, email, password) => {
        try {
            set({ loading: true });
            const res = await userService.signUp(fullName, email, password)
            return res;
        } catch (error) {
            console.log(error);
        } finally {
            set({ loading: false })
        }
    },
    login: async (email, password) => {
        try {
            set({ loading: true });
            const res = await userService.login(email, password)
            return res;
        } catch (error) {
            console.error(error);
        } finally {
            set({ loading: false })
        }
    },
    logout: async () => {
        try {
            await userService.logout();
            get().clearState()
        } catch (error) {
            console.log(error)
        }
    },
    updateRole: async (id, role) => {
        const res = await userService.updateRole(id, role);
        return res;
    },
    deleteUser: async (id) => {
        const res = await userService.deleteUser(id)
        return res;
    }
}))