import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { createNewProduct, getAllProducts } from "../api";
import {ProductForm} from './index'
const AddProduct = ({token}) => {
    const [newName, setNewName] = useState("")
    const [pokedex, setPokedex] = useState(0)
    const [firstType, setFirstType] = useState("")
    const [secondType, setSecondType] = useState("")
    const [cost, setCost] = useState(0)
    const [condition, setCondition] = useState(1)
    const [rarity, setRarity] = useState("")
    const [quantity, setQuantity] = useState(0)
    const [imageUrl, setImageUrl] = useState("")
    const [products, setProducts] = useState([])
    const [editProduct, setEditProduct] = useState(null)
    const params = useParams()
    const handleAddProduct = async (event) => {
        event.preventDefault()
        const newstuff = await createNewProduct(pokedex, newName, cost, firstType, secondType, condition, rarity, quantity, imageUrl, token, user)
        setNewName("")
        setPokedex(0);
        setFirstType("")
        setSecondType("")
        setCost(0)
        setCondition(1)
        setRarity("")
        setQuantity(0)
        setImageUrl("")
    }
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
        {params.addProduct === 'addProduct' ? <><h3>Add a product:</h3><ProductForm token={token}/></> : <><h3>Edit a product</h3>
        {editProduct ? <><ProductForm token={token} editProduct={editProduct}/></> : <div id="edit-list">{products.map((product, index) => {
           return <p key={index} onClick={() => setEditProduct(product)}>{product.name}</p>
        })}</div>}</>}
        
    </div></>
    )
}
export default AddProduct