const port = process.env.PORT || 2000;
const express = require("express");
const app = express();
const db = require("./Database/db");
const bodyParser = require("body-parser");
const cors = require("cors");
const routes = require("./Routes/Routes");
const path = require("path");
app.use(cors());


app.use(bodyParser.json());


app.use(routes.routes);



console.log("Make sure you have internet,or server wont start");

if(process.env.NODE_ENV === "production")
{
    app.use(express.static("client/build"));

    app.get("*", (request,response)=> {
        response.sendFile(path.resolve(__dirname,"client","build","index.html"));
    })
}

db.connect()
.then(()=>{
    app.listen(port,()=>{
        console.log(`app started on port ${port}`);
    })
})
.catch(err => {
    console.log(err);
})