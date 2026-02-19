import { formatBigNumber } from "@/lib/format-big-number"
import { orderStore } from "@/store/orderStore/orderStore"
import React, { useEffect, useState } from "react"
import { MapPin, Phone, User, Package, Truck, CreditCard, ArrowRight } from "lucide-react"
import { useForm } from "react-hook-form"
import z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useGetListProvinces } from "@/hooks/provices/useGetListProvinces"
import { useGetListCommunes } from "@/hooks/communes/useGetListCommunes"
import { provincesService } from "@/service/Provinces/provincesService"
import { paymentStore } from "@/store/paymentStore/paymentStore"
import { CustomStore } from "@/store/customStore/CustomStore"
import { toast } from "sonner"
const ShippingSchema = z.object({
    name: z.string().min(1, "Vui lòng nhập họ và tên"),
    phone: z.string().min(10, "Số điện thoại không hợp lệ").max(15, "Số điện thoại không hợp lệ"),
    address: z.string().min(10, "Địa chỉ phải có ít nhất 10 ký tự"),
    city: z.string().min(1, "Vui lòng chọn tỉnh/thành phố"),
    ward: z.string().min(1, "Vui lòng chọn phường/xã"),
})
export const Checkout = () => {
    const [code, setCode] = useState("")
    const [communes, setCommunes] = useState([])
    const [cityName, setCityName] = useState("")
    const [wardName, setWardName] = useState("")
    const user = localStorage.getItem("user");
    const dataUser = user ? JSON.parse(user) : null
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
        resolver: zodResolver(ShippingSchema),
        defaultValues: {
            name: dataUser?.fullName || "",
        }
    })
    const { provinces, error, isLoading, isValidating, refreshProvinces } = useGetListProvinces()
    console.log(provinces, "provincesprovinces")
    const { previews, createOrder, useCoupon } = orderStore()
    console.log(previews, 'previewspreviewspreviews')
    const { previewCustom, updateCustom } = CustomStore()
    console.log(previewCustom, "previewCustompreviewCustom")
    const { createPayment, createPaymentCustom } = paymentStore()
    const [loading, setLoading] = useState(false)
    const [paymentMethod, setPaymentMethod] = useState("CASH")
    const [codeCou, setCodeCou] = useState("")
    const [dataCou, setDataCou] = useState(null)
    const handleCheckout = async (data) => {
        const { name, phone, address } = data
        console.log(name, phone, address, cityName, wardName, "checkoutdata")
        if (!cityName || !wardName) {
            alert("Vui lòng chọn tỉnh/thành phố và phường/xã")
            return
        }

        setLoading(true)
        try {
            const orderPayload = {
                items: previews.items,
                shippingAddress: {
                    name,
                    phone,
                    address,
                    city: cityName,
                    ward: wardName,
                },
                coupon: codeCou,
                subtotal: previewCustom.subtotal,
                tax: previewCustom.tax,
                total: previewCustom.total,
                paymentMethod,
                paymentStatus: "PENDING",
            }
            console.log(orderPayload, "orderPayloadorderPayloadorderPayload")
            const orderRes = await createOrder(orderPayload)
            console.log(orderRes, "orderRes")
            const orderId = orderRes?.data?.data?._id || orderRes?.data?._id || orderRes?._id
            if (!orderId) {
                throw new Error("Không lấy được orderId")
            }
            console.log(orderId, "orderIdorderId")
            if (paymentMethod === "TRANSFER") {
                const paymentRes = await createPayment(orderId)
                console.log(paymentRes, "paymentRes")
                const checkoutUrl =
                    paymentRes?.data?.data?.checkoutUrl ||
                    paymentRes?.data?.checkoutUrl ||
                    paymentRes?.checkoutUrl

                if (!checkoutUrl) {
                    throw new Error("Không lấy được checkoutUrl từ cổng thanh toán")
                }

                window.location.href = checkoutUrl
            } else {
                alert("Đơn hàng đã được tạo. Vui lòng kiểm tra email để xác nhận.")
            }
        } catch (error) {
            console.log("Lỗi thanh toán", error)
            alert(error?.response?.data?.message || error?.message || "Thanh toán thất bại")
        } finally {
            setLoading(false)
        }
    }
    const handleCoupon = async (totalPrice) => {
        console.log(codeCou, totalPrice, "mbkfbfbn")
        if (!codeCou) {
            toast.error("Bạn chưa nhập mã giảm")
            return
        }
        const res = await useCoupon(codeCou, totalPrice)
        if (res.status === 200) {
            console.log(res, "fbfbmfbgbmggitihjth")
            setDataCou(res?.data?.data)
            toast.success("Áp dụng thành công")
        }
    }
    const handleCheckoutCustom = async (data) => {
        const { name, phone, address } = data
        console.log(name, phone, address, cityName, wardName, "checkoutdata")
        if (!cityName || !wardName) {
            alert("Vui lòng chọn tỉnh/thành phố và phường/xã")
            return
        }

        setLoading(true)
        try {
            const customRes = await updateCustom(previewCustom.id, {
                name,
                phone,
                address,
                city: cityName,
                ward: wardName,
            }, paymentMethod,
                "PENDING", codeCou, 1)
            console.log(customRes, "customRes")
            const id = customRes.data.data._id
            if (!id) {
                throw new Error("Thiếu Id");
            }
            if (paymentMethod === "TRANSFER") {
                const paymentRes = await createPaymentCustom(id)
                console.log(paymentRes, "paymentRes")
                window.location.href = paymentRes?.data?.data?.checkoutUrl
            } else {
                alert("Đơn hàng đã được tạo. Vui lòng kiểm tra email để xác nhận.")
            }
        } catch (error) {
            console.log("Lỗi thanh toán", error)
        } finally {
            setLoading(false)
        }
    }
    const hanChange = (e) => {
        const k = e.target.value
        setCode(k)
        const selectedProvince = provinces?.data?.data?.provinces?.find(p => p.code === k)
        if (selectedProvince) {
            setCityName(selectedProvince.name)
        }
    }

    const handleWardChange = (e) => {
        const k = e.target.value
        const selectedCommune = communes?.find(c => c.code === k)
        if (selectedCommune) {
            setWardName(selectedCommune.name)
        }
    }
    useEffect(() => {
        const handle = async () => {
            const res = await provincesService.getCommunes(code)
            console.log(res, "ckdcdvdjfvn")
            setCommunes(res?.data?.data?.communes || [])
        }
        if (code) {
            handle()
        }
    }, [code])
    console.log(previews, "previewspreviewspreviews")
    return (
        <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 py-12">
            <div className="max-w-6xl mx-auto mb-12 px-4">
                <div className="flex items-center justify-center gap-4">
                    <div className="flex items-center gap-2 text-primary">
                        <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold">1</div>
                        <span className="font-semibold hidden sm:inline">Giỏ hàng</span>
                    </div>
                    <div className="w-16 h-1 bg-primary"></div>
                    <div className="flex items-center gap-2 text-primary">
                        <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold">2</div>
                        <span className="font-semibold hidden sm:inline">Thanh toán</span>
                    </div>
                    <div className="w-16 h-1 bg-gray-300"></div>
                    <div className="flex items-center gap-2 text-gray-400">
                        <div className="w-10 h-10 rounded-full bg-gray-300 text-white flex items-center justify-center font-bold">3</div>
                        <span className="font-semibold hidden sm:inline">Hoàn tất</span>
                    </div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 px-4">
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-200">
                        <div className="flex items-center gap-3 mb-6">
                            <MapPin className="w-6 h-6 text-primary" />
                            <h2 className="text-2xl font-bold text-gray-800">
                                Thông tin giao hàng
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            < div className="space-y-4">
                                <label className="flex text-sm font-semibold text-gray-700 mb-2 items-center gap-2">
                                    <User className="w-4 h-4" />
                                    Họ và tên
                                </label>
                                <input
                                    name="name"
                                    placeholder="Nhập họ và tên đầy đủ"
                                    className="w-full px-4 py-3 rounded-lg border-2 border-slate-200 focus:border-primary focus:outline-none transition bg-slate-50 hover:bg-white"
                                    {...register("name")}
                                />
                                {errors.name && (
                                    <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                                )}
                            </div>


                            <div>
                                <label className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                                    <Phone className="w-4 h-4" />
                                    Số điện thoại
                                </label>
                                <input
                                    name="phone"
                                    placeholder="Nhập số điện thoại"
                                    className="w-full px-4 py-3 rounded-lg border-2 border-slate-200 focus:border-primary focus:outline-none transition bg-slate-50 hover:bg-white"
                                    {...register("phone")}
                                />
                                {errors.phone && (
                                    <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
                                )}
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Địa chỉ chi tiết
                                </label>
                                <input
                                    name="address"
                                    placeholder="Số nhà, tên đường..."
                                    className="w-full px-4 py-3 rounded-lg border-2 border-slate-200 focus:border-primary focus:outline-none transition bg-slate-50 hover:bg-white"
                                    {...register("address")}
                                />
                                {errors.address && (
                                    <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Tỉnh / Thành phố
                                </label>
                                <select
                                    disabled={isLoading}
                                    className="w-full px-4 py-3 rounded-lg border-2 border-slate-200 focus:border-primary focus:outline-none transition bg-slate-50 hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed"
                                    {...register("city")}
                                    onChange={hanChange}
                                >
                                    <option value="">
                                        {isLoading ? "Đang tải..." : "Chọn tỉnh / thành phố"}
                                    </option>
                                    {provinces?.data?.data?.provinces?.map((province) => (
                                        <option key={province.code} value={province.code}>
                                            {province.name}
                                        </option>
                                    ))}
                                </select>
                                {errors.city && (
                                    <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Phường / Xã
                                </label>
                                <select
                                    disabled={isLoading}
                                    className="w-full px-4 py-3 rounded-lg border-2 border-slate-200 focus:border-primary focus:outline-none transition bg-slate-50 hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed"
                                    {...register("ward")}
                                    onChange={handleWardChange}
                                >
                                    <option value="">
                                        {isLoading ? "Đang tải..." : "Chọn phường / xã"}
                                    </option>
                                    {communes?.map((commune) => (
                                        <option key={commune.code} value={commune.code}>
                                            {commune.name}
                                        </option>
                                    ))}
                                </select>
                                {errors.ward && (
                                    <p className="text-red-500 text-sm mt-1">{errors.ward.message}</p>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-200">
                        <div className="flex items-center gap-3 mb-6">
                            <CreditCard className="w-6 h-6 text-primary" />
                            <h2 className="text-2xl font-bold text-gray-800">
                                Phương thức thanh toán
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {[
                                { value: "CASH", label: "Thanh toán khi nhận hàng" },
                                { value: "TRANSFER", label: "Chuyển khoản ngân hàng" },
                            ].map((method) => (
                                <label key={method.value} className={`p-4 rounded-lg border-2 cursor-pointer transition ${paymentMethod === method.value
                                    ? "border-primary bg-blue-50"
                                    : "border-slate-200 bg-slate-50 hover:border-slate-300"
                                    }`}>
                                    <div className="flex items-start gap-3">
                                        <input
                                            type="radio"
                                            name="payment"
                                            value={method.value}
                                            checked={paymentMethod === method.value}
                                            onChange={(e) => setPaymentMethod(e.target.value)}
                                            className="w-5 h-5 mt-0.5 cursor-pointer accent-primary"
                                        />
                                        <div>
                                            <p className="font-semibold text-gray-800">{method.label}</p>
                                        </div>
                                    </div>

                                </label>
                            ))}
                        </div>
                    </div>
                </div>
                <div>
                    {Object.keys(previewCustom).length !== 0 ? <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-200 sticky top-8">
                        <div className="flex items-center gap-3 mb-6">
                            <Package className="w-6 h-6 text-primary" />
                            <h2 className="text-2xl font-bold text-gray-800">
                                Đơn hàng
                            </h2>
                        </div>
                        <div className='space-y-6'>
                            <div className='flex items-center justify-between'>
                                <p>Loại trang sức</p>
                                <p className='font-bold'>{previewCustom?.jewelryType}</p>
                            </div>
                            <div className='flex items-center justify-between' >
                                <p>Vật liệu</p>
                                <p className='font-bold'>{previewCustom?.material?.name} ({previewCustom?.gram} gram)</p>
                            </div>
                            <div className='flex items-center justify-between' >
                                <p>Purity</p>
                                <p className='font-bold'>{previewCustom?.material?.purity}</p>
                            </div>
                            <div className='flex items-center justify-between'>
                                <p>Đá</p>
                                <p className='font-bold'>{previewCustom?.gem?.name} ({previewCustom?.carat} carat)</p>
                            </div>
                            <div className='flex items-center justify-between text-[20px] font-bold text-primary'>
                                <p>Total</p>
                                <p>{formatBigNumber(previewCustom?.subtotal, true)}</p>
                            </div>
                        </div>
                        <div className="space-y-3 mb-6">
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600">Tạm tính</span>
                                <span className="font-semibold text-gray-800">
                                    {formatBigNumber(previewCustom.subtotal, true)}
                                </span>
                            </div>

                            <div className="flex justify-between items-center">
                                <span className="text-gray-600">Thuế (5%)</span>
                                <span className="font-semibold text-gray-800">
                                    {formatBigNumber(previewCustom.tax, true)}
                                </span>
                            </div>

                            <div className="flex justify-between items-center">
                                <span className="text-gray-600">Vận chuyển</span>
                                <span className="font-semibold text-green-600">Miễn phí</span>
                            </div>
                        </div>
                        <div className="w-full">
                            <div>
                                <label className="text-sm font-medium text-gray-700 mb-1 block">
                                    Mã giảm giá
                                </label>

                                <div className="flex items-center  rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-primary transition border focus-within:border-none">
                                    <input
                                        onChange={(e) => setCodeCou(e.target.value)}
                                        type="text"
                                        placeholder="Nhập mã giảm giá..."
                                        className="flex-1 px-2 py-1 outline-none text-sm"
                                    />

                                    <button
                                        onClick={() => handleCoupon(previewCustom.total)}
                                        className="px-5 py-3 bg-primary text-white text-sm font-medium 
                     hover:opacity-70 active:scale-95 transition-all cursor-pointer"
                                    >
                                        Áp dụng
                                    </button>
                                </div>

                                <p className="text-xs text-gray-500 my-2">
                                    Ví dụ: SALE10,SALE20,SALE50
                                </p>
                            </div>
                        </div>
                        <div>
                            {dataCou && <div className="my-3 p-3 border rounded-lg bg-green-50 text-sm">
                                <p className="font-semibold text-green-700">Áp dụng mã thành công</p>

                                <div className="mt-2 space-y-1 text-gray-700">
                                    <p>Giá trị: {dataCou.discountValue}{dataCou.discountType === "percent" ? "%" : "đ"}</p>
                                    <p>Số tiền giảm: {formatBigNumber(Math.ceil(dataCou.discountAmount), true)}</p>
                                    <p className="font-medium text-black">
                                        Tổng sau giảm: {formatBigNumber(Math.ceil(dataCou.totalFinal), true)}
                                    </p>
                                </div>
                            </div>}
                        </div>
                        <div className="h-1 bg-linear-to-r from-transparent via-primary to-transparent mb-6"></div>
                        <div className="bg-secondary rounded-lg p-4 mb-6">
                            <div className="flex justify-between items-center">
                                <span className="text-xl font-bold text-white">Tổng cộng:</span>
                                <span className="text-2xl font-bold text-primary">
                                    {formatBigNumber(dataCou.totalFinal ? dataCou.totalFinal : previewCustom.total, true)}
                                </span>
                            </div>
                        </div>
                        <button
                            onClick={handleSubmit(handleCheckoutCustom)}
                            disabled={loading}
                            className="w-full bg-primary disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-4 px-6 rounded-lg transition transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    Đang xử lý...
                                </>
                            ) : (
                                <>
                                    Thanh toán ngay
                                    <ArrowRight className="w-5 h-5" />
                                </>
                            )}
                        </button>
                        <div className="mt-6 pt-6 border-t-2 border-slate-100 text-center text-xs text-gray-500">
                            <p className="flex items-center justify-center gap-2 mb-2">
                                <Truck className="w-4 h-4" />
                                100% an toàn & bảo mật
                            </p>
                            <p>Hỗ trợ 24/7 • Hàng chính hãng • Đảm bảo chất lượng</p>
                        </div>
                    </div> : <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-200 sticky top-8">
                        <div className="flex items-center gap-3 mb-6">
                            <Package className="w-6 h-6 text-primary" />
                            <h2 className="text-2xl font-bold text-gray-800">
                                Đơn hàng
                            </h2>
                        </div>
                        <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
                            {previews.items?.map((item) => (
                                <div key={item.sku} className="flex gap-3 pb-4 border-b-2 border-slate-100 last:border-0">
                                    <div className="flex-1">
                                        <p className="font-bold text-gray-800 text-sm">{item.name}</p>
                                        <p className="text-xs text-gray-500 mt-1">
                                            {item.type && `${item.type}: ${item.value}`}
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            SL: <span className="font-semibold">{item.quantity}</span>
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-xs text-gray-400 mt-1">
                                            {formatBigNumber(item.unitPrice, true)} × {item.quantity}
                                        </p>
                                        {item.discount > 0 && (
                                            <p className="text-xs text-red-500">
                                                −{item.discount}%
                                            </p>
                                        )}
                                        <p className="font-bold text-primary text-sm mt-1">
                                            {formatBigNumber(item.totalPrice, true)}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="h-1 bg-linear-to-r from-transparent via-primary to-transparent mb-6"></div>
                        <div className="space-y-3 mb-6">
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600">Tạm tính</span>
                                <span className="font-semibold text-gray-800">
                                    {formatBigNumber(previews.subtotal, true)}
                                </span>
                            </div>

                            <div className="flex justify-between items-center">
                                <span className="text-gray-600">Thuế (5%)</span>
                                <span className="font-semibold text-gray-800">
                                    {formatBigNumber(previews.tax, true)}
                                </span>
                            </div>

                            <div className="flex justify-between items-center">
                                <span className="text-gray-600">Vận chuyển</span>
                                <span className="font-semibold text-green-600">Miễn phí</span>
                            </div>
                        </div>
                        <div className="w-full">
                            <div>
                                <label className="text-sm font-medium text-gray-700 mb-1 block">
                                    Mã giảm giá
                                </label>

                                <div className="flex items-center  rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-primary transition border focus-within:border-none">
                                    <input
                                        type="text"
                                        onChange={(e) => setCodeCou(e.target.value)}
                                        placeholder="Nhập mã giảm giá..."
                                        className="flex-1 px-2 py-1 outline-none text-sm"
                                    />

                                    <button
                                        onClick={() => handleCoupon(previews.total)}
                                        className="px-5 py-3 bg-primary text-white text-sm font-medium 
                     hover:opacity-70 active:scale-95 transition-all cursor-pointer"
                                    >
                                        Áp dụng
                                    </button>
                                </div>

                                <p className="text-xs text-gray-500 my-2">
                                    Ví dụ: SALE10,SALE20,SALE50
                                </p>
                            </div>
                        </div>
                        <div>
                            {dataCou && <div className="my-3 p-3 border rounded-lg bg-green-50 text-sm">
                                <p className="font-semibold text-green-700">Áp dụng mã thành công</p>

                                <div className="mt-2 space-y-1 text-gray-700">
                                    <p>Giá trị: {dataCou.discountValue}{dataCou.discountType === "percent" ? "%" : "đ"}</p>
                                    <p>Số tiền giảm: {formatBigNumber(Math.ceil(dataCou.discountAmount), true)}</p>
                                    <p className="font-medium text-black">
                                        Tổng sau giảm: {formatBigNumber(Math.ceil(dataCou.totalFinal), true)}
                                    </p>
                                </div>
                            </div>}
                        </div>
                        <div className="h-1 bg-linear-to-r from-transparent via-primary to-transparent mb-6"></div>
                        <div className="bg-secondary rounded-lg p-4 mb-6">
                            <div className="flex justify-between items-center">
                                <span className="text-xl font-bold text-white">Tổng cộng:</span>
                                <span className="text-2xl font-bold text-primary">
                                    {formatBigNumber(Math.ceil(dataCou.totalFinal ? dataCou.totalFinal : previews.total), true)}
                                </span>
                            </div>
                        </div>
                        <button
                            onClick={handleSubmit(handleCheckout)}
                            disabled={loading}
                            className="w-full bg-primary disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-4 px-6 rounded-lg transition transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    Đang xử lý...
                                </>
                            ) : (
                                <>
                                    Thanh toán ngay
                                    <ArrowRight className="w-5 h-5" />
                                </>
                            )}
                        </button>
                        <div className="mt-6 pt-6 border-t-2 border-slate-100 text-center text-xs text-gray-500">
                            <p className="flex items-center justify-center gap-2 mb-2">
                                <Truck className="w-4 h-4" />
                                100% an toàn & bảo mật
                            </p>
                            <p>Hỗ trợ 24/7 • Hàng chính hãng • Đảm bảo chất lượng</p>
                        </div>
                    </div>}
                </div>
            </div>
        </div>
    )
}
