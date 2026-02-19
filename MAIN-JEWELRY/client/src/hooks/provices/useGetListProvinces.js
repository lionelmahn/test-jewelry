import { API_PROVINCES } from "@/api/api";
import { provincesService } from "@/service/Provinces/provincesService";
import useSWR from "swr"

export const useGetListProvinces = () => {
    const { data, error, isLoading, isValidating, mutate } = useSWR(
        API_PROVINCES,
        provincesService.getProvinces,
        {
            dedupingInterval: 2000,
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
        }
    );

    return {
        provinces: data,
        isLoading,
        isValidating,
        error,
        refreshProvinces: mutate,
    };
};