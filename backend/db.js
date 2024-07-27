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
  firstName: String,
  lastName: String,
  username: String,
  password: String,
});

const userModel = new mongoose.model("userSchema", userSchema);

module.exports = { userModel };
