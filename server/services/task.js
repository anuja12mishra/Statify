const jwt = require("jsonwebtoken");
const User = require("../models/user");
const task = require("../models/task");


// ✅ Add Task
const addTask = async (req, res) => {
    try {
        const { title, description, priority, status } = req.body;
        const user = req.user;

        if (!title || !description) {
            return res.status(400).json({ error: "All fields are required" });
        }
        if (title.length < 6) {
            return res.status(400).json({ error: "The title must have at least 6 characters" });
        }
        if (description.length < 6) {
            return res.status(400).json({ error: "The description must have at least 6 characters" });
        }
        if (!priority || !['low', 'medium', 'high'].includes(priority.toLowerCase())) {
            return res.status(400).json({ error: "Invalid priority value" });
        }
        if (!status || !['yettostart', 'inprogress', 'completed'].includes(status.toLowerCase())) {
            return res.status(400).json({ error: "Invalid status value" });
        }        
        
        const newTask = new task({ title, description, status, priority });
        await newTask.save();

        user.tasks.push(newTask._id);
        await user.save();

        return res.status(201).json({ success: "New task added" }); // ✅ Changed 200 → 201 (Created)
    } catch (err) {
        console.error("Add Task Error:", err);
        return res.status(500).json({ error: "Internal server error" }); // ✅ Fixed error code
    }
};

// ✅ Edit Task
const editTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, priority, status } = req.body;
        const user = req.user; // ✅ Access authenticated user

        if (!title || !description) {
            return res.status(400).json({ error: "All fields are required" });
        }
        if (title.length < 6) {
            return res.status(400).json({ error: "The title must have at least 6 characters" });
        }
        if (description.length < 6) {
            return res.status(400).json({ error: "The description must have at least 6 characters" });
        }

        const updatedTask = await task.findByIdAndUpdate(
            id,
            { title, description, status, priority },
            { new: true } // ✅ Return updated task
        );

        if (!updatedTask) {
            return res.status(404).json({ error: "Task not found" });
        }

        return res.status(200).json({ success: "Task updated" });
    } catch (err) {
        console.error("Edit Task Error:", err);
        return res.status(500).json({ error: "Internal server error" });
    }
};

// ✅ Get a particular Task
const getTask = async (req, res) => {
    try {
        const { id } = req.params;
        const taskDetails = await task.findById(id);

        if (!taskDetails) {
            return res.status(404).json({ error: "Task not found" });
        }

        return res.status(200).json({ taskDetails });
    } catch (err) {
        console.error("Get Task Error:", err);
        return res.status(500).json({ error: "Internal server error" });
    }
};

// ✅ Delete a Task
const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedTask = await task.findByIdAndDelete(id);

        if (!deletedTask) {
            return res.status(404).json({ error: "Task not found" });
        }
        await User.updateOne({ _id: req.user._id }, { $pull: { tasks: id } });

        return res.status(200).json({ success: "Task deleted" });
    } catch (err) {
        console.error("Delete Task Error:", err);
        return res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = { addTask, editTask, getTask, deleteTask };