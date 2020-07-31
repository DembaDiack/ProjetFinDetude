const Post = require("../Models/post");
const User = require("../Models/user");

exports.add = (post,email) => 
{
    const filter = {
        "email" : email
    }

    return User.findOne(filter)
    .then(user_result => {
        if(user_result)
        {
            return new Post({
                info : post,
                userInfo : user_result
            })
            .save()
            .then(result => {
                return {
                    code : 0,
                    message : "post saved succesfullly"
                }
            })
            .catch(err => {
                return {
                    code : -1,
                    message : "error saving post"
                }
            })
        }
        else
        {
            return {
                code : -1,
                message : "user not found"
            }
        }
    })
}
exports.list = () => {
    return Post.find()
    .then(result => {
        return result;
    })
}

exports.getUserPosts = email => {
    const filter = {
        "userInfo.email" : email
    }
    return Post.find(filter)
    .then(result => {
        return result;
    })
    .catch(err => {
        console.log(err);
    })
}

exports.deleteById = id =>
{

   return Post.deleteOne({
       "_id" : id
   })
   .then(result => {
       console.log("delete ", result);
       return result;
   })
   .catch(err => {
       console.log(err);
       return err;
   })
}

exports.searchRegex = query => {
    const regex = [
        {"info.name" : {"$regex" : query , "$options" : "i"}},
        {"info.description" : {"$regex" : query , "$options" : "i"}},
        {"info.title" : {"$regex" : query , "$options" : "i"}},
        {"userInfo.email" : {"$regex" : query , "$options" : "i"}}
    ];
    return Post.find({"$or" : regex})
    .limit(5)
    .then(result => {
        return result
    })
    .catch(err => {
        return err
    })
}
exports.getSinglePost = id => {
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