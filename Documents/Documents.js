const User = require("../Models/user");
const Document = require("../Models/document");
const mongoose = require("mongoose");
exports.add = (doc,email) =>
{
    const filter = {
        "email" : email
    };
    console.log("email : ",email);
    return User.findOne(filter)
    .then(result => {
        if(result)
        {
            console.log(result);
            return new Document({
                info : doc,
                userInfo : result
            })
            .save()
            .then(()=>{

                return {
                    code : 0,
                    message : "doc saved succesfully"
                }
            })
            .catch(err => {
                console.log(err);
                return {
                    code : -1,
                    message : "error saving doc"
                }
            })
        }
        else{
            return {
                code : -1,
                message : "user not found"
            }
        }
    })
}

exports.list = ()=>
{
    return Document.find()
    .then(result =>{
        return result;
    })
}

exports.deleteById = id =>
{
   const filter = {"info.id" : id};
   console.log(filter);
   return Document.findOneAndDelete(filter,(result) => {
       console.log("callback result : ",result);
   })
   .then(result => {
       console.log(result);
   })
   .catch(err => {
       console.log(err);
   })
}

exports.getUserDocuments = email =>
{
    const filter = {
        "userInfo.email" : email
    }
    return Document.find(filter)
    .then(result => {
        return result;
    })
    .catch(err => {
        console.log(err);
    })
    
}

exports.searchRegex = query => {
    const regex = [
        {"info.name" : {"$regex" : query , "$options" : "i"}},
        {"info.faculty" : {"$regex" : query , "$options" : "i"}},
        {"info.title" : {"$regex" : query , "$options" : "i"}},
        {"userInfo.email" : {"$regex" : query , "$options" : "i"}}
    ];
    return Document.find({"$or" : regex})
    .limit(3)
    .then(result => {
        return result
    })
    .catch(err => {
        return err
    })
}