import z from "zod";

export const createCateSchema = z.object({
    name: z.string(),
    description: z.string(),
})
export const updateCateSchema = z.object({
    name: z.string().optional(),
    description: z.string().optional()
})