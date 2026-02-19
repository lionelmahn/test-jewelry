import { Component, Handbag, Heart, User } from 'lucide-react'
import React from 'react'
import { Link, Outlet } from 'react-router'

export const Profile = () => {
    return (
        <div className='px-16'>
            <div className='flex gap-8'>
                <div className='w-70 bg-white shadow-xl p-6 h-86.5 mt-16 rounded-xl space-y-4'>
                    <Link to={"/account"} className='flex items-center gap-3 hover:bg-main hover:text-secondary py-3 px-4 rounded-xl'>
                        <User />
                        <p className='font-medium'>Hồ sơ</p>
                    </Link>
                    <Link to={"order"} className='flex items-center gap-3 hover:bg-main hover:text-secondary py-3 px-4 rounded-xl'>
                        <Handbag />
                        <p className='font-medium'>Đơn hàng</p>
                    </Link>
                    <Link to={"wish"} className='flex items-center gap-3 hover:bg-main hover:text-secondary py-3 px-4 rounded-xl'>
                        <Heart />
                        <p className='font-medium'>Sản phẩm yêu thích</p>
                    </Link>
                    <Link to={"design"} className='flex items-center gap-3 hover:bg-main hover:text-secondary py-3 px-4 rounded-xl'>
                        <Component />
                        <p className='font-medium'>Sản phẩm theo yêu cầu</p>
                    </Link>
                </div>
                <div className='flex-1'>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}
