const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const taskSchema = new Schema({
    title:{
        type:String,
        require:true
    },
    description:{
        type:String,
        require:true
    },
    priority:{
        type:String,
        require:true,
        enum:["low","medium","high"],
        default:"low",
    },
    satus:{
        type:String,
        require:true,
        enum:["yetToStart","inProgress","Completed"],
        default:"yetToStart",
    },
});


module.exports = mongoose.model("Task",taskSchema);