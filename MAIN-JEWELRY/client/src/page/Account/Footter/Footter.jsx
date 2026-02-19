import { Facebook, Instagram, Twitter } from 'lucide-react'
import React from 'react'

export const Footter = () => {
    return (
        <div className='container grid grid-cols-5 gap-8'>
            <div className="space-y-3">
                <h2 className='font-luxurious text-[30px] text-secondary'>Liora Jewelry</h2>
                <p className='font-li'>Chế tác trang sức vượt thời gian với niềm đam mê và sự tỉ mỉ trong hơn 30 năm. Mỗi món trang sức đều kể một câu chuyện về sự thanh lịch và tinh tế.</p>
                <div className='flex items-center gap-3'>
                    <div className='w-10 h-10 rounded-full bg-secondary text-white flex items-center justify-center'>
                        <Facebook size={16} />
                    </div>
                    <div className='w-10 h-10 rounded-full bg-secondary text-white flex items-center justify-center'>
                        <Instagram size={16} />
                    </div>
                    <div className='w-10 h-10 rounded-full bg-secondary text-white flex items-center justify-center'>
                        <Twitter size={16} />
                    </div>
                </div>
            </div>
            <div className="space-y-3">
                <h2 className='font-foot-h2'>Công ty</h2>
                <ul className="space-y-3">
                    <li className="font-li">Về chúng tôi</li>
                    <li className="font-li">Câu chuyện của chúng tôi</li>
                    <li className="font-li">Nghề nghiệp</li>
                    <li className="font-li">Nhấn</li>
                </ul>
            </div>
            <div className="space-y-3">
                <h2 className='font-foot-h2'>Bộ sưu tập</h2>
                <ul className="space-y-3">
                    <li className="font-li">Nhẫn đính hôn</li>
                    <li className="font-li">Nhẫn cưới</li>
                    <li className="font-li">Dây chuyền</li>
                    <li className="font-li">Bông tai</li>
                </ul>
            </div>
            <div className="space-y-3">
                <h2 className='font-foot-h2'>Ủng hộ</h2>
                <ul className="space-y-3">
                    <li className="font-li">Liên hệ với chúng tôi</li>
                    <li className="font-li">Hướng dẫn chọn kích cỡ</li>
                    <li className="font-li">Hướng dẫn chăm sóc</li>
                    <li className="font-li">Bảo hành</li>
                </ul>
            </div>
            <div className="space-y-3">
                <h2 className='font-foot-h2'>Luôn cập nhật</h2>
                <p className="font-li">Đăng ký nhận bản tin của chúng tôi để nhận được các ưu đãi và thông tin cập nhật độc quyền.</p>
                <div className='space-y-3'>
                    <input type="text" name="" id="" placeholder='Your Email' className='py-2.25 px-4.25 rounded-full border-none bg-white focus:border-none block w-full' />
                    <button className='btn py-2.25 px-4.25 bg-secondary block w-full'>Đặt mua</button>
                </div>
            </div>
        </div>
    )
}
