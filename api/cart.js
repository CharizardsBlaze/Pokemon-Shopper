const express = require('express')
const cartRouter = express.Router()
const requireUser = require('./utils')
const {createCartItem, getCartItemsByUserId} = require('../db/cart')
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


















module.exports = cartRouter