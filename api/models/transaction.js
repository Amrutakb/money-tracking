const { Schema, model } = require("mongoose");

const transactionSchema=new Schema({
    name:{type: String,requried: true},
    price:{type: Number, requried: true},
    description:{type: String,requried: true},
    date:{type: Date,requried: true},
});

const transactionModel= model('transaction',transactionSchema)

module.exports=transactionModel;