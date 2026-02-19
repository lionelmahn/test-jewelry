import { useGetListOrderByUserId } from '@/hooks/Order/useGetListOrderByUserId'
import { formatBigNumber } from '@/lib/format-big-number'
import dayjs from 'dayjs'
import { CircleDollarSign, Clock, Handbag } from 'lucide-react'
import React from 'react'

export const PaymentList = () => {
    const { orderUsers, error, isLoading, refreshOrderUsers } = useGetListOrderByUserId({
        page: 1,
        limit: 10
    })
    console.log(orderUsers, "orderUsersorderUsersorderUsersorderUsersorderUsers")
    return (
        <div className="space-y-4 px-16 relative min-h-screen">
            {(isLoading) && (
                <div className="absolute inset-0 bg-white/60 backdrop-blur-sm flex items-center justify-center z-20">
                    <div className="loader"></div>
                </div>
            )}
            <h2 className='mt-12 font-bold text-[28px] text-primary'>My Order</h2>
            {orderUsers?.data?.data?.data?.map((order) => (
                <div
                    key={order._id}
                    className="rounded-lg p-4 shadow-xl bg-white py-4"
                >
                    <div className="flex justify-between items-center mb-2">
                        <div className='flex items-center gap-3'>
                            <p className="font-medium text-secondary">
                                {order.orderCode}
                            </p>
                            <p className="text-sm text-gray-500">
                                {dayjs(order.createdAt).format("YYYY-MM-DD")}
                            </p>
                        </div>

                        <div className='space-x-2'>
                            <span
                                className="px-3 py-1 text-sm rounded-full bg-secondary text-white"
                            >
                                {order.paymentStatus === "PAID" ? "Đã thanh toán" : "Thanh toán khi nhận hàng"}
                            </span>
                            <span
                                className="px-3 py-1 text-sm rounded-full bg-primary text-white"
                            >
                                {order.status === "PENDING" ? "Chờ xác nhận" : "Thanh toán khi nhận hàng"}
                            </span>
                        </div>
                    </div>
                    <div className="space-y-2">
                        {order.items.map((item, idx) => {
                            const img = item.productId.images.find((i) => i.isMain)
                            return (
                                <div key={idx} className="flex justify-between text-sm">
                                    <div className='flex items-center gap-3'>
                                        <div className='w-12.5 h-12.5 rounded-xl overflow-hidden'>
                                            <img src={img.url} alt="" className='w-full h-full object-cover' />
                                        </div>
                                        <span className='font-bold text-primary'>{item.productId?.name}</span>
                                        <span>x{item.quantity}</span>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <div className="mt-3 flex justify-between items-center">
                        <div className="text-sm text-secondary">
                            Thanh toán: {order.paymentMethod === "TRANSFER" ? "Chuyển khoản" : "Tiền mặt"}
                        </div>
                        <div className="font-semibold text-xl text-primary">
                            {formatBigNumber(order.total, true)}
                        </div>
                    </div>
                    <div className='mt-4 flex justify-end'>
                        <button className='btn rounded-sm px-2 py-1 text-[14px] bg-transparent border border-primary text-primary cursor-pointer'>
                            Xem chi tiết
                        </button>
                    </div>
                </div>
            ))}
            <div className='grid grid-cols-3 gap-6 my-12'>
                <div className='bg-white shadow-2xl rounded-xl flex items-center justify-center flex-col p-6 space-y-2'>
                    <div className='size-10 bg-primary flex items-center justify-center text-white rounded-full'>
                        <Handbag size={20} />
                    </div>
                    <p className='text-[24px] font-bold text-primary'>{orderUsers?.data?.data?.total}</p>
                    <p className='font-medium text-[14px] text-[#4B5563]'>Tổng đơn hàng</p>
                </div>
                <div className='bg-white shadow-2xl rounded-xl flex items-center justify-center flex-col p-6 space-y-2'>
                    <div className='size-10 bg-secondary flex items-center justify-center text-white rounded-full'>
                        <CircleDollarSign size={20} />
                    </div>
                    <p className='text-[24px] font-bold text-primary'>{formatBigNumber(orderUsers?.data?.data?.totalPrice, true)}</p>
                    <p className='font-medium text-[14px] text-[#4B5563]'>Tổng tiền</p>
                </div>
                <div className='bg-white shadow-2xl rounded-xl flex items-center justify-center flex-col p-6 space-y-2'>
                    <div className='size-10 bg-primary flex items-center justify-center text-white rounded-full'><Clock size={20} /></div>
                    <p className='text-[24px] font-bold text-primary'>{orderUsers?.data?.data?.timeProcess}</p>
                    <p className='font-medium text-[14px] text-[#4B5563]'>Chờ xác nhận</p>
                </div>
            </div>
        </div>
    )
}
