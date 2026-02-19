import { API_COMMUNES } from "@/api/api";
import { provincesService } from "@/service/Provinces/provincesService";
import useSWR from "swr"

export const useGetListCommunes = (data) => {
    const { data: communesData, error, isLoading, isValidating, mutate } = useSWR(
        data ? `${API_COMMUNES}/${data}/communes` : null,
        provincesService.getCommunes(data),
        {
            dedupingInterval: 2000,
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
        }
    );

    return {
        communes: communesData,
        isLoading,
        isValidating,
        error,
        refreshCommunes: mutate,
    };
};