const Auth = require("../Auth/Auth");
const Documents = require("../Documents/Documents");
const Post = require("../Posts/Posts");
const { request } = require("http");
const user = require("../Models/user");

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
    console.log("user data update : ",data);
    const result = Auth.setUserProfile(data);
    response.send({
        code : result
    });
}
exports.deleteDocumentById = (request,response) => {
    const _id = request.body._id;
    Documents.deleteById(_id)
    .then(result => {
        console.log(result);
        response.send(result);
    })
    .catch(err => {
        console.log(err);
        response.send(-1);
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
exports.regexSearch = (request,response) => {
    const query = request.body.query;
    const searchResult = {
        users : null,
        Documents : null
    }

    Auth.regexSearch(query)
    .then(result => {
        searchResult.users = result;
        console.log(result);
    })
    .catch(err => console.log(err));

    Documents.searchRegex(query)
    .then(result => {
        searchResult.Documents = result;
        response.send(searchResult);
    })
    .catch(err => response.send(searchResult));



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

exports.increaseDocViews = (request,response) => {
    const id = request.body.id;
    Documents.increaseDocViews(id)
    .then(result => {
        response.send(result);
    })
    .catch(err => {
        response.send(err);
    })
}

exports.getDocInfo = (request,response) => {
    const id = request.body.id;
    Documents.getDocInfo(id)
    .then(result => {
        response.send(result);
    })
    .catch(err => {
        response.send(err);
    })
}

exports.browse = (request,response) => {
    const age = request.query.age ? request.query.age === "asc" ? "asc" : "desc" : "asc";
    const views = request.query.views ? request.query.views === "asc" ? "asc" : "desc" : "asc";
    const index = request.query.index;
    console.log("category",request.query.c);
    Documents.loadDocs(views,age,request.query.q,request.query.index)
    .then(result => {
        response.send(result);
    })
    .catch(err => {
        response.send(err);
    });
}

exports.loadFeatured = (request,response) => {
    Documents.loadFeatured()
    .then(result => {
        console.log("here mate : ",result);
        response.send(result);
    })
    .catch(err => {
        console.log("error here",err);
        response.send(err);
    });
}

exports.addPost = (request,response ) => {
    const postInfo = request.body.postInfo;
    const email = request.body.email;

    Post.add(postInfo,email)
    .then(result => {
        response.send(result);
    })
    .catch(err => {
        response.send(err);
    })
}

exports.deletePost = (request,response) => {
    const post_id = request.body._id;
    Post.deleteById(post_id).
    then(result => {
        response.send(result);
    })
    .catch(err => {
        response.send(err);
    })
}

exports.listAllPosts = (request,response) => {
    Post.list()
    .then(result => {
        response.send(result);
    })
    .catch(err => {
        response.send(err);
    })
}

exports.getUserPosts = (request,response) => {
    const email = request.params.email;
    Post.getUserPosts(email)
    .then(result => {
        response.send(result);
    })
    .catch(err => {
        response.status(500).send(err);
    })
}

exports.getSinglePost = (request,response) => {
    const post_id = request.body._id;
    Post.getSinglePost(post_id)
    .then(result => {
        response.send(result);
    })
    .catch(err => {
        response.send(err);
    })
}

exports.searchPost = (request,response) => {
    const query = request.body.query;

    Post.searchRegex(query)
    .then(result => {
        response.send(result);
    })
    .catch(err => {
        response.send(err);
    })
}

exports.addDocToList = (request,response) => {
    const email = request.body.email;
    const docId = request.body.id;
    Auth.addDocToList(email,docId)
    .then(result => {
        response.send(result);
    })
    .catch(err => {
        response.send(err);
    })
}