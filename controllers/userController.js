const User = require("../models/userSchema");
const {v4:uuidv4}=require("uuid");
const { setUser } = require("../service/auth");
async function register(req,res,next){
    const {name,email,password}=req.body;

    const user=await User.create({name,email,password})
    
    return res.render('home.ejs');
}
async function login(req,res){
    let {email,password}=req.body;

    let user=await User.findOne({email:email});
    if(!user){
        return res.render("Login.ejs",{error:"Invalid Email"});
    }
    if(user.password!=password){
        return res.render("Login.ejs",{error:"Invalid Password"});
    }
    const token=setUser(user);
    // res.cookie("uid",token);
    
    return res.json({token});
}
module.exports={register,login};