const mongoose = require("mongoose");

const schema = mongoose.Schema;

const userSchema = new schema({
  _id: mongoose.Schema.Types.ObjectId,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

module.exports = mongoose.model("user", userSchema, "users");
