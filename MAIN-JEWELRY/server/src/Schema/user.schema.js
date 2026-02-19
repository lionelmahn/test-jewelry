import z, { email } from "zod";
export const updateUserSchema = z.object({
    fullName: z.string().optional(),
    email: z.email("Email không hợp lệ").optional(),
    phone: z.string().min(10, "Số điện thoại ít nhất 10 số").optional(),
    address: z.string().optional()
})
export const updateRoleSchema = z.object({
    role: z.enum(['admin', 'user'])
})
export const updatePasswordSchema = z.object({
    oldPassword: z.string().min(8, "Mật khẩu cũ ít nhất 8 ký tự").max(100),
    newPassword: z.string().min(8, "Mật khẩu mới ít nhất 8 ký tự").max(100),
})