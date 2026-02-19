import { API_GET_COUPON } from "@/api/api";
import { CouponService } from "@/service/coupon/CouponService";
import { UserAuthStore } from "@/store/userAuthStore";
import useSWR from "swr"
export const useGetListCoupon = (dataFilter) => {
    const { accessToken } = UserAuthStore();
    const shouldFetch = accessToken && dataFilter;
    const { data, error, isLoading, isValidating, mutate } = useSWR(shouldFetch ? [API_GET_COUPON, dataFilter] : null, ([_, params]) => CouponService.getCoupon(params), {
        dedupingInterval: 2000,
        revalidateOnFocus: false,
        revalidateIfStale: false,
        revalidateOnReconnect: false,
        revalidateOnMount: true,
    })
    return {
        coupons: data,
        isLoading,
        isValidating,
        error,
        refreshCoupon: mutate,
    };
}