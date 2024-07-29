const express = require("express");
const { authMiddleware } = require("../middlewares/auth");
const { accountModel } = require("../db");
const router = express.Router();
const { mongoose } = require("mongoose");

// To get userBalances

router.get("/balance", authMiddleware, async (req, res) => {
  if (req.userId) {
    const account = await accountModel.findOne({
      userId: req.userId,
    });
    console.log(account);

    res.json({ balance: account.balance });
  }
});

// To transfer the money to another account

router.post("/transfer", authMiddleware, async (req, res) => {
  // Creating a session in mongoDB
  const session = await mongoose.startSession();

  // Starting transaction
  session.startTransaction();
  const { amount, receiverAccountId } = req.body;

  // Doing the Checks for sender
  const sendersAccount = await accountModel
    .findOne({ userId: req.userId })
    .session(session);

  if (!sendersAccount || sendersAccount.balance < amount) {
    await session.abortTransaction();
    return res.status(400).json({
      message: "Insufficient balance",
    });
  }

  // Doing the Checks for receiver
  const receiverAccount = await accountModel
    .findOne({ userId: receiverAccountId })
    .session(session);

  if (!receiverAccount) {
    await session.abortTransaction();
    return res.status(400).json({
      message: "Invalid account",
    });
  }

  // Perform the transfer for sender
  await accountModel
    .updateOne({ userId: req.userId }, { $inc: { balance: -amount } })
    .session(session);
  // Perform the transfer for receiver
  await accountModel
    .updateOne({ userId: receiverAccountId }, { $inc: { balance: amount } })
    .session(session);

  // Commit the transaction
  await session.commitTransaction();

  //res.json
  res.json({
    message: "Transfer successful",
  });
});

module.exports = router;
