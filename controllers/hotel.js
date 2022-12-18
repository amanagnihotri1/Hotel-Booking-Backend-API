const Rooms=require("../models/Rooms");
const Hotel=require("../models/Hotel");
const createError=require("../utils/error");
const createHotel=async(req,res,next)=>
{
    const newHotel=await new Hotel(req.body);
    try
    {
        const savedHotel=await newHotel.save();
       res.status(200).json(savedHotel);
    }
    catch(err)
    {
        
        res.status(500).json(err);
    }   
};
const getHotels=async(req,res,next)=>
{
      try
      {
        console.log(req.query);
       const{min,max,...others}=req.query; 
   const hotels=await Hotel.find({...others,cheapestPrice:{$gt:min | 1,$lt:max | 999},
  }).limit(req.query.limit);
  console.log(hotels);
     res.status(200).json(hotels);
      }
     catch(err)
     {
      next(err);
     } 
  };
  const getHotel=async(req,res,next)=>
  {
      const hotelId=req.params.id;
      console.log(hotelId);
       try
      {
       const hotels=await Hotel.find({_id:hotelId});
       res.status(200).json(hotels);
      }
       catch(err)
       {
        next(500,err);
       } 
    };
const deleteHotel=async(req,res,next)=>
{
    {
        try
        {
         await Hotel.findByIdAndDelete(req.params.id);
         res.status(200).json("Hotel has been deleted");  
      } 
        catch(err)
        {
          res.status(500).json(err);
        } 
      }

};
const updateHotel=async(req,res,next)=>
{
    try
  {
   const updateHotel=await Hotel.findByIdAndUpdate(req.params.id,
    {$set:req.body},
     { new:true }   
    );
   res.status(200).json(updateHotel);  
} 
  catch(err)
  {
    res.status(500).json(err);
  } 
};
const countByCity=async(req,res,next)=>
{
  const cities=req.query.cities.split(",");
try
{
  const results=await Promise.all(cities.map(city=>
 {
      return Hotel.countDocuments({city:city});
     } 
      ))
   return res.status(200).json(results);
  }catch(err)
  {
    next(createError(500,err));
  }
}
const countByType=async(req,res,next)=>
{
  try
  {

    const apartmentCount=await Hotel.countDocuments({type:"apartment"});
    const villaCount=await Hotel.countDocuments({type:"villa"});
    const resortCount=await Hotel.countDocuments({type:"resort"});
    const cabinCount=await Hotel.countDocuments({type:"cabin"});
    const hotelCount=await Hotel.countDocuments({type:"hotel"});
    return res.status(200).json({apartmentCount,villaCount,resortCount,cabinCount,hotelCount});
  }catch(err)
  {
    next(createError(500,err));
  }
}
const getHotelRoom=async(req,res,next)=>
{
  try{
   
    const hotel=await Hotel.findById(req.params.id);
    console.log(hotel);
    const list= await Promise.all(hotel.rooms.map((room)=>{
     return Rooms.findById(room); 
    })
    );
    res.status(200).json(list);
    console.log(list);
  }catch(err)
  {
    next(err);
  }
};
module.exports={createHotel,getHotel,getHotels,updateHotel,deleteHotel,countByCity,countByType,getHotelRoom};