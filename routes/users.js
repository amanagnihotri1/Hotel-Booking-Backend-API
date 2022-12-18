const express=require("express");
const router=express.Router();
const {verfiyToken,verifyUser,verifyAdmin}=require("../utils/verfiyToken");
const {createUser,deleteUser,updateUser,getUser,getUsers}=require("../controllers/user");
router.get("/checkauth",verfiyToken,(req,res,next)=>
{
    res.send("you are logged in ");
})
router.get("/checkuser/:id",verifyUser,(req,res,next)=>
{
  res.send("you are logged in and you can delete your account");
})
router.get("/checkadmin/:id",verifyAdmin,(req,res,next)=>
{
  res.send("Hello admin,you are logged in and you can delete all user accounts");
})
router.post("/",createUser);
router.put("/:id",updateUser);
router.get("/",getUsers);
router.get("/:id",getUser);
router.delete("/:id",deleteUser);
module.exports=router;