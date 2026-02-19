import { ChatBoxService } from "@/service/chatBox/ChatBoxService";
import { create } from "zustand";

export const ChatBoxStore = create(() => ({
    sendMessage: async (message) => {
        const mess = await ChatBoxService.createMessage(message)
        return mess
    }
}))