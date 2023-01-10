const express = require("express");
const usersRouter = express.Router();
const {
  createUser,
  getUserByEmail,
  getUserById,
  verifyUser,
} = require("../db/users");
const jwt = require("jsonwebtoken");

usersRouter.post("/register", async (req, res, next) => {
  const { username, password, emailAddress } = req.body;
  if (!username || !password || !emailAddress) {
    // fix status codes
    res.status(400).send({
      error: "MissingFields",
      message: "Please enter all required fields to register",
    });
    return;
  } else {
    const userCheck = await getUserByEmail(req.body);
    if (userCheck) {
      res.status(401).send({
        error: "EmailTaken",
        message: "Email is already in use, please choose another",
      });
      return;
    }
  }
  try {
    const newUser = await createUser(req.body);
    res.send({
      newUser,
      message: `Account has been created`,
    });
  } catch (error) {
    throw error;
  }
});
usersRouter.post("/login", async (req, res, next) => {
  const { emailAddress, password } = req.body;
  if (!emailAddress || !password) {
    res.status(401).send({
      error: "MissingFields",
      message: "Please enter all required fields to register",
    });
    return;
  }
  try {
    const user = await getUserByEmail(req.body);
    if (user) {
      if (await verifyUser(req.body)) {
        const token = jwt.sign(user, process.env.JWT_SECRET, {
          expiresIn: "1w",
        });
        // login should only return the token to be used by get/me
        user.token = token;
        res.send({
          user,
          message: "Thank you for logging in!",
        });
      }
    } else {
      res.status(401).send({
        error: "NotAuthorized",
        message:
          "Login was not successful, please check your username or password",
      });
    }
  } catch (error) {
    throw error;
  }
});

module.exports = usersRouter;
