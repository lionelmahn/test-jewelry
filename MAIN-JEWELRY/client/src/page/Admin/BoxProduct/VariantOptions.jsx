import { useGetListItems } from '@/hooks/Item/useGetListItem'
import { formatBigNumber } from '@/lib/format-big-number'
import { Trash2 } from 'lucide-react'
import React, { useState } from 'react'
import { useFieldArray, useWatch } from 'react-hook-form'

export const VariantOptions = ({ control, register, variantsIndex, discount, isActive, setValue, errors }) => {
    const { fields, append, remove } = useFieldArray({
        control,
        name: `variants.${variantsIndex}.options`
    })
    console.log(fields, "fieldsfieldsfieldsfields")
    const pricePerGram = {
        "24K": 2000000,
        "18K": 1500000,
        "14K": 1200000,
        "925": 40000
    };
    const option = useWatch({
        control,
        name: `variants.${variantsIndex}.options`
    }) || []
    console.log(discount, ">>> discount")
    const { items, isLoading, refreshItems } = useGetListItems()
    console.log(items, "itemsitemsitemsitems")
    return (
        <div className="space-y-4">
            <button
                type="button"
                className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:opacity-80 transition cursor-pointer"
                onClick={() =>
                    append({
                        itemId: "",
                        type: "NONE",
                        value: "",
                        stockQuantity: "",
                    })
                }
            >
                + Add Option
            </button>
            {fields.map((item, index) => {
                const itemId = option[index]?.itemId;
                console.log(itemId, "itemIditemIditemId")
                const selectedItem = items?.data?.data?.find(i => i._id === itemId);
                console.log(selectedItem, "selectedItemselectedItem")
                const type = option[index]?.type || "NONE"
                console.log(type, "typetypetypetypetype")
                const value = option[index]?.value
                const purity = option[index]?.purity
                console.log("puritypurity", purity)
                console.log(itemId, type, purity, value, "kgkgkmngkmng")
                return (
                    <div
                        key={item.id}
                        className="border rounded-2xl p-4 bg-white shadow-sm space-y-4"
                    >
                        <div className="grid grid-cols-3 gap-4">
                            <select
                                {...register(
                                    `variants.${variantsIndex}.options.${index}.itemId`
                                )}
                                className="border rounded-lg px-3 py-2 text-sm"
                                onChange={(e) => {
                                    const selected = items?.data?.data?.find(o => o._id === e.target.value);
                                    setValue(`variants.${variantsIndex}.options.${index}.itemId`, selected?._id);
                                    setValue(`variants.${variantsIndex}.options.${index}.type`, selected?.unit);
                                    if (selected.type === "METAL") {
                                        setValue(`variants.${variantsIndex}.options.${index}.purity`, selected.purity);
                                    }
                                    if (selected?.type === "GEMSTONE") {
                                        setValue(`variants.${variantsIndex}.options.${index}.purity`, null);
                                    }
                                }}
                            >
                                <option value="">---- Chọn ----</option>
                                {items?.data?.data
                                    ?.filter(i => i.active)
                                    ?.map(i => (
                                        <option key={i._id} value={i._id}>
                                            {i.name} {i.purity ?? ""}
                                        </option>
                                    ))}
                            </select>
                            <input type='text' value={selectedItem?.unit} disabled
                                {...register(`variants.${variantsIndex}.options.${index}.type`)}
                                className="border rounded-lg px-3 py-2 text-sm bg-white" />
                            {type === "CARAT" && (
                                <input
                                    type="text"
                                    {...register(
                                        `variants.${variantsIndex}.options.${index}.value`
                                    )}
                                    placeholder="Carat (e.g. 1.0)"
                                    className="border rounded-lg px-3 py-2 text-sm"
                                />
                            )}

                            {type === "GRAM" && (
                                <input
                                    type="text"
                                    {...register(
                                        `variants.${variantsIndex}.options.${index}.value`
                                    )}
                                    placeholder="Gram (e.g. 2.5)"
                                    className="border rounded-lg px-3 py-2 text-sm"
                                />
                            )}

                            {/* {type === "MM" && (
                                <select
                                    {...register(
                                        `variants.${variantsIndex}.options.${index}.value`
                                    )}
                                    className="border rounded-lg px-3 py-2 text-sm"
                                >
                                    <option value="">--- Chọn ---</option>
                                    {[4, 6, 8, 10, 12, 14, 16].map((mm) => (
                                        <option value={mm} key={mm}>
                                            {mm} mm
                                        </option>
                                    ))}
                                </select>
                            )} */}

                            {type === "NONE" && (
                                <input
                                    disabled
                                    placeholder="No size"
                                    className="border rounded-lg px-3 py-2 bg-gray-100 text-sm"
                                />
                            )}

                            {/* {type === "GRAM" && (
                                <select
                                    {...register(
                                        `variants.${variantsIndex}.options.${index}.purity`
                                    )}
                                    className="border rounded-lg px-3 py-2 text-sm"
                                >
                                    <option value="">--- Chọn độ tinh khiết ---</option>
                                    {items?.data?.data?.map((i) => (
                                        <option value={i.purity}>{i.purity} {i.purity ? i.slug : ""}</option>
                                    ))}
                                </select>
                            )} */}
                        </div>
                        {(type === "CARAT" || type === "GRAM" || type === "MM") && (
                            <div className="grid grid-cols-2 gap-4 bg-gray-50 p-3 rounded-xl">
                                {type === "CARAT" && (
                                    <>
                                        <input
                                            type="text"
                                            value={formatBigNumber(selectedItem?.pricePerUnit, true)}
                                            disabled
                                            className="border rounded-lg px-3 py-2 text-sm bg-white"
                                        />
                                        <input
                                            type="text"
                                            value={formatBigNumber(
                                                isActive
                                                    ? selectedItem?.pricePerUnit * value -
                                                    (selectedItem?.pricePerUnit * value * discount) / 100
                                                    : selectedItem?.pricePerUnit * value,
                                                true
                                            )}
                                            disabled
                                            className="border rounded-lg px-3 py-2 text-sm bg-white text-red-600 font-semibold"
                                        />
                                    </>
                                )}
                                {type === "GRAM" && purity && (
                                    <>
                                        <input
                                            type="text"
                                            value={formatBigNumber(
                                                selectedItem?.pricePerUnit,
                                                true
                                            )}
                                            disabled
                                            className="border rounded-lg px-3 py-2 text-sm bg-white"
                                        />
                                        <input
                                            type="text"
                                            value={formatBigNumber(
                                                isActive
                                                    ? selectedItem?.pricePerUnit * value -
                                                    (selectedItem?.pricePerUnit * value * discount) / 100
                                                    : selectedItem?.pricePerUnit * value,
                                                true
                                            )}
                                            disabled
                                            className="border rounded-lg px-3 py-2 text-sm bg-white text-red-600 font-semibold"
                                        />
                                    </>
                                )}

                                {/* {type === "MM" && (
                                    <>
                                        <input
                                            type="text"
                                            value={formatBigNumber(10000, true)}
                                            disabled
                                            className="border rounded-lg px-3 py-2 text-sm bg-white"
                                        />
                                        <input
                                            type="text"
                                            value={formatBigNumber(
                                                isActive
                                                    ? 10000 * value - (10000 * value * discount) / 100
                                                    : 10000 * value,
                                                true
                                            )}
                                            disabled
                                            className="border rounded-lg px-3 py-2 text-sm bg-white text-red-600 font-semibold"
                                        />
                                    </>
                                )} */}
                            </div>
                        )}
                        <div className="flex items-center justify-between">
                            <input
                                type="text"
                                {...register(
                                    `variants.${variantsIndex}.options.${index}.stockQuantity`
                                )}
                                placeholder="Stock"
                                className="border rounded-lg px-3 py-2 text-sm w-40"
                            />
                            <button
                                type="button"
                                onClick={() => remove(index)}
                                className="flex items-center gap-1 text-red-600 text-sm hover:text-red-700 cursor-pointer"
                            >
                                <Trash2 size={16} />
                            </button>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
