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
  FieldSeparator,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Link, useNavigate } from "react-router"
import z, { email } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { LINK_GET_TOKEN } from "@/google"
import { UserAuthStore } from "@/store/userAuthStore"
import { useState } from "react"
const loginSchema = z.object({
  email: z.email("Email không hợp lệ"),
  password: z.string().min(8, "Mật khẩu không ít nhất có 8 kí tự")
})
export function LoginForm({
  className,
  ...props
}) {
  const { login, setAccessToken } = UserAuthStore()
  const navigate = useNavigate()
  const [message, setMessage] = useState("")
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(loginSchema)
  })
  const onSubmit = async (data) => {
    const { email, password } = data;
    const resUser = await login(email, password)
    if (resUser.status === 200) {
      setAccessToken(resUser.data.data.accessToken)
      localStorage.setItem("user", JSON.stringify(resUser.data.data))
      navigate("/")
      console.log(resUser, "mdkcmkdkdvkkuk")
    }
    setMessage(resUser)
  }
  const handleGoogle = () => {
    window.location.href = LINK_GET_TOKEN
  }
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Chào mừng quay trở lại</CardTitle>
          <CardDescription>
            Đăng nhập bằng tài khoản
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup>
              <Field>
                <Button variant="outline" type="button" className="cursor-pointer hover:text-primary" onClick={handleGoogle}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                      d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                      fill="currentColor" />
                  </svg>
                  Đăng nhập bằng Google
                </Button>
              </Field>

              <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                Hoặc tiếp tục với
              </FieldSeparator>

              <Field>
                {message ? <p className="text-red-500">{message}</p> : ""}
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
                <div className="flex items-center">
                  <FieldLabel htmlFor="password" >Mật khẩu</FieldLabel>
                  <a
                    href="#"
                    className="ml-auto text-sm underline-offset-4 hover:underline"
                  >
                    Quên mật khẩu?
                  </a>
                </div>
                <Input id="password" type="password" className="focus:right-1 focus:ring-primary focus:border-none" {...register("password")} />
                {errors.password && <p className="text-red-500">{errors.password.message}</p>}
              </Field>

              <Field>
                <Button type="submit" className="cursor-pointer" disabled={isSubmitting}>Đăng nhập</Button>
                <FieldDescription className="text-center">
                  Chưa có tài khoản? <Link to={"/sign-up"}>Đăng ký</Link>
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
