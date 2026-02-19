import { useGetListCoupon } from '@/hooks/Coupon/useGetListCoupon';
import { CouponStore } from '@/store/couponStore/CouponStore';
import { zodResolver } from '@hookform/resolvers/zod';
import dayjs from 'dayjs';
import { CirclePlus, Download, RefreshCw, SquarePen, Trash, X } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { Controller, useForm, useWatch } from 'react-hook-form';
import { useSearchParams } from 'react-router';
import z from 'zod';
import { BoxProduct } from '../BoxProduct/BoxProduct';
import { formatBigNumber } from '@/lib/format-big-number';
import { CurrencyInput } from '@/lib/CurrencyInput';
const CouponSchema = z.object({
    code: z.string().min(1),
    discountType: z.enum(["percent", "fixed"]),
    discountValue: z.coerce.number().positive(),
    minOrderValue: z.coerce.number().min(0, "Thiếu giá"),
    startDate: z.coerce.date().optional(),
    endDate: z.coerce.date().optional(),
    isActive: z.boolean()
}).superRefine((data, ctx) => {
    if (data.discountType === "percent" && data.discountValue > 100) {
        ctx.addIssue({
            path: ["discountValue"],
            message: "Giảm phần trăm không được vượt quá 100",
        });
    }
    if (data.isActive) {
        if (!data.startDate || !data.endDate) {
            ctx.addIssue({
                path: ["startDate"],
                message: "Phải chọn thời gian khi kích hoạt mã giảm giá",
            });
        }
        if (
            data.startDate &&
            data.endDate &&
            data.endDate <= data.startDate
        ) {
            ctx.addIssue({
                path: ["endDate"],
                message: "Ngày kết thúc phải sau ngày bắt đầu",
            });
        }
    }
});
export const Coupon = () => {
    const { createCoupon, deleteCoupon, updateCoupon } = CouponStore()
    const [couponId, setCouponId] = useState("")
    const [removeCoupon, setRemoveCoupon] = useState({})
    const [modelDelete, setModelDelete] = useState(false)
    const [searchParams, setSearchParams] = useSearchParams();
    const { register, handleSubmit, reset, formState: { errors, isSubmitting }, control } = useForm({
        resolver: zodResolver(CouponSchema),
        defaultValues: {
            isActive: false,
        },
    })
    const active = useWatch({
        control,
        name: "isActive"
    })
    console.log(active, "activeactiveactiveactiveactive")
    const [model, setModel] = useState(false);
    const dataFilter = {
        page: 1,
        limit: 10,
        // search: "",
    }
    const { coupons, isLoading, isValidating, refreshCoupon } = useGetListCoupon(dataFilter)
    console.log(coupons, "couponscouponscouponscouponscoupons")
    const onSubmit = async (data) => {
        if (couponId !== "") {
            const updateData = await updateCoupon(couponId, data);
            console.log(updateData)
            setModel(false);
            await refreshCoupon();
            reset()
        } else {
            const dataBrand = await createCoupon(data)
            console.log(dataBrand)
            setModel(false);
            await refreshCoupon();
            reset()
        }
    }
    const handleEditCoupon = (item) => {
        setModel(true)
        reset({
            code: item.code,
            discountType: item.discountType,
            discountValue: item.discountValue,
            minOrderValue: item.minOrderValue,
            isActive: item.isActive,
            startDate: item.startDate ? dayjs(item.startDate).format("YYYY-MM-DD") : undefined,
            endDate: item.endDate ? dayjs(item.endDate).format("YYYY-MM-DD") : undefined,
        });
        setCouponId(item._id)
    }
    const showDeleteCoupon = (item) => {
        console.log(item)
        setRemoveCoupon(item)
        setModelDelete(true);
    }
    const handleDeleteCoupon = async (id) => {
        const deleteData = await deleteCoupon(id)
        console.log(deleteData)
        setModelDelete(false);
        await refreshCoupon();
    }
    const handleRefresh = async () => {
        await refreshCoupon();
    }
    useEffect(() => {
        const params = new URLSearchParams({
            page: dataFilter.page.toString(),
            limit: dataFilter.limit.toString(),
            search: dataFilter.search || ""
        });
        setSearchParams(params);
    }, [dataFilter.page, dataFilter.limit, dataFilter.search]);
    return (
        <div className="relative min-h-screen bg-gray-50 px-4 md:px-6 py-6 shadow-md">
            {(isLoading || isValidating) && (
                <div className="absolute inset-0 bg-white/60 backdrop-blur-sm flex items-center justify-center z-20">
                    <div className="loader"></div>
                </div>
            )}
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Quản lý mã giảm giá</h2>
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => {
                            setModel(true);
                            reset({ name: "", });
                            setCouponId("");
                        }}
                        className="flex items-center gap-2 bg-primary text-white px-4 py-2.5 rounded-xl
                        hover:opacity-80 active:scale-95 transition cursor-pointer">
                        <CirclePlus />
                        <span>Thêm mã giảm giá</span>
                    </button>
                    <button
                        onClick={handleRefresh}
                        className="flex items-center gap-2 bg-primary text-white px-4 py-2.5 rounded-xl hover:opacity-80 active:scale-95 transition cursor-pointer">
                        <RefreshCw />
                        <span>Refresh</span>
                    </button>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {coupons?.data?.data?.coupon?.map((item) => (
                    <div
                        key={item._id}
                        className="bg-white rounded-2xl shadow-md p-4 hover:shadow-lg transition">
                        <div className="flex justify-between">
                            <div key={item._id} className="">
                                <h3 className="font-semibold">Mã giảm giá: {item.code}</h3>
                                <p>
                                    {item.discountType === "percent"
                                        ? `Giảm ${item.discountValue}%`
                                        : `Giảm ${formatBigNumber(item.discountValue, true)}`}
                                </p>
                                <p className='text-primary font-bold'>Đơn tối thiểu: {formatBigNumber(item.minOrderValue, true)}</p>
                                <p>Giảm từ ngày: {item.startDate ? dayjs(item.startDate).format("YYYY-MM-DD HH:mm") : ""} đến {item.endDate ? dayjs(item.endDate).format("YYYY-MM-DD HH:mm") : ""}</p>
                                <p className={item.isActive ? "text-green-600" : "text-red-500"}>
                                    {item.isActive ? "Đang hoạt động" : "Tắt"}
                                </p>
                            </div>
                            <div className="flex gap-3">
                                <SquarePen
                                    onClick={() => handleEditCoupon(item)}
                                    className="size-5 text-blue-500 hover:text-blue-700 hover:scale-110 transition cursor-pointer"
                                />
                                <Trash
                                    onClick={() => showDeleteCoupon(item)}
                                    className="size-5 text-red-500 hover:text-red-700 hover:scale-110 transition cursor-pointer"
                                />
                            </div>
                        </div>
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
                ))}
            </div>
            <div
                className={`absolute top-1/2 left-1/2 w-105 -translate-x-1/2 -translate-y-1/2 
                bg-white rounded-2xl shadow-2xl p-6 z-50 transition-all duration-300
                ${model
                        ? "scale-100 opacity-100"
                        : "scale-95 opacity-0 pointer-events-none"
                    }`}>
                <button
                    onClick={() => setModel(false)}
                    className="absolute top-3 right-3 text-gray-500 hover:text-red-500 transition cursor-pointer"
                >
                    <X />
                </button>
                <h3 className="text-lg font-semibold mb-4">
                    {couponId ? "Cập nhật mã giảm giá" : "Thêm mã giảm giá"}
                </h3>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label className="text-sm font-medium">Mã giảm giá</label>
                        <input
                            {...register("code")}
                            placeholder="VD: SALE10"
                            className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary outline-none"
                        />
                        {errors.code && <p className="text-red-500 text-sm">{errors.code.message}</p>}
                    </div>
                    <div>
                        <label className="text-sm font-medium">Loại giảm giá</label>
                        <select {...register("discountType")} className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary outline-none">
                            <option value="percent">Phần trăm (%)</option>
                            <option value="fixed">Giá cố định</option>
                        </select>
                    </div>
                    <div>
                        <label className="text-sm font-medium">Giá trị giảm</label>
                        <input
                            type="number"
                            {...register("discountValue")}
                            className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary outline-none"
                        />
                        {errors.discountValue && (
                            <p className="text-red-500 text-sm">{errors.discountValue.message}</p>
                        )}
                    </div>
                    <div>
                        <label className="text-sm font-medium">Đơn hàng tối thiểu</label>
                        <Controller
                            name="minOrderValue"
                            {...register("minOrderValue")}
                            control={control}
                            render={({ field }) => (
                                <CurrencyInput
                                    value={field.value}
                                    onChange={field.onChange}
                                    placeholder="Nhập giá đơn hàng tối thiếu"
                                />
                            )}
                        />
                        {/* <input
                            type="number"
                            {...register("minOrderValue")}
                            className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary outline-none"
                        /> */}
                        {errors.minOrderValue && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.minOrderValue.message}
                            </p>
                        )}
                    </div>
                    <label className="flex items-center gap-2">
                        <input type="checkbox" {...register("isActive")} />
                        Kích hoạt
                    </label>
                    {active ? <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-sm text-gray-600">Ngày bắt đầu</label>
                            <input
                                type="date"
                                {...register("startDate")}
                                className="w-full border rounded-lg px-3 py-2"
                            />
                        </div>
                        <div>
                            <label className="text-sm text-gray-600">Ngày kết thúc</label>
                            <input
                                type="date"
                                {...register("endDate")}
                                className="w-full border rounded-lg px-3 py-2"
                            />
                            {errors?.endDate && (
                                <p className="text-sm text-red-500 mt-1">
                                    {errors.endDate.message}
                                </p>
                            )}
                        </div>
                    </div> : ""}
                    <div className="flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={() => setModel(false)}
                            className="px-4 py-2 bg-gray-200 rounded-lg hover:opacity-80 transition cursor-pointer"
                        >
                            Hủy
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="px-4 py-2 bg-primary text-white rounded-lg
                            hover:opacity-80 active:scale-95 transition flex items-center justify-center cursor-pointer">
                            {isSubmitting ? (
                                <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                            ) : (
                                <Download />
                            )}
                        </button>
                    </div>
                </form>
            </div>
            {modelDelete && (
                <BoxProduct
                    remove={removeCoupon}
                    setModelDelete={setModelDelete}
                    handleDelete={handleDeleteCoupon}
                />
            )}
        </div>
    );
}
