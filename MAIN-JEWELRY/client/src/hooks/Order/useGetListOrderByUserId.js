import { API_GET_ORDERS_BY_USER_ID } from "@/api/api";
import { orderService } from "@/service/order/orderService";
import { UserAuthStore } from "@/store/userAuthStore"
import useSWR from "swr"
export const useGetListOrderByUserId = (dataFilter) => {
    console.log(dataFilter, "dataFilterdataFilterdataFilter")
    const { accessToken } = UserAuthStore()
    console.log(accessToken, "accessTokenaccessTokenaccessToken")
    const shouldFetch = accessToken && dataFilter;
    console.log(shouldFetch, "shouldFetchshouldFetch")
    const { data, error, isLoading, mutate } = useSWR(shouldFetch ? [API_GET_ORDERS_BY_USER_ID, dataFilter] : null, ([_, params]) => orderService.getOrderByUserId(params), {
        dedupingInterval: 2000,
        revalidateOnFocus: false,
        revalidateIfStale: false,
        revalidateOnReconnect: false,
        revalidateOnMount: true,
    })
    return {
        orderUsers: data,
        error,
        isLoading,
        refreshOrderUsers: mutate
    }
}