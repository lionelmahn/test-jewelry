import z from "zod";
import { objectIdSchema } from "./commonSchema.js";
export const imageSchema = z.object({
    url: z.string().url("URL ảnh không hợp lệ"),
    isMain: z.boolean().optional(),
});
export const createSubcateSchema = z.object({
    name: z.string().min(1, "Thiếu tên danh mục con"),
    description: z.string().min(1, "Thiếu mô tả"),
    categoryId: objectIdSchema.shape.id,
    images: z.array(imageSchema).min(1, "Phải có ít nhất 1 ảnh")
})
export const updateSubcateSchema = createSubcateSchema