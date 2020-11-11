const mongoose = require('mongoose');
const user = require('./user');
const Schema = mongoose.Schema;


const stockSchema = new Schema({
    symbol:String,
    shares:Number,
    purchasePrice:Number,
    addedPrice:Number
},{
    timestamps:true
})



const portfolioSchema = new Schema({
    name:String,
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:user
    },
    stocks:[stockSchema]
});


module.exports = mongoose.model('portfolio',portfolioSchema);