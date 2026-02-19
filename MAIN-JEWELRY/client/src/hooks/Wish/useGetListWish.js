import { API_GET_WISH } from "@/api/api";
import { wishService } from "@/service/wish/wishService";
import { UserAuthStore } from "@/store/userAuthStore";
import useSWR from "swr"
export const useGetListWish = (dataFilter) => {
    const { accessToken } = UserAuthStore();
    const shouldFetch = accessToken && dataFilter;
    const { data, error, isLoading, mutate } = useSWR(shouldFetch ? [API_GET_WISH, dataFilter] : null, ([_, params]) => wishService.getWish(params), {
        dedupingInterval: 2000,
        revalidateOnFocus: false,
        revalidateIfStale: false,
        revalidateOnReconnect: false,
        revalidateOnMount: true,
    })
    return {
        wishs: data,
        error,
        isLoading,
        refreshWish: mutate
    }
}