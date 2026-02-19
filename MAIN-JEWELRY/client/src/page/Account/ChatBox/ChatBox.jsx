import { useGetListChatBot } from '@/hooks/ChatBot/useGetListChatBot'
import { ChatBoxStore } from '@/store/chatBoxStore/ChatBoxStore'
import { commonStore } from '@/store/commonStore/commonStore'
import { useVirtualizer } from '@tanstack/react-virtual'
import { SendHorizontal, X } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router'

export const ChatBox = () => {
    const { setShowBot } = commonStore()
    const scrollRef = useRef(null)
    const loadingMoreRef = useRef(false)
    const [historyMessages, setHistoryMessages] = useState([])
    const [liveMessages, setLiveMessages] = useState([])
    const [cursor, setCursor] = useState(null)
    const [hasMore, setHasMore] = useState(false)
    const [sending, setSending] = useState(false)
    const [loadingOld, setLoadingOld] = useState(false)
    const { register, handleSubmit, reset } = useForm()
    const { sendMessage } = ChatBoxStore()
    const [fetchCursor, setFetchCursor] = useState(null)
    const { messagesInfo, isLoading } = useGetListChatBot({
        limit: 10,
        cursor: fetchCursor,
    })
    const onSubmit = async ({ message }) => {
        if (!message) return
        setSending(true)
        setLiveMessages((prev) => [
            ...prev,
            { role: 'user', message, products: [] },
        ])
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight
        const data = await sendMessage(message)
        console.log(data)
        setLiveMessages((prev) => [
            ...prev,
            {
                role: 'assistant', message: data?.data?.answer
                , products: data?.data?.products
            },
        ])
        reset()
        setSending(false)
    }
    console.log(liveMessages, "liveMessagesliveMessages")
    const mergeAndSortMessages = (prev, next) => {
        const map = new Map()
            ;[...prev, ...next].forEach((m) => {
                map.set(m._id, m)
            })
        return Array.from(map.values()).sort(
            (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
        )
    }
    useEffect(() => {
        if (!messagesInfo?.data?.data) return
        loadingMoreRef.current = false
        setLoadingOld(false)
        const { messages, nextCursor, hasMore } = messagesInfo.data.data
        console.log(messagesInfo.data.data, "messagesInfo.data.datamessagesInfo.data.data")
        console.log(cursor, "cursorcursor")
        setLiveMessages([])
        setHistoryMessages((prev) => {
            if (!fetchCursor) return messages
            return mergeAndSortMessages(prev, messages)
        })
        setCursor(nextCursor)
        setHasMore(hasMore)
    }, [messagesInfo])
    const handleScroll = (e) => {
        const { scrollTop } = e.target

        if (
            scrollTop === 0 &&
            hasMore &&
            !isLoading &&
            !loadingMoreRef.current
        ) {
            loadingMoreRef.current = true
            setLoadingOld(true)
            setFetchCursor(cursor)
        }
    }
    const messages = [...historyMessages, ...liveMessages]
    console.log(historyMessages, "historyMessages")
    console.log(liveMessages, "liveMessages")
    console.log(messages, "messagesmessages")
    useEffect(() => {
        const el = scrollRef.current
        console.log(el, "ggjijghj")
        if (!el) return
        el.scrollTop = el.scrollHeight
        console.log(el.scrollHeight, "ppppppp")
    }, [])
    console.log(messages, "messagesmessagesmessagesmessagesmessages")
    return (
        <div className="fixed bottom-20 right-6 z-50">
            <div className="w-80 h-105 bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden">
                <div className="flex items-center justify-between px-4 py-3 bg-primary text-white">
                    <span className="font-semibold">AI Assistant</span>
                    <X
                        className="cursor-pointer hover:text-red-300"
                        onClick={() => setShowBot(false)}
                    />
                </div>
                <div
                    className="flex-1 px-4 py-3 space-y-3 overflow-y-auto bg-gray-50"
                    onScroll={handleScroll}
                    ref={scrollRef}
                >
                    {loadingOld && (
                        <div className="flex justify-center py-2">
                            <div className="loader" style={{ width: "30px" }}></div>
                        </div>
                    )}
                    {messages.map((msg, index) => (
                        <div key={index}>
                            {msg.role === 'assistant' ? (
                                <div className="flex items-start">
                                    <div className="bg-secondary text-white text-sm px-3 py-2 rounded-2xl rounded-tl-none max-w-[80%] whitespace-pre-line">
                                        {msg.message}
                                    </div>
                                </div>
                            ) : (
                                <div className="flex justify-end">
                                    <div className="bg-gray-200 text-sm px-3 py-2 rounded-2xl rounded-tr-none max-w-[80%] whitespace-pre-line">
                                        {msg.message}
                                    </div>
                                </div>
                            )}
                            {msg.products?.length > 0 && (
                                <div className="mt-2 w-20 space-y-2">
                                    {msg.products.map((p) => (
                                        <div
                                            key={p._id}
                                            className="min-w-35 bg-white border rounded-xl p-2 shadow-sm"
                                        >
                                            <img
                                                src={p.images?.[0]?.url}
                                                alt={p.name}
                                                className="w-full h-24 object-cover rounded-lg"
                                            />
                                            <div className="mt-1 text-sm font-medium line-clamp-2 text-[14px]">
                                                {p.name}
                                            </div>
                                            <div className='bg-primary flex items-center justify-center text-white mt-2 rounded-2xl text-[14px]'>
                                                <Link to={`/product/detail/${p._id}`}>Xem chi tiết</Link>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                    {sending && (
                        <div className="text-sm text-gray-400 italic">
                            <div className='loader-dot'></div>
                        </div>
                    )}
                </div>
                <div className="p-3 border-t">
                    <form onSubmit={handleSubmit(onSubmit)} className="flex gap-2">
                        <textarea
                            {...register('message')}
                            placeholder="Nhập câu hỏi..."
                            rows={1}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    e.preventDefault()
                                    handleSubmit(onSubmit)()
                                }
                            }}
                            className="flex-1 resize-none border rounded-2xl px-4 py-2 text-sm
             focus:outline-none focus:ring-2 focus:ring-primary
             max-h-32 overflow-y-auto"
                        />
                        <button
                            type="submit"
                            className=" text-primary text-sm cursor-pointer"
                        >
                            <SendHorizontal />
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}
