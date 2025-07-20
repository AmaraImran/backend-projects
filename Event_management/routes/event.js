const express=require("express")
const { addEvent, viewEvent, updateEvent, deleteEvent } = require("../controllers/event")
const verifyToken=require("../middlewares/auth")

const router=express.Router()
router.post("/",verifyToken,addEvent)
router.get("/",viewEvent)
router.put("/:id",verifyToken,updateEvent)
router.delete("/:id",verifyToken,deleteEvent)
module.exports=router