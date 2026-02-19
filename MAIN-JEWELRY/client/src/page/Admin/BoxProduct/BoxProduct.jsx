import { Trash, X } from 'lucide-react'

export const BoxProduct = ({ remove, setModelDelete, handleDelete }) => {
    console.log("remove", remove)
    return (
        <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 bg-white shadow-2xl py-4 px-5 rounded-xl">
            <div>
                <div className="absolute top-2 right-2 cursor-pointer hover:text-red-500" onClick={() => setModelDelete(false)}>
                    <X />
                </div>
                <h2 className='my-4'>{`Bạn có chắc muốn xóa ${remove.name ? remove.name : remove.code ? remove.code : remove.fullName} không?`}</h2>
                <div className="flex justify-end gap-3 pt-2">
                    <button
                        type="button"
                        className="px-4 py-2 bg-gray-200 hover:opacity-70 rounded-lg transition cursor-pointer"
                        onClick={() => setModelDelete(false)}
                    >
                        Hủy
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-primary text-white rounded-lg hover:opacity-70 transition cursor-pointer"
                        onClick={() => handleDelete(remove._id)}
                    >
                        <Trash />
                    </button>
                </div>
            </div>
        </div>
    )
}
