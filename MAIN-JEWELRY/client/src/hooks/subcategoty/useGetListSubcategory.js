import { API_GET_SUBCATE } from "@/api/api";
import { CategoryService } from "@/service/category/CategoryService";
import { subcategoryService } from "@/service/subcategory/subcayegoryService";
import { UserAuthStore } from "@/store/userAuthStore";
import useSWR from "swr"

export const useGetListSubcategory = (dataFilter) => {
    const { accessToken } = UserAuthStore();
    const shouldFetch = accessToken && dataFilter;
    const { data, isLoading, isValidating, mutate } = useSWR(shouldFetch ? [API_GET_SUBCATE, shouldFetch] : null, ([_, params]) =>
        subcategoryService.getSubcategory(params)
        , {
            dedupingInterval: 2000,
            revalidateOnFocus: false,
            revalidateIfStale: false,
            revalidateOnReconnect: false,
            revalidateOnMount: true,
        })
    return {
        subcategory: data,
        isLoading,
        isValidating,
        refreshSubcategoty: mutate
    }

}