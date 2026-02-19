import useSWR from "swr"
import { UserAuthStore } from "@/store/userAuthStore";
import { CartService } from "@/service/cart/CartService";
import { API_GET_CART } from "@/api/api";
export const useGetListCart = (dataFilter) => {
    const { accessToken } = UserAuthStore();
    const shouldFetch = accessToken && dataFilter;
    const { data, error, isLoading, isValidating, mutate } = useSWR(shouldFetch ? [API_GET_CART, dataFilter] : null, ([_, params]) => CartService.getCart(params), {
        dedupingInterval: 2000,
        revalidateOnFocus: false,
        revalidateIfStale: false,
        revalidateOnReconnect: false,
        revalidateOnMount: true,
    })
    return {
        carts: data,
        isLoading,
        isValidating,
        error,
        refreshCart: mutate,
    };
}

