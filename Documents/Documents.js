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
    console.log("receivvvvvvvvvvvvved ",id);
   Document.deleteOne({
       "_id" : id
   })
   .then(result => {
       console.log("delete ", result);
   })
   .catch(err => {
       console.log(err);
   })
}

exports.getUserDocuments = email =>
{
    const filter = {
        "userInfo.email" : email,
        "info.name" : {"$ne" : "profile.jpg"}
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

exports.increaseDocViews = id => {
    const filter = {
        "info.id" : id
    }
    return Document.updateOne(
        filter,
        { $inc: { "info.views": 1} }
     )
}
exports.getDocInfo = id => {
    const filter = {
        "info.id" : id
    }

    return Document.findOne(filter)
    .then(result => {
        return result;
    })
    .catch(err => {
        return err;
    })
}

exports.loadDocs = (views,age,query = "",index) => {
    index = parseInt(index);
    const regex = [
        {"info.name" : {"$regex" : query , "$options" : "i"}},
        {"info.faculty" : {"$regex" : query , "$options" : "i"}},
        {"info.title" : {"$regex" : query , "$options" : "i"}},
        {"info.id" : {"$regex" : query , "$options" : "i"}},
        {"userInfo.email" : {"$regex" : query , "$options" : "i"}}
    ];
    
    const views_order = views === "asc" ? 1 : -1;
    const age_order = age === "asc" ? 1 : -1;

    return Document.find({"$or" : regex , "info.name" : {"$ne" : "profile.jpg"}}).sort({
        "info.client_modified" : age_order,
        "info.views" : views_order,
    })
    .skip(index)
    .limit(12)
    .then(result => {
        console.log(result);
        return result;
    })
    .catch(err => {
        console.log(err);
        return err;
    })
}
exports.loadFeatured = () => {
    return Document.find()
    .sort({
        "info.views" : 1
    })
    .limit(4)
    .then(result => {
        console.log(result);
        return result
    })
    .catch(err => {
        console.log(err);
        return err;
    })
}