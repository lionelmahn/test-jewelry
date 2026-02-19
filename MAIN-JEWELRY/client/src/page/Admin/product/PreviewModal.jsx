import { Import, X } from "lucide-react"
import React from "react"

const PreviewModal = ({ open, onClose, data, onConfirm }) => {
    if (!open) return null
    console.log(open, "openopenopen")
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-white w-[90%] max-w-6xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl p-6 relative">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-red-500 text-xl"
                >
                    <X size={20} />
                </button>

                <h2 className="text-2xl font-bold mb-6 text-center">
                    Xem thông tin sản phẩm
                </h2>
                {data?.map((product, index) => (
                    <div
                        key={index}
                        className="border rounded-xl p-5 mb-6 shadow-sm"
                    >
                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                                <p className="font-semibold">Name</p>
                                <p>{product.name}</p>
                            </div>
                            <div>
                                <p className="font-semibold">Thương hiệu</p>
                                <p>{product.brandId.name}</p>
                            </div>

                            <div>
                                <p className="font-semibold">Danh mục</p>
                                <p>{product.categoryId.name}</p>
                            </div>

                            <div>
                                <p className="font-semibold">Danh mục con</p>
                                <p>{product.subCategoryId.name}</p>
                            </div>
                        </div>
                        <div className="flex gap-4 mb-4">
                            <span className={`px-3 py-1 rounded-full text-sm ${product.isFeatured ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"}`}>
                                Gần đây: {String(product.isFeatured)}
                            </span>

                            <span className={`px-3 py-1 rounded-full text-sm ${product.isNewProduct ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-600"}`}>
                                Mới nhất: {String(product.isNewProduct)}
                            </span>
                        </div>
                        {product.promotion?.isActive && (
                            <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg mb-4">
                                <p className="font-semibold mb-2">Giảm giá</p>
                                <p>Phần trăm: {product.promotion.discount}%</p>
                                <p>Ngày bắt đầu: {new Date(product.promotion.startAt).toLocaleDateString()}</p>
                                <p>Ngày kết thúc: {new Date(product.promotion.endAt).toLocaleDateString()}</p>
                            </div>
                        )}
                        <div className="mb-4">
                            <p className="font-semibold mb-2">Hình ảnh</p>
                            <div className="flex gap-4 flex-wrap">
                                {product.images?.map((img, i) => (
                                    <div key={i} className="relative">
                                        <img
                                            src={img.url}
                                            alt=""
                                            className="w-28 h-28 object-cover rounded-lg border"
                                        />
                                        {img.isMain && (
                                            <span className="absolute top-1 left-1 bg-secondary text-white text-xs px-2 py-0.5 rounded">
                                                Ảnn chính
                                            </span>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div>
                            <p className="font-semibold mb-2">Biến thể</p>

                            {product.variants?.map((variant, vIndex) => (
                                <div
                                    key={vIndex}
                                    className="border rounded-lg p-4 mb-3 bg-gray-50"
                                >
                                    <p className="font-medium mb-2">
                                        Màu: {variant.color}
                                    </p>

                                    <table className="w-full text-sm border">
                                        <thead className="bg-gray-200">
                                            <tr>
                                                <th className="border p-2">ItemId</th>
                                                <th className="border p-2">Loại</th>
                                                <th className="border p-2">Giá trị</th>
                                                <th className="border p-2">Purity</th>
                                                <th className="border p-2">Số lượng</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {variant.options.map((opt, oIndex) => (
                                                <tr key={oIndex}>
                                                    <td className="border p-2">{opt.itemId.name}</td>
                                                    <td className="border p-2">{opt.type}</td>
                                                    <td className="border p-2">{opt.value}</td>
                                                    <td className="border p-2">{opt.purity || "-"}</td>
                                                    <td className="border p-2">{opt.stockQuantity}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
                <div className="flex justify-end gap-4 mt-6">
                    <button
                        onClick={onClose}
                        className="px-5 py-2 rounded-lg border"
                    >
                        Hủy
                    </button>

                    <button
                        onClick={onConfirm}
                        className="px-6 py-2 rounded-lg bg-primary text-white cursor-pointer"
                    >
                        <Import size={20} />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default PreviewModal
