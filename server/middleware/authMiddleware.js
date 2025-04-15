const jwt = require("jsonwebtoken");
const User = require("../models/user");

// ✅ Middleware to authenticate users
// const authMiddleware = async (req, res, next) => {
//     try {
//         const token = req.cookies.statiyUserToken;

//         if (!token) {
//             return res.status(401).json({ error: "new-user" });
//         }

//         const decode = jwt.verify(token, process.env.JWT_SECRET);
//         const user = await User.findById(decode.id);

//         if (!user) {
//             return res.status(404).json({ sucess:true,message: "User not found" });
//         }

//         req.user = user; 
//         next();
//     } catch (err) {
//         //console.log("Invalid token", err);
//         return res.status(401).json({ sucess:false,message: "Invalid token" });
//     }
// };

const authMiddleware = async (req, res, next) => {
    try {
        // Try getting token from cookies first, then Authorization header
        const token = req.cookies.statiyUserToken || req.headers.authorization?.split(' ')[1];
        
        if (!token) {
            return res.status(401).json({ 
                success: false,
                error: "Authentication required",
                isAuthenticated: false
            });
        }

        const decode = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decode.id).select('-password');

        if (!user) {
            return res.status(404).json({ 
                success: false,
                message: "User not found" 
            });
        }

        req.user = user; 
        next();
    } catch (err) {
        console.error("Authentication error:", err);
        return res.status(401).json({ 
            success: false,
            message: "Invalid or expired token",
            error: err.message
        });
    }
};
module.exports = authMiddleware;