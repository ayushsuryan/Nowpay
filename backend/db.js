const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://ayush:Ayush%408962@cluster0.6rwkptj.mongodb.net/Database1",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((error) => {
    console.error("Database connection error:", error);
  });

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    minLength: 3,
    maxLength: 30,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
  firstName: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    maxLength: 50,
  },
  lastName: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    maxLength: 50,
  },
});

const userModel = new mongoose.model("userSchema", userSchema);

const accountSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "userModel",
    required: true,
  },
  balance: {
    type: Number,
    required: true,
  },
});

const accountModel = new mongoose.model("accountSchema", accountSchema);

module.exports = { userModel, accountSchema };
