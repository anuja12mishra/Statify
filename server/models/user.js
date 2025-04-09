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
        unique: true,
        match: [/\S+@\S+\.\S+/, 'Invalid email format'], 
    },
    password:{
        type:String,
        required:true
    },
    isVerified: {
        type: Boolean,
        default: false,
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