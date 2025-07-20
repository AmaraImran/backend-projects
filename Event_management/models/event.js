const mongoose=require("mongoose")
const eventSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true

    },
    date:{
        type:Date,
        required:true
    },
    location:{type:String
        ,required:true
    },
      image: {
    type: String,
    default: "", // optional — if no image, just empty string
  },
  createdby:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Admin",
    required:true
  }
},{timestamps:true})
module.exports=mongoose.model("event",eventSchema)