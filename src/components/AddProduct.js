import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { createNewProduct, getAllProducts } from "../api";
import {ProductForm} from './index'
const AddProduct = ({token}) => {
    const [products, setProducts] = useState([])
    const [editProduct, setEditProduct] = useState(null)
    const params = useParams()

    const getProducts = async () => {
        const allProducts = await getAllProducts()
        setProducts(allProducts)
    }
    useEffect(() => {
        getProducts()
    }, [])
    return(
        <>
        <div id="admin-page" className="container">
        {params.addProduct === 'addProduct' ? 
            <><h3>Add a product:</h3><ProductForm token={token}/></>
        :
        <><h3>Choose which product to edit</h3>
        {editProduct ? <><ProductForm token={token} editProduct={editProduct}/></> : <div id="edit-list">{products.map((product, index) => {
           return <p className="edit-product" key={index} onClick={() => setEditProduct(product)}>{product.name}</p>
        })}</div>}</>}
        
    </div></>
    )
}
export default AddProduct