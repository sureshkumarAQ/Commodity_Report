const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const validator = require("validator");


var schema = new mongoose.Schema({

    marketName:{
        type:String,
        required:true
    }
})

const Market = mongoose.model('market',schema);

module.exports = Market;