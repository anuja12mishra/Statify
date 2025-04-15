const express = require("express");
const cors = require("cors");
const cookie = require("cookie-parser")
const userApis = require("./controllers/user"); 
const taskApis = require("./controllers/task"); 
const limiter = require("./utils/rate-limiting");
const passwordResetRoutes = require("./controllers/passwordReset");
require("dotenv").config();
require("./connection/conn");


// Express initialize
const app = express();
// Enable trust proxy
app.set('trust proxy', true);
app.use(express.json());
app.use(
    cors({
      origin: process.env.FRONTEND_URL || 'http://localhost:5173',  
      credentials: true,  
    })
  );
app.use(cookie());
app.use(limiter);
app.use("/api/v1", userApis); 
app.use("/task",taskApis);
app.use('/reset', passwordResetRoutes);

app.listen(process.env.PORT, () => {
    console.log("server started on port", process.env.PORT);
});
