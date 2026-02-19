import { MaterialService } from "@/service/material/MaterialService";
import { create } from "zustand";

export const materialStone = create(() => ({
    createMaterial: async (payload) => {
        const createData = await MaterialService.createMaterial(payload);
        return createData
    },
    updateMaterial: async (id, payload) => {
        const updateDat = await MaterialService.updateMaterial(id, payload)
        return updateDat;
    },
    deleteMaterial: async (id) => {
        const deleteData = await MaterialService.deleteMaterial(id);
        return deleteData
    }
})) 