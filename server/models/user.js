const mongoose = require("mongoose");

const schema = mongoose.Schema;

const userSchema = new schema({
  user: String,
  name: String,
  password: String,
  stock: [
    {
      symbol: String,
    },
  ],
});

module.exports = mongoose.model("user", userSchema, "users");
