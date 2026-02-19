import z from "zod";
import { objectIdSchema } from "./commonSchema.js";
export const imageSchema = z.object({
    url: z.string().url("URL ảnh không hợp lệ"),
    isMain: z.boolean().optional(),
});
export const createProductShema = z.object({
    name: z.string().min(1, "Thiếu tên"),
    brandId: objectIdSchema.shape.id,
    categoryId: objectIdSchema.shape.id,
    subCategoryId: objectIdSchema.shape.id,
    promotion: z
        .object({
            isActive: z.boolean(),
            discount: z.coerce.number().optional(),
            startAt: z.coerce.date().nullable().optional(),
            endAt: z.coerce.date().nullable().optional(),
        })
        .optional()
        .superRefine((data, ctx) => {
            if (!data || !data.isActive) return;
            if (data.discount <= 0 || data.discount >= 100) {
                ctx.addIssue({
                    path: ["discount"],
                    message: "Giá trị phải > 0 và < 100",
                });
            }
            const d = Number(data.discount);
            if (d <= 0 || d >= 100) {
                ctx.addIssue({
                    path: ["discount"],
                    message: "Giá trị phải > 0 và < 100",
                });
            }
            if (!(data.startAt)) {
                ctx.addIssue({
                    path: ["startAt"],
                    message: "Chọn ngày bắt đầu",
                });
            }

            if (!(data.endAt)) {
                ctx.addIssue({
                    path: ["endAt"],
                    message: "Chọn ngày kết thúc",
                });
            }

            if (
                data.startAt &&
                data.endAt &&
                data.endAt <= data.startAt
            ) {
                ctx.addIssue({
                    path: ["endAt"],
                    message: "Ngày kết thúc phải sau ngày bắt đầu",
                });
            }
        }).transform((data) => {
            if (!data) return data;
            if (!data.isActive) {
                return {
                    ...data,
                    discount: 0,
                    startAt: null,
                    endAt: null,
                };
            }
            return data;
        }),
    variants: z.array(
        z.object({
            _id: z.string().optional(),
            color: z.string().min(1, "Chưa nhập màu"),
            options: z.array(
                z.object({
                    _id: z.string().optional(),
                    itemId: z.string().min(1, "Chưa nhập mã itemId"),
                    type: z.enum(["CARAT", "GRAM", "MM", "NONE"]),
                    value: z.coerce.number().optional(),
                    purity: z.string().nullable().optional(),
                    stockQuantity: z.coerce.number().min(0, "Số lượng phải ≥ 0"),
                }).refine(
                    (data) => {
                        if (data.type === "NONE") {
                            return data.value === undefined && data.purity === undefined;
                        }
                        return true;
                    },
                    {
                        message: "Không được nhập value / purity khi type là NONE",
                        path: ["value"],
                    }
                )
            ).min(1, "Ít nhất phải có 1 giá trị"),
        })
    ).min(1, "Ít nhất phải có 1 biến thể"),
    images: z.array(imageSchema).min(1, "Phải có ít nhất 1 ảnh"),
    description: z.string().min(1, "Thiếu mô tả"),
    isFeatured: z.boolean().optional(),
    isNewProduct: z.boolean().optional()
})
export const updateProductSchema = createProductShema;