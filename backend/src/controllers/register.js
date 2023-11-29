const verifyUserModel = require("../models/verifyUser.js")
const userModel = require("../models/user.js")
const {alreadyAnUser} = require("./login.js")
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")
const {sendMail} = require("./sendMail.js")
const bcrypt = require("bcrypt")

dotenv.config()



const verifyAnUser = async (username,email,password)=>{
    try{
        if(await alreadyAnUser(email)){
            return false
        }else{
            const token = createtoken(email)
            const htmlContent = `<p>Please verify your account by clicking the below link.</p><br><a href=${process.env.URL}/${token}>Click Here</a>`
            const hashedPassword =  await hashPassword(password)
            if(hashedPassword==-1){
                return -1
            }
            sendMail(email,htmlContent)
            const verifyUser = new verifyUserModel({
                username:username,
                email:email,
                password:hashedPassword,
                token:token
            })
            await verifyUser.save()
            return true
        }
    }catch(err){
        console.log("An error occured while verifying=> "+err)
        return -1
    }
}

const createtoken = (email)=>{
    return jwt.sign(email,process.env.JWT_Private_Key)
}

const hashPassword =  async (password)=>{
    try{
        const generatedSalt = await bcrypt.genSalt(parseInt(process.env.salt_rounds))
        const hashedpass = await bcrypt.hash(password,generatedSalt)
        return hashedpass
    }catch(e){
        console.log(e)
        return -1
    }
}

//verifying user via email
const verifyToken = async (token)=>{
    try{
        const user = await verifyUserModel.findOne({token:token})
        if(user){
            await verifyUserModel.deleteMany({email:user.email})
            const newUser = new userModel({
                username:user.username,
                email:user.email,
                password:user.password,
                token:user.token,
                groupsIn:[]
            })
            await newUser.save()
            return true
        }else{
            return false
        }
    }catch(err){
        console.log(err)
        throw err
    }
}

module.exports = {verifyAnUser,verifyToken}