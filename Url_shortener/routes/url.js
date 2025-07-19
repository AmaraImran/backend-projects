const express = require('express');
const router=express.Router()
const {generateshortUrl,Redirect, getAnalytics}=require('../controllers/url')
router.post("/",generateshortUrl)
router.get("/:id",Redirect)
router.get("/getanalytics/:id",getAnalytics)
module.exports=router 