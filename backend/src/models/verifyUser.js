const mongoose = require("mongoose")

const verifyUserSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    token:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model("verify-users",verifyUserSchema)