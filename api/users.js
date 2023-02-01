const express = require("express");
const usersRouter = express.Router();
const {
  createUser,
  getUserByEmail,
  getUserById,
  verifyUser,
  getUserByUsername,
  updateUser,
} = require("../db/users");
const jwt = require("jsonwebtoken");
const requireUser = require("./utils");

usersRouter.get("/me", requireUser, async (req, res, next) => {
  if (req.user) {
    const user = await getUserById({ id: req.user.id });
    res.send(user);
  } else {
    res.status(401).send({
      error: "UnauthorizedError",
      message: "Must be logged in to continue",
    });
  }
});
usersRouter.post("/register", async (req, res, next) => {
  const { username, password, emailAddress } = req.body;
  if (!username || !password || !emailAddress) {
    res.status(400).send({
      error: "MissingFields",
      message: "Please enter all required fields to register",
    });
    return;
  } else {
    const userCheck = await getUserByEmail(req.body);
    const userCheckUsername = await getUserByUsername(req.body);
    if (userCheck) {
      res.status(401).send({
        error: "EmailTaken",
        message: "Email is already in use, please choose another",
      });
      return;
    } else if (userCheckUsername) {
      res.status(401).send({
        error: "UsernameTaken",
        message: "Username is already in use, please choose another",
      });
      return;
    }
  }
  try {
    const newUser = await createUser(req.body);
    const token = jwt.sign(newUser, process.env.JWT_SECRET, {
      expiresIn: "1w",
    });
    res.send({
      token,
      message: `Account has been created`,
    });
  } catch (error) {
    throw error;
  }
});
usersRouter.post("/login", async (req, res, next) => {
  const { emailAddress, password } = req.body;
  const errorMessage = {
    error: "NotAuthorized",
    message: "Login was not successful, please check your username or password",
  };
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
        res.send({
          token,
          message: "Thank you for logging in!",
        });
      } else {
        res.status(401).send(errorMessage);
      }
    } else {
      res.status(401).send(errorMessage);
    }
  } catch (error) {
    throw error;
  }
});

usersRouter.patch("/me", requireUser, async (req, res, next) => {
  const { id } = req.user;

  const userCheck = await getUserByEmail(req.body);
  const userCheckUsername = await getUserByUsername(req.body);
  if (userCheck && userCheck.id !== id) {
    res.status(401).send({
      error: "EmailTaken",
      message: "Email is already in use, please choose another",
    });
    return;
  } else if (userCheckUsername && userCheckUsername.id !== id) {
    res.status(401).send({
      error: "UsernameTaken",
      message: "Username is already in use, please choose another",
    });
    return;
  }

  try {
    const updatedUser = await updateUser({ id, ...req.body });

    if (!updatedUser) {
      res.status(401).send({
        error: "UpdateFailure",
        message: "Failed to update this user",
      });
      return;
    } else {
      res.send(updatedUser);
    }
  } catch (error) {
    console.error(
      "There was an error updating the user in /api/users.js: ",
      error
    );
    throw error;
  }
});

module.exports = usersRouter;
