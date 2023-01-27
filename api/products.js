const express = require('express')
const productRouter = express.Router()
const { getAllProducts, getOneProduct, getProductByCondition, deleteProduct, createProduct} = require("../db/products");
const requireUser = require('./utils')
productRouter.get("/", async (request, response, next) => {
    try {
      const allProducts = await getAllProducts();
      console.log("this is all products: ", allProducts);
      response.send(allProducts);
    } catch (error) {
      console.log("there was an error getting all productS: ", error);
      throw error;
    }
  });
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
  productRouter.get('/condition/:conditionName', async(req, res, next) => {
    try {
      const {conditionName} = req.params
      const filteredProducts = await getProductByCondition(conditionName)
      res.send(filteredProducts)
    }catch(error) {
      console.error("There was an error getting product by condition", error)
      throw error
    }
  })
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


  module.exports = productRouter
