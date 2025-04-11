const jwt = require("jsonwebtoken");
const User = require("../models/user");

// ✅ Middleware to authenticate users
const authMiddleware = async (req, res, next) => {
    try {
        const token = req.cookies.statiyUserToken; // ✅ Corrected req parameter

        if (!token) {
            return res.status(401).json({ error: "new-user" });
        }

        const decode = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decode.id);

        if (!user) {
            return res.status(404).json({ sucess:true,message: "User not found" });
        }

        req.user = user; 
        next();
    } catch (err) {
        //console.log("Invalid token", err);
        return res.status(401).json({ sucess:false,message: "Invalid token" });
    }
};
module.exports = authMiddleware;