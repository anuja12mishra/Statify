const { get } = require("mongoose");
const authMiddleware = require("../middleware/authMiddleware");

const {addTask,editTask,getTask,deleteTask} = require("../services/task");

const router = require("express").Router();

router.post("/addTask",authMiddleware,addTask);
router.post("/editTask/:id",authMiddleware,editTask);
router.post("/deleteTask/:id",authMiddleware,deleteTask);
router.post("/getTask/:id",authMiddleware,getTask);

module.exports = router;