const express=require("express");
const Url = require("../models/urlSchema");
const staticRouter=express.Router();

staticRouter.get("/",async(req,res)=>{
    if(!req.user)return res.redirect("/login");

    let allUrls=await Url.find({createdBy:req.user._id});
    res.render("home.ejs",{allUrls});
})
staticRouter.get("/register",(req,res)=>{
    res.render("Signup.ejs");
})
staticRouter.get("/login",(req,res)=>{
    res.render("Login.ejs")
})
module.exports=staticRouter;