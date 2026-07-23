const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({

    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },

    title:{
        type:String,
        required:true
    },

    amount:{
        type:Number,
        required:true
    },

    category:{
        type:String,
        required:true
    },

    type:{
        type:String,
        enum:["income","expense"],
        required:true
    },

    date:{
        type:Date,
        default:Date.now
    },

    note:{
        type:String
    },

    isRecurring:{
        type:Boolean,
        default:false
    },

    frequency:{
        type:String,
        enum:["daily","weekly","monthly","yearly"],
        default:"monthly"
    },

    nextDueDate:{
        type:Date
    }

},{
    timestamps:true
});