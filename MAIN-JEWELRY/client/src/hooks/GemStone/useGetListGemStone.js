
import { API_GET_GEMSTONE } from "@/api/api";
import { GemStoneService } from "@/service/gemStone/GemStoneService";
import { UserAuthStore } from "@/store/userAuthStore";
import useSWR from "swr"
export const useGetListGemStone = (dataFilter) => {
    const { accessToken } = UserAuthStore();
    const shouldFetch = accessToken && dataFilter;
    const { data, error, isLoading, isValidating, mutate } = useSWR(shouldFetch ? [API_GET_GEMSTONE, dataFilter] : null, ([_, params]) => GemStoneService.getGemStone(params), {
        dedupingInterval: 2000,
        revalidateOnFocus: false,
        revalidateIfStale: false,
        revalidateOnReconnect: false,
        revalidateOnMount: true,
    })
    return {
        gemStones: data,
        error,
        isLoading,
        isValidating,
        refreshGemStones: mutate
    }
}