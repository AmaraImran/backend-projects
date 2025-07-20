const eventSchema=require("../models/event")
exports.addEvent=async(req,res)=>{
  const { title, description, date, location, image } = req.body;

  if (!title || !description || !date || !location) {
    return res.status(400).json({ message: "Please fill all required fields" });
  }
  try{
    const event=await eventSchema.create({
        title,
        description,
        date,
        location,
        image:image||"",
        createdby:req.user.id
      
    })
    res.status(200).json({
        success:"Event Created Successfully",
        event:event
    })
  }
  catch (err) {
    console.error("Event Creation Error:", err);
    res.status(500).json({ message: "Failed to create event" });
  }
}
exports.viewEvent=async(req,res)=>{
const events=await eventSchema.find({})
res.status(201).json({events})
}
exports.updateEvent=async(req,res)=>{
     const eventId = req.params.id;
     const { title, description, date, location, image } = req.body;
     try {
        const event=await eventSchema.findById(eventId)
        if(!event) res.status(401).json("Event Not Found!")
            if(event.createdby.toString()!==req.user.id){
                return res.status(403).json("You are not Authorized!")
            }
            event.title=title||event.title;
        event.description=description||event.description;
        event.date=date||event.date;
        event.location=location||event.location;
        event.image=image||event.image;
         await event.save();

    res.status(200).json({ message: "Event updated successfully", event });
     } catch (error) {
        res.status(500).json("Server Error")
     }
    
    
    }
    exports.deleteEvent=async (req,res)=>{
        const eventid=req.params.id
      try {
          
      const event=await eventSchema.findById(eventid)
      if(!event) return res.status(401).json("Event not exist")
        if(event.createdby.toString()!==req.user.id){
            return res.status(403).json("You are not Authorized to do this task!")

        }
        await event.deleteOne()
           res.status(200).json({ message: "Event deleted successfully" });
      } catch (error) {
        
      }
        
    }