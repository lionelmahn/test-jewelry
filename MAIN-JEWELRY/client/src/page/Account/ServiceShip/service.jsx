import React from 'react'
import service_1 from "../../../assets/services-1_65x.png"
import service_2 from "../../../assets/services-2_65x.png";
import service_3 from "../../../assets/services-3_65x.png";
import service_4 from "../../../assets/services-4_65x.png";
export const Service = () => {
    return (
        <div className="px-7.5 py-7.5">
            <div className="flex justify-between items-center">
                <div className="h-12.5 flex gap-3 group overflow-hidden">
                    <div className="group-hover:-translate-y-[136%] transition-all duration-500 ease-in-out"><img src={service_1} alt="" /></div>
                    <div>
                        <p className="text-[17px] font-medium">Vận chuyển trên toàn thế giới</p>
                        <p className="text-[15px] text-text">Cho tất cả đơn hàng trên $100</p>
                    </div>
                </div>
                <div className="h-12.5 flex gap-2 overflow-hidden group">
                    <div className="group-hover:-translate-y-[136%] transition-all duration-500 ease-in-out"> <img src={service_2} alt="" /></div>
                    <div>
                        <p className="text-[17px] font-medium">Đảm bảo hoàn tiền</p>
                        <p className="text-[15px] text-text">Đảm bảo trong 30 ngày</p>
                    </div>
                </div>
                <div className="h-12.5 flex gap-2 overflow-hidden group">
                    <div className="group-hover:-translate-y-[136%] transition-all duration-500 ease-in-out"><img src={service_3} alt="" /></div>
                    <div>
                        <p className="text-[17px] font-medium">Ưu đãi và giảm giá</p>
                        <p className="text-[15px] text-text">Trả lại sau 7 ngày</p>
                    </div>
                </div>
                <div className="h-12.5 flex gap-2 overflow-hidden group">
                    <div className="group-hover:-translate-y-[136%] transition-all duration-500 ease-in-out"><img src={service_4} alt="" /></div>
                    <div>
                        <p className="text-[17px] font-medium">Dịch vụ hỗ trợ 24/7</p>
                        <p className="text-[15px] text-text">Liên hệ bất cứ lúc nào</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
