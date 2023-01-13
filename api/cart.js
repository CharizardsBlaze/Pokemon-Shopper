const express = require('express')
const cartRouter = express.Router()
const requireUser = require('./utils')
const {createCartItem} = require('../db/cart')
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


















module.exports = cartRouter