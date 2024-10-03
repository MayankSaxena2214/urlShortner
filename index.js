const express=require("express");
const dotenv=require("dotenv");
const dbConnection = require("./database/dbConnection");
const router = require("./router/urlRouter");
const Url = require("./models/urlSchema");
const ejs=require("ejs")
const path=require("path");

dotenv.config();

const app=express();
app.use(express.json());
app.set('view engine', "ejs");
app.set("views",path.resolve("./views"));
app.use("/url",router)

app.get("/:shortid",async(req,res,next)=>{
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