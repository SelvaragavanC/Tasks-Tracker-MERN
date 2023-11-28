const nodemailer = require("nodemailer");
const dotenv = require("dotenv")

dotenv.config()

const transporter = nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:"selvaragavan.ct@gmail.com",
        pass:process.env.email_password
    }
})

const sendMail =  (to,html)=>{
    try{
        transporter.sendMail({
            from:"selvaragavan.ct@gmail.com",
            to:to,
            subject:"Verify your Account!!!",
            html:html
        },(err,info)=>{
            if(err){
                console.log(err)
            }else{
                console.log(info)
            }
        })
    }catch(err){
        console.log(err)
    }
}

module.exports = {sendMail}