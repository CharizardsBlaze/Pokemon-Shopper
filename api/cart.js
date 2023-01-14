const express = require('express')
const cartRouter = express.Router()
const requireUser = require('./utils')
const {createCartItem, getCartItemsByUserId, getCartItemById, removeCartItem, deleteCartItemsByUserId} = require('../db/cart')
//Create Cart Item
cartRouter.post('/', requireUser, async(req, res, next) => {
    try {
    const {product_id, quantity} = req.body
    const cartItem = await createCartItem({user_id: req.user.id, product_id: product_id, quantity: quantity})
    res.send(cartItem)
    }catch(error) {
        console.error("There was an error adding item to cart")
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
        res.send({cart:cart, totalCost: totalSum})
    }catch(error) {
        console.error('There was an gerror getting the cart by user id', error)
        throw error
    }
})
//For deleting individual prodcuts from the users cart item
cartRouter.delete('/', async(req, res, next) => {
    try {
        console.log("here")
        const {cartItemId} = req.body
        const cart_item = await getCartItemById({id: cartItemId})
        console.log(cart_item)
        if(cart_item.user_id !== req.user.id) {
            res.status(401).send({
                error: "Unathorized",
                name: "UnauthorizedUser",
                message: "You are not allowed to remove that cart item"
            })
        }else {
            const removedCartItem = await removeCartItem({id: cartItemId})
            res.send(removedCartItem)
        }
    }catch(error) {
        console.error("There was an error remove the cart item")
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