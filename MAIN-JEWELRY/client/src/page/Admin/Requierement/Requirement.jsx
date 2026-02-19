import { useGetCustom } from '@/hooks/Custom/useGetCustom'
import { formatBigNumber } from '@/lib/format-big-number'
import { CustomStore } from '@/store/customStore/CustomStore'
import dayjs from 'dayjs'
import { RefreshCw } from 'lucide-react'
import React from 'react'
import { toast } from 'sonner'

export const Requirement = () => {
    const { customs, isLoading, refreshCustom, error } = useGetCustom({
        page: 1,
        limit: 10
    })

    const { updateStatus } = CustomStore()

    const handleApprove = async (id) => {
        const res = await updateStatus(id, "APPROVED")
        if (res?.status === 200) {
            toast.success("Đã chấp nhận yêu cầu")
            await refreshCustom()
        }
    }

    const handleCancel = async (id) => {
        const res = await updateStatus(id, "CANCEL")
        if (res?.status === 200) {
            toast.success("Đã hủy yêu cầu")
            await refreshCustom()
        }
    }

    if (error) {
        return <div className="text-center text-red-500 py-10">Có lỗi xảy ra</div>
    }

    return (
        <div className="relative min-h-screen bg-gray-50 px-4 md:px-6 py-6 shadow-md">

            {isLoading && (
                <div className="absolute inset-0 bg-white/60 backdrop-blur-sm flex items-center justify-center z-20">
                    <div className="loader"></div>
                </div>
            )}

            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">
                    Quản lý yêu cầu thiết kế
                </h2>

                <button
                    onClick={refreshCustom}
                    className="flex items-center gap-2 bg-primary text-white px-4 py-2.5 rounded-xl hover:opacity-80 active:scale-95 transition cursor-pointer">
                    <RefreshCw size={18} />
                    <span>Refresh</span>
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {customs?.data?.data?.customs?.map((item) => {

                    const isPaid = item.paymentStatus === "PAID" || item.isPaid
                    const isApproved = item.status === "APPROVED"
                    const isCancelled = item.status === "CANCEL"
                    const isPending = item.status === "PENDING"

                    return (
                        <div
                            key={item._id}
                            className="bg-white rounded-2xl shadow-md p-4 hover:shadow-lg transition"
                        >

                            <div className="flex justify-between">
                                <div>
                                    <h3 className="font-semibold text-lg">
                                        {item.jewelryType}
                                    </h3>

                                    <p className="text-sm text-gray-500 mt-1">
                                        {item.material?.name} ({item.material?.purity})
                                    </p>

                                    <p className="text-sm text-gray-500">
                                        Đá: {item.gem?.name} - {item.carat} {item.gem?.unit}
                                    </p>
                                </div>

                                <span
                                    className={`px-3 py-1 text-xs font-semibold rounded-full
                                    ${isPaid
                                            ? " text-green-700"
                                            : isApproved
                                                ? " text-blue-700"
                                                : isCancelled
                                                    ? " text-red-700"
                                                    : " text-yellow-700"
                                        }`}
                                >
                                    {isPaid
                                        ? "ĐÃ THANH TOÁN"
                                        : isApproved
                                            ? "ĐANG CHỜ THANH TOÁN"
                                            : isCancelled
                                                ? "ĐÃ HỦY"
                                                : "ĐANG CHỜ DUYỆT"}
                                </span>
                            </div>
                            <div className="mt-4 text-sm text-gray-600 space-y-1">
                                <p>Size: {item.size}</p>
                                <p>Gram: {item.gram}</p>
                                <p>
                                    Tổng tiền:{" "}
                                    <span className="font-semibold text-primary">
                                        {formatBigNumber(item.total || item.subTotal, true)}
                                    </span>
                                </p>
                            </div>
                            {isPaid && (
                                <div className="mt-4 p-3 bg-green-50 rounded-xl text-sm space-y-1">
                                    <p className="font-semibold text-green-700">
                                        Khách hàng đã thanh toán
                                    </p>
                                    <p>Mã đơn: {item.orderCode}</p>
                                    <p>Phương thức: {item.paymentMethod}</p>
                                    <p>
                                        Thanh toán lúc:{" "}
                                        {dayjs(item.paidAt).format("YYYY-MM-DD HH:mm")}
                                    </p>
                                </div>
                            )}
                            {isPaid && item.shippingAddress && (
                                <div className="mt-3 p-3 bg-gray-50 rounded-xl text-sm space-y-1">
                                    <p className="font-semibold">
                                        Địa chỉ giao hàng
                                    </p>
                                    <p>{item.shippingAddress.name}</p>
                                    <p>{item.shippingAddress.phone}</p>
                                    <p>
                                        {item.shippingAddress.address},{" "}
                                        {item.shippingAddress.ward},{" "}
                                        {item.shippingAddress.city}
                                    </p>
                                    <p>{item.shippingAddress.country}</p>
                                </div>
                            )}
                            {isPending && (
                                <div className="mt-4 flex gap-3">
                                    <button
                                        onClick={() => handleApprove(item._id)}
                                        className="flex-1 bg-green-600 text-white py-2 rounded-lg
                                        hover:opacity-80 active:scale-95 transition cursor-pointer"
                                    >
                                        Chấp nhận
                                    </button>

                                    <button
                                        onClick={() => handleCancel(item._id)}
                                        className="flex-1 bg-red-600 text-white py-2 rounded-lg
                                        hover:opacity-80 active:scale-95 transition cursor-pointer"
                                    >
                                        Hủy
                                    </button>
                                </div>
                            )}
                            <div className="mt-4 text-xs text-gray-500 flex justify-between">
                                <span>
                                    Tạo: {dayjs(item.createdAt).format("YYYY-MM-DD HH:mm")}
                                </span>
                                <span>
                                    Sửa:{" "}
                                    {item.updatedAt
                                        ? dayjs(item.updatedAt).format("YYYY-MM-DD HH:mm")
                                        : "—"}
                                </span>
                            </div>
                        </div>
                    )
                })}
            </div>

            {customs?.data?.data?.customs?.length === 0 && (
                <div className="text-center text-gray-500 mt-10">
                    Không có yêu cầu nào
                </div>
            )}
        </div>
    )
}
