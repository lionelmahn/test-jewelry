
import { API_ORDER } from "@/api/api"
import { orderService } from "@/service/order/orderService"
import { UserAuthStore } from "@/store/userAuthStore"
import useSWR from "swr"
export const useGetListOrder = (dataFilter) => {
    console.log(dataFilter, "dataFilterdataFilterdataFilter")
    const { accessToken } = UserAuthStore()
    console.log(accessToken, "accessTokenaccessTokenaccessToken")
    const shouldFetch = accessToken && dataFilter;
    const { data, error, isLoading, mutate } = useSWR(shouldFetch ? [API_ORDER, dataFilter] : null, ([_, params]) => orderService.getAllOrder(params), {
        dedupingInterval: 2000,
        revalidateOnFocus: false,
        revalidateIfStale: false,
        revalidateOnReconnect: false,
        revalidateOnMount: true,
    })
    return {
        orders: data,
        error,
        isLoading,
        refreshOrders: mutate
    }
}