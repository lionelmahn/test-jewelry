import { useGetListPreviewByProductId } from '@/hooks/Review/useGetListReviewByProductId'
import { formatBigNumber } from '@/lib/format-big-number'
import { CartStore } from '@/store/cartStore/CartStore'
import { CompareStore } from '@/store/compareStore/CompareStore'
import { ProductStore } from '@/store/productStore/ProductStore'
import { wishStore } from '@/store/wishStore/wishStore'
import dayjs from 'dayjs'
import { Heart, Scale, Star, Van } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { toast } from 'sonner'

export const DetailProduct = () => {
    const params = useParams()
    const { createCart, addToCart, cart } = CartStore()
    const { createWish, addWish } = wishStore()
    const { createCompare } = CompareStore()
    const { getProductById } = ProductStore()
    const [showImg, setShowImg] = useState("")
    const [choose, setChoose] = useState(1)
    const [detail, setDetail] = useState(null)
    const [selectedColor, setSelectedColor] = useState(null)
    const [selectedOption, setSelectedOption] = useState(null)
    const [quantity, setQuantity] = useState(1)
    const [img, setImg] = useState("")
    const [imgWish, setImgWish] = useState("")
    const { error, isLoading, refreshReviews, reviews } = useGetListPreviewByProductId({
        page: 1,
        limit: 8,
        id: params.id
    })
    console.log(reviews, "reviewsreviewsreviewsreviews")
    useEffect(() => {
        const callProduct = async () => {
            const data = await getProductById(params.id)
            console.log(data, "dbdbvfbvf")
            setDetail(data?.data?.data)
        }
        callProduct()
    }, [params.id])
    console.log(detail, "detaildetaildetail")
    const handleAddToCart = async (id) => {
        console.log(id, "vmkfvmmfmbmk")
        console.log(quantity, "quantityquantity")
        console.log(selectedColor, "selectedOptionselectedOptionselectedOption")
        const newCart = await createCart(id, selectedColor.color, quantity)
        console.log(newCart, "newCartnewCartnewCart")
        if (newCart.status === 201) {
            const data = await getProductById(id)
            console.log(data, "datadatadatadata")
            if (data.status === 200) {
                const imgMain = data?.data?.data?.images.find((item) => item.isMain)
                console.log(imgMain, "imgMainimgMain")
                addToCart({
                    img: imgMain.url
                })
                setSelectedColor(null)
                setSelectedOption(null)
                setQuantity(1)
            }
        }
        console.log(newCart, "newCartnewCartnewCart")
    }
    const handleCompare = async (id) => {
        console.log(selectedOption.sku)
        await createCompare(id, selectedOption.sku)
    }
    const handleHeart = async (id) => {
        try {
            const res = await createWish(id)
            if (res.status === 201) {
                const img = res?.data?.data?.items[0].images.find((i) => i.isMain)
                addWish({
                    img: img.url
                })
                setImgWish(img.url)
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        console.log("cart changed", cart)
        const findImg = cart.find((img) => img.img !== "")
        setImg(findImg?.img)
    }, [cart])
    useEffect(() => {
        if (detail?.images?.length) {
            const imgMain = detail?.images.find(img => img.isMain)
            setShowImg(imgMain?.url)
        }
    }, [detail])
    const originalPrice = detail?.variants.flatMap((item) => item.options.map((ele) => ele.originalPrice))
    const finalPrice = detail?.variants.flatMap((item) => item.options.map((ele) => ele.finalPrice))
    console.log(originalPrice, finalPrice)
    console.log(selectedOption, "mkmkgmbga")
    console.log(img, "findImgfindImg")
    return (
        <div className="bg-gray-50 px-10 py-16 relative">
            {img && <div className='w-17.5 h-17.5 absolute top-10 right-12'>
                <img src={img} alt="" className=' w-full h-full object-cover rounded-xl animate-cart-fx' />
            </div>}
            {imgWish && <div className='w-17.5 h-17.5 absolute top-10 right-38'>
                <img src={imgWish} alt="" className=' w-full h-full object-cover rounded-xl animate-cart-fx' />
            </div>}
            <div className="max-w-7xl mx-auto grid grid-cols-2 gap-14">
                <div className="space-y-6">
                    <div className="w-full aspect-square rounded-2xl overflow-hidden bg-white shadow">
                        <img
                            src={showImg}
                            alt=""
                            className="w-full h-full object-cover"
                        />
                    </div>

                    <div className="flex gap-4 justify-center">
                        {detail?.images?.map((item) => (
                            <div
                                key={item.url}
                                onClick={() => setShowImg(item.url)}
                                className={`w-20 h-20 rounded-xl overflow-hidden cursor-pointer border-2 transition
                ${showImg === item.url
                                        ? "border-primary"
                                        : "border-transparent hover:border-gray-300"
                                    }`}
                            >
                                <img src={item.url} alt="" className="w-full h-full object-cover" />
                            </div>
                        ))}
                    </div>
                </div>
                {detail && (
                    <div className="space-y-8">
                        <div className="">
                            <p className='mb-4 border border-primary rounded-2xl w-37.5 px-3 py-1 text-[12px] font-roboto font-semibold text-secondary text-center'>360 VIEW ENABLE</p>
                            <p className='bg-white text-primary text-[14px] font-roboto font-semibold rounded-2xl w-37.5 px-3 py-1 text-center mb-6'>{detail?.brandId?.name}</p>
                        </div>
                        <h1 className="text-3xl font-bold leading-tight">
                            {detail.name}
                        </h1>
                        <div className="space-y-6">
                            <div>
                                <p className="text-sm font-semibold mb-2">Color</p>
                                <div className="flex gap-3 flex-wrap">
                                    {detail.variants.map((item) => (
                                        <button
                                            key={item.color}
                                            onClick={() => {
                                                setSelectedColor(item)
                                                setSelectedOption(null)
                                            }}
                                            className={`px-4 py-2 rounded-xl border text-sm font-medium transition cursor-pointer
                      ${selectedColor?.color === item.color
                                                    ? "border-primary bg-primary text-white"
                                                    : "border-gray-300 hover:border-primary"
                                                }`}
                                        >
                                            {item.color}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            {selectedColor && (
                                <div>
                                    <p className="text-sm font-semibold mb-2">
                                        {selectedColor.options[0].type}
                                    </p>

                                    <div className="flex gap-3 flex-wrap">
                                        {selectedColor.options.map((op, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() => setSelectedOption(op)}
                                                className={`px-4 py-3 rounded-xl border text-sm text-left transition cursor-pointer
                        ${selectedOption === op
                                                        ? "border-primary bg-primary text-white"
                                                        : "border-gray-300 hover:border-primary"
                                                    }`}
                                            >
                                                <p className="font-semibold">{op.value}</p>
                                                {op.purity && (
                                                    <p className="text-xs opacity-80">{op.purity}</p>
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="space-y-1">
                            <p className="text-2xl font-bold text-primary">
                                Giá tiền: {selectedOption?.finalPrice ? formatBigNumber(selectedOption?.finalPrice, true) : formatBigNumber(finalPrice[0], true)}
                            </p>
                            {selectedOption?.finalPrice !== selectedOption?.originalPrice || finalPrice[0] !== originalPrice[0] && (
                                <p className="text-gray-400 line-through">
                                    Giá cũ{selectedOption?.originalPrice ? formatBigNumber(selectedOption?.originalPrice, true) : formatBigNumber(originalPrice[0], true)}
                                </p>
                            )}
                        </div>
                        <div>
                            <p className="text-sm font-semibold mb-2">Quantity</p>
                            <div className="flex items-center gap-4">
                                <button className={`w-10 h-10 border rounded-xl hover:border-primary  ${quantity === 1 ? "pointer-events-none" : "cursor-pointer"}`} onClick={() => setQuantity((prev) => prev - 1)}>-</button>
                                <span className="font-semibold">{quantity}</span>
                                <button className={`w-10 h-10 border rounded-xl hover:border-primary ${quantity >= selectedOption?.stockQuantity ? "pointer-events-none" : "cursor-pointer"}`} onClick={() => setQuantity((prev) => prev + 1)}>+</button>
                            </div>
                            {quantity >= selectedOption?.stockQuantity ? <p>Số lượng tồn kho đã hết</p> : ""}
                        </div>
                        <div className='flex items-center gap-4'>
                            <button onClick={() => handleAddToCart(detail._id)} className="px-6 py-3.5 rounded-xl bg-primary text-white font-semibold hover:opacity-90 transition cursor-pointer">
                                Add to cart
                            </button>
                            <div className='w-13 h-13 border-2 border-primary flex items-center justify-center rounded-xl text-primary cursor-pointer' onClick={() => handleCompare(detail._id)}>
                                <Scale />
                            </div>
                            <div className='w-13 h-13 border-2 border-primary flex items-center justify-center rounded-xl text-primary cursor-pointer' onClick={() => handleHeart(detail._id)}>
                                <Heart />
                            </div>
                        </div>
                        <div className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm">
                            <div className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center text-white">
                                <Van size={18} />
                            </div>
                            <div>
                                <p className="text-sm font-semibold">Miễn phí giao hàng</p>
                                <p className="text-xs text-gray-500">Giao hàng trong vòng 3-5 ngày làm việc.</p>
                            </div>
                        </div>
                        <div className='flex items-center justify-around relative'>
                            <div className={`w-20 h-0.5 absolute top-6 left-10 bg-primary ${choose === 1 ? "translate-x-13.5" : "translate-x-84"} transition-all duration-500 ease-in-out`}>
                            </div>
                            <div className='space-y-4'>
                                <p className="font-semibold font-roboto cursor-pointer" onClick={() => setChoose(1)}>
                                    Mô tả
                                </p>
                            </div>
                            <div className='space-y-4'>
                                <p className="font-semibold font-roboto cursor-pointer" onClick={() => setChoose(2)}>Đánh giá
                                </p>
                            </div>
                        </div>
                        {choose === 1 ? (
                            <p className="text-sm text-gray-700 leading-relaxed">
                                {detail.description}
                            </p>
                        ) : (
                            <div className="space-y-3">
                                <div className="text-4xl font-semibold">
                                    {reviews?.data?.data?.averageRaring}/5
                                </div>
                                <div className="flex items-center gap-2">
                                    {[1, 2, 3, 4, 5].map((i) => (
                                        <Star
                                            key={i}
                                            size={18}
                                            className={
                                                i <= reviews?.data?.data?.averageRaring
                                                    ? "fill-yellow-400 text-yellow-400"
                                                    : "text-gray-300"
                                            }
                                        />
                                    ))}
                                </div>

                                {reviews?.data?.data?.totalItem > 0 ? (
                                    <p className="text-sm text-gray-600">
                                        {reviews?.data?.data?.totalItem} đánh giá từ khách hàng
                                    </p>
                                ) : (
                                    <p className="text-sm text-gray-400 italic">
                                        Chưa có đánh giá nào cho sản phẩm này
                                    </p>
                                )}
                                <div>
                                    <div className="space-y-5">
                                        {reviews?.data?.data?.review.map((i) => (
                                            <div
                                                key={i._id}
                                                className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition"
                                            >

                                                <div className="flex items-start gap-4">

                                                    <div className="size-11 rounded-full overflow-hidden border">
                                                        <img
                                                            src={i.userId.avatar}
                                                            alt=""
                                                            className="w-full h-full object-cover"
                                                        />
                                                    </div>
                                                    <div className="flex-1">
                                                        <div className="flex items-center justify-between">
                                                            <p className="font-semibold text-gray-900">
                                                                {i.userId.fullName}
                                                            </p>

                                                            <span className="text-sm text-gray-400">
                                                                {dayjs(i.createdAt).format("DD/MM/YYYY")}
                                                            </span>
                                                        </div>
                                                        <div className="flex items-center gap-1 mt-1">
                                                            {[1, 2, 3, 4, 5].map((inn) => (
                                                                <Star
                                                                    key={inn}
                                                                    size={16}
                                                                    className={
                                                                        inn <= i.rating
                                                                            ? "fill-yellow-400 text-yellow-400 drop-shadow-sm"
                                                                            : "text-gray-300"
                                                                    }
                                                                />
                                                            ))}

                                                            <span className="ml-2 text-sm font-medium text-gray-600">
                                                                {i.rating}.0
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="mt-4 text-gray-700 leading-relaxed text-[15px]">
                                                    {i.comment}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}
