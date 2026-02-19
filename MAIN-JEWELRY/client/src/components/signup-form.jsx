import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Link, useNavigate } from "react-router"
import z, { email } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { UserAuthStore } from "@/store/userAuthStore"
import { useState } from "react"
const SignupSchema = z.object({
  fullName: z.string().min(1, "Tên bắt buộc có"),
  email: z.email("Email không hợp lệ"),
  password: z.string().min(8, "Mật khẩu không ít nhất có 8 kí tự")
})
export function SignupForm({
  className,
  ...props
}) {
  const { signUp } = UserAuthStore()
  const [message, setMessage] = useState("")
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(SignupSchema)
  })
  const onSubmit = async (data) => {
    const { fullName, email, password } = data;
    const resUser = await signUp(fullName, email, password);
    if (resUser.status === 201) {
      navigate("/login")
      console.log(resUser, "mdkcmkdkdvk")
    }
    setMessage(resUser)
  }
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Tạo tài khoản</CardTitle>
          <CardDescription>
            Nhập email của bạn bên dưới để tạo tài khoản
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup>
              <Field>
                {message ? <p className="text-red-500">{message}</p> : ""}
                <FieldLabel htmlFor="name">Họ và tên</FieldLabel>
                <Input
                  id="name"
                  type="text"
                  placeholder="Nguyễn Văn A"
                  className="focus:right-1 focus:ring-primary focus:border-none"
                  {...register("fullName")}
                />
                {errors.fullName && <p className="text-red-500">{errors.fullName.message}</p>}
              </Field>

              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="text"
                  placeholder="m@example.com"
                  className="focus:right-1 focus:ring-primary focus:border-none"
                  {...register("email")}
                />
                {errors.email && <p className="text-red-500">{errors.email.message}</p>}
              </Field>

              <Field>
                <FieldLabel htmlFor="password">Mật khẩu</FieldLabel>
                <Input
                  id="password"
                  type="password"
                  className="w-full focus:right-1 focus:ring-primary focus:border-none"
                  {...register("password")}
                />
                {errors.password && <p className="text-red-500">{errors.password.message}</p>}
              </Field>

              <Field>
                <Button type="submit" className="cursor-pointer" disabled={isSubmitting}>Tạo tài khoản</Button>
                <FieldDescription className="text-center">
                  Đã có tài khoản?{" "}
                  <Link to={"/login"}>Đăng nhập</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>

      <FieldDescription className="px-6 text-center">
        Khi nhấn tiếp tục, bạn đồng ý với{" "}
        <a href="#">Điều khoản dịch vụ</a> và{" "}
        <a href="#">Chính sách bảo mật</a>.
      </FieldDescription>
    </div>
  )
}
