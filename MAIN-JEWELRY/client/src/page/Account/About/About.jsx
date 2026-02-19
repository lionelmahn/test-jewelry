import React from 'react'
import about_banner from "../../../assets/DIV-5.png"
import * as LucideIcons from "lucide-react";
import { ShieldAlert } from 'lucide-react'
export const About = () => {
    const heritageData = {
        heading: "Câu chuyện về di sản của chúng ta",
        description: [
            "Được thành lập vào năm 1992 bởi nghệ nhân kim hoàn bậc thầy Marcus Liora, hành trình của chúng tôi bắt đầu với một tầm nhìn đơn giản nhưng sâu sắc: tạo ra những món trang sức vượt thời gian và trở thành những vật gia truyền quý giá cho các thế hệ mai sau.",
            "Khởi đầu từ một xưởng nhỏ nằm ngay trung tâm khu phố trang sức, nay đã phát triển thành một thương hiệu nổi tiếng, nhưng chúng tôi chưa bao giờ quên đi những giá trị cốt lõi của mình - tay nghề thủ công xuất sắc, dịch vụ tận tâm và niềm tin rằng mỗi món trang sức đều nên kể một câu chuyện độc đáo.",
            "Ngày nay, dưới sự dẫn dắt của thế hệ thứ hai, chúng tôi tiếp tục tôn vinh các kỹ thuật truyền thống đồng thời đón nhận những phương pháp thiết kế sáng tạo, đảm bảo mỗi sản phẩm của Liora đều mang vẻ đẹp vượt thời gian và hiện đại."
        ],

        timeline: [
            {
                year: "1992",
                title: "Được thành lập bởi Marcus Liora",
                description: "Bắt đầu từ các kỹ thuật chế tác trang sức truyền thống."
            },
            {
                year: "2010",
                title: "Sự công nhận quốc tế",
                description: "Được trao giải Nhà thiết kế trang sức thủ công xuất sắc nhất"
            },
            {
                year: "2023",
                title: "Đổi mới kỹ thuật số",
                description: "Ra mắt nền tảng xem trước AR và thiết kế tùy chỉnh."
            }
        ],

        images: [
            {
                src: "https://i0.wp.com/trangspa.vn/wp-content/uploads/2021/07/Che-tac-la-gi-trang-spa.jpg",
                caption: "Xưởng sản xuất ban đầu của chúng tôi - năm 1992"
            },
            {
                src: "https://cezan.edu.vn/uploads/910/90702880-6baa-4c3c-a0d7-a31b183e3549.jpeg"
            },
            {
                src: "https://mdjluxury.vn/wp-content/uploads/2018/08/xuong-MDJ.jpg"
            }
        ]
    };

    const valuesData = {
        heading: "Giá trị và nguyên tắc của chúng tôi",
        description:
            "Những giá trị cốt lõi này định hướng mọi hoạt động của chúng tôi, từ việc lựa chọn nguyên liệu đến khâu hoàn thiện cuối cùng của từng sản phẩm.",
        items: [
            {
                title: "Chất lượng vượt trội",
                description:
                    "Chúng tôi chỉ sử dụng những nguyên liệu tốt nhất và áp dụng các tiêu chuẩn chất lượng nghiêm ngặt để đảm bảo mỗi sản phẩm đều đáp ứng những yêu cầu khắt khe của chúng tôi.",
                icon: "Gem"
            },
            {
                title: "Nghề thủ công bậc thầy",
                description:
                    "Mỗi sản phẩm đều được chế tác thủ công tỉ mỉ bởi các nghệ nhân lành nghề, những người mang trong mình hàng chục năm kinh nghiệm.",
                icon: "Hand"
            },
            {
                title: "Thiết kế vượt thời gian",
                description:
                    "Những thiết kế của chúng tôi vượt qua các xu hướng nhất thời, tạo ra những sản phẩm luôn đẹp và phù hợp với nhiều thế hệ.",
                icon: "Clock"
            },
            {
                title: "Kết nối cá nhân",
                description:
                    "Chúng tôi tin rằng trang sức nên kể câu chuyện của bạn, đó là lý do chúng tôi cung cấp dịch vụ cá nhân hóa và các tùy chọn thiết kế theo yêu cầu.",
                icon: "Heart"
            },
            {
                title: "Niềm tin & Sự chính trực",
                description:
                    "Được xây dựng trên nền tảng minh bạch và trung thực, chúng tôi cung cấp thông tin chi tiết về mọi loại đá và kim loại mà chúng tôi sử dụng.",
                icon: "ShieldCheck"
            },
            {
                title: "Thực hành bền vững",
                description:
                    "Chúng tôi cam kết thực hiện các hoạt động tìm nguồn cung ứng có đạo đức và có trách nhiệm với môi trường trong mọi khía cạnh kinh doanh.",
                icon: "Leaf"
            }
        ]
    };
    const data = {
        heading: "Nghệ thuật chế tác",
        description: "Từ ý tưởng ban đầu đến khâu hoàn thiện cuối cùng, mỗi món trang sức đều trải qua một quy trình tỉ mỉ kết hợp kỹ thuật truyền thống với sự đổi mới hiện đại để tạo ra những sản phẩm trang sức có vẻ đẹp và chất lượng vượt trội.",
        items: [
            {
                title: "Thiết kế & Ý tưởng",
                img: "https://bizweb.dktcdn.net/100/302/551/files/quy-trinh-che-tac-trang-suc-bac-4.jpg?v=1745295291062",
                paragraph: "Mỗi tác phẩm đều bắt đầu từ nguồn cảm hứng, được phác thảo và tinh chỉnh cẩn thận cho đến khi thiết kế hoàn hảo ra đời.",
                list: [
                    {
                        text: "Được làm thủ công với độ chính xác và sự tỉ mỉ."
                    },
                    {
                        text: "Kiểm tra chất lượng ở mọi giai đoạn."
                    },
                    {
                        text: "Được bảo hành trọn đời."
                    }
                ]
            },
            {
                title: "Lựa chọn vật liệu",
                img: "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3",
                paragraph:
                    "Chúng tôi lựa chọn kỹ lưỡng những kim loại và đá quý tốt nhất, đảm bảo mỗi loại vật liệu đều đáp ứng các tiêu chuẩn khắt khe của chúng tôi.",
                list: [
                    { text: "Được làm thủ công với độ chính xác và sự tỉ mỉ." },
                    { text: "Kiểm tra chất lượng ở mọi giai đoạn." },
                    { text: "Được bảo hành trọn đời" }
                ]
            },
            {
                title: "Chế tác chuyên nghiệp",
                img: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519",
                paragraph:
                    "Các nghệ nhân bậc thầy thổi hồn vào thiết kế bằng cách sử dụng các kỹ thuật truyền thống lâu đời và các công cụ hiện đại với độ chính xác cao.",
                list: [
                    { text: "Được làm thủ công với độ chính xác và sự tỉ mỉ." },
                    { text: "Kiểm tra chất lượng ở mọi giai đoạn." },
                    { text: "Được bảo hành trọn đời" }
                ]
            },
            {
                title: "Đảm bảo chất lượng",
                img: "https://images.unsplash.com/photo-1586864387789-628af9feed72",
                paragraph:
                    "Các nghệ nhân bậc thầy thổi hồn vào thiết kế bằng cách sử dụng các kỹ thuật truyền thống lâu đời và các công cụ hiện đại với độ chính xác cao.",
                list: [
                    { text: "Được làm thủ công với độ chính xác và sự tỉ mỉ." },
                    { text: "Kiểm tra chất lượng ở mọi giai đoạn." },
                    { text: "Được bảo hành trọn đời" }
                ]
            }
        ]
    }
    const awardsData = {
        heading: "Giải thưởng & Chứng nhận",
        description:
            "Cam kết của chúng tôi đối với sự xuất sắc đã được ghi nhận bởi các tổ chức hàng đầu trong ngành, và chúng tôi duy trì những chứng nhận cao nhất nhằm đảm bảo chất lượng và tiêu chuẩn đạo đức.",
        sectionTitle: "Giải thưởng & Thành tựu",
        items: [
            {
                year: "2023",
                title: "Thương hiệu Trang sức Cao cấp Xuất sắc Nhất",
                organization: "Giải thưởng Trang sức Quốc tế",
                icon: "Trophy"
            },
            {
                year: "2022",
                title: "Xuất sắc trong Nghệ thuật Chế tác",
                organization: "Hiệp hội Đá quý Hoa Kỳ",
                icon: "Medal"
            },
            {
                year: "2021",
                title: "Doanh nghiệp Trang sức Bền vững Hàng đầu",
                organization: "Hội đồng Doanh nghiệp Xanh",
                icon: "Leaf"
            },
            {
                year: "2020",
                title: "Nhà Thiết kế của Năm",
                organization: "Viện Thiết kế Trang sức",
                icon: "Star"
            },
            {
                year: "2019",
                title: "Đổi mới trong Thiết kế Theo Yêu cầu",
                organization: "Hội nghị Công nghệ Trang sức",
                icon: "Lightbulb"
            },
            {
                year: "2018",
                title: "Xuất sắc trong Dịch vụ Khách hàng",
                organization: "Giải thưởng Bán lẻ Xuất sắc",
                icon: "Heart"
            },
            {
                year: "2017",
                title: "Giải thưởng Bảo tồn Di sản",
                organization: "Hiệp hội Nghệ nhân",
                icon: "Landmark"
            },
            {
                year: "2015",
                title: "Công nhận Nghệ nhân Bậc thầy",
                organization: "Hội đồng Nghệ nhân Quốc tế",
                icon: "Hammer"
            }
        ]
    };

    return (
        <div>
            <div className='w-full'>
                <img src={about_banner} alt="" className='w-full object-cover' />
            </div>
            <div className=''>
                <div className='relative mx-16'>
                    <div className='absolute -top-137.5 w-150  text-white'>
                        <h2 className='text-[48px] font-bold'>Kiến tạo vẻ đẹp thanh lịch vượt thời gian từ năm 1992.</h2>
                        <p className='text-[18px] font-extralight mt-6'>Trong hơn ba thập kỷ qua, Liora Jewelers luôn đồng nghĩa với tay nghề thủ công xuất sắc, chất lượng không thỏa hiệp và thiết kế vượt thời gian. Mỗi sản phẩm chúng tôi tạo ra đều kể một câu chuyện về niềm đam mê, sự tỉ mỉ và theo đuổi sự hoàn hảo.</p>
                        <div className='mt-8 gap-4 flex'>
                            <button className='btn'>Bộ sưu tập của chúng tôi</button>
                            <button className='bg-transparent border-white border btn'>Xem câu chuyện của chúng tôi</button>
                        </div>
                    </div>
                </div>
                <div className='my-20 mx-16'>
                    <div className='grid grid-cols-2 gap-16 items-center'>
                        <div>
                            <div className='space-y-6'>
                                <h3 className='font-bold text-[36px] text-primary'>{heritageData.heading}</h3>
                                {heritageData.description.map((de) => (
                                    <p className='font-extralight'>{de}</p>
                                ))}
                            </div>
                            <div className='mt-12 space-y-4'>
                                {heritageData.timeline.map((time) => (
                                    <div className='flex items-center gap-4'>

                                        <div className="size-12 bg-primary rounded-full flex items-center justify-center text-[14px] font-bold text-white">
                                            <p>{time.year}</p>
                                        </div>
                                        <div>
                                            <h4 className='font-semibold'>{time.title}</h4>
                                            <p>{time.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className='space-y-4'>
                            <div className='rounded-2xl overflow-hidden h-80 w-147'>
                                <img src={heritageData.images[0].src} alt="" className='w-full object-cover h-full' />
                            </div>
                            <div className='flex items-center gap-4'>
                                {heritageData.images.map((img, index) => {
                                    return (
                                        index >= 1 && <div className='w-71.5 h-50 rounded-2xl overflow-hidden'>
                                            <img src={img.src} alt="" className='w-full object-cover h-full' />
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
                <div className='bg-white px-16 py-20'>
                    <div className='text-center'>
                        <h2 className='font-bold text-[36px] text-primary'>{valuesData.heading}</h2>
                        <p className='font-extralight text-[18px] mt-2'>{valuesData.description}</p>
                    </div>
                    <div className='mt-16 grid grid-cols-3 gap-8'>
                        {valuesData.items.map((item) => {
                            const Icon = LucideIcons[item.icon]
                            return (
                                <div className='space-y-2 bg-[#FAF6F1] p-8 text-center rounded-xl'>
                                    <div className='flex justify-center'>
                                        <div className='size-16 rounded-full flex items-center justify-center bg-primary text-white'>
                                            {Icon && <Icon size={30} />}
                                        </div>
                                    </div>
                                    <h4 className='text-[20px] font-roboto font-semibold'>
                                        {item.title}
                                    </h4>
                                    <p className='font-extralight'>{item.description}</p>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className='mx-16 py-20'>
                    <div>
                        <div className='text-center space-y-2'>
                            <h2 className='font-bold text-[36px] text-primary'>{data.heading}</h2>
                            <p className='font-extralight w-3xl mx-auto'>{data.description}</p>
                        </div>
                        <div className='space-y-16 mt-16'>
                            {data.items.map((item, index) => {
                                return (
                                    index % 2 === 0 ?
                                        <div className='flex items-center gap-12'>
                                            <div className='min-w-149 h-100 rounded-2xl overflow-hidden'>
                                                <img src={item.img} alt="" className='w-full h-full object-cover' />
                                            </div>
                                            <div className='space-y-4'>
                                                <h2 className='font-bold text-[30px]'>{item.title}</h2>
                                                <p className='font-extralight text-[18px]'>{item.paragraph}</p>
                                                <ul className='space-y-2 font-extralight text-[14px] list-disc ml-4'>
                                                    {item.list.map((l) => (
                                                        <li>{l.text}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                        :
                                        <div className='flex items-center gap-12'>
                                            <div className='space-y-4'>
                                                <h2 className='font-bold text-[30px]'>{item.title}</h2>
                                                <p className='font-extralight text-[18px]'>{item.paragraph}</p>
                                                <ul className='space-y-2 font-extralight text-[14px] list-disc ml-4'>
                                                    {item.list.map((l) => (
                                                        <li>{l.text}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                            <div className='min-w-149 h-100 rounded-2xl overflow-hidden'>
                                                <img src={item.img} alt="" className='w-full h-full object-cover' />
                                            </div>
                                        </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
                <div className='mx-16 py-20'>
                    <div>
                        <div className='text-center'>
                            <h2 className='font-bold text-[36px] text-primary'>{awardsData.heading}</h2>
                            <p className='font-extralight w-3xl mx-auto mt-2'>{awardsData.description}</p>
                        </div>
                        <div className='mt-16 text-center'>
                            <p className='font-bold text-[24px]'>{awardsData.sectionTitle}</p>
                        </div>
                        <div className='grid grid-cols-4 gap-6 mt-8'>
                            {awardsData.items.map((item, index) => {
                                const Icon = LucideIcons[item.icon];
                                return (
                                    <div key={index} className="bg-white rounded-xl p-6 text-center">
                                        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#C8A46A]">
                                            {Icon && <Icon size={22} color="#fff" />}
                                        </div>

                                        <p className="text-[#C8A46A] font-semibold">{item.year}</p>
                                        <h4 className="font-semibold mt-2">{item.title}</h4>
                                        <p className="text-sm text-gray-500 mt-1">
                                            {item.organization}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}