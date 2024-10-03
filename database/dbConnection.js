const mongoose=require("mongoose");

const dbConnection=async()=>{
    await mongoose.connect(process.env.MONGODB_URL,{
        dbName:"UrlShortener"
    })
    .then(()=>console.log("Mongodb Connected"))
    .catch((err)=>console.log(err));
}
module.exports=dbConnection;