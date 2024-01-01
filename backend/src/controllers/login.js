const userModel = require("../models/user.js")
const bcrypt = require("bcrypt")
const {getClient} = require("../DB-Connection/redis.js")


let redisClient = getClient();
redisClient.connect()

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
            if(isSame){
                redisClient.set(user._id.toString(),JSON.stringify({_id:user._id,username:user.username}))
                return {_id:user._id,username:user.username,token:user.token}
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

const getUserFromRedis = async (id)=>{
    try{
        const user = await redisClient.get(id.toString())
        return user? JSON.stringify(user):false
    }catch(err){
        console.log(err)
        throw err
    }
}

const fetchUserDetails = async(userId)=>{
    const user = await userModel.findById(userId,{username:1,email:1})
    if(user){
        return user
    }else{
        throw new Error()
    }
}

module.exports = {alreadyAnUser,verifyLogin,getUserFromRedis,fetchUserDetails}