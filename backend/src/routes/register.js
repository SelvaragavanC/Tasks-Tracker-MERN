const express = require("express");
const {verifyAnUser, verifyToken} = require("../controllers/register")
const router = express.Router();

router.post("/", async (req,res)=>{
    try{
        const {username,email,password} = req.body
        const responseFromController = await verifyAnUser(username,email,password)
        if(responseFromController){
            if(responseFromController==-1){
                res.send("Sorry an error occured while logging in :(")
            }else{
                res.send("We had sent you an verification mail")
            }
        }else{
            res.send("An error occured while verifying")
        }
    }catch(err){
        res.send(err.message);
    }

})

router.post("/verify",async (req,res)=>{
    try{
        const token = req.body.token
        const responseFromController = await verifyToken(token)
        if(responseFromController){
            res.send("We had succesfully verified Your email, Login to continue")
        }else{
            res.send("You haven't registered. Please register first")
        }
    }catch(err){
        res.send("an error occured while logging in")
    }
})

module.exports = router