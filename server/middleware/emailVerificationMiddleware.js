// middleware/checkEmailVerified.js
const User = require("../models/user");
module.exports = async (req, res, next) => {
    // const user = await User.findById(req.user);
    //console.log("email middleware",req.user)
    if (!req.user?.isVerified) {
      return res.status(403).json({ success:true,message: "Please verify your email." });
    }
    next();
};
  