const express = require("express");
const userRoute = require("./controllers/user");
//express initialize
const app = express();
require("dotenv").config();
require("./connection/conn");


app.get("/",(req,res)=>{
    res.send("hello");
})
app.get("/login",(req,res)=>{
    res.send("login");
})

//api's
 


app.listen(process.env.PORT,()=>{
    console.log("server started")
})