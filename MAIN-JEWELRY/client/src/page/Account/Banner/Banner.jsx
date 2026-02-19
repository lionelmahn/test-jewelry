import { Link } from "react-router"
import banner from "../../../assets/banner.jpg"
export const Banner = () => {
    return (
        <div className="relative">
            <div>
                <img src={banner} alt="" className="img" />
            </div>
            <div className="absolute top-1/2 -translate-y-1/2 w-2xl left-16">
                <h2 className="font-bold text-[60px] text-white">
                    Tỏa sáng rực rỡ như viên kim cương
                </h2>
                <p className="font-extralight text-[18px] text-white mb-8">
                    Trang sức vượt thời gian được chế tác bằng sự tinh khiết và niềm đam mê. Khám phá bộ sưu tập trang sức thủ công tinh xảo của chúng tôi, tôn vinh những khoảnh khắc quý giá trong cuộc sống.
                </p>
                <div className="space-x-3 flex">
                    <button className="btn border-none leading-6">
                        Mua ngay
                    </button>
                    <Link to={"/collections"} className="btn1 text-white leading-6">
                        Khám phá
                    </Link>
                </div>
            </div>
        </div>
    )
}
