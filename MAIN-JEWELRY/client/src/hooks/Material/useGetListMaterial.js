
import { API_GET_MATERIAL } from "@/api/api";
import { MaterialService } from "@/service/material/MaterialService";
import { UserAuthStore } from "@/store/userAuthStore";
import useSWR from "swr"
export const useGetListMaterial = (dataFilter) => {
    const { accessToken } = UserAuthStore();
    const shouldFetch = accessToken && dataFilter;
    const { data, error, isLoading, isValidating, mutate } = useSWR(shouldFetch ? [API_GET_MATERIAL, dataFilter] : null, ([_, params]) => MaterialService.getMateral(params), {
        dedupingInterval: 2000,
        revalidateOnFocus: false,
        revalidateIfStale: false,
        revalidateOnReconnect: false,
        revalidateOnMount: true,
    })
    return {
        materials: data,
        error,
        isLoading,
        isValidating,
        refreshMaterial: mutate
    }
}