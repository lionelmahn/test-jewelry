
import { useGetListMaterial } from '@/hooks/Material/useGetListMaterial';
import { CurrencyInput } from '@/lib/CurrencyInput';
import { formatBigNumber } from '@/lib/format-big-number';
import { materialStone } from '@/store/materialStone/materialStone';
import { zodResolver } from '@hookform/resolvers/zod';
import dayjs from 'dayjs';
import { CirclePlus, Download, RefreshCw, SquarePen, Trash, X } from 'lucide-react';
import React, { useState } from 'react'
import { Controller, useForm, useWatch } from 'react-hook-form';
import z from 'zod';
const MaterialShema = z.object({
    name: z.string().min(1, "Thiếu tên vật liệu"),
    purity: z.string(),
    pricePerUnit: z.coerce.number().min(1, "Chưa nhập giá tiền"),
    active: z.enum(["true", "false"]).transform(v => v === "true")
})
export const Material = () => {
    const { materials, isLoading, isValidating, refreshMaterial } = useGetListMaterial({
        page: 1,
        limit: 10,
        search: ""
    })
    const [modelDelete, setModelDelete] = useState(false)
    const [model, setModel] = useState(false);
    const [materialId, setMaterialId] = useState("")
    const [removeMaterial, setRemoveMaterial] = useState({})
    const { createMaterial, updateMaterial, deleteMaterial } = materialStone()
    const { register, handleSubmit, reset, formState: { errors, isSubmitting }, control } = useForm({
        resolver: zodResolver(MaterialShema),
        defaultValues: {
            pricePerUnit: ""
        }
    })
    console.log(materials, "materialsmaterials")
    const handleRefresh = async () => {
        await refreshMaterial()
    }
    const onSubmit = async (data) => {
        console.log(data, "fmkbfb")
        if (materialId !== "") {
            const upData = await updateMaterial(materialId, data)
            console.log(upData)
        } else {
            const dataCreate = await createMaterial(data)
            console.log(dataCreate)
        }
        setModel(false);
        await refreshMaterial();
        reset()
    }
    const handleEditMaterial = (item) => {
        console.log(item, "itemitemitem")
        setModel(true)
        reset({
            name: item.name,
            purity: item.purity,
            pricePerUnit: String(item.pricePerUnit),
            active: item.active ? "true" : "false"
        })
        setMaterialId(item._id)
    }
    const showDeleteMaterial = (item) => {
        setRemoveMaterial(item)
        setModelDelete(true)
    }
    const handleDeleteMaterial = async (id) => {
        const removeData = await deleteMaterial(id);
        console.log(removeData)
        setModelDelete(false)
        await refreshMaterial()
    }
    return (
        <div className="relative min-h-screen bg-gray-50 px-4 md:px-6 py-6 shadow-md">
            {(isLoading || isValidating) && (
                <div className="absolute inset-0 bg-white/60 backdrop-blur-sm flex items-center justify-center z-20">
                    <div className="loader"></div>
                </div>
            )}
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Quản lý vật liệu</h2>
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => {
                            setModel(true);
                            setMaterialId("");
                            reset({
                                name: "",
                                purity: "",
                                pricePerUnit: "",
                                active: ""
                            });
                        }}
                        className="flex items-center gap-2 bg-primary text-white px-4 py-2.5 rounded-xl
                        hover:opacity-80 active:scale-95 transition cursor-pointer">
                        <CirclePlus />
                        <span>Thêm vật liệu</span>
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
                {materials?.data?.data?.material?.map((item) => (
                    <div
                        key={item._id}
                        className="bg-white rounded-2xl shadow-md p-4 hover:shadow-lg transition">
                        <div className="flex justify-between">
                            <div>
                                <h3 className="font-semibold text-lg">{item.name}</h3>
                                <p className="text-sm text-gray-500 mt-1">
                                    Slug: {item.slug}
                                </p>
                                <p className='mt-1'>
                                    Purity : {item.purity}
                                </p>
                                <p className='text-primary font-bold mt-1'>
                                    Giá : {formatBigNumber(item.pricePerUnit, true)}
                                </p>
                                <p className='text-[14px] text-gray-400 mt-1'>
                                    {item.active ? "Còn vật liệu" : "Hết vật liệu"}
                                </p>
                            </div>
                            <div className="flex gap-3">
                                <SquarePen
                                    onClick={() => handleEditMaterial(item)}
                                    className="size-5 text-blue-500 hover:text-blue-700 hover:scale-110 transition cursor-pointer"
                                />
                                <Trash
                                    onClick={() => showDeleteMaterial(item)}
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
                    Thêm vật liệu
                </h3>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label className="text-sm font-medium">Tên vật liệu</label>
                        <input
                            {...register("name")}
                            placeholder="Nhập tên vật liệu..."
                            className="mt-1 w-full border rounded-lg p-2.5 text-sm
                            focus:ring-2 focus:ring-primary outline-none transition focus:border-none"
                        />
                        {errors.name && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.name.message}
                            </p>
                        )}
                    </div>
                    <div>
                        <label className="text-sm font-medium">Purity</label>
                        <select {...register("purity")} className="mt-1 w-full border rounded-lg p-2.5 text-sm
                            focus:ring-2 focus:ring-primary outline-none transition focus:border-none">
                            <option>--- Chọn purity ---</option>
                            <option value="24K">24K</option>
                            <option value="14K">14K</option>
                            <option value="10K">10K</option>
                            <option value="8K">8K</option>
                            <option value="999">Bạc 999</option>
                            <option value="925">Bạc 925</option>
                        </select>
                        {errors.purity && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.purity.message}
                            </p>
                        )}
                    </div>
                    <div>
                        <label className="text-sm font-medium">Giá</label>
                        {/* <input
                            {...register("pricePerUnit")}
                            placeholder="Nhập tên giá..."
                            className="mt-1 w-full border rounded-lg p-2.5 text-sm
                            focus:ring-2 focus:ring-primary outline-none transition focus:border-none"
                        /> */}
                        <Controller
                            name="pricePerUnit"
                            {...register("pricePerUnit")}
                            control={control}
                            render={({ field }) => (
                                <CurrencyInput
                                    value={field.value}
                                    onChange={field.onChange}
                                    placeholder="Nhập giá vật liệu"
                                />
                            )}
                        />
                        {errors.pricePerUnit && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.pricePerUnit.message}
                            </p>
                        )}
                    </div>
                    <div>
                        <label className="text-sm font-medium block mb-2">Lựa chọn</label>
                        <div className="flex items-center gap-4">
                            <label className="flex items-center gap-2">
                                <input type="radio" name="option" value="true" {...register("active")} />
                                <span>Còn vật liệu</span>
                            </label>

                            <label className="flex items-center gap-2">
                                <input type="radio" name="option" value="false" {...register("active")} />
                                <span>Hết vật liệu</span>
                            </label>
                        </div>
                    </div>
                    <div className="flex justify-end gap-3 pt-2">
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
                    remove={removeMaterial}
                    setModelDelete={setModelDelete}
                    handleDelete={handleDeleteMaterial}
                />
            )}
        </div>
    );
}
