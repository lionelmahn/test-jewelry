import React from 'react'
import { useParams } from 'react-router'
import { AddProduct } from './addProduct';

export const EditProduct = () => {
    const { id } = useParams();
    console.log(id, "dnvjnvjfvfb")
    return (
        <div>
            <AddProduct id={id} />
        </div>
    )
}
