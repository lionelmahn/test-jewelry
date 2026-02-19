import { commonStore } from '@/store/commonStore/commonStore'
import React from 'react'
import { Outlet, useNavigate } from 'react-router'

export const Custom = () => {
    return (
        <div>
            <Outlet />
        </div>
    )
}
