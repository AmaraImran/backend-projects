const mongoose=require('mongoose');
exports.ConnectToDatabase=async(db)=>{
    await mongoose.connect(db)
}