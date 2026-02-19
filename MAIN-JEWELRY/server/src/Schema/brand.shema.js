import z from "zod";

export const createBrandSchema = z.object({
    name: z.string().min(1, "Thiếu tên thương hiếu")
})
export const updateBrandSchema = createBrandSchema