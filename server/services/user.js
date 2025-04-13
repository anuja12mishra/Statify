const { validationResult, check } = require("express-validator");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {sendVerificationEmail} = require("../utils/mail");
const EmailVerificationToken = require("../models/email");


const register = async (req, res) => {
    try {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // Extract data
        const { username, email, password } = req.body;

        // Check if username or email already exists
        const checkUser = await User.findOne({ $or: [{ email }, { username }] });
        if (checkUser) {
            return res.status(400).json({ error: "User or email already exists" }); 
        }

        // Hash password
        const hashPass = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new User({ username, email, password: hashPass });
        await newUser.save();
        await sendVerificationEmail(newUser);

        //console.log("New user registered:", { username, email,password }); // ✅ Removed password logging for security

        return res.status(201).json({ message: "User registered successfully" }); // ✅ Changed 200 → 201 (created)

    } catch (error) {
        console.error("Error in registration:", error);
        return res.status(500).json({ message: "Server error" });
    }
};

const login = async (req, res) => {
    try {
        const { username, password } = req.body; 

        // ✅ Validate input fields
        if (!username || !password) {
            return res.status(400).json({ error: "All fields are required" });
        }

        // ✅ Check if user exists
        const checkUser = await User.findOne({ username });
        if (!checkUser) {
            return res.status(400).json({ error: "Invalid credentials" });
        }

        // ✅ Compare passwords using `await`
        const isMatch = await bcrypt.compare(password, checkUser.password);
        if (!isMatch) {
            return res.status(400).json({ error: "Invalid credentials" });
        }

        // ✅ Generate JWT token
        const token = jwt.sign(
            { id: checkUser._id, email: checkUser.email },
            process.env.JWT_SECRET,
            { expiresIn: "30d" }
        );

        res.cookie("statiyUserToken", token, {
            httpOnly: true,
            maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
            secure: process.env.NODE_ENV === "production", 
            sameSite: "Lax"
        });

        return res.status(200).json({ success: "Login successful" });

    } catch (error) {
        console.error("Login Error:", error);
        return res.status(500).json({ message: "Server error" });
    }
};
const logout= (req, res) => {
    res.clearCookie("statiyUserToken"); 
    res.status(200).json({ message: "Logged out successfully" });
};

const userDetails = async(req,res)=>{
    try {
        const {user}= req;
        const getDetails = await User.findById(user._id)
            .populate("tasks")
            .select("-password")
        let yetToStart=[];
        let inprogress=[];
        let completed=[];
        
        if(getDetails){
            const allTask = getDetails.tasks;
            allTask.forEach((item) => {
                if (item.status === "yetToStart") {
                    yetToStart.push(item);
                } else if (item.status === "inProgress") {
                    inprogress.push(item);
                } else if (item.status === "completed") {
                    completed.push(item);
                }
            });
    
        }
        return res.status(201).json({
            success: true,
            username: user.username,
            tasks:
            [
                {yetToStart},
                {inprogress},
                {completed},
            ]
        });
        
    } catch (err) {
        console.error("Login Error:", err);
        return res.status(500).json({ success:false,message: "Server error" });
    }
}
// routes/verify.js

// const verifyEmail = async (req, res) => {
//   try {
//     const { userId, token } = req.params;

//     const record = await EmailVerificationToken.findOne({ userId, token });
//     if (!record || record.expiresAt < Date.now()) {
//       return res.status(400).send("Token expired or invalid.");
//     }

//     await User.findByIdAndUpdate(userId, { isVerified: true });
//     await EmailVerificationToken.findByIdAndDelete(record._id);
//     console.log("Email verified successfully!");
//     res.send("Email verified successfully!");
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Internal Server Error.");
//   }
// };
// const verifyEmail = async (req, res) => {
//     try {
//       const { userId, token } = req.params;
//       console.log("Verifying email for:", userId, "with token:", token);
  
//       const record = await EmailVerificationToken.findOne({ userId, token });
//       if (!record) {
//         console.log("Token not found for user");
//         return res.status(400).send("Invalid verification token.");
//       }
      
//       if (record.expiresAt < Date.now()) {
//         console.log("Token expired");
//         return res.status(400).send("Verification token has expired. Please request a new one.");
//       }
  
//       const user = await User.findByIdAndUpdate(userId, { isVerified: true });
//       if (!user) {
//         console.log("User not found");
//         return res.status(404).send("User not found.");
//       }
      
//       await EmailVerificationToken.findByIdAndDelete(record._id);
//       console.log("Email verification successful for user:", userId);
  
//       res.send("Email verified successfully!");
//     } catch (error) {
//       console.error("Error during email verification:", error);
//       res.status(500).send("Internal Server Error. Please try again later.");
//     }
// };

const verifyEmail = async (req, res) => {
    console.log("Email verification endpoint hit with params:", req.params);
    
    try {
      const { userId, token } = req.params;
  
      // Log the parameters
      //console.log("Looking for verification record with userId:", userId, "token:", token);
  
      const record = await EmailVerificationToken.findOne({ userId, token });
      //console.log("Verification record found:", record ? "Yes" : "No");
      
      if (!record) {
        console.log("No matching verification record found");
        return res.status(400).send("Token invalid.");
      }
      
      if (record.expiresAt < Date.now()) {
        console.log("Token expired at:", record.expiresAt, "Current time:", Date.now());
        return res.status(400).json({success:false,message:"Token expired. Please request a new one."});
      }
  
      //console.log("Updating user verified status...");
      await User.findByIdAndUpdate(userId, { isVerified: true });
      //console.log("Deleting verification token...");
      await EmailVerificationToken.findByIdAndDelete(record._id);
  
      //console.log("Email verification successful!");
      res.status(200).json({success:true,message:"Email verified successfully!"});
    } catch (error) {
      console.error("Email verification error:", error);
      res.status(500).json({success:false,message:"Internal Server Error."});
    }
  };
module.exports = {register,login,logout,userDetails,verifyEmail};
