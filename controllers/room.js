const Rooms=require("../models/Rooms");
const Hotel=require("../models/Hotel");
const {createError}=require("../utils/error");
const createRoom=async(req,res,next)=>
{
const hotelId=req.params.id;
const newRoom=new Rooms(req.body);
try
{
const savedRoom=await newRoom.save();
try
{
 await Hotel.findByIdAndUpdate(hotelId,{$push:{rooms:savedRoom._id},});

}  
catch(err)
{
    next(err);
}
res.status(200).json(savedRoom);
}catch(err)
{
    next(err);
}
}
const getRooms=async(req,res,next)=>
{
      try
      {
   const rooms=await Rooms.find();
     res.status(200).json(rooms);
      }
     catch(err)
     {
      next(err);
     } 
  };
  const getRoom=async(req,res,next)=>
  {
       const hotelId=req.params.id;
       try
        {
     const room=await Rooms.findById(hotelId);
       res.status(200).json(room);
        }
       catch(err)
       {
        next(createError(500,err));
       } 
    };
const deleteRoom=async(req,res,next)=>
{
    {
        try
        {
         await Rooms.findByIdAndDelete(req.params.id);
         res.status(200).json("Hotel has been deleted");
         next();  
      } 
        catch(err)
        {
          next(createError(500,err));        
        } 
      }

};
const updateRoom=async(req,res,next)=>
{
    try
  {
   const updateRoom=await Rooms.findByIdAndUpdate(req.params.id,
    {$set:req.body},
     { new:true }   
    );
   res.status(200).json(updateRoom);  
} 
  catch(err)
  {
    res.status(500).json(err);
  } 
};
const updateroomAvailability=async(req,res,next)=>
{
    try
  {
  await Rooms.updateOne({"roomNumbers._id":req.params.id},{$push:{"roomNumbers.$.unavailableDates":req.body.dates},});
   res.status(200).json("successfull");  
} 
  catch(err)
  {
    next(err);
  } 
};
module.exports={createRoom,getRoom,getRooms,updateRoom,deleteRoom,updateroomAvailability};