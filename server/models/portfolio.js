const mongoose = require("mongoose");
const schema = mongoose.Schema();
const stock = require("./stock");

const PortfolioSchema = new schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  stock: stock,
});

module.exports = mongoose.model("portfolio", PortfolioSchema, "portfolios");
