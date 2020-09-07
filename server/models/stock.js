const mongoose = require("mongoose");

const Schema = mongoose.Schema();

const stockSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  symbol: String,
  shares: Number,
  purchasePrice: Number,
  //   dateAdded: new Date(),
  priceWhenAdded: Number,
});

//  stock: [
//   {
//     symbol: String,
//     shares: Number,
//     purchasePrice: Number,
//     dateAdded: Date,
//     priceWhenAdded: Number,
//   },
// ],
module.exports = mongoose.model("stock", stockSchema, "stocks");
