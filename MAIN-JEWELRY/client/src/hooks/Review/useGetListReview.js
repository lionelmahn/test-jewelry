import { API_GET_ALL_VIEW } from "@/api/api";
import { reviewService } from "@/service/review/reviewService";
import { UserAuthStore } from "@/store/userAuthStore"
import useSWR from "swr"
export const useGetListReview = (dataFilter) => {
    const { accessToken } = UserAuthStore()
    const shouldFetch = accessToken && dataFilter;
    const { data, isLoading, mutate, error } = useSWR(shouldFetch ? [API_GET_ALL_VIEW, dataFilter] : null, ([_, params]) => reviewService.getAllReview(params), {
        dedupingInterval: 2000,
        revalidateOnFocus: false,
        revalidateIfStale: false,
        revalidateOnReconnect: false,
        revalidateOnMount: true,
    })
    return {
        allReviews: data,
        error,
        isLoading,
        refreshAllReviews: mutate
    }
}