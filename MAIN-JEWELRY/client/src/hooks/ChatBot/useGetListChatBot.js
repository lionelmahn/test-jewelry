import { API_GET_CHAT_BOX } from "@/api/api";
import { ChatBoxService } from "@/service/chatBox/ChatBoxService";
import { UserAuthStore } from "@/store/userAuthStore";
import useSWR from "swr"
export const useGetListChatBot = (dataFilter) => {
    const { accessToken } = UserAuthStore();
    const shouldFetch = accessToken && dataFilter;
    const { data, error, isLoading, isValidating, mutate } = useSWR(shouldFetch ? [API_GET_CHAT_BOX, dataFilter] : null, ([_, params]) => ChatBoxService.getAllMessage(params), {
        dedupingInterval: 2000,
        revalidateOnFocus: false,
        revalidateIfStale: false,
        revalidateOnReconnect: false,
        revalidateOnMount: true,
    })
    return {
        messagesInfo: data,
        isLoading,
        isValidating,
        error,
        refreshMessage: mutate,
    };
}