const express= require('express');
const app= express();
const url=require('./models/url')
const path=require("path")
app.use(express.json())
app.use(express.urlencoded({extended:true}))
const URLroutes=require('./routes/url')
const port=3000
const {ConnectToDatabase}=require('./connection')
app.use('/url',URLroutes);ConnectToDatabase("mongodb://localhost:27017/urlshortener").then(()=>{console.log("Mongodb Connected")})
app.set('view engine','ejs')
app.set("views",path.resolve("./views"))
app.get('/',async(req,res)=>{
    urls=await url.find({})
    res.render("dashboard",{
urls

    })
})
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})