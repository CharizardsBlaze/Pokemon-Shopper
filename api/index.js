const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const usersRouter = require("./users");
const productRouter = require('./products');
const cartRouter = require("./cart");

const {getUserById} = require('../db/users')
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
router.use("/users", usersRouter);
router.use("/products", productRouter)
router.use("/cart", cartRouter)
module.exports = router;

