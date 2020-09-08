const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const stockSchema = new Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    symbol: String,
    shares: Number,
    purchasePrice: Number,
    priceWhenAdded: Number,
  },
  { timestamps: true }
);

module.exports = stockSchema;
