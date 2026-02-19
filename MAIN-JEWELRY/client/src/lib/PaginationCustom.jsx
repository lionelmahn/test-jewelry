import Pagination from '@mui/material/Pagination'
import PaginationItem from '@mui/material/PaginationItem'
import Stack from '@mui/material/Stack'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import React from 'react'

export const PaginationCustom = ({ total, valuePage, handleChangePage, limit }) => {
    return (
        <div className='flex items-center justify-center mt-12'>
            <Stack spacing={2}>
                <Pagination
                    count={Math.ceil(total / limit)}
                    page={valuePage}
                    onChange={handleChangePage}
                    renderItem={(item) => (
                        <PaginationItem
                            slots={{ previous: ArrowLeft, next: ArrowRight }}
                            {...item}
                        />
                    )}
                />
            </Stack>
        </div>
    )
}
