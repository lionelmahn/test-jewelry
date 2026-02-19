import { API_GET_PRODUCT } from "@/api/api"
import { ProductService } from "@/service/product/ProductService"
import { UserAuthStore } from "@/store/userAuthStore"
import useSWR from "swr"
export const useGetListProduct = (dataFilter) => {
    const { accessToken } = UserAuthStore()
    const shouldFetch = accessToken && dataFilter
    const { data, error, isLoading, isValidating, mutate } = useSWR(shouldFetch ? [API_GET_PRODUCT, shouldFetch] : null, ([_, params]) => ProductService.getAllProduct(params), {
        dedupingInterval: 2000,
        revalidateOnFocus: false,
        revalidateIfStale: false,
        revalidateOnReconnect: false,
        revalidateOnMount: true,
    })
    return {
        products: data,
        error,
        isLoading,
        isValidating,
        refreshProduct: mutate
    }
}