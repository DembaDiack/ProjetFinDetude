const mongoose = require("mongoose");

const uri = "mongodb+srv://root:root@cluster0-txlzu.azure.mongodb.net/DI3?retryWrites=true&w=majority";

exports.connect = ()=>{
    return mongoose.connect(uri,{
        useNewUrlParser : true,
        useUnifiedTopology: true
    });
}
exports.isConnected = ()=>{
    return mongoose.ConnectionStates.connected;
}
exports.disconnect = ()=> {
    return mongoose.disconnect();
}
