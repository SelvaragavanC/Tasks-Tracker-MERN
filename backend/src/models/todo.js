const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
    checked:Boolean,
    content:String,
    assignedTo:String,
    dd:Date   
})

module.exports = mongoose.model("todos",todoSchema)