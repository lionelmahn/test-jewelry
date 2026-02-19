import { API_GET_COMPARE } from "@/api/api";
import { compareService } from "@/service/compare/compareService";
import { UserAuthStore } from "@/store/userAuthStore";
import useSWR from "swr"
export const useGetListCompare = () => {
    const { accessToken } = UserAuthStore();
    const { data, error, isLoading, mutate } = useSWR(accessToken ? [API_GET_COMPARE] : null, () => compareService.getCompare(), {
        dedupingInterval: 2000,
        revalidateOnFocus: false,
        revalidateIfStale: false,
        revalidateOnReconnect: false,
        revalidateOnMount: true,
    })
    return {
        compares: data,
        error,
        isLoading,
        refreshCompare: mutate
    }
}