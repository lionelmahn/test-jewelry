import { useGetListWish } from '@/hooks/Wish/useGetListWish'
import { formatBigNumber } from '@/lib/format-big-number'
import { PaginationCustom } from '@/lib/PaginationCustom'
import { wishStore } from '@/store/wishStore/wishStore'
import { Trash2 } from 'lucide-react'
import React, { useState } from 'react'
import { Link } from 'react-router'

export const WishList = () => {
    const [valuePage, setValuePage] = useState(1)
    const { wishs, isLoading, refreshWish, error } = useGetListWish({
        page: valuePage,
        limit: 6
    })
    const { deleteWish, removeWish } = wishStore()
    console.log(wishs, "wishswishswishs")
    const handleDelete = async (id) => {
        console.log(id)
        try {
            const res = await deleteWish(id)
            console.log(res, "resresres")
            if (res.status === 200) {
                toast.success("Xóa thành công")
                removeWish()
                await refreshWish()
            }
        } catch (error) {
            console.log(error)
        }
    }
    const handleChangePage = (e, value) => {
        setValuePage(value)
    }
    return (
        <div className='px-16 relative min-h-screen pb-16'>
            {(isLoading) && (
                <div className="absolute inset-0 bg-white/60 backdrop-blur-sm flex items-center justify-center z-20">
                    <div className="loader"></div>
                </div>
            )}
            <h2 className='text-[28px] text-primary font-bold mt-14'>My Wishlist</h2>
            <div className='grid grid-cols-3 gap-3 mt-4 mb-16'>
                {wishs?.data?.data?.data?.items?.map((item) => {
                    const img = item.images.find((i) => i.isMain)
                    return (
                        <div className='h-90 bg-white shadow-xl rounded-xl overflow-hidden'>
                            <div className='h-50'>
                                <img src={img.url} alt="" className='w-full h-full object-cover' />
                            </div>
                            <div className='p-6 space-y-3'>
                                <div>
                                    <p className='text-[15px] font-bold'>{item.productId.name}</p>
                                </div>
                                <div>
                                    <p className='font-medium text-primary'>{formatBigNumber(item.price, true)}</p>
                                </div>
                                <div className='flex items-center justify-between'>
                                    <div onClick={() => handleDelete(item.productId._id)} className='size-8 bg-secondary flex items-center justify-center text-white rounded-full cursor-pointer'>
                                        <Trash2 size={18} />
                                    </div>
                                    <div>
                                        <Link to={`/product/detail/${item.productId._id}`} className='btn bg-transparent border border-primary text-primary rounded-xl px-4.5 py-2.5'>Xem chi tiết</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
            <PaginationCustom total={wishs?.data?.data?.totalItem} valuePage={valuePage} handleChangePage={handleChangePage} limit={6} />
        </div>
    )
}
