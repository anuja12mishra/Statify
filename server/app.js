const express = require("express");
const cors = require("cors");
const cookie = require("cookie-parser")
const userApi = require("./controllers/user"); // Import only once
require("dotenv").config();
require("./connection/conn");

// Express initialize
const app = express();
app.use(express.json());
app.use(cors({
    origin:["http://localhost:5173"],
    credentials:true
}));
app.use(cookie());
app.get("/", (req, res) => {
    res.send("hello");
});

app.get("/login", (req, res) => {
    res.send("login");
});

// API routes
app.use("/api/v1", userApi); // Fix the typo "vi" -> "v1"

app.listen(process.env.PORT, () => {
    console.log("server started on port", process.env.PORT);
});
