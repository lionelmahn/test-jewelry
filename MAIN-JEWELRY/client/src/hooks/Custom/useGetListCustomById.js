
import { API_GET_CUSTOM_BY_ID } from "@/api/api";
import { CustomService } from "@/service/custom/CustomService";
import { UserAuthStore } from "@/store/userAuthStore";
import useSWR from "swr"
export const useGetListCustomById = (dataFilter) => {
    const { accessToken } = UserAuthStore();
    const shouldFetch = accessToken && dataFilter;
    const { data, error, isLoading, mutate } = useSWR(shouldFetch ? [API_GET_CUSTOM_BY_ID, dataFilter] : null, ([_, params]) => CustomService.getCustomById(params), {
        dedupingInterval: 2000,
        revalidateOnFocus: false,
        revalidateIfStale: false,
        revalidateOnReconnect: false,
        revalidateOnMount: true,
    })
    return {
        customIds: data,
        error,
        isLoading,
        refreshCustomId: mutate
    }
}