import React, { useEffect, useState } from 'react'
import { Preview3DPage } from './Preview3D'
import { commonStore } from '@/store/commonStore/commonStore'
import { formatBigNumber } from '@/lib/format-big-number'
import { CustomService } from '@/service/custom/CustomService'
import { useNavigate } from 'react-router'
import { CustomStore } from '@/store/customStore/CustomStore'
import { toast } from 'react-toastify'

export const DesignPage = () => {
    const { customData, setCustomData, setNext, next } = commonStore()
    const { addCustom } = CustomStore()
    console.log(customData, "customDatacustomDatacustomData")
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [na, setNa] = useState(false)
    const handleRequirement = async () => {
        const sendData = {
            jewelryType: customData.jewelryType,
            material: customData.material,
            gem: customData.gem,
            size: customData.size,
            budget: customData.budget,
            quantity: 1,
        }
        setLoading(true)
        console.log(sendData)
        const res = await addCustom(sendData)
        console.log(res, "resresresres")
        if (res.status === 201) {
            setLoading(false)
            setNa(true)
            toast.success("Gửi yêu cầu thành công")
        }
    }
    console.log(next, "nextnextnextnextnext")
    return (
        <div className='px-16 min-h-screen relative'>
            <div className="max-w-6xl mx-auto mb-12 px-4 mt-12 z-20">
                <div className="flex items-center justify-center gap-4">
                    <div className="flex items-center gap-2 text-primary">
                        <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold">1</div>
                        <span className="font-semibold hidden sm:inline">Chọn loại</span>
                    </div>
                    <div className="w-16 h-1 bg-primary"></div>
                    <div className="flex items-center gap-2 text-primary">
                        <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold">2</div>
                        <span className="font-semibold hidden sm:inline">Nhập thông tin</span>
                    </div>
                    <div className="w-16 h-1 bg-primary"></div>
                    <div className="flex items-center gap-2 text-primary">
                        <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold">3</div>
                        <span className="font-semibold hidden sm:inline">Thiết kế</span>
                    </div>
                </div>
            </div>
            <div className='text-center mb-12 mt-12'>
                <h2 className='text-[28px] font-bold text-primary'>Bước 3 – Thiết kế</h2>
                <p className='font-light text-[14px]'>Xem trang sức đặt làm riêng của bạn ở dạng 3D và xem lại tất cả chi tiết.</p>
            </div>
            <div className='flex gap-12'>
                <div className='flex-1 w-115 flex items-center justify-center bg-white shadow-2xl rounded-2xl'>
                    <Preview3DPage />
                </div>
                <div className='bg-white p-6 w-90 rounded-xl'>
                    <div className='space-y-6'>
                        <h3 className='font-bold text-[20px]'>Thiết kế</h3>
                        <div className='space-y-6'>
                            <div className='flex items-center justify-between'>
                                <p>Loại trang sức</p>
                                <p className='font-bold'>{customData?.jewelryType}</p>
                            </div>
                            <div className='flex items-center justify-between' >
                                <p>Vật liệu</p>
                                <p className='font-bold'>{customData?.material?.name} ({customData?.gram} gram)</p>
                            </div>
                            <div className='flex items-center justify-between' >
                                <p>Purity</p>
                                <p className='font-bold'>{customData?.material?.purity}</p>
                            </div>
                            <div className='flex items-center justify-between'>
                                <p>Đá</p>
                                <p className='font-bold'>{customData?.gem?.name} ({customData?.carat} carat)</p>
                            </div>
                            <div className='flex items-center justify-between text-[20px] font-bold text-primary'>
                                <p>Total</p>
                                <p>{formatBigNumber(customData?.subTotal, true)}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="p-4 flex justify-between mt-12">
                <button onClick={() => navigate("/custom")} className="btn bg-primary rounded-xl cursor-pointer">
                    Quay lại từ đầu
                </button>
                {na ? <button className="btn bg-primary text-white rounded-xl cursor-pointer" onClick={() => navigate("/")}>Về trang chủ</button> : <button onClick={handleRequirement} className="btn bg-primary text-white rounded-xl cursor-pointer">
                    {loading ? "Đang gửi..." : "Gửi yêu cầu chế tác"}
                </button>}
            </div>
        </div>
    )
}
