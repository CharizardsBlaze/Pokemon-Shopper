const express = require('express')
const productRouter = express.Router()
const { getAllProducts, getOneProduct, getProductByCondition} = require("../db/products");

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
      console.log("HERE")
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
      console.log("HERE")
      const {conditionName} = req.params
      const filteredProducts = await getProductByCondition(conditionName)
      res.send(filteredProducts)
    }catch(error) {
      console.error("There was an error getting product by condition", error)
      throw error
    }
  })
  


  module.exports = productRouter