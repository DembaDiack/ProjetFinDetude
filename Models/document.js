const mongoose = require("mongoose");
const Schema = mongoose.Schema;


//you probably will change it, since i decided to move away from base64 data to mongodb gridFS
const Document = new Schema({
    info : {
        type : Object,
        required : true
    },
    userInfo : {
        type : Object,
        required : true
    }
})

module.exports = mongoose.model("Document",Document);