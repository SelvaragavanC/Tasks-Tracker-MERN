const userModel = require("../models/user.js")
const bcrypt = require("bcrypt")

const alreadyAnUser = async (email)=>{
    try{
        const user = await userModel.findOne({email:email})
        if(user){
            return user
        }else{
            return false
        }
    }catch(err){
        console.log("An error occured while checking alreadyAnUser: "+err)
        throw err
    }
}

const verifyLogin = async (email,password)=>{
    try{
        const user = await alreadyAnUser(email)
        if(user){
            const isSame = await bcrypt.compare(password,user.password)
            console.log(isSame)
            if(isSame){
                return user
            }else{
                return false
            }
        }else{
            return false
        }
    }catch(err){
        throw err
    }
}

module.exports = {alreadyAnUser,verifyLogin}