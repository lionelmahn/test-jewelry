import { create } from "zustand";

export const commonStore = create((set, get) => ({
    value: false,
    showBot: false,
    setValue: (value) => {
        set({ value })
    },
    setShowBot: (showBot) => {
        set({ showBot })
    },
    showChat: false,
    setShowChat: (showChat) => {
        set({ showChat })
    },
    next: null,
    setNext: (next) => {
        set({ next })
    },
    customData: {
        jewelryType: null,
        size: null,
        budget: null,
        material: null,
        gem: null,
        gram: 0,
        carat: 0,
        subTotal: 0,
    },

    setCustomData: (data) =>
        set({
            customData: data,
        }),
}))