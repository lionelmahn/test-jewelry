import z from "zod";

export const createCouponSchema = z.object({
    code: z.string().min(1),
    discountType: z.enum(["percent", "fixed"]),
    discountValue: z.number().positive(),
    minOrderValue: z.number().min(0),
    startDate: z.coerce.date().optional(),
    endDate: z.coerce.date().optional(),
    isActive: z.boolean()
}).superRefine((data, ctx) => {
    if (data.discountType === "percent" && data.discountValue > 100) {
        ctx.addIssue({
            path: ["discountValue"],
            message: "Giảm phần trăm không được vượt quá 100",
        });
    }
    if (data.isActive) {
        if (!data.startDate || !data.endDate) {
            ctx.addIssue({
                path: ["startDate"],
                message: "Phải chọn thời gian khi kích hoạt mã giảm giá",
            });
        }
        if (
            data.startDate &&
            data.endDate &&
            data.endDate <= data.startDate
        ) {
            ctx.addIssue({
                path: ["endDate"],
                message: "Ngày kết thúc phải sau ngày bắt đầu",
            });
        }
    }
});
export const updateCouponSchema = createCouponSchema
