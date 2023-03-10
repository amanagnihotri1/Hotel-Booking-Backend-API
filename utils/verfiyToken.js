const jwt=require("jsonwebtoken");
const createError=require("../utils/error");
const verfiyToken=(req,res,next)=>
{
  const token=req.cookies.access_token;
if(!token)
{
    return next(createError(401,"You are not authenticated"));
}
jwt.verify(token,process.env.JWT,(err,user)=>
{
    if(err) return next(createError(403,"Token is not valid"));
    req.user=user;
    next();
});
}
const verifyUser=(req,res,next)=>
{
    verfiyToken(req,res,next,()=>
    {
        if(req.user.id==req.params.id || req.user.isAdmin)
         next()
    else
    {
        if(err) return next(createError(403,"You are not authorized"));
    }
        })
}
const verifyAdmin=(req,res,next)=>
{
    verfiyToken(req,res,next,()=>
    {
        if(req.user.isAdmin)
         next()
    else
    {
        if(err) return next(createError(403,"You are not authorized"));
    }
        })
}
module.exports={verfiyToken,verifyUser,verifyAdmin};