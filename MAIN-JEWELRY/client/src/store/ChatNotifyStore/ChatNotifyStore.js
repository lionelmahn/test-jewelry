import { create } from "zustand";

export const ChatNotifyStore = create((set) => ({
    hasUnread: false,
    markUnread: () => set({ hasUnread: true }),
    clearUnread: () => set({ hasUnread: false }),
}));
