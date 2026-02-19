import { useGetListCompare } from '@/hooks/Comapre/useGetListCompare'
import { formatBigNumber } from '@/lib/format-big-number'
import { CartStore } from '@/store/cartStore/CartStore'
import { Plus, Scale } from 'lucide-react'
import React, { useEffect, useState } from 'react'

export const Compare = () => {
    const [img, setImg] = useState("")
    const { compares, error, isLoading, refreshCompare } = useGetListCompare()
    const { createCart, addToCart, cart } = CartStore()
    console.log(compares, "comparescomparescompares")
    const handleAddToCart = async (id, sku, quantity, mainImg) => {
        const newCart = await createCart(id, sku, quantity)
        if (newCart.status === 201) {
            addToCart({
                img: mainImg.url
            })
        }
    }
    useEffect(() => {
        console.log("cartcartcartcart", cart)
        const findImg = cart.find((img) => img.img !== "")
        setImg(findImg?.img)
    }, [cart])
    return (
        <div className='px-15 relative  min-h-screen'>
            {(isLoading) && (
                <div className="absolute inset-0 bg-white/60 backdrop-blur-sm flex items-center justify-center z-20">
                    <div className="loader"></div>
                </div>
            )}
            {img && <div className='w-17.5 h-17.5 absolute top-10 right-12'>
                <img src={img} alt="" className=' w-full h-full object-cover rounded-xl animate-cart-fx' />
            </div>}
            <div>
                <p className='font-medium text-[14px] text-secondary mt-4'>Trang chủ {`>`} So sánh</p>
                <h2 className='font-bold text-[28px] text-primary mt-8'>So sánh trang sức</h2>
            </div>
            <div className='my-16'>
                {compares?.data?.data?.data?.items?.length <= 0 ?
                    <div className='flex items-center justify-center flex-col'>
                        <div className='w-[256px] h-48 bg-white shadow-xl flex items-center justify-center rounded-2xl'>
                            <div className='w-24 h-24 border-2 border-primary rounded-2xl flex items-center justify-center relative'>
                                <div>
                                    <Scale size={40} className='text-primary' />
                                </div>
                                <div className='absolute w-8 h-8 bg-secondary rounded-full text-white flex items-center justify-center -top-2.5 -right-3'>
                                    <Plus />
                                </div>
                            </div>
                        </div>
                        <div className='mt-12 text-center'>
                            <h3 className='font-bold text-[24px] text-primary'>Compare Your Favorite Jewelry</h3>
                            <p className='font-extralight mt-4'>Add products to compare their features, prices, and<br></br> specifications side by side</p>
                        </div>
                    </div>
                    :
                    <div className='grid grid-cols-3 gap-8'>
                        {compares?.data?.data?.data?.items?.map((item) => {
                            const mainImg = item?.productId?.images?.find((i) => i.isMain)
                            console.log(mainImg, "dkmkvfkvfkv")
                            return (
                                <div className='bg-white shadow-2xl rounded-2xl'>
                                    <div className='flex items-center flex-col pt-6'>
                                        <div className='rounded-2xl overflow-hidden w-86 h-50'>
                                            <img src={mainImg.url} alt="" className='object-cover w-full h-full' />
                                        </div>
                                        <div className='mt-4'>
                                            <h4 className='text-[18px] font-semibold'>{item.productId.name}</h4>
                                        </div>
                                    </div>
                                    <div className='mt-4 text-center mb-4'>
                                        <ul className='space-y-4'>
                                            <li className='bg-[#FAF6F1] py-3'>{item.sku}</li>
                                            <li className='bg-[#FAF6F1] py-3'>{item.type} {item.purity || item.purity} {item.color}</li>
                                            <li className='bg-[#FAF6F1] py-3'>
                                                {item.value}{item.type === "CARAT" ? "ct" : item.type === "GRAM" ? "g" : "mm"}</li>
                                            <li className='bg-[#FAF6F1] py-3'>{formatBigNumber(item.salePrice, true)}</li>
                                        </ul>
                                    </div>
                                    <div className='mb-6 mx-6'>
                                        <button onClick={() => handleAddToCart(item.productId._id, item.sku, 1, mainImg)} className="w-full py-3.5 rounded-xl bg-primary text-white font-semibold hover:opacity-90 transition cursor-pointer">
                                            Thêm giỏ hàng
                                        </button>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                }
            </div>
        </div>
    )
}
