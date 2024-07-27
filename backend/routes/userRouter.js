const express = require("express");
const router = express.Router();
const zod = require("zod");

const { userModel } = require("../db");
const jwt = require("jsonwebtoken");
const JWT_SECRET = require("../config");

// signup

const signupBody = zod.object({
  firstName: zod.string(),
  lastName: zod.string(),
  username: zod.string().email(),
  password: zod.string(),
});

router.post("/signup", async (req, res) => {
  const { success } = signupBody.safeParse(req.body);

  if (!success) {
    return res.status(411).json({
      message: "Please provide a valid email id.",
    });
  }

  const existingUser = await userModel.findOne({
    username: req.body.username,
  });

  if (existingUser) {
    return res.status(411).json({
      message: "Email already taken",
    });
  }

  const user = await userModel.create({
    username: req.body.username,
    password: req.body.password,
    firstName: req.body.firstName,
    lastName: req.body.LastName,
  });
  const userId = user._id;

  const token = jwt.sign(
    {
      userId,
    },
    JWT_SECRET
  );

  res.json({
    message: "Creation Successful",
    token: token,
  });
});

// signin

const signinBody = zod.object({
  username: zod.string().email(),
  password: zod.string(),
});

router.post("/signin", async (req, res) => {
  const { success } = signinBody.safeParse(req.body);
  if (!success) {
    return res.status(411).json({
      message: "Email already taken / Incorrect inputs",
    });
  }

  const user = await userModel.findOne({
    username: req.body.username,
    password: req.body.password,
  });

  if (user) {
    const token = jwt.sign(
      {
        userId: user._id,
      },
      JWT_SECRET
    );

    res.json({
      token: token,
    });
    return;
  }

  res.status(411).json({
    message: "Invalid credentials.",
  });
});

// update user information.

module.exports = router;
