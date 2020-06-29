const User = require("../Models/user");
const crypto = require("crypto-js");
const AES = require("crypto-js").AES;
const passPhrase = "iscae";
const sendgrid = require("./Sendgrid");


exports.signUp = ({
    email,
    password,
    firstName,
    lastName,
    user_type,
    faculty,
    matricule,
    course
}) => {
    return User.findOne({
            "email": email
        })
        .then(result => {
            console.log("searching fors user result : ", result);
            if (result == null) 
            {
                return new User({
                        email: email,
                        password: AES.encrypt(password, passPhrase),
                        firstName: firstName,
                        lastName: lastName,
                        user_type : user_type,
                        matricule : matricule,
                        course : course,
                        faculty : faculty,
                        avatar : `http://gravatar.com/avatar/${crypto.MD5(email)}?d=identicon`
            })
                    .save()
                    .then(() => {
                        console.log("user doesnt exist, signing up...");
                        return {
                            code: 0,
                            message: "signed up succesfully"
                        }
                    })
                    .catch(err => console.log(err));
            }
            else {
                return {
                    code: -1,
                    message: "user already exists"
                }
            }
        })
        .catch(err => {

        })

}
exports.login = ({
    email,
    password
}) => {
    return User.findOne({
            "email": email
        })
        .then(result => {
            if (result != null) {
                const decrypted = AES.decrypt(result.password, passPhrase).toString(crypto.enc.Utf8);
                console.log("decrypted password : ", decrypted);
                if (decrypted == password) {
                    return {
                        code: 0,
                        message: "logged in succesfully"
                    }
                } else {
                    return {
                        code: 1,
                        message: "check password"
                    }
                }
            } else {
                console.log("user not found, check email");
                return {
                    code: -1,
                    message: "user not found"
                }
            }
        })
        .catch(err => console.log(err));
}
exports.resetPasswordRequest = email => {
    let token = crypto.lib.WordArray.random(16);
    console.log(token.toString());
    return User.findOne({
            "email": email
        })
        .then(result => {
            if (result != null) {
                result.resetToken = token;
                result.resetTokenExpiration = Date.now() + 3600000;
                return result.save()
                .then(()=>{
                    return sendgrid.sendMail("i16726.edu@gmail.com",email,"reset",`${token}`)
                    .then((result)=>{
                        if(result[0].complete)
                        {
                            console.log("email sent ",result[0].statusMessage);
                            return {
                                code : 0,
                                message : `email sent succesfully to ${email}`
                            }
                        }
                        else
                        {
                            return {
                                code : -1,
                                message : "there was an error sending the email"
                            }
                        }
                    })
                })
                .catch(err => {
                    return{
                        code : -1,
                        message : "an internal error happened"
                    }
                })
            } else {
                console.log("user not found");
                return {
                    code : -1,
                    message : "user not found"
                };
            }
        })

}
exports.resetPasswordPost = ({email,password,token}) => {
    const filter = {
        "email" : email,
        "resetToken" : token,
        "resetTokenExpiration" : {"$gt" : Date.now()}
    };
    return User.findOne(filter)
    .then((result)=>{
        console.log(result);
        if(result !== null)
        {
            result.password = AES.encrypt(password,passPhrase);
            return result.save().then(()=>{
                console.log("password reset ok");
                return {
                    code : 0,
                    message : `password for ${email} changed succesfully`
                }
            })
        }
        else
        {
            return {
                code : -1,
                message : "token doesnt exist or expired"
            }
        }
    })
    .catch(err => {
        console.log(err);
    })
}
exports.findToken = token =>
{
    const filter = {
        "resetToken" : token,
        "resetTokenExpiration" : {"$gt" : Date.now()}
    };
    return User.findOne(filter)
    .then(result =>
        {
            console.log(result);
            if(result === null)
            {
                return{
                    code : -1,
                    message : "token not found or expired"
                }
            }
            else{
                return {
                    email : result.email,
                    code : 0,
                    message : "token found"
                }
            }
        })
    .catch(err =>
        {
            console.log(err);
        })
}
exports.getUser = email =>
{
    const filter = {
        "email" : email
    }
    return User.findOne(filter)
    .then(result => {
        if(result !== null)
        {
            return result;
        }
        else 
        {
            throw("user not found");
        }
    })
    .catch(err => {
        return null
    })
}
exports.setUserProfile = data => {
    console.log(data);
    const filter = {
        "email" : data.data.email
    }
   User.findOneAndUpdate(filter,data.data,(err,result) => {
       if(err){
           return false
       }
       if(result)
       {
           return true
       }
   },{
       new : true,
       useFindAndModify : false,
    });
   
}

exports.setProfilePicture = (pictureUrl,email) => {
    const filter = {
        "email" : email
    }
    User.findOne(filter)
    .then(result => {
        if(result)
        {
            result.avatar = pictureUrl;
            result.save();
            return result;
        }
        return false;
    })
    .catch(err => {
        return err;
    })
}

exports.getUserEmailByMatricule = matricule => {
    const filter = {
        "matricule" : matricule
    }
    return User.findOne(filter)
    .then(result => {
        return result;
    })
    .catch(err => {
        return err
    })
}

exports.customQuery = query => {
    return User.find(query)
    .then(result => {
        return result;
    })
    .catch(err => {
        return err;
    })
}

exports.regexSearch = query => {
   

    const regex = [
        {"email" : {"$regex" : query , "$options" : "i"}},
        {"firstName" : {"$regex" : query , "$options" : "i"}},
        {"lastName" : {"$regex" : query , "$options" : "i"}},
        {"firstName" : {"$regex" : query.split(" ")[0] , "$options" : "i"}},
        {"faculty" : {"$regex" : query , "$options" : "i"}}
    ]
    query.split(" ")[1] ? regex.push({"lastName" : {"$regex" : query.split(" ")[1] , "$options" : "i"}})
    : null;

    return User.find({"$or" : regex}).limit(3)
    .then(result => {
        return result;
    })
    .catch(err => {
        return err;
    })
}