import { useGetListOrder } from '@/hooks/Order/uesGetListOrder'
import { formatBigNumber } from '@/lib/format-big-number'
import { PaginationCustom } from '@/lib/PaginationCustom'
import dayjs from 'dayjs'
import { ArrowUpAZ, CircleX, Clock, ClockCheck, Eye, Package, PackageCheck, RefreshCw, Star, Truck } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { OrderChangeStatusModal } from './OrderChangeStatusModal'
import { orderStore } from '@/store/orderStore/orderStore'

export const OrderListPage = () => {
    const dataProcess = {
        ALL: {
            sta: "Tất cả",
            icon: <ArrowUpAZ size={20} />
        },
        PENDING: {
            sta: "Chờ xác nhận",
            icon: <Clock size={20} />
        },
        CONFIRMED: {
            sta: "Đã xác nhận",
            icon: <ClockCheck size={20} />
        },
        PACKAGING: {
            sta: "Đang đóng gói",
            icon: <Package size={20} />
        },
        SHIPPED: {
            sta: "Đã vận chuyển",
            icon: <Truck size={20} />
        },
        COMPLETED: {
            sta: "Đã giao",
            icon: <PackageCheck size={20} />
        },
        CANCELLED: {
            sta: "Đã hủy",
            icon: <CircleX size={20} />
        }
    }
    const { updateOrderStatus } = orderStore()
    const [valuePage, setValuePage] = useState(1)
    const [status, setStatus] = useState("")
    const [selectedOrder, setSelectedOrder] = useState(null)
    const [changeStatus, setChangeStatus] = useState("")
    const [loadingUpdate, setLoadingUpdate] = useState(false)
    const { orders, isLoading, refreshOrders, error } = useGetListOrder({
        page: valuePage,
        limit: 6,
        status: status
    })
    useEffect(() => {
        refreshOrders()
    }, [valuePage, status])
    const handleChangeStatus = async (id, status) => {
        setLoadingUpdate(true)
        const res = await updateOrderStatus(id, status)
        if (res.status === 200) {
            setLoadingUpdate(false)
            setSelectedOrder(null)
            await refreshOrders()
        }
    }
    const statusColor = (status) => {
        switch (status) {
            case "PENDING":
                return "bg-yellow-100 text-yellow-700";
            case "PAID":
                return "bg-blue-100 text-blue-700";
            case "SHIPPING":
                return "bg-purple-100 text-purple-700";
            case "DELIVERED":
                return "bg-green-100 text-green-700";
            case "CANCELLED":
                return "bg-red-100 text-red-700";
            default:
                return "bg-gray-100 text-gray-700";
        }
    };
    console.log(orders, "ordersordersorders")
    console.log(selectedOrder, "selectedOrderselectedOrderselectedOrder")
    return (
        <div className="relative min-h-screen bg-gray-50 px-4 md:px-6 py-6 shadow-md">
            {isLoading && (
                <div className="absolute inset-0 bg-white/60 backdrop-blur-sm flex items-center justify-center z-20">
                    <div className="loader"></div>
                </div>
            )}
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Quản lý đơn hàng</h2>
                <button
                    onClick={refreshOrders}
                    className="flex items-center gap-2 bg-primary text-white px-4 py-2.5 rounded-xl hover:opacity-80 active:scale-95 transition cursor-pointer"
                >
                    <RefreshCw />
                    <span>Refresh</span>
                </button>
            </div>
            <div className='flex justify-end items-end'>
                <select name="" id="" onChange={(e) => setStatus(e.target.value)} className='border border-primary p-3 rounded-xl mb-6'>
                    <option value="">--- Chọn trạng thái ---</option>
                    <option value="ALL">All</option>
                    <option value="PENDING">Chờ xác nhận</option>
                    <option value="CONFIRMED">Đã xác nhận</option>
                    <option value="PACKAGING">Đang đóng gói</option>
                    <option value="SHIPPED">Đã vận chuyển</option>
                    <option value="COMPLETED">Đã giao</option>
                    <option value="CANCELLED">Đã hủy</option>
                </select>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-5">
                {orders?.data?.data?.data?.map((order) => (
                    <div key={order._id} className="bg-white rounded-2xl shadow-md p-5 hover:shadow-lg transition">
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="font-semibold text-lg">Đơn #{order.orderCode}</h3>
                                <p className="text-sm text-gray-500">
                                    {dayjs(order.createdAt).format("YYYY-MM-DD HH:mm")}
                                </p>
                            </div>
                            <div className={`px-3 py-1 rounded-full text-xs font-medium ${statusColor(order.status)} flex items-center gap-2`}>
                                <span>
                                    {dataProcess[order?.status].icon}
                                </span>
                                <span >
                                    {dataProcess[order?.status].sta}
                                </span>
                            </div>
                        </div>

                        <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                            <div>
                                <p className="font-medium">Khách hàng</p>
                                <p>{order.userId?.fullName}</p>
                                <p>{order.shippingAddress?.phone}</p>
                                <p className="text-gray-500">{order.shippingAddress?.address}, {order.shippingAddress?.ward}, {order.shippingAddress?.city}</p>
                            </div>

                            <div>
                                <p className="font-medium">Thanh toán</p>
                                <p>{order.paymentMethod === "TRANFER" ? "Chuyển Khoản" : "Tiền mặt"}</p>
                                <p>{order.paymentStatus === "PAID" ? "Đã than toán" : "Chưa thanh toán"}</p>
                                <p className="font-semibold text-primary">
                                    {formatBigNumber(Math.ceil(order.total), true)}
                                </p>
                            </div>
                        </div>

                        <div className="mt-4 border-t pt-4 space-y-3">
                            {order.items?.map((item) => (
                                <div key={item._id} className="flex gap-3 items-center">
                                    <img
                                        src={item.productId?.images?.[0]?.url}
                                        className="w-14 h-14 rounded-lg border object-cover"
                                    />
                                    <div className="flex-1">
                                        <p className="font-medium">{item.productId?.name}</p>
                                        <p className="text-xs text-gray-500">SKU: {item.sku} • SL: {item.quantity}</p>
                                    </div>
                                    <div className="text-sm font-semibold">
                                        {formatBigNumber(item.totalPrice, true)}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="flex justify-end gap-3 mt-5">
                            {order.status !== "COMPLETED" && order.status !== "CANCELLED" && (
                                <button
                                    onClick={() => {
                                        setSelectedOrder(order)
                                        setChangeStatus("")
                                    }}
                                    className="btn flex items-center gap-1 text-white text-[14px] cursor-pointer hover:opacity-65 transition-all duration-500"
                                >
                                    Cập nhật trạng thái
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
            <PaginationCustom
                total={orders?.data?.data?.totalItem}
                valuePage={valuePage}
                handleChangePage={(e, value) => setValuePage(value)}
                limit={6}
            />
            {selectedOrder && (
                <OrderChangeStatusModal
                    order={selectedOrder}
                    newStatus={changeStatus}
                    setNewStatus={setChangeStatus}
                    loading={loadingUpdate}
                    onClose={() => setSelectedOrder(null)}
                    onConfirm={handleChangeStatus}
                />
            )}
        </div>
    )
}
