const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const stock = require("./stock");

const PortfolioSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  portfolioName: String,
  email: String,
  userId: String,
  stocks: [stock],
});

module.exports = mongoose.model("portfolio", PortfolioSchema, "portfolios");
