import React, { useState } from 'react'
import { Bot, MessageCircleMore } from 'lucide-react'
import { commonStore } from '@/store/commonStore/commonStore'
import { Banner } from '../Banner/Banner'
import { Service } from '../ServiceShip/service'
import { SaleItem } from '../SaleItem/SaleItem'
import { BestSeller } from '../BestSeller/BestSeller'
import { OurStory } from '../OurStory/OurStory'
import { Featured } from '../Featured/Featured'
import { Stay } from '../Stay/Stay'
import { CustomerChat } from '../CustomerChat/CustomerChat'
import { ChatBox } from '../ChatBox/ChatBox'

export const Home = () => {
    const { setShowBot, showBot, showChat, setShowChat } = commonStore()
    const user = JSON.parse(localStorage.getItem("user"));
    return (
        <div className='relative'>
            <Banner />
            <Service />
            <SaleItem />
            <BestSeller />
            <OurStory />
            <Featured />
            <Stay />
            <div className='bottom-20 fixed right-13'>
                {showBot ? <ChatBox /> : <div className='bg-secondary rounded-full  w-12.5 h-12.5 flex items-center justify-center cursor-pointer'>
                    <Bot onClick={() => setShowBot(true)} size={30} className=' text-white' />
                </div>}
            </div>
            {user?.role === "admin" ? "" : <div className='bottom-35 fixed right-13 z-2'>
                {showChat ? <CustomerChat /> : <div className='bg-secondary rounded-full  w-12.5 h-12.5 flex items-center justify-center cursor-pointer'>
                    <MessageCircleMore onClick={() => setShowChat(true)} size={30} className=' text-white ' /></div>}
            </div>}
        </div>
    )
}
