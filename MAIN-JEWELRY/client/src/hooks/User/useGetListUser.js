
import { API_GET_ALL_USERS } from "@/api/api";
import { userService } from "@/service/user/userService";
import { UserAuthStore } from "@/store/userAuthStore";
import useSWR from "swr"

export const useGetListUser = (dataFilter) => {
    const { accessToken } = UserAuthStore();
    const shouldFetch = accessToken && dataFilter;
    const { data, error, isLoading, isValidating, mutate } = useSWR(shouldFetch ? [API_GET_ALL_USERS, shouldFetch] : null, ([_, params]) => userService.getAllUsers(params), {
        dedupingInterval: 2000,
        revalidateOnFocus: false,
        revalidateIfStale: false,
        revalidateOnReconnect: false,
        revalidateOnMount: true,
    })
    return {
        users: data,
        isLoading,
        isValidating,
        error,
        refreshUsers: mutate,
    };
}