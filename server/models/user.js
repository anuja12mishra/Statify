const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username:{
        type:String,
        required:true
    },
    email: {
        type: String,
        required: true,
        unique: true, // Prevent duplicate entries
        match: [/\S+@\S+\.\S+/, 'Invalid email format'], // Regex for email validation
    },
    password:{
        type:String,
        required:true
    },
    tasks:[
        { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: "Task" 
        }
    ],
},
{ timestamps: true }
);


module.exports = mongoose.model("User",userSchema);