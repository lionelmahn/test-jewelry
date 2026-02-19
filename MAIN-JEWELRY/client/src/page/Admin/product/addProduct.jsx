
import { Label } from '@/components/ui/label';
import { RadioGroupItem } from '@/components/ui/radio-group';
import { useGetListBrand } from '@/hooks/Brand/useGetListBrand';
import { useGetListCategory } from '@/hooks/category/useGetListCategory';
import { useGetListSubcategory } from '@/hooks/subcategoty/useGetListSubcategory';
import { zodResolver } from '@hookform/resolvers/zod';
import { ImageUp, Trash2 } from 'lucide-react';
import { RadioGroup } from '@radix-ui/react-radio-group';
import React, { useEffect, useState } from 'react'
import { useFieldArray, useForm, useWatch } from 'react-hook-form';
import z from 'zod'
import { VariantOptions } from '../BoxProduct/VariantOptions';
import { ProductStore } from '@/store/productStore/ProductStore';
import { useGetListProduct } from '@/hooks/Product/useGetListProduct';
import { useNavigate } from 'react-router';
import dayjs from 'dayjs';
const ProductSchema = z.object({
    name: z.string().min(1, "Thiếu tên"),
    promotion: z
        .object({
            isActive: z.boolean(),
            discount: z.coerce.number().optional(),
            startAt: z.coerce.date().nullable().optional(),
            endAt: z.coerce.date().nullable().optional(),
        })
        .optional()
        .superRefine((data, ctx) => {
            if (!data || !data.isActive) return;
            if (data.discount <= 0 || data.discount >= 100) {
                ctx.addIssue({
                    path: ["discount"],
                    message: "Giá trị phải > 0 và < 100",
                });
            }
            const d = Number(data.discount);
            if (d <= 0 || d >= 100) {
                ctx.addIssue({
                    path: ["discount"],
                    message: "Giá trị phải > 0 và < 100",
                });
            }
            if (!(data.startAt)) {
                ctx.addIssue({
                    path: ["startAt"],
                    message: "Chọn ngày bắt đầu",
                });
            }

            if (!(data.endAt)) {
                ctx.addIssue({
                    path: ["endAt"],
                    message: "Chọn ngày kết thúc",
                });
            }

            if (
                data.startAt &&
                data.endAt &&
                data.endAt <= data.startAt
            ) {
                ctx.addIssue({
                    path: ["endAt"],
                    message: "Ngày kết thúc phải sau ngày bắt đầu",
                });
            }
        }).transform((data) => {
            if (!data) return data;
            if (!data.isActive) {
                return {
                    ...data,
                    discount: 0,
                    startAt: null,
                    endAt: null,
                };
            }
            return data;
        }),
    variants: z.array(
        z.object({
            _id: z.string().optional(),
            color: z.string().min(1, "Chưa nhập màu"),
            options: z.array(
                z.object({
                    _id: z.string().optional(),
                    itemId: z.string().min(1, "Chưa chọn item"),
                    type: z.enum(["CARAT", "GRAM", "NONE"]),
                    value: z.coerce.number().nullable().optional(),
                    purity: z.string().nullable().optional(),
                    stockQuantity: z.coerce.number().min(0, "Số lượng phải ≥ 0"),
                }).refine(
                    (data) => {
                        if (data.type === "NONE") {
                            return data.value === undefined && data.purity === undefined;
                        }
                        return true;
                    },
                    {
                        message: "Không được nhập value / purity khi type là NONE",
                        path: ["value"],
                    }
                )
            ).min(1, "Ít nhất phải có 1 giá trị"),
        })
    ).min(1, "Ít nhất phải có 1 biến thể"),
    description: z.string().min(1, "Thiếu mô tả"),
    isFeatured: z.boolean().optional(),
    isNewProduct: z.boolean().optional()

})
export const AddProduct = ({ id }) => {
    console.log(id, ">>>> idppspdpfpp")
    const { categories } = useGetListCategory({
        page: 1,
        limit: 9999,
    });
    const { brands } = useGetListBrand({
        page: 1,
        limit: 9999,
    });
    const { subcategory } = useGetListSubcategory({
        page: 1,
        limit: 9999,
    });
    const { createProduct, uploadImgProduct, deleteImgProTem, getProductById, updateProduct, deleteImgProduct } = ProductStore()
    const navigate = useNavigate()
    const [cateId, setCateId] = useState("")
    const [brandId, setBrandId] = useState("")
    const [subcateId, setSubcateId] = useState("")
    const [imgUp, setImgUp] = useState([])
    const [mainImage, setMainImage] = useState("")
    const [loading, setLoading] = useState(false)
    const [length, setLenght] = useState(0)
    const [error, setError] = useState("")
    const [message, setMessage] = useState("")
    const { register, control, handleSubmit, setValue, formState: { errors, isSubmitting }, reset } = useForm({
        resolver: zodResolver(ProductSchema),
        shouldUnregister: false,
    })
    const { fields, append, remove } = useFieldArray({
        control,
        name: "variants"
    })
    const isActive = useWatch({
        control,
        name: "promotion.isActive"
    })
    const discount = useWatch({
        control,
        name: "promotion.discount"
    })
    console.log("isACviibe", isActive)
    const onSubmit = async (data) => {
        console.log(data, "ncknckdncndnc")
        if (imgUp.length === 0) {
            setMessage("Chưa tải ảnh")
            return
        }
        if (brandId === "") {
            setMessage("Chưa có thương hiệu")
            return
        }
        if (cateId === "") {
            setMessage("Chưa có danh mục")
            return
        }
        if (subcateId === "") {
            setMessage("Chưa có danh mục con")
            return
        }
        // const tranfer = data.variants.map((item) => ({
        //     color: item.color,
        //     options: item.options.map((ele) => ({
        //         itemId: ele.itemId,
        //         type: ele.type,
        //         value: ele.value ? Number(ele.value) : null,
        //         purity: ele.purity || null,
        //         stockQuantity: ele.stockQuantity ? ele.stockQuantity : 0
        //     }))
        // }))
        // console.log(tranfer, "tranfertranfertranfer")
        // const tranderPromo = data.promotion.isActive ? {
        //     ...data.promotion,
        //     discount: Number(data.promotion.discount),
        //     startAt: data.promotion.startAt,
        //     endAt: data.promotion.endAt
        // } : {
        //     ...data.promotion
        // }

        if (id) {
            // const tranferrr = data.variants.map((item) => ({
            //     _id: item._id,
            //     color: item.color,
            //     options: item.options.map((ele) => ({
            //         _id: ele._id,
            //         itemId: ele.itemId,
            //         type: ele.type,
            //         value: ele.value ? Number(ele.value) : null,
            //         purity: ele.purity || null,
            //         stockQuantity: ele.stockQuantity ? Number(ele.stockQuantity) : 0
            //     }))
            // }))
            console.log(id, "sckskcskcksn")
            console.log(">>> imgUp", imgUp)
            console.log(brandId, cateId, subcateId, "jdncjncjdnj")
            const editProduct = await updateProduct(id, { ...data, brandId: brandId, categoryId: cateId, subCategoryId: subcateId, images: imgUp })
            console.log(editProduct, "editProducteditProduct")
            if (editProduct.status === 200) {
                navigate('/admin/product-manage/products')
                reset()
            }
        } else {
            const newProduct = await createProduct({ ...data, brandId: brandId, categoryId: cateId, subCategoryId: subcateId, images: imgUp })
            console.log(">>> newProduct", newProduct)
            if (newProduct.status === 201) {
                navigate('/admin/product-manage/products')
                reset();
            }
        }
    }
    const handleUpload = async (e) => {
        const files = e.target.files;
        console.log(">>> files", files)
        const formData = new FormData()
        for (const file of files) {
            formData.append("product-images", file)
        }
        setLenght(files.length)
        setLoading(true)
        const imgData = await uploadImgProduct(formData)
        if (imgData?.status === 201) {
            console.log(">>> imgData", imgData)
            setLoading(false)
            setImgUp((prev) => [
                ...prev,
                ...imgData?.data?.data
            ])
        } else {
            setError("Lỗi tải ảnh")
        }
    }
    console.log(imgUp, "sjdnjdnvjdnv")
    const removePreview = async (url) => {
        if (id) {
            const removeImg = await deleteImgProduct(id, url);
            setImgUp((prev) => prev.filter((img) => img.url !== url))
        } else {
            const deleteImg = await deleteImgProTem(url)
            setImgUp((prev) => prev.filter((img) => img.url !== url))
        }
    }
    const handleMainImg = (v) => {
        setMainImage(v);
        setImgUp((prev) => prev.map((img) => ({
            ...img,
            isMain: img.url === v
        })))
    }
    useEffect(() => {
        if (id) {
            const handleProductId = async () => {
                const dataId = await getProductById(id);
                if (dataId.status === 200) {
                    const item = dataId.data.data
                    console.log(">>> dataId", item)
                    reset({
                        name: item.name,
                        description: item.description,
                        promotion: item.promotion.isActive ?
                            {
                                discount: String(item.promotion.discount),
                                startAt: dayjs(item.promotion.startAt).format("YYYY-MM-DD"),
                                endAt: dayjs(item.promotion.endAt).format("YYYY-MM-DD"),
                                isActive: item.promotion.isActive
                            } :
                            {
                                isActive: item.promotion.isActive
                            },
                        variants: item.variants.map((vari) => ({
                            _id: vari._id,
                            color: vari.color,
                            options: vari.options.map((op) => ({
                                _id: op._id,
                                itemId: op.itemId,
                                type: op.type,
                                value: String(op.value),
                                purity: op.purity ?? null,
                                stockQuantity: String(op.stockQuantity)
                            }))

                        })),
                        isFeatured: item.isFeatured,
                        isNewProduct: item.isNewProduct,
                    })
                    const main = item.images.find((img) => img.isMain === true)
                    setImgUp(item.images)
                    setMainImage(main.url)
                    setBrandId(item.brandId._id)
                    setCateId(item.categoryId._id)
                    setSubcateId(item.subCategoryId._id)
                }
            }
            handleProductId();
        }
    }, [id])
    return (
        <div className="min-h-screen bg-gray-100 py-10">
            <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg border p-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-8">
                    {id ? "Sửa sản phẩm" : "Thêm sản phẩm"}
                </h1>
                <form onSubmit={handleSubmit(onSubmit, (errors) => {
                    console.log("smckscsck", errors)
                })} className="space-y-10">
                    <section className="space-y-4">
                        <h2 className="text-xl font-semibold text-gray-700">
                            Thông tin sản phẩm
                        </h2>
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <input
                                    type="text"
                                    {...register("name")}
                                    placeholder="Product name"
                                    className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary outline-none"
                                />
                                {errors.name && (
                                    <p className="text-sm text-red-500 mt-1">
                                        {errors.name.message}
                                    </p>
                                )}
                            </div>
                            <label className="flex items-center gap-3 text-gray-700">
                                <input
                                    type="checkbox"
                                    {...register("promotion.isActive")}
                                    className="w-4 h-4"
                                />
                                Áp dụng mã giảm giá
                            </label>
                        </div>
                        {isActive && (
                            <div className="grid grid-cols-3 gap-6 bg-purple-50 border border-purple-200 p-4 rounded-xl items-center">
                                <div>
                                    <label className="text-sm text-gray-600">Mã giảm giá</label>
                                    <input
                                        type="text"
                                        {...register("promotion.discount")}
                                        placeholder="Discount (%)"
                                        className="w-full border rounded-lg px-3 py-2"
                                    />
                                    {errors.promotion?.discount && (
                                        <p className="text-sm text-red-500 mt-1">
                                            {errors.promotion.discount.message}
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <label className="text-sm text-gray-600">Ngày bắt đầu</label>
                                    <input
                                        type="date"
                                        {...register("promotion.startAt")}
                                        className="w-full border rounded-lg px-3 py-2"
                                    />
                                </div>
                                <div>
                                    <label className="text-sm text-gray-600">Ngày kết thúc</label>
                                    <input
                                        type="date"
                                        {...register("promotion.endAt")}
                                        className="w-full border rounded-lg px-3 py-2"
                                    />
                                    {errors.promotion?.endAt && (
                                        <p className="text-sm text-red-500 mt-1">
                                            {errors.promotion.endAt.message}
                                        </p>
                                    )}
                                </div>
                            </div>
                        )}
                    </section>
                    <section>
                        <textarea
                            {...register("description")}
                            placeholder="Product description..."
                            className="w-full h-32 border rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary outline-none"
                        />
                    </section>
                    <section className="grid grid-cols-3 gap-6">
                        <select
                            {...register("brandId")}
                            value={brandId}
                            onChange={(e) => setBrandId(e.target.value)}
                            className="border rounded-lg px-4 py-3"
                        >
                            <option value="">-- Chọn thương hiệu --</option>
                            {brands?.data?.brand?.map((item) => (
                                <option key={item._id} value={item._id}>
                                    {item.name}
                                </option>
                            ))}
                        </select>

                        <select
                            {...register("categoryId")}
                            value={cateId}
                            onChange={(e) => setCateId(e.target.value)}
                            className="border rounded-lg px-4 py-3"
                        >
                            <option value="">-- Chọn danh mục --</option>
                            {categories?.data?.category?.map((item) => (
                                <option key={item._id} value={item._id}>
                                    {item.name}
                                </option>
                            ))}
                        </select>
                        <select
                            {...register("subCategoryId")}
                            value={subcateId}
                            onChange={(e) => setSubcateId(e.target.value)}
                            className="border rounded-lg px-4 py-3"
                        >
                            <option value="">-- Chọn danh mục con --</option>
                            {subcategory?.data?.data?.subcategory?.map((item) => (
                                <option key={item._id} value={item._id}>
                                    {item.name}
                                </option>
                            ))}
                        </select>
                    </section>
                    <section className="space-y-4">
                        <label className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg cursor-pointer hover:opacity-80">
                            <ImageUp size={18} />
                            Upload Images
                            <input type="file" multiple hidden onChange={handleUpload} />
                        </label>
                        <RadioGroup
                            value={mainImage}
                            onValueChange={(v) => handleMainImg(v)}
                            className="flex flex-wrap gap-6"
                        >
                            {loading ? (error !== "" ? <p className='text-red-500'>{error}</p> : <div className="flex flex-wrap gap-6">
                                {Array(length).fill(0).map((item, index) => (
                                    <div
                                        key={index}
                                        className="w-24 h-24 rounded-xl bg-gray-200 animate-pulse"
                                    />
                                ))}
                            </div>
                            ) :
                                <div className="flex flex-wrap gap-6">
                                    {imgUp?.map((item, index) => (
                                        <div
                                            key={index}
                                            className="relative border rounded-xl p-2 bg-gray-50"
                                        >
                                            <img
                                                src={item.url}
                                                className="w-28 h-28 object-cover rounded-lg"
                                            />

                                            <button
                                                type="button"
                                                onClick={() => removePreview(item.url)}
                                                className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full cursor-pointer"
                                            >
                                                <Trash2 size={14} />
                                            </button>
                                            <Label className="flex items-center gap-2 mt-2 text-sm cursor-pointer">
                                                <RadioGroupItem value={item.url} id={`main-${index}`} />
                                                Ảnh {index + 1}
                                            </Label>
                                        </div>
                                    ))}
                                </div>
                            }
                        </RadioGroup>
                    </section>
                    <section className="flex gap-10">
                        <label className="flex items-center gap-2">
                            <input type="checkbox" {...register("isFeatured")} />
                            Featured
                        </label>

                        <label className="flex items-center gap-2">
                            <input type="checkbox" {...register("isNewProduct")} />
                            New Product
                        </label>
                    </section>
                    <section className="border rounded-xl p-6 space-y-6 bg-gray-50">
                        <div className="flex justify-between items-center">
                            <h2 className="text-lg font-semibold">Variants</h2>
                            <button
                                type="button"
                                onClick={() => append({ color: "", options: [] })}
                                className="px-4 py-2 bg-primary text-white rounded-lg cursor-pointer"
                            >
                                + Add Variant
                            </button>
                        </div>

                        {fields.map((item, index) => (
                            <div
                                key={item.id}
                                className="bg-white border rounded-xl p-4"
                            >
                                <div className="flex gap-3 items-center mb-4">
                                    <input
                                        type="text"
                                        {...register(`variants.${index}.color`)}
                                        placeholder="Color"
                                        className="border rounded-lg px-3 py-2 flex-1"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => remove(index)}
                                        className="text-red-600"
                                    >
                                        <Trash2 />
                                    </button>
                                </div>

                                <VariantOptions
                                    control={control}
                                    register={register}
                                    variantsIndex={index}
                                    discount={discount}
                                    isActive={isActive}
                                    setValue={setValue}
                                    errors={errors}
                                />
                            </div>
                        ))}
                    </section>
                    <div className="text-right ">
                        {message && (
                            <p className="text-sm text-red-500 mt-2">{message}</p>
                        )}
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="px-8 py-3 bg-primary text-white rounded-xl font-semibold hover:opacity-80 cursor-pointer"
                        >
                            {isSubmitting ? "Submitting..." : id ? "Sửa" : "Thêm"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
