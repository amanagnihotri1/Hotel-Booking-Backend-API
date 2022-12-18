const mongoose=require("mongoose");
const roomSchema=new mongoose.Schema({
    title:
    {
        type:String,
        required:true,
    },
    desc:{
        type:String,
        required:true
    },
    type:{
        type:String,
    },
    rating:{
     type:Number,
     min:0,
     max:5,   
    },
    maxPeople:{
        type:Number,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
   roomNumbers:[
        {number:Number,unavailableDates:{type:[Date]}}],
    },{timestamps:true}
    );
const Rooms = mongoose.model('Rooms',roomSchema);
module.exports=Rooms;