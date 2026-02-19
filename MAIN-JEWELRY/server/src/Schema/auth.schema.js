import z, { email } from "zod"
export const regiaterSchema = z.object({
    fullName: z.string(),
    email: z.email("Email không hợp lệ"),
    password: z.string().min(8, "Mật khẩu ít nhất 8 ký tự").max(100, "Mật khẩu quá dài"),
})
export const loginSchema = z.object({
    email: z.email("Email không hợp lệ"),
    password: z.string().min(8, "Mật khẩu ít nhất 8 ký tự").max(100, "Mật khẩu quá dài"),
})