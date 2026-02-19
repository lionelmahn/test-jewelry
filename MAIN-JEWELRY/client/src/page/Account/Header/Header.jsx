import React, { useEffect, useState } from 'react'
import { CreditCard, FileUser, FolderKanban, Handbag, Heart, ListOrdered, LogOut, User } from "lucide-react"
import { UserAuthStore } from '@/store/userAuthStore'
import { Link } from 'react-router'
import { CartStore } from '@/store/cartStore/CartStore'
import { useGetListCart } from '@/hooks/Cart/useGetListCart'
import { wishStore } from '@/store/wishStore/wishStore'
import { useGetListWish } from '@/hooks/Wish/useGetListWish'
export const Header = () => {
    const { logout } = UserAuthStore()
    const { cart, setCartFromServer } = CartStore()
    const { wish, setWishFromServer } = wishStore()
    const { carts, refreshCart } = useGetListCart({
        page: 1,
        limit: 10
    })
    const { wishs, isLoading, refreshWish, error } = useGetListWish({
        page: 1,
        limit: 10
    })
    console.log(carts, "cartscartscarts")
    console.log(wishs, "wishswishswishswishswishs")
    useEffect(() => {
        setCartFromServer(carts?.data?.data?.totalItems)
        setWishFromServer(wishs?.data?.data?.totalItem)
    }, [carts, wishs])

    const [openMenu, setOpenMenu] = useState(false)
    const user = localStorage.getItem("user");
    const dataUser = user ? JSON.parse(user) : null
    console.log(dataUser, ">>>>>useruseruser")
    const handleLogout = async () => {
        await logout()
    }
    console.log(cart, "cartcartcartcart")
    return (
        <div className='container'>
            <div className='flex items-center justify-between'>
                <h2 className='font-luxurious text-[36px] text-secondary'>Liora Jewelry</h2>

                <ul className='flex items-center gap-8 text-[14px] font-medium text-white'>
                    <li>
                        <Link to="/">Trang chủ</Link>
                    </li>
                    <li>
                        <Link to="collections">Sưu tầm</Link>
                    </li>
                    <li>
                        <Link to="compare">So sánh</Link>
                    </li>
                    <li>
                        <Link to="custom">Thiết kế</Link>
                    </li>
                    <li>
                        <Link to="about">Về chúng tôi</Link>
                    </li>
                </ul>


                <ul className='flex gap-3 items-center flex-none'>
                    <li className='size-10 bg-[#CFB795] rounded-full flex items-center justify-center text-white relative'>
                        <Link to={"/wish"}>
                            <Heart size={17} />
                            <div className={`absolute ${wish.length > 0 ? "bg-secondary" : ''} w-6.25 h-6.25 rounded-full flex items-center justify-center font-semibold -top-2 -right-2`}>
                                {wish.length > 0 ? wish.length : ''}
                            </div>
                        </Link>
                    </li>
                    <li
                        className="relative size-10 cursor-pointer rounded-full bg-[#CFB795] flex items-center justify-center text-white"
                        onClick={() => setOpenMenu(!openMenu)}
                    >
                        {dataUser ? (
                            <img
                                src={dataUser.avatar}
                                alt="avatar"
                                className="size-10 rounded-full object-cover border-2 border-white"
                            />
                        ) : (
                            <User size={17} />
                        )}

                        <ul
                            className={`
                            absolute top-14.75 right-0 z-999
                            w-48 rounded-xl bg-secondary
                            shadow-xl overflow-hidden
                            transition-all duration-200
                            ${openMenu
                                    ? "animate-dropdown-open"
                                    : "animate-dropdown-close"}
                            `}
                        >
                            {dataUser && (
                                <li className="px-4 py-3 border-b border-white/10 text-center">
                                    <p className="text-sm font-semibold truncate">
                                        {dataUser.fullName}
                                    </p>
                                </li>
                            )}
                            {dataUser ? (
                                <>
                                    {dataUser.role === "admin" && (
                                        <Link to="/admin/dashboard" className="px-4 py-2 hover:bg-white/10 hover:text-primary transition  flex items-center gap-1">
                                            <FolderKanban size={20} />
                                            <span>Quản trị</span>
                                        </Link>
                                    )}
                                    <Link to={"/account"} className="px-4 py-2 hover:bg-white/10 hover:text-primary transition cursor-pointer flex items-center gap-1">
                                        <FileUser size={20} />
                                        <span>Hồ sơ</span>
                                    </Link>
                                    <li
                                        className="px-4 py-2 hover:bg-red-500/10 hover:text-red-400 transition cursor-pointer flex items-center gap-1"
                                        onClick={handleLogout}
                                    >
                                        <LogOut size={20} />
                                        <span>Đăng xuất</span>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li className="px-4 py-2 hover:bg-white/10 hover:text-primary transition">
                                        <Link to="/sign-up">Đăng ký</Link>
                                    </li>
                                    <li className="px-4 py-2 hover:bg-white/10 hover:text-primary transition">
                                        <Link to="/login">Đăng nhập</Link>
                                    </li>
                                </>
                            )}
                        </ul>
                    </li>
                    <li className='size-10 bg-[#CFB795] rounded-full flex items-center justify-center text-white relative'>
                        <Link to="cart">
                            <Handbag size={17} />
                            <div className={`absolute ${cart.length > 0 ? "bg-secondary" : ''} w-6.25 h-6.25 rounded-full flex items-center justify-center font-semibold -top-2 -right-2`}>
                                {cart.length > 0 ? cart.length : ''}
                            </div>
                        </Link>
                    </li>
                </ul>

            </div>
        </div>
    )
}
