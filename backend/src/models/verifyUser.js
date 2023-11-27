const mongoose = require("mongoose")

const verifyUserSchema = new mongoose.Schema({
    username:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    }
})

module.exports = mongoose.model("verify-users",verifyUserSchema)