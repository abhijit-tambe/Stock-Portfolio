const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email:String,
    password:String,
    portfolios:[]
});

modeule.exports = mongoose.model('user',userSchema);;