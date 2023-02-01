const express = require("express");
const orderRouter = express.Router();
const requireUser = require("./utils");
const {
  getAllOrders,
  createOrderDetail,
  createOrderItem,
} = require("../db/orders");
const { getOneProduct, updateProductQuantity} = require("../db/products");
const {deleteCartItemsByUserId} = require('../db/cart')
orderRouter.post("/checkout", requireUser, async (req, res, next) => {
  const date = new Date();
  try {
    const { cart, address, zip, city, state} = req.body
    for (let i = 0; i < cart.cart.length; i++) {
      const currentProduct = await getOneProduct(cart.cart[i].product_id);
      if (currentProduct.quantity < cart.cart[i].quantity) {
        res.status(401).send({
          error: "InventoryError",
          name: "InventoryError",
          message: "Quantity Exceeds the amount available",
        });
        return;
      }
    }
    let orderDetail = await createOrderDetail({
      address: address,
      orderTotal: Number(cart.totalCost),
      date: date,
      userId: req.user.id,
      zip: zip,
      city: city,
      state: state
    });
    for (let i = 0; i < cart.cart.length; i++) {
      await createOrderItem({ order_id: orderDetail.id, product_id: cart.cart[i].product_id, quantity: cart.cart[i].quantity});
      await updateProductQuantity(cart.cart[i].product_id, cart.cart[i].quantity)
    }
      await deleteCartItemsByUserId({id: req.user.id})
    res.send({message: "Success!"})
  } catch (error) {
    console.error("There was an error checking out the user", error);
    throw error;
  }
});
orderRouter.get("/", requireUser, async (req, res, next) => {
  try {
    const allOrders = await getAllOrders(req.user.id);
    res.send(allOrders);
  } catch (error) {
    console.error("There was an error getting the orders");
  }
});

module.exports = orderRouter;
