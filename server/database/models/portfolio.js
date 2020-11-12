const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const portfolioSchema = new Schema({
  name: String,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  stocks: [
    {
      symbol: String,
      shares: Number,
      purchasePrice: Number,
      addedPrice: Number,
      dateAdded: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

module.exports = mongoose.model("portfolio", portfolioSchema);
