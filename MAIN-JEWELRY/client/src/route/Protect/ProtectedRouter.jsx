import { Navigate, Outlet } from 'react-router';
import { UserAuthStore } from '../../store/userAuthStore';
export const ProtectedRouter = () => {
    const { accessToken } = UserAuthStore();
    if (!accessToken) {
        return <Navigate to="/" />
    }
    return <Outlet></Outlet>;
}
