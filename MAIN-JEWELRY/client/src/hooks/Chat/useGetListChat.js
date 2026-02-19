import { API_CHAT } from "@/api/api";
import { ChatService } from "@/service/Chat/ChatService";
import { UserAuthStore } from "@/store/userAuthStore";
import useSWR from "swr"
export const useGetListChat = (dataFilter) => {
    const { accessToken } = UserAuthStore();
    const shouldFetch = accessToken && dataFilter;
    const { data, error, isLoading, isValidating, mutate } = useSWR(shouldFetch ? [API_CHAT, dataFilter] : null, ([_, params]) => ChatService.getAllMessage(params), {
        dedupingInterval: 2000,
        revalidateOnFocus: false,
        revalidateIfStale: false,
        revalidateOnReconnect: false,
        revalidateOnMount: true,
    })
    return {
        chats: data,
        isLoading,
        isValidating,
        error,
        refreshChat: mutate,
    };
}