const express=require("express");
const dotenv=require("dotenv");
const dbConnection = require("./database/dbConnection");
const urlRouter = require("./router/urlRouter");
const Url = require("./models/urlSchema");
const ejs=require("ejs")
const path=require("path");
const staticRouter = require("./router/staticRouter");


dotenv.config();

const app=express();
app.use(express.json());
app.use(express.urlencoded({extended:false}))
app.use("/url",urlRouter)
app.use("/",staticRouter);

app.set('view engine', "ejs");
app.set("views",path.resolve("./views"));

app.get("/test",async(req,res)=>{
    const allUrls=await Url.find();
    res.render("home.ejs",{allUrls});
})
app.get("/url/:shortid",async(req,res,next)=>{
    const {shortid}=req.params;
    const entry=await Url.findOneAndUpdate({
        shortId:shortid
    },{
        $push:{
            visitHistory:{
                timestamp:Date.now()
            }
        }
    })
    res.redirect(entry.redirectUrl);
})

dbConnection();
app.listen(process.env.PORT,()=>{
    console.log(`App is listening on the port ${process.env.PORT}`);
})