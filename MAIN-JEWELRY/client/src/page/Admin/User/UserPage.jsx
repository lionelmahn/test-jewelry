import { useGetListUser } from '@/hooks/User/useGetListUser'
import { PaginationCustom } from '@/lib/PaginationCustom'
import dayjs from 'dayjs'
import { Download, RefreshCw, SquarePen, Trash, X } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router'
import { BoxProduct } from '../BoxProduct/BoxProduct'
import { UserAuthStore } from '@/store/userAuthStore'
import z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'react-toastify'
const UserShema = z.object({
    role: z.enum(["admin", "user"], "Chọn quyền quản trị hoặc người dùng")
})
export const UserPage = () => {
    const { deleteUser, updateRole } = UserAuthStore()
    const [valuePage, setValuePage] = useState(1)
    const [modelDelete, setModelDelete] = useState(false)
    const [edit, setEdit] = useState(null)
    const [removeUser, setRemoveUser] = useState({})
    const [searchParams, setSearchParams] = useSearchParams()
    const [model, setModel] = useState(false);
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
        resolver: zodResolver(UserShema)
    })
    const dataFilter = {
        page: valuePage,
        limit: 10
    }
    const { users, isLoading, error, refreshUsers, isValidating } = useGetListUser(dataFilter)
    const showDeleteUser = (item) => {
        setRemoveUser(item)
        setModelDelete(true)
    }
    const handleRefresh = async () => {
        await refreshUsers()
    }
    const handleDeleteUser = async (id) => {
        await deleteUser(id)
        setModelDelete(false)
        await refreshUsers()
    }
    const handleEdit = (item) => {
        setEdit(item)
        setModel(true)
    }

    useEffect(() => {
        const params = new URLSearchParams({
            page: dataFilter.page.toString(),
            limit: dataFilter.limit.toString()
        })
        setSearchParams(params)
    }, [dataFilter.page, dataFilter.limit])
    console.log(users, "usersusersusersusers")
    console.log(edit, "ediiiiiiii")
    const onSubmit = async (data) => {
        const { role } = data;
        console.log(role, "rolerolerolerolerole")
        if (edit._id) {
            const res = await updateRole(edit._id, role);
            console.log(res, "kdfmvkfvfk")
            if (res.status === 200) {
                toast.success("Cập nhật quyền thành công");
                setEdit(null)
                setModel(false)
                await refreshUsers()
            }
        }
    }
    return (
        <div className="relative min-h-screen bg-gray-50 px-4 md:px-6 py-6 shadow-md">

            {(isLoading || isValidating) && (
                <div className="absolute inset-0 bg-white/60 backdrop-blur-sm flex items-center justify-center z-20">
                    <div className="loader"></div>
                </div>
            )}
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Quản lý người dùng</h2>
                <button
                    onClick={handleRefresh}
                    className="flex items-center gap-2 bg-primary text-white px-4 py-2.5 rounded-xl hover:opacity-80 active:scale-95 transition cursor-pointer">
                    <RefreshCw />
                    <span>Refresh</span>
                </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {users?.data?.data?.user?.map((item) => (
                    <div
                        key={item._id}
                        className="bg-white rounded-2xl shadow-md p-4 hover:shadow-lg transition"
                    >
                        <div className="flex justify-between">
                            <div className='flex items-center gap-6'>
                                <div className='size-10 rounded-full overflow-hidden'>
                                    <img src={item.avatar} alt="" className='w-full h-full object-cover' />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg">
                                        {item.fullName}
                                    </h3>
                                    <p className="text-sm text-gray-500">
                                        Email: {item.email}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        Role: {item.role}
                                    </p>
                                    <div className="mt-4 text-xs text-gray-500 flex justify-between">
                                        <span>
                                            Tạo: {dayjs(item.createdAt).format("YYYY-MM-DD HH:mm")}
                                        </span>
                                        <span>
                                            Sửa: {item.updatedAt
                                                ? dayjs(item.updatedAt).format("YYYY-MM-DD HH:mm")
                                                : "—"}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-3">
                                <SquarePen onClick={() => handleEdit(item)} className="size-5 text-blue-500 hover:text-blue-700 hover:scale-110 transition cursor-pointer" />
                                <Trash
                                    onClick={() => showDeleteUser(item)}
                                    className="size-5 text-red-500 hover:text-red-700 hover:scale-110 transition cursor-pointer"
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div
                className={`absolute top-1/2 left-1/2 w-105 -translate-x-1/2 -translate-y-1/2 
                bg-white rounded-2xl shadow-2xl p-6 z-50 transition-all duration-300
                ${model
                        ? "scale-100 opacity-100"
                        : "scale-95 opacity-0 pointer-events-none"
                    }`}>
                <button
                    onClick={() => setModel(false)}
                    className="absolute top-3 right-3 text-gray-500 hover:text-red-500 transition cursor-pointer"
                >
                    <X />
                </button>
                <h3 className="text-lg font-semibold mb-4">
                    Cập nhật quyền truy cập của {edit?.fullName}
                </h3>
                <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label className="text-sm font-medium">Sửa quyền truy cập</label>
                        <div className='mt-6'>
                            <select name="" id="" {...register("role")} className='border border-primary rounded-xl p-3'>
                                <option value="">--- Chọn quyền ---</option>
                                <option value="admin">Quản trị</option>
                                <option value="user">Người dùng</option>
                            </select>
                        </div>
                        {errors.role && <p className='text-red-500'>
                            {errors.role.message}</p>}
                    </div>
                    <div className="flex justify-end gap-3 pt-2">
                        <button
                            type="button"
                            onClick={() => setModel(false)}
                            className="px-4 py-2 bg-gray-200 rounded-lg hover:opacity-80 transition cursor-pointer"
                        >
                            Hủy
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-primary text-white rounded-lg
                            hover:opacity-80 active:scale-95 transition flex items-center justify-center cursor-pointer">
                            {isSubmitting ? (
                                <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                            ) : (
                                <Download />
                            )}
                        </button>
                    </div>
                </form>
            </div>
            <PaginationCustom
                total={users?.data?.data?.totalUser}
                valuePage={valuePage}
                handleChangePage={(e, value) => setValuePage(value)}
                limit={10}
            />
            {modelDelete && (
                <BoxProduct
                    remove={removeUser}
                    setModelDelete={setModelDelete}
                    handleDelete={handleDeleteUser}
                />
            )}
        </div>
    )
}
