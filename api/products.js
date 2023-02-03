const express = require('express')
const productRouter = express.Router()
const { getAllProducts, getOneProduct, getProductsByQuery, deleteProduct, createProduct, updateProduct} = require("../db/products");
const {getAllConditions} = require('../db/condition')
const {getAllRarities} = require('../db/rarity')
const requireUser = require('./utils')

productRouter.get('/conditions', async(req, res, next) => {
  try {
    const conditions = await getAllConditions()
    res.send(conditions)
  }catch(error) {
    console.error("There was an error getting the conditions", error)
    throw error
  }
})
productRouter.get('/rarities', async (req, res, next) => {
  try {
    const allRarities = await getAllRarities()
    res.send(allRarities)
  }catch(error) {
    console.error("There was an error fetching rarities in the backend", error)
    throw error
  }
})
productRouter.get('/search', async(req, res, next) => {
  try {
    let fetchObject = {}
    const {condition, rarity} = req.query
    if (condition) {
      fetchObject['condition'] = condition
    }
    if (rarity) {
      fetchObject['rarity'] = rarity
    }
    const filteredProducts = await getProductsByQuery(fetchObject)
    res.send(filteredProducts)
  }catch(error) {
    console.error("There was an error getting product by condition", error)
    throw error
  }
})
productRouter.get("/:cardId", async (request, response, next) => {
  try {
    const {cardId} = request.params;
    const oneProduct = await getOneProduct(cardId);
    response.send(oneProduct);
  } catch (error) {
    console.log("there was an error fetching products by productId: ", error);
    throw error;
  }
});
productRouter.get("/", async (request, response, next) => {
    try {
      const allProducts = await getAllProducts();
      let sortedCards = allProducts.sort((a, b) => a.id - b.id)
      response.send(sortedCards);
    } catch (error) {
      console.log("there was an error getting all productS: ", error);
      throw error;
    }
  });

 
  productRouter.post('/', requireUser, async (req, res, next) => {
    if(!req.user.isAdmin){
      res.status(401).send({
        error: "Unauthorized",
        message: "You do not have admin functions"
      })
    } else {
    try{
      const newProduct = await createProduct(req.body)
      res.send({
        newProduct,
        message: "Product has been succussfully added"
      })
    } catch(error){
      throw error
    }
  }})
  productRouter.delete('/:productId', requireUser, async (req, res, next) => {
    const productId = req.params.productId
    if(!req.user.isAdmin){
      res.status(401).send({
        error: "Unauthorized",
        message: "You do not have admin functions"
      })
    } else { 
    try{
      const deletedProduct = await deleteProduct(productId)
      res.send(
        deletedProduct
      )
    }catch(error){
      throw error
    }
  }})
  productRouter.patch('/update/:productId', requireUser, async (req, res, next) => {
    const productId = req.params.productId
    const {pokedexId, name, price, type1, type2, condition, quantity, imageUrl} = req.body
    console.log(productId)
  if(!req.user.isAdmin){
    res.status(401).send({
      error: "Unauthorized",
      message: "You do not have admin functions"
    })
  }else{
    const updatedProduct = await updateProduct({pokedexId, name, price, type1, type2, condition, quantity, imageUrl, productId})
    res.send(
      updatedProduct
    )
  }
})
  module.exports = productRouter
