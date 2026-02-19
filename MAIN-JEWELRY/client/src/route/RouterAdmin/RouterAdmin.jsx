import React from 'react'
import { Route, Routes } from 'react-router'
import { ProtectAdminRouter } from '../Protect/ProtectAdmin'
import { LayoutAdmin } from '@/layout/LayoutAdmin/LayoutAdmin'
import { CategoryPage } from '@/page/Admin/category'
import { BrandPage } from '@/page/Admin/Brand'
import { SubcategoryPage } from '@/page/Admin/subcategory'
import { AddProduct } from '@/page/Admin/product/addProduct'
import { Product } from '@/page/Admin/product/product'
import { EditProduct } from '@/page/Admin/product/editProduct'
import { AdminChat } from '@/page/Admin/AdminChat/AdminChat'
import { Material } from '@/page/Admin/Items/Material'
import { GemStone } from '@/page/Admin/Items/GemStone'
import { Coupon } from '@/page/Admin/Coupon/Coupon'
import { Requirement } from '@/page/Admin/Requierement/Requirement'
import { OrderListPage } from '@/page/Admin/Order/OrderListPage'
import { UserPage } from '@/page/Admin/User/UserPage'
import { Review } from '@/page/Admin/Review/Review'
export const RouterAdmin = () => {
    return (
        <Routes>
            <Route element={<ProtectAdminRouter />}>
                <Route element={<LayoutAdmin />}>
                    <Route path="dashboard" element={<div>dashboard</div>} />
                    <Route path="product-manage/category" element={<CategoryPage />} />
                    <Route path="product-manage/subcategory" element={<SubcategoryPage />} />
                    <Route path="product-manage/brand" element={<BrandPage />} />
                    <Route path="product-manage/products" element={<Product />} />
                    <Route path="product-manage/products/add" element={<AddProduct />} />
                    <Route path="product-manage/products/edit/:id" element={<EditProduct />} />
                    <Route path="order-manage/orders" element={<OrderListPage />} />
                    {/* <Route path="order-manage/cart" element={<div>cart</div>} /> */}
                    <Route path="user-manage/users" element={<UserPage />} />
                    <Route path="user-manage/require" element={<Requirement />} />
                    <Route path="user-manage/reviews" element={<Review />} />
                    <Route path='material-manage/material' element={<Material />} />
                    <Route path='material-manage/gem' element={<GemStone />} />
                    <Route path="coupons" element={<Coupon />} />
                    <Route path="settings" element={<div>settings</div>} />
                    <Route path='chat' element={<AdminChat />} />
                </Route>
            </Route>
        </Routes>
    )
}
