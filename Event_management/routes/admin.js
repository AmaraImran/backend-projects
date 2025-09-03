const express=require("express")
const { RegisterAdmin, Login } = require("../controllers/admin")
const router=express.Router()
router.post('/register',RegisterAdmin)
router.post('/Login',Login)
router.get('/add-event',(req,res)=>{
    res.render("AddEvent")
})
module.exports=router