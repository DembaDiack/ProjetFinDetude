const Auth = require("../Auth/Auth");
const Documents = require("../Documents/Documents");

exports.loginController = (request,response) => {
    console.log(request.body);
    const user = request.body;
    const query = Auth.login(user);
    query.then(result => {
        console.log("login response : ",result);
        response.send(result);
    })
}
exports.signUpController = (request,response) => {
    console.log("request body : ",request.body);
    const user = request.body;
    const query = Auth.signUp(user);
    query.then(result => {
        console.log("sign up response : ",result);
        response.send(result);
    })
}
exports.resetPasswordRequest = (request,response) => {
    const email = request.body.email;
    Auth.resetPasswordRequest(email)
    .then((result)=> {
        console.log("reset",result);
        response.send(result);
    })
    .catch(err => {
        console.log(err);
    })
}
exports.resetPasswordPost = (request,response) => {
    const user = {
        ...request.body,
        token : request.params.token
    }
    Auth.resetPasswordPost(user).then(result =>{
        response.send(result);
    })
}
exports.findToken = (request,response) =>
{
    const token = request.params.token;
    console.log(`finding token : ${token}`);
    Auth.findToken(token).then(result => {
        response.send(result);
    })
}
exports.addFile = (request,response) => 
{
    const doc = request.body.documentInfo;
    const email = request.body.email;
    Documents.add(doc,email)
    .then(result => {
        response.send(result);
    })
    .catch(err => {
        response.send(err);
    })
}
exports.listFiles = (request,response) => 
{
    Documents.list()
    .then(result => 
        {
            response.send(result);
        })
}
exports.getUser = (request,response) => {
    console.log(request.params);
    const result = Auth.getUser(request.params.email);
    result.then(data => {
        response.send(data);
    })
    .catch(err => {
        response.status(500).send(err);
    })
}
exports.getUserDocuments = (request,response) => {
    const email = request.params.email;
    Documents.getUserDocuments(email)
    .then(result => {
        response.send(result);
    })
    .catch(err => {
        response.status(500).send(err);
    })
}
exports.updateUserProfile = (request,response) =>{
    const data = request.body;
    const result = Auth.setUserProfile(data);
    response.send({
        code : result
    });
}
exports.deleteDocumentById = (request,response) => {
    const id = request.params.id;
    Documents.deleteById(id)
    .then(result => {
        console.log(result);
        response.send(result);
    })
    .catch(err => {
        console.log(err);
        response.send(1);
    })
}
exports.getUserEmailByMatricule = (request,response) => {
    const matircule = request.params.matricule;
    Auth.getUserEmailByMatricule(matircule)
    .then(result => {
        response.send(result);
    })
    .catch(err => {
        response.send(err);
    })

}

exports.customQuery = (request,response) => {
    const query = request.body.query;
    Auth.customQuery(query)
    .then(result => {
        response.send(result);
    })
    .catch(err => {
        response.send(err);
    })
}