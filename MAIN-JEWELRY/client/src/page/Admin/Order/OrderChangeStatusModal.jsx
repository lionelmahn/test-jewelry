import { X } from "lucide-react"
export const ORDER_FLOW = {
    PENDING: ["CONFIRMED", "CANCELLED"],
    CONFIRMED: ["PACKAGING", "CANCELLED"],
    PACKAGING: ["SHIPPED", "CANCELLED"],
    SHIPPED: ["COMPLETED"],
    COMPLETED: [],
    CANCELLED: []
}

export const STATUS_LABEL = {
    PENDING: "Chờ xác nhận",
    CONFIRMED: "Đã xác nhận",
    PACKAGING: "Đang đóng gói",
    SHIPPED: "Đang vận chuyển",
    COMPLETED: "Hoàn tất",
    CANCELLED: "Đã hủy"
}
export const OrderChangeStatusModal = ({
    order,
    newStatus,
    setNewStatus,
    onConfirm,
    onClose,
    loading
}) => {

    const nextStatus = ORDER_FLOW[order.status] || []

    return (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-6 w-105 relative shadow-xl">

                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-500 hover:text-red-500 cursor-pointer"
                >
                    <X />
                </button>

                <h3 className="text-lg font-semibold mb-4">
                    Cập nhật trạng thái đơn #{order.orderCode}
                </h3>

                <div className="space-y-3">
                    <div className="text-sm">
                        Trạng thái hiện tại:
                        <span className="ml-2 font-semibold">
                            {STATUS_LABEL[order.status]}
                        </span>
                    </div>

                    <select
                        value={newStatus}
                        onChange={(e) => setNewStatus(e.target.value)}
                        className="w-full border rounded-xl p-3"
                    >
                        <option value="">-- Chọn trạng thái --</option>
                        {nextStatus.map(st => (
                            <option key={st} value={st}>
                                {STATUS_LABEL[st]}
                            </option>
                        ))}
                    </select>

                    <div className="flex justify-end gap-3 pt-4">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 rounded-lg bg-gray-200 cursor-pointer"
                        >
                            Hủy
                        </button>

                        <button
                            disabled={!newStatus || loading}
                            onClick={() => onConfirm(order._id, newStatus)}
                            className="px-4 py-2 rounded-lg bg-primary text-white disabled:opacity-50 cursor-pointer"
                        >
                            {loading ? "Đang cập nhật..." : "Xác nhận"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
