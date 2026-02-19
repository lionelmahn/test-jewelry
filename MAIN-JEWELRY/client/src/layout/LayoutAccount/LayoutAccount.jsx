import React from 'react'

import { Outlet } from 'react-router'
import { Footter } from '@/page/Account/Footter/Footter'
import { Header } from '@/page/Account/Header/Header'

export const LayoutAccount = () => {
    return (
        <div className='bg-main'>
            <header className='bg-primary py-3 px-16'>
                <Header />
            </header>
            <main className="">
                <Outlet />
            </main>
            <footer className='bg-primary p-16'>
                <Footter />
            </footer>
        </div>
    )
}
