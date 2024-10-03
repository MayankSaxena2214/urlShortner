const express=require("express");
const Url = require("../models/urlSchema");
const staticRouter=express.Router();

staticRouter.get("/",async(req,res)=>{
    let allUrls=await Url.find();
    res.render("home.ejs",{allUrls});
})
module.exports=staticRouter;