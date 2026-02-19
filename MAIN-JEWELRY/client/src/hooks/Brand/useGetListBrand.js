import { API_GET_BRAND } from "@/api/api";
import { BrandService } from "@/service/brand/BrandService";
import { UserAuthStore } from "@/store/userAuthStore";
import useSWR from "swr"

export const useGetListBrand = (dataFilter) => {
    const { accessToken } = UserAuthStore();
    const shouldFetch = accessToken && dataFilter;
    const { data, error, isLoading, isValidating, mutate } = useSWR(shouldFetch ? [`${API_GET_BRAND}?page=${shouldFetch.page}&limit=${shouldFetch.limit}`, shouldFetch] : null, ([_, params]) => BrandService.getBrand(params), {
        dedupingInterval: 2000,
        revalidateOnFocus: false,
        revalidateIfStale: false,
        revalidateOnReconnect: false,
        revalidateOnMount: true,
    })
    return {
        brands: data,
        isLoading,
        isValidating,
        error,
        refreshBrand: mutate,
    };
}