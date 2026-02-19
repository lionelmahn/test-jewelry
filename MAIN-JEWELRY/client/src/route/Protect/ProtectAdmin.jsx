import { Navigate, Outlet } from "react-router";
import { UserAuthStore } from "../../store/userAuthStore";

export const ProtectAdminRouter = () => {
    const userStr = localStorage.getItem("user");
    const { accessToken } = UserAuthStore();
    const user = userStr ? JSON.parse(userStr) : null;
    console.log("user", user)
    console.log("accessToken", accessToken)
    if (!accessToken || user.role !== "admin") {
        return <Navigate to="/" />
    }
    return <Outlet />
}