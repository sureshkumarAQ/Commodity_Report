const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const validator = require("validator");


var schema = new mongoose.Schema({
    
    commodityID: {
        type:String,
        unique:true
    },
    commodityName:{
        type:String,
        unique:true
    },
    
    marketID: {
        type:String
    },
    marketName:{
        type:String
    },

    userID:{
        type:String,
        unique:true
    },

    priceUnit:{
        type:String,
        required:true
    },
    convFctr:{
        type:Number
    }, 
    price:{type:Number},

})

const User = mongoose.model('user',schema);

module.exports = User;