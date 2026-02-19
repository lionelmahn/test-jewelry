import { useGetListReview } from '@/hooks/Review/useGetListReview'
import { formatBigNumber } from '@/lib/format-big-number'
import { PaginationCustom } from '@/lib/PaginationCustom'
import dayjs from 'dayjs'
import { RefreshCw, Star } from 'lucide-react'
import React, { useState } from 'react'

export const Review = () => {
    const [valuePage, setValuePage] = useState(1)
    const { allReviews, error, isLoading, refreshAllReviews } = useGetListReview({
        page: valuePage,
        limit: 6
    })
    console.log(allReviews, "allReviewsallReviewsallReviewsallReviews")
    return (
        <div className="relative min-h-screen bg-gray-50 px-4 md:px-6 py-6 shadow-md">
            {(isLoading) && (
                <div className="absolute inset-0 bg-white/60 backdrop-blur-sm flex items-center justify-center z-20">
                    <div className="loader"></div>
                </div>
            )}
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Quản lý đánh giá</h2>

                <button
                    onClick={refreshAllReviews}
                    className="flex items-center gap-2 bg-primary text-white px-4 py-2.5 rounded-xl hover:opacity-80 active:scale-95 transition cursor-pointer">
                    <RefreshCw />
                    <span>Refresh</span>
                </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">

                {allReviews?.data?.data?.review.map((rv) => {
                    const orderItem = rv.orderItemId?.items?.[0];
                    const product = rv.productId;
                    const mainImage = product?.images?.find(i => i.isMain)?.url;
                    return (
                        <div
                            key={rv._id}
                            className="bg-white rounded-2xl shadow-md p-4 hover:shadow-lg transition">
                            <div className="flex items-center gap-3">
                                <img
                                    src={rv.userId?.avatar}
                                    className="size-11 rounded-full object-cover border"
                                />

                                <div className="flex-1">
                                    <p className="font-semibold">{rv.userId?.fullName}</p>
                                    <p className="text-xs text-gray-500">{rv.userId?.email}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-1 mt-3">
                                {[1, 2, 3, 4, 5].map(i => (
                                    <Star
                                        key={i}
                                        size={16}
                                        className={i <= rv.rating
                                            ? "fill-yellow-400 text-yellow-400"
                                            : "text-gray-300"}
                                    />
                                ))}
                                <span className="text-sm text-gray-500 ml-2">
                                    {rv.rating}.0
                                </span>
                            </div>
                            <div className="mt-4 flex gap-3 bg-gray-50 rounded-xl p-3 border">
                                <img
                                    src={mainImage}
                                    className="w-16 h-16 rounded-lg object-cover border"
                                />

                                <div className="text-sm flex-1">
                                    <p className="font-medium line-clamp-2">
                                        {product?.name}
                                    </p>

                                    <div className="text-gray-500 text-xs mt-1 space-y-1">
                                        <p>SKU: {orderItem?.sku}</p>
                                        <p>
                                            {orderItem?.type}: {orderItem?.value}
                                        </p>
                                        <p>Số lượng: {orderItem?.quantity}</p>
                                        <p>Giá: {formatBigNumber(rv?.orderItemId?.total, true)}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-3 text-gray-700 text-sm leading-relaxed min-h-12">
                                {rv.comment || "— Không có nội dung —"}
                            </div>
                            <div className="mt-4 text-xs text-gray-500 flex justify-between">
                                <span>
                                    {dayjs(rv.createdAt).format("YYYY-MM-DD HH:mm")}
                                </span>
                                <span className="text-gray-400">
                                    Mã đơn hàng: {rv.orderItemId?.orderCode}
                                </span>
                            </div>
                        </div>
                    )
                })}
            </div>
            {allReviews?.data?.data?.review.length === 0 && (
                <div className="text-center py-20 text-gray-400">
                    Chưa có đánh giá nào
                </div>
            )}
            <PaginationCustom
                total={allReviews?.data?.data?.totalItem}
                valuePage={valuePage}
                handleChangePage={(e, value) => setValuePage(value)}
                limit={6}
            />
        </div>
    );
}
