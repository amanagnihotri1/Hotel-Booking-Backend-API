const dotenv=require("dotenv").config();
const express=require("express");
const authRoute=require("./routes/auth");
const userRoute=require("./routes/users");
const roomRoute=require("../api/routes/Rooms");
const hotelRoute=require("./routes/hotels");
const mongoose = require("mongoose");
const cookieParser=require("cookie-parser");
const cors=require("cors");
const app=express();
const connect=async()=>
{
    try{

        await mongoose.connect(process.env.MONGO_PASS)
        .then(()=>console.log(`connected to database successfully`))
    }catch(err)
    {
      console.log(err);
    }
}
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth",authRoute);
app.use("/api/user",userRoute);
app.use("/api/room",roomRoute);
app.use("/api/hotels",hotelRoute);
app.use((err,req,res,next)=>
{  
    const erro=err.stauts || 500;
    const errmessage=err.message || "Something went wrong";
    return res.status(erro).json({
       success:false,
       status:erro,
       message:errmessage,
       stack:err.stack,  
    });
});
app.listen(process.env.port || 5000,()=>
{
    connect();
    console.log("server started successfully");
});