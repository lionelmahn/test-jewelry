import React from 'react'

export const Stay = () => {
    return (
        <div className='px-7.5 mb-16'>
            <div className='bg-linear-to-r from-primary/20 to-secondary/20 text-center rounded-xl p-12'>
                <div className='space-y-4'>
                    <h3 className='font-h3'>Giữ liên lạc</h3>
                    <p className='font-p'>Hãy là người đầu tiên biết về các bộ sưu tập mới, ưu đãi độc quyền và mẹo chăm sóc trang sức.</p>
                    <div className='space-x-4'>
                        <input type="text" name="" id="" placeholder='Nhập địa chỉ email' className='bg-white py-4.25 px-6.25 rounded-full' />
                        <button className='btn'>Đặt mua</button>
                    </div>
                    <p className='font-p'>Chúng tôi tôn trọng quyền riêng tư của bạn. Bạn có thể hủy đăng ký bất cứ lúc nào.</p>
                </div>
            </div>
        </div>
    )
}
