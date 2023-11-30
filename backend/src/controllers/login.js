const userModel = require("../models/user.js")
const bcrypt = require("bcrypt")
const {getClient} = require("../DB-Connection/redis.js")


let redisClient = undefined;
(async ()=>{
    redisClient = await getClient()
})()

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
                redisClient.set(user.token,user.toString())
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

const getUserFromRedis = async (token)=>{
    try{
        const user = await redisClient.get(token)
        return user? user:false
    }catch(err){
        console.log(err)
        throw err
    }
}

module.exports = {alreadyAnUser,verifyLogin,getUserFromRedis}