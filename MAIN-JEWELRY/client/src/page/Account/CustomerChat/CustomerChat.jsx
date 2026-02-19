import React, { useEffect, useState } from "react";
import { socket } from "../../../socket";
import { ChatService } from "@/service/Chat/ChatService";
import { SendHorizontal, X } from "lucide-react";
import { commonStore } from "@/store/commonStore/commonStore";

export const CustomerChat = () => {
    const { setShowChat } = commonStore()
    const user = JSON.parse(localStorage.getItem("user"));
    const [msgs, setMsgs] = useState({});
    const [input, setInput] = useState("");
    const roomId = user._id;
    useEffect(() => {
        const loadHistory = async () => {
            const res = await ChatService.getMessageById();
            console.log(res, "resresresres")
            const rooms = res?.data?.data ?? {};
            console.log(rooms, "roomsroomsrooms")
            setMsgs(rooms);
        };
        loadHistory();
    }, []);
    console.log(msgs, "msgsmsgsmsgsmsgsmsgsmsgsmsgsmsgs")
    useEffect(() => {
        socket.emit("customer_open_chat", roomId);
        const handler = (msg) =>
            setMsgs((prev) => ({
                ...prev,
                messages: [...(prev.messages || []), msg]
            }));

        socket.on("message", handler);
        return () => socket.off("message", handler);
    }, []);

    const send = () => {
        socket.emit("customer_message", {
            userId: roomId,
            roomId,
            message: input
        });
        setInput("");
    };

    return (
        <div className="w-75 mx-auto h-105 flex flex-col  rounded-xl shadow-2xl bg-white overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 bg-primary text-white">
                <span className="font-semibold">Nhắn tin</span>
                <X
                    className="cursor-pointer hover:text-red-300"
                    onClick={() => setShowChat(false)}
                />
            </div>

            <div id="chat-box" className="flex-1 overflow-y-auto p-3 space-y-2 bg-gray-50">
                {msgs?.messages?.map((m, i) => (
                    <div key={i} className={`flex ${m.from === "customer" ? "justify-end" : "justify-start items-center gap-3"}`}>
                        {m.from === "admin" ? <div className="w-6 h-6 rounded-full overflow-hidden">
                            <img src="https://cdn-media.sforum.vn/storage/app/media/anh-dep-8.jpg" alt="" className="w-full h-full object-cover" />
                        </div> : <div>
                        </div>}
                        <div
                            className={`mt-2 px-2 py-2 rounded-xl max-w-xs wrap-break-word shadow 
              ${m.from === "customer"
                                    ? "bg-primary text-white rounded-br-none"
                                    : "bg-secondary text-white border rounded-bl-none"}
            `}
                        >
                            {m.message}
                        </div>
                    </div>
                ))}
            </div>

            <div className="p-2 border-t flex gap-2">
                <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="flex-1 p-2 border rounded-lg"
                    placeholder="Nhập tin nhắn..."
                />
                <button onClick={send} className=" text-primary px-4 rounded-lg">
                    <SendHorizontal />
                </button>
            </div>
        </div>
    );
};
