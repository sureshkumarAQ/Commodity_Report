const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const validator = require("validator");


var schema = new mongoose.Schema({

    cmdtyName:{
        type:String,
        required:true
    },

    cmdtyID:{
        type:String,
        unique:true
    },

    users: [{ type: String }],

    marketID: {
        type:String
    },
    marketName:{
        type:String
    },
    priceUnit:{
        type:String
    },
    price:{type:Number},
    time : { type : Date, default: Date.now }

})

const Report = mongoose.model('report',schema);

module.exports = Report;