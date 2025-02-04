const mongoose = require("mongoose");

const conn = async()=>{
    try {
        await mongoose.connect(`${process.env.MONGODB_URL}`);
        console.log("Connected to the database");
    } catch (error) {
        console.log(error);
        console.log("Not Connected to the database");
    }
   
    
}
conn();