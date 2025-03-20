const jwt = require("jsonwebtoken");
const User = require("../models/user");

const authMiddleware = async(requestAnimationFrame,res,next)=>{
    const token = req.cookies.statiyUserToken;

    try{
        if(!token){
            return res.status(401).json({error:"new-user"});
        }
        const decode = jwt.verify(token,process.env.JWT_SECRET);

        const user = await User.findById(decode.id);

        if(!user){
            return res.status(404).json({message:"User not found"});
        }
        req.user = user;
        next();
    }catch(err){
        console.log("invalid token",err);
        return res.status(401).json({message:"invalid token"});
    }
}

module.exports = authMiddleware;