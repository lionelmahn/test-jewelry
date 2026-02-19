import useSWR from "swr"
import { UserAuthStore } from "@/store/userAuthStore";
import { CategoryService } from "@/service/category/CategoryService";
import { API_GET_CATEGORY } from "@/api/api";
export const useGetListCategory = (dataFilter) => {
    const { accessToken } = UserAuthStore();
    const shouldFetch = accessToken && dataFilter;
    const { data, error, isLoading, isValidating, mutate } = useSWR(shouldFetch ? [API_GET_CATEGORY, dataFilter] : null, ([_, params]) => CategoryService.getCategory(params), {
        dedupingInterval: 2000,
        revalidateOnFocus: false,
        revalidateIfStale: false,
        revalidateOnReconnect: false,
        revalidateOnMount: true,
    })
    return {
        categories: data,
        isLoading,
        isValidating,
        error,
        refreshCategory: mutate,
    };
}

