const task = require("../models/task");
const User = require("../models/user");


const addTask = async(req,res)=>{
    const user = req.body;
    try{
        const {title,description,priority,satus} = req.body;
        const {user} = req.user;
        if(!title || !description){
            return res.status(400).json({error:"All fields are required"});
        }
        if(title.length<6){
            return res.status(400).json({error:"the title must have 6 character"});    
        }
        if(description.length<6){
            return res.status(400).json({error:"the description must have 6 character"});    
        }

        const newTask = new task(title,description,satus,priority);
        await newTask.save();
        user.tasks.push(newTask._id);
        await user.save();

        return res.status(200).json({success:"New Task added"});
    }catch(err){
        return res.status(404).json({error:"internal server error"});
    }
}


const editTask = async(req,res)=>{
    try{
        const {id} = req.params;
        const {title,description,priority,satus} = req.body;
        const {user} = req.user;
        if(!title || !description){
            return res.status(400).json({error:"All fields are required"});
        }
        if(title.length<6){
            return res.status(400).json({error:"the title must have 6 character"});    
        }
        if(description.length<6){
            return res.status(400).json({error:"the description must have 6 character"});    
        }

       await task.findByIdAndUpdate(id,{title,description,satus,priority});

        return res.status(200).json({success:"Task updated"});
    }catch(err){
        return res.status(404).json({error:"internal server error"});
    }
}

//Get a paticular task
const getTask = async(req,res)=>{
    try{
        const {id} = req.params;
        const taskDetails = await task.findById(id);
        return res.status(200).json({taskDetails});
    }catch(err){
        return res.status(404).json({error:"internal server error"});
    }
}

//delete a paticular task
const deleteTask = async(req,res)=>{
    try{
        const {id} = req.params;
        await task.findByIdAndDelete(id);
        return res.status(200).json({success:"task deleted"});
    }catch(err){
        return res.status(404).json({error:"internal server error"});
    }
}



module.exports = {addTask,editTask,getTask,deleteTask};