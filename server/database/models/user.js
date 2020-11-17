const mongoose = require("mongoose");
const Schema = mongoose.Schema;


// const portfolioListSchema = new Schema({
//     id: String,
//     name: String
// },{ _id : false 
// })

const userSchema = new Schema({
  email: {
    type:String,
    required:true,
    unique:true,
    lowercase:true
  },
  username:{
    type:String,
    required:true,
  },
  password: {
    type:String,
    required:true,
  },
  // portfolios: [portfolioListSchema],
});

module.exports = mongoose.model("user", userSchema);
