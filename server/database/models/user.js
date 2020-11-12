const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: String,
  password: String,
  portfolios: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "portfolio",
    },
  ],
});

module.exports = mongoose.model("user", userSchema);
