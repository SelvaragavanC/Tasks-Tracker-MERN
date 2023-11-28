const userModel = require("../models/user.js")

const alreadyAnUser = async (email)=>{
    try{
        const user = await userModel.findOne({email:email})
        if(user){
            return true
        }else{
            return false
        }
    }catch(err){
        console.log("An error occured while checking alreadyAnUser: "+err)
        return -1
    }
}

module.exports = {alreadyAnUser}