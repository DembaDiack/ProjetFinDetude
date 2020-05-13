const Router = require("express").Router();
const controller = require("../Controllers/Controller");





Router.get("/",(request,response)=>{response.send("hello welcome to our server");})

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


Router.get("/docs/delete/:id",controller.deleteDocumentById);


Router.get("/user/getByMatricule/:matricule",controller.getUserEmailByMatricule);


Router.post("/user/customQuery",controller.customQuery);

exports.routes = Router;