const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const stockSchema = new Schema(
  {
    symbol: {type:String,
      required:true,},
    shares: {
      type: Number,
      default: 0,
    },
    purchasePrice: {type:Number,
      required:true},
    addedPrice: {type:Number,
      required:true},
  },{
    timestamps:true
  }
)


const portfolioSchema = new Schema({
  portfolioname: {type:String,
    required:true},
  userId:String,
  stocks: [stockSchema],
});

module.exports = mongoose.model("portfolio", portfolioSchema);
