const { validationResult } = require("express-validator");
const User = require("../models/user");
const bcrypt = require("bcryptjs")
const register = async(req, res) => {
    try {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // Extract data
        const { username, email, password } = req.body;
        const checkUser = await User.findOne({$or:[{email},{username}]});

        if(checkUser){
            return res.status(400).json({ errors: "User or email already exit" });
        }else{
            const hashPass = await bcrypt.hash(password,10);
            const newUser = new User({username,email,password:hashPass});
            await newUser.save();
            console.log("Received Data:", { username, email, password });
            return res.status(200).json({ message: "User registered successfully" });
        }
        //console.log("Received Data:", { username, gmail, password });

       // return res.status(200).json({ message: "User registered successfully" });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
};

module.exports = { register };
