const mongoose=require('mongoose');

const urlSchema=new mongoose.Schema({
    shortUrl:{type:String,
        unique:true
    },
    redirectUrl:{
        type:String,
        required:true
    },
    visithistory:[{timestamp:{
        type:Number
    }}]
},
{timestamps:true}
)
module.exports=mongoose.model("Url",urlSchema)
