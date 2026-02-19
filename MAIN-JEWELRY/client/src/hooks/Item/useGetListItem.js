
import { API_GET_ITEMS } from "@/api/api";
import { ItemService } from "@/service/items/ItemService";
import { UserAuthStore } from "@/store/userAuthStore";
import useSWR from "swr"
export const useGetListItems = () => {
    const { accessToken } = UserAuthStore();
    const { data, error, isLoading, isValidating, mutate } = useSWR(accessToken ? [API_GET_ITEMS] : null, () => ItemService.getItem(), {
        dedupingInterval: 2000,
        revalidateOnFocus: false,
        revalidateIfStale: false,
        revalidateOnReconnect: false,
        revalidateOnMount: true,
    })
    return {
        items: data,
        error,
        isLoading,
        isValidating,
        refreshItems: mutate
    }
}