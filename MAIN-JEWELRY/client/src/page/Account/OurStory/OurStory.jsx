import React, { useEffect, useState } from 'react'
import person from "../../../assets/IMG-221.png"
import { commonStore } from '@/store/commonStore/commonStore'
import { useInView } from '@/lib/useInView'

export const OurStory = () => {
    const { value } = commonStore()
    const [count, setCount] = useState(0)
    const [count1, setCount1] = useState(0)
    const [count2, setCount2] = useState(0)
    const { inView, ref } = useInView()
    useEffect(() => {
        if (inView) {
            const timer = setInterval(() => {
                setCount(prev => prev + 1 < 30 ? prev + 1 : 30)
                setCount1(prev => prev + 1 < 50 ? prev + 1 : 50)
                setCount2(prev => prev + 1 < 100 ? prev + 1 : 100)
            }, 50)
            return () => clearInterval(timer)
        } else {
            setCount(0)
            setCount1(0)
            setCount2(0)
        }
    }, [inView])
    return (
        <div className='px-7.5' ref={ref}>
            <div className='grid grid-cols-2 gap-16'>
                <div className='w-full h-117 rounded-2xl overflow-hidden'>
                    <img src={person} alt="" className='w-full h-117 object-cover' />
                </div>
                <div>
                    <h3 className='text-[36px] font-bold mb-6'>Câu chuyện của chúng tôi</h3>
                    <div className='space-y-4 mb-6'>
                        <p className='font-light font-roboto'>Trong hơn ba thập kỷ qua, Liora Jewelers luôn đồng nghĩa với tay nghề thủ công xuất sắc và vẻ đẹp thanh lịch vượt thời gian. Được thành lập vào năm 1990 bởi nghệ nhân kim hoàn bậc thầy Elena Liora, di sản của chúng tôi bắt đầu từ một tầm nhìn đơn giản: tạo ra những món trang sức ghi lại những khoảnh khắc quý giá nhất của cuộc sống.</p>
                        <p className='font-light font-roboto'>Mỗi sản phẩm trong bộ sưu tập của chúng tôi đều kể một câu chuyện về sự tận tâm, nghệ thuật và niềm đam mê. Các nghệ nhân lành nghề của chúng tôi kết hợp kỹ thuật truyền thống với sự đổi mới hiện đại, chỉ sử dụng những vật liệu tốt nhất được tuyển chọn từ các đối tác đáng tin cậy trên toàn thế giới.</p>
                        <p className='font-light font-roboto'>Từ nhẫn đính hôn tượng trưng cho tình yêu vĩnh cửu đến những món trang sức độc đáo tôn vinh những thành tựu cá nhân, chúng tôi tin rằng trang sức nên độc đáo và đẹp đẽ như chính những khoảnh khắc mà chúng kỷ niệm.</p>
                    </div>
                    <div className='grid grid-cols-3 gap-6 mb-6'>
                        <div className='text-center space-y-2'>
                            <p className='text-[30px] text-primary font-bold'>{count}+</p>
                            <p className='text-[14px] font-roboto font-light'>Nhiều năm xuất sắc</p>
                        </div>
                        <div className='text-center space-y-2'>
                            <p className='text-[30px] text-primary font-bold'>{count1}K+</p>
                            <p className='text-[14px] font-roboto font-light'>Khách hàng hài lòng</p>
                        </div>
                        <div className='text-center space-y-2'>
                            <p className='text-[30px] text-primary font-bold'>{count2}+</p>
                            <p className='text-[14px] font-roboto font-light'>Thiết kế độc đáo</p>
                        </div>
                    </div>
                    <div>
                        <button className='btn'>Tìm hiểu thêm về chúng tôi</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
