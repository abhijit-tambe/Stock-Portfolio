const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const portfolioListSchema = new Schema({
    id: String,
    name: String
},{ _id : false 
})

const userSchema = new Schema({
  email: String,
  password: String,
  portfolios: [portfolioListSchema],
});

module.exports = mongoose.model("user", userSchema);
