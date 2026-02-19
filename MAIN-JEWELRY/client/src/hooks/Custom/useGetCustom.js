
import { API_GET_CUSTOM } from "@/api/api";
import { CustomService } from "@/service/custom/CustomService";
import { UserAuthStore } from "@/store/userAuthStore";
import useSWR from "swr"
export const useGetCustom = (dataFilter) => {
    const { accessToken } = UserAuthStore();
    const shouldFetch = accessToken && dataFilter;
    const { data, error, isLoading, mutate } = useSWR(shouldFetch ? [API_GET_CUSTOM, dataFilter] : null, ([_, params]) => CustomService.getCustom(params), {
        dedupingInterval: 2000,
        revalidateOnFocus: false,
        revalidateIfStale: false,
        revalidateOnReconnect: false,
        revalidateOnMount: true,
    })
    return {
        customs: data,
        error,
        isLoading,
        refreshCustom: mutate
    }
}