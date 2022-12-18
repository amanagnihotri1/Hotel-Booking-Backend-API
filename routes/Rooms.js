const express=require("express");
const router=express.Router();
const {createRoom,updateRoom,updateroomAvailability,getRooms,getRoom,deleteRoom}=require("../controllers/room");
const {verifyAdmin}=require("../utils/verfiyToken");
router.put("/availability/:id",updateroomAvailability);
router.post("/:id",verifyAdmin,createRoom);
router.put("/:id",verifyAdmin,updateRoom);
router.get("/",getRooms);
router.get("/:id",getRoom);
router.delete("/:id",verifyAdmin,deleteRoom);
module.exports=router;