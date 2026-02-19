import { API_GET_REVIEW } from "@/api/api";
import { reviewService } from "@/service/review/reviewService";
import { UserAuthStore } from "@/store/userAuthStore"
import useSWR from "swr"
export const useGetListPreviewByProductId = (dataFilter) => {
    const { accessToken } = UserAuthStore()
    const shouldFetch = accessToken && dataFilter;
    const { data, isLoading, mutate, error } = useSWR(shouldFetch ? [API_GET_REVIEW, dataFilter] : null, ([_, params]) => reviewService.getReviewByProductId(params), {
        dedupingInterval: 2000,
        revalidateOnFocus: false,
        revalidateIfStale: false,
        revalidateOnReconnect: false,
        revalidateOnMount: true,
    })
    return {
        reviews: data,
        error,
        isLoading,
        refreshReviews: mutate
    }
}