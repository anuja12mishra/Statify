const express = require("express");
const userApi = require("./controllers/user"); // Import only once
require("dotenv").config();
require("./connection/conn");

// Express initialize
const app = express();
app.use(express.json());


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
