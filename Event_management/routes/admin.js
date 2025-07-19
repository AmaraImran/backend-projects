const express=require("express")
const { RegisterAdmin, Login } = require("../controllers/admin")
const router=express.Router()
router.post('/register',RegisterAdmin)
router.post('/Login',Login)
module.exports=router