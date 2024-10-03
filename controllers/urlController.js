const shortid = require('shortid');
const Url = require('../models/urlSchema');

async function shortUrl(req,res,next){
    try{
        const {url}=req.body;
    if(!url)return res.status(400).json({message:"Url is requred"});

    const shortId=shortid.generate();

    await Url.create({
        shortId,
        redirectUrl:url,
        visitHistory:[],
    })

    return res.status(200).json({id:shortId});
    }
    catch(err){
        return res.json(400).json({
            success:false,
            error:err
        })
    }
}
async function handleAnalytics(req,res){
    try{
        const {shortId}=req.params;
    const url=await Url.findOne({shortId});
    const totalClicks=url.visitHistory.length;
    return res.status(200).json({
        totalClicks,
        analytics:url.visitHistory
    })
    }
    catch(err){
        return res.json(400).json({
            success:false,
            error:err
        })
    }
}
module.exports={shortUrl,handleAnalytics}