import { useGetListProduct } from '@/hooks/Product/useGetListProduct'
import { ProductStore } from '@/store/productStore/ProductStore'
import { UserAuthStore } from '@/store/userAuthStore'
import React, { useEffect, useRef, useState } from 'react'

export const SaleItem = () => {
    const { getOnTime } = ProductStore()
    const [dataOnTime, setDataOnTime] = useState({})
    const offsetRef = useRef(0);
    const [active, setActive] = useState(false)
    const [countTime, setCountTime] = useState({})
    const { accessToken } = UserAuthStore();
    useEffect(() => {
        const handleGetTime = async () => {
            console.log(accessToken, "accessTokenaccessToken")
            if (accessToken) {
                const dataTime = await getOnTime({ page: 1, limit: 10, isActive: true })
                console.log(dataTime, "dataTimedataTime")
                setDataOnTime(dataTime?.data?.data)
            }
        }
        handleGetTime()
    }, [accessToken])
    const firstProduct = dataOnTime?.products?.[0];
    useEffect(() => {
        if (!firstProduct?.promotion?.endAt || !dataOnTime?.serverTime) return;
        const end = new Date(firstProduct?.promotion?.endAt).getTime();
        const serverNow = new Date(dataOnTime.serverTime).getTime();
        const clientNow = Date.now();
        offsetRef.current = serverNow - clientNow;
        const interval = setInterval(() => {
            const now = Date.now() + offsetRef.current;
            const diffMs = end - now;
            if (diffMs <= 0) {
                setActive(true)
                clearInterval(interval);
                return;
            }
            const totalSeconds = Math.floor(diffMs / 1000);
            const days = Math.floor(totalSeconds / 86400);
            const hours = Math.floor((totalSeconds % 86400) / 3600);
            const minutes = Math.floor((totalSeconds % 3600) / 60);
            const seconds = totalSeconds % 60;
            setCountTime({ days, hours, minutes, seconds });
        }, 1000);
        return () => clearInterval(interval);
    }, [firstProduct?.promotion?.endAt, dataOnTime?.serverTime]);
    const isMainImg = firstProduct?.images?.find((img) => img.isMain)
    return (
        <div>{dataOnTime.hasActiveSale ? <div className='bg-secondary mx-7.5 py-12 px-8 rounded-2xl mt-16'>
            <div className='flex items-center gap-12'>
                <div>
                    <img src={isMainImg?.url} alt="" className='img w-64 h-64 rounded-full' />
                </div>
                <div className='space-y-4'>
                    <p className="text-[36px] font-bold text-white">Giảm giá {firstProduct?.promotion?.discount}% trong mùa này</p>
                    <p className='text-[18px] text-white font-light'>Ưu đãi có thời hạn cho bộ sưu tập cao cấp của chúng tôi. Đừng bỏ lỡ những ưu đãi độc quyền này.</p>
                    <div className='flex items-center text-white font-semibold text-[24px] gap-6'>
                        <div>
                            <p className='w-20 h-14 rounded-xl bg-primary flex items-center justify-center'>{countTime.days ? (countTime.days >= 10 ? countTime.days : `0${countTime.days}`) : "00"}</p>
                            <p className='text-[14px] font-medium text-primary text-center'>Ngày</p>
                        </div>
                        <div>
                            <p className='w-20 h-14 rounded-xl bg-primary flex items-center justify-center'>{countTime.hours ? (countTime.hours >= 10 ? countTime.hours : `0${countTime.hours}`) : "00"}</p>
                            <p className='text-[14px] font-medium text-primary text-center'>Giờ</p>
                        </div>
                        <div>
                            <p className='w-20 h-14 rounded-xl bg-primary flex items-center justify-center'>{countTime.minutes ? (countTime.minutes >= 10 ? countTime.minutes : `0${countTime.minutes}`) : "00"}</p>
                            <p className='text-[14px] font-medium text-primary text-center'>Phút</p>
                        </div>
                        <div>
                            <p className='w-20 h-14 rounded-xl bg-primary flex items-center justify-center'>{countTime.seconds ? (countTime.seconds >= 10 ? countTime.seconds : `0${countTime.seconds}`) : "00"}</p>
                            <p className='text-[14px] font-medium text-primary text-center'>Giây</p>
                        </div>
                    </div>
                    <div>
                        <button className='btn hover:bg-primary transition-all duration-500 cursor-pointer bg-white text-secondary'>
                            Mua hàng giảm giá
                        </button>
                    </div>
                </div>
            </div>
        </div> : ""}</div>
    )
}
