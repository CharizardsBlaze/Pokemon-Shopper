const express = require('express')
const productRouter = express.Router()
const { getAllProducts, getOneProduct } = require("../db/products");

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

  module.exports = productRouter