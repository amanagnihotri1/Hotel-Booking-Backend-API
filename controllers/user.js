const user=require("../models/User");
const createError = require("../utils/error");
const createUser=async(req,res,next)=>
{
    const newUser=await new user(req.body);
    try
    {
       const savedHotel=await newUser.save();
       res.status(200).json(savedHotel);
    }
    catch(err)
    {      
        res.status(500).json(err);    
    }   
};
const getUsers=async(req,res,next)=>
{
      try
      {
   const users=await user.find();
      res.status(200).json(users);
    next();  
    }
     catch(err)
     {
       res.sendStatus(500).json(err);
      next(createError(500,err));
     } 
  };
  const getUser=async(req,res,next)=>
  {
      const failed=true;
       if(failed){  
        next(createError(404,"Sorry User not Found"));
    }
      else
      {
        const userId=req.params.id;
        try
        {
          const User=await user.find({_id:userId});
          res.status(200).json(User);
        }
       catch(err)
       {
         next(createError(500,err));
        } 
      } 
      };
const deleteUser=async(req,res,next)=>
{
    {
        try
        {
         await user.findByIdAndDelete(req.params.id);
         res.status(200).json("User has been deleted");  
      } 
        catch(err)
        {
          res.status(500).json(err);
        } 
      }

};
const updateUser=async(req,res,next)=>
{
    try
  {
   const updateUser=await user.findByIdAndUpdate(req.params.id,
    {$set:req.body},
     { new:true }   
    );
   res.status(200).json(updateUser);  
} 
  catch(err)
  {
    res.status(500).json(err);
  } 
};
module.exports={createUser,getUser,getUsers,updateUser,deleteUser};