const mongoose = require("mongoose");
const Schema = mongoose.Schema;


//you probably will change it, since i decided to move away from base64 data to mongodb gridFS
const Post = new Schema({
    info : {
        type : Object,
        required : true
    },
    userInfo : {
        type : Object,
        required : true
    },
    dateCreated : {
        type : Date,
        default : Date.now()
    }

})

module.exports = mongoose.model("Post",Post);