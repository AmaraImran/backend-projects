const mongoose=require("mongoose")
exports.connectTodatabase=async(db)=>{
await mongoose.connect(db)
}