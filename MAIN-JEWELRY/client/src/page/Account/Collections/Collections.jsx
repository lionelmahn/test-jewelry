import { useGetListCategory } from '@/hooks/category/useGetListCategory'
import { useGetListSubcategory } from '@/hooks/subcategoty/useGetListSubcategory'
import React from 'react'
import { Link } from 'react-router'

export const Collections = () => {
    const { subcategory, isLoading, isValidating, refreshSubcategoty } = useGetListSubcategory({ page: 1, limit: 10 })
    return (
        <div className='px-7.5 mb-16'>
            <div className='mb-8 mt-4 text-secondary font-medium'>
                {`Home > Categories`}
            </div>
            <div className='text-center mb-16'>
                <h3 className='font-h3 text-primary'>Khám phá các bộ sưu tập của chúng tôi</h3>
                <p>Khám phá bộ sưu tập trang sức được tuyển chọn kỹ lưỡng của chúng tôi, mỗi món đều được chế tác tỉ mỉ <br></br>và niềm đam mê để trân trọng những khoảnh khắc quý giá nhất của cuộc sống.</p>
            </div>
            <div className='grid grid-cols-3 gap-6'>
                {subcategory?.data?.data?.subcategory.map((item) => {
                    const imgMain = item?.images?.find((img) => img.isMain)
                    return (
                        <Link to={`${item.slug}`} key={item._id} className='rounded-2xl overflow-hidden bg-white'>
                            <div className='w-full h-60'>
                                <img src={imgMain?.url} alt="" className='w-full h-full object-cover' />
                            </div>
                            <div className='p-6'>
                                <div className='text-[20px] font-bold'>
                                    {item.name}
                                </div>
                                <div className='text-[14px] font-light'>
                                    {item.categoryId.name}
                                </div>
                            </div>
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}
