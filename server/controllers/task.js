const { get } = require("mongoose");
const authMiddleware = require("../middleware/authMiddleware");
const emailVerificationMiddleware = require("../middleware/emailVerificationMiddleware");
const {addTask,editTask,getTask,deleteTask} = require("../services/task");

const router = require("express").Router();

router.post("/addTask",authMiddleware,emailVerificationMiddleware,addTask);
router.put("/editTask/:id",authMiddleware,emailVerificationMiddleware,editTask);
router.delete("/deleteTask/:id",authMiddleware,emailVerificationMiddleware,deleteTask);
router.get("/getTask/:id",authMiddleware,emailVerificationMiddleware,getTask);

module.exports = router;