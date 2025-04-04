const mongoose = require("mongoose");

const conn = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL,);
        console.log("✅ Connected to the database");
    } catch (error) {
        console.error("❌ Database connection failed:", error.message);
    }
};

// Export the connection function (optional)
module.exports = conn;

// Call the function if connecting immediately
conn();
