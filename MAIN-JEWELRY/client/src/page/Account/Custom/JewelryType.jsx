import React, { useEffect, useState } from 'react'
import img_1 from "../../../assets/IMG-83.png"
import img_2 from "../../../assets/IMG-91.png"
import img_3 from "../../../assets/IMG-99.png"
import img_4 from "../../../assets/IMG-107.png"
import img_5 from "../../../assets/IMG-115.png"
import img_6 from "../../../assets/IMG-123.png"
import { useNavigate } from 'react-router'
import { Check } from 'lucide-react'
import { commonStore } from '@/store/commonStore/commonStore'
export const JewelryType = () => {
    const [selectedType, setSelectedType] = useState(null)
    const { next, setNext } = commonStore()
    const navigate = useNavigate()
    const data = [
        {
            id: 1,
            img: img_1,
            type: "Nhẫn",
            name: "RING"
        },
        {
            id: 2,
            img: img_2,
            type: "Vòng cổ",
            name: "NECKLACE"
        },
        {
            id: 3,
            img: img_3,
            type: "Vòng tay",
            name: "BRACELET"
        },
        {
            id: 4,
            img: img_4,
            type: "Bông tai",
            name: "EARRING"
        },
        {
            id: 5,
            img: img_5,
            type: "Mặt dây chuyền"
        },
        {
            id: 6,
            img: img_6,
            type: "Vương miện"
        }
    ]
    const handleSelect = () => {
        console.log(next, "bgnbngb")
        navigate("/custom/infomation")
    }
    return (
        <div className='px-16 py-16'>
            <div className="max-w-6xl mx-auto mb-12 px-4">
                <div className="flex items-center justify-center gap-4">
                    <div className="flex items-center gap-2 text-primary">
                        <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold">1</div>
                        <span className="font-semibold hidden sm:inline">Chọn loại</span>
                    </div>
                    <div className="w-16 h-1 bg-gray-300"></div>
                    <div className="flex items-center gap-2 text-gray-400">
                        <div className="w-10 h-10 rounded-full bg-gray-300 text-white flex items-center justify-center font-bold">2</div>
                        <span className="font-semibold hidden sm:inline">Nhập thông tin</span>
                    </div>
                    <div className="w-16 h-1 bg-gray-300"></div>
                    <div className="flex items-center gap-2 text-gray-400">
                        <div className="w-10 h-10 rounded-full bg-gray-300 text-white flex items-center justify-center font-bold">3</div>
                        <span className="font-semibold hidden sm:inline">Thiết kế</span>
                    </div>
                </div>
            </div>
            <div className='text-center mb-12'>
                <h2 className='text-[28px] font-bold text-primary'>Bước 1 – Chọn loại trang sức</h2>
                <p className='font-light text-[14px]'>Chọn loại trang sức bạn muốn tùy chỉnh.</p>
            </div>
            <div className='grid grid-cols-3 gap-6'>
                {data.map((item) => (
                    <div
                        key={item.id}
                        onClick={() => setNext(item.name)}
                        className={`
              relative bg-white shadow-xl rounded-xl overflow-hidden
              cursor-pointer
              ${next === item.name ? "ring-2 ring-primary" : ""}
            `}
                    >
                        <img src={item.img} className="w-full object-cover" />

                        <div className="text-center p-4 font-medium text-[18px]">
                            {item.type}
                        </div>

                        {next === item.name && (
                            <div className="absolute top-3 right-3 bg-secondary w-7 h-7 rounded-full flex items-center justify-center text-white">
                                <Check size={18} />
                            </div>
                        )}
                    </div>
                ))}
            </div>
            <div className='mt-12'>
                <div className='flex items-center justify-between'>
                    <button disabled className='btn rounded-xl  bg-gray-600 text-[#6B7280] cursor-not-allowed '>Quay lại</button>
                    <button disabled={!next}
                        className="
            btn rounded-xl
            disabled:bg-gray-600
            disabled:text-[#6B7280]
            disabled:cursor-not-allowed
            cursor-pointer
          " onClick={handleSelect}>Tiếp tục</button>
                </div>
            </div>
        </div>
    )
}
