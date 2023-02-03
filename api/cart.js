const express = require('express')
const cartRouter = express.Router()
const requireUser = require('./utils')
const {getOneProduct} = require('../db/products')
const {createCartItem, getCartItemsByUserId, getCartItemById, removeCartItem, updateCartItem, deleteCartItemsByUserId, getUserCartItem} = require('../db/cart')

//Create Cart Item
cartRouter.post('/', requireUser, async(req, res, next) => {
    try {
    const {product_id, quantity} = req.body
    const product = await getOneProduct(product_id)
    const existingCartItem = await getUserCartItem({product_id: product_id, userId: req.user.id})
    if (existingCartItem) {
        const newQuantity = Number(existingCartItem.quantity) + Number(quantity)
        if ( newQuantity >  product.quantity) {
            res.status(401).send({
                error: "Invetory",
                name: "ExceedsLimit",
                message:"Quantity exceeds amount available"
            })
        }else {
            const updatedCartItem = await updateCartItem({cartId: existingCartItem.id, quantity: newQuantity})
            res.send(updatedCartItem)
        }
    }else {
        if (product.quantity < quantity) {
            res.status(401).send({
                error: "Invetory",
                name: "ExceedsLimit",
                message:"Quantity exceeds amount available"
            })
        }else {
            const cartItem = await createCartItem({user_id: req.user.id, product_id: product_id, quantity: quantity})
            res.send(cartItem)
        }
    }
    }catch(error) {
        console.error("There was an error adding item to cart")
        throw error
    }
})
cartRouter.patch('/:cartId' , requireUser, async(req, res, next) => {
    try {
    const {cartId} = req.params
    const {quantity} = req.body
    const cartItem = await getCartItemById({id: cartId})
    const product = await getOneProduct(cartItem.product_id)
    if (quantity > product.quantity) {
        res.status(401).send({
            error: "Invetory",
            name: "ExceedsLimit",
            message:"Quantity exceeds amount available"
        })
    }else {
        const updatedItem = await updateCartItem({quantity: quantity, cartId:cartId})
        res.send(updatedItem)
    }
    }catch(error) {
        console.error("There was an error updating the quantity in the api", error)
        throw error
    }
})

cartRouter.get('/', requireUser, async(req, res, next)=> {
    try {
        const cart = await getCartItemsByUserId({id: req.user.id})
        let totalSum = 0
        for(let i = 0; i < cart.length; i++) {
            totalSum += Number(cart[i].itemCost)
        }
        let fixedSum = totalSum.toFixed(2)
        let sortedCart = cart.sort((a, b) => a.id - b.id)
        res.send({cart:sortedCart, totalCost: fixedSum})
    }catch(error) {
        console.error('There was an gerror getting the cart by user id', error)
        throw error
    }
})
//For deleting individual prodcuts from the users cart item
cartRouter.delete('/', async(req, res, next) => {
    try {
        const {cart_id} = req.body
        const cart_item = await getCartItemById({id: cart_id})
        if(cart_item.user_id !== req.user.id) {
            res.status(401).send({
                error: "Unathorized",
                name: "UnauthorizedUser",
                message: "You are not allowed to remove that cart item"
            })
        }else {
            const removedCartItem = await removeCartItem({id: cart_id})
            res.send(removedCartItem)
        }
    }catch(error) {
        console.error("There was an error removing the cart item")
    }
})

cartRouter.delete('/allItems', async (req, res,next) => {
    try {
    const deleteCart = await deleteCartItemsByUserId({id: req.user.id})
    res.send(deleteCart)
    }catch(error) {
        console.error("There was an error deleting the users cart")
        throw error
    }
})

















module.exports = cartRouter
