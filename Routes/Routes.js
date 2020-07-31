const Router = require("express").Router();
const controller = require("../Controllers/Controller");

Router.post("/login",controller.loginController);

Router.post("/signup",controller.signUpController);

//requesting a new token 
Router.post("/reset",controller.resetPasswordRequest);

//post method to set new password
Router.post("/reset/:token",controller.resetPasswordPost);

//finding a reset token
Router.get("/reset/find/:token",controller.findToken);

//add documents
Router.post("/add",controller.addFile);

//list all documents
Router.get("/all",controller.listFiles);

Router.get("/user/:email",controller.getUser);


Router.get("/docs/:email",controller.getUserDocuments);

Router.post("/update",controller.updateUserProfile);


Router.post("/docs/delete/",controller.deleteDocumentById);


Router.get("/user/getByMatricule/:matricule",controller.getUserEmailByMatricule);


Router.post("/user/customQuery",controller.customQuery);

Router.post("/search",controller.regexSearch);


Router.post("/docs/views/",controller.increaseDocViews);


Router.post("/docs/info",controller.getDocInfo);

Router.get("/search",controller.browse);

Router.get("/loadFeatured",controller.loadFeatured);


Router.post("/post/add",controller.addPost);

Router.post("/post/delete",controller.deletePost);

Router.post("/post/search",controller.searchPost);

Router.get("/post/list",controller.listAllPosts);

Router.post("/post/user/",controller.getUserPosts);

Router.post("/post",controller.getSinglePost);


Router.post("/post/search",controller.searchPost);


exports.routes = Router;