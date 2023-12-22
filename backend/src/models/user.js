const mongoose = require("mongoose")


const userSchema = new mongoose.Schema({
    username:String,
    email:String,
    password:String,
    token:String,
    groupsIn:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'groups'
    }]
})

module.exports = mongoose.model("users",userSchema);