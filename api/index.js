const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const usersRouter = require("./users");
const productRouter = require('./products');
const cartRouter = require("./cart");
const orderRouter = require('./orders')
const stripe = require('stripe')("sk_test_51MRQaELdzpxpOBV5FE22w5E04OReD0DNDCGPQsG58NFNPDnMeBbnJ2jmbURFeJCfknsozUp9WlQHudT5OxZJhpt3006UDgSsyh")

const {getUserById} = require('../db/users')

const calculateOrderAmount = (items) => {
    return 1400;
  };
  

router.use(async (req, res, next) => {
  const auth = req.header("Authorization");
  if (auth) {
    const [, token] = auth.split(" ");
    try {
      const data = jwt.verify(token, process.env.JWT_SECRET);
      const user = await getUserById({id: data.id});
      req.user = user;
      next();
    } catch ({ name, message }) {
      next({
        error: message,
        name: name,
        message: message,
      });
    }
  } else {
    next();
  }
});
router.post("/create-payment-intent", async (req, res) => {
    const { items } = req.body;
    const paymentIntent = await stripe.paymentIntents.create({
      amount: calculateOrderAmount(items),
      currency: "usd",
      automatic_payment_methods: {
        enabled: true,
      },
    });
    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  });
router.use("/users", usersRouter);
router.use("/cards", productRouter)
router.use("/cart", cartRouter)
router.use("/orders", orderRouter)
module.exports = router;

