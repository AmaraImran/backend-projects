const {nanoid}=require('nanoid')
const urldb=require('../models/url')

exports.generateshortUrl=async(req,res)=>{
    const body=req.body;
    if(!body.url) return res.status(400)
const shortid=nanoid(7);
await urldb.create({
shortUrl:shortid,
redirectUrl:body.url,
visithistory:[]
})
res.render("dashboard",{id:shortid})

}
exports.Redirect=async(req,res)=>{
    const id=req.params.id;
    console.log(id)
  const longurl= await urldb.findOneAndUpdate({
        shortUrl:id
    },{$push:{
visithistory:{timestamp:Date.now()}
    }}
);
  if (!longurl) {
        return res.status(404).json({ error: "Short URL not found" });
    }
await res.redirect(longurl.redirectUrl);
    

}
exports.getAnalytics=async(req,res)=>{
const id =req.params.id;
const result=await urldb.findOne({
    shortUrl:id
})
return res.json({totalclicks:result.visithistory.length,visithistory:result.visithistory})
}