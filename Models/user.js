const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const user = new Schema({
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type: String,
        require : true
    },
    firstName : {
        type : String,
        required : true
    },
    lastName : {
        type : String,
        required : true
    },
    signUpDate : {
        type : Date,
        default : Date.now(),
        required : false
    },
    user_type : 
    {
        type : String,
        required :true,
        default : "student"
    },
    bio : 
    {
        type : String,
        required : false,
        default : null
    },
    univeristy : 
    {
        type : String,
        required : false,
        default : "ISCAE"
    },
    faculty : {
        type : String,
        required : true
    }
    ,
    resetToken : {
        type : String,
        required : false,
        default : null
    },
    resetTokenExpiration : {
        type : Date,
        required : false,
    },
    avatar : {
        type : String,
        required : false,
        default : null
    },
    matricule : {
        type : Number,
        required : false,
        unique : true
    }
})


module.exports = mongoose.model("user",user);