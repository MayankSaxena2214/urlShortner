const express=require("express");
const { shortUrl, handleAnalytics } = require("../controllers/urlController");
const router=express.Router();

router.post("/",shortUrl);
router.get("/analytics/:shortId",handleAnalytics)

module.exports=router;