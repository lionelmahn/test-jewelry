import { GemStoneService } from "@/service/gemStone/GemStoneService";
import { create } from "zustand";

export const gemStoneStore = create(() => ({
    createGem: async (payload) => {
        const createData = await GemStoneService.createGemStone(payload)
        return createData
    },
    updateGem: async (id, payload) => {
        const updateData = await GemStoneService.updateGemStone(id, payload)
        return updateData
    },
    deleteGem: async (id) => {
        const deleteData = await GemStoneService.deleteGemStone(id)
        return deleteData
    }
}))