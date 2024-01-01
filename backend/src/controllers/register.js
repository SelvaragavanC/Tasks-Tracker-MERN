const verifyUserModel = require("../models/verifyUser.js")
const userModel = require("../models/user.js")
const {alreadyAnUser} = require("./login.js")
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")
const {sendMail} = require("./sendMail.js")
const bcrypt = require("bcrypt")

dotenv.config()

const url = "https://tasks-tracker-selvaragavan.netlify.app"

const verifyAnUser = async (username,email,password)=>{
    
        if(await alreadyAnUser(email)){
            return "You're Already An User"
        }else{
            const token = createtoken(email)
            const htmlContent = `<p>Please verify your account by clicking the below link.</p><br><button><a href=${url}/${token}>Click Here</a></button>`
            const hashedPassword =  await hashPassword(password)
            if(hashedPassword==-1){
                throw new Error()
            }
            sendMail(email,htmlContent)
            const verifyUser = new verifyUserModel({
                username:username,
                email:email,
                password:hashedPassword,
                token:token
            })
            await verifyUser.save()
            return "We had sent you an verification mail."
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