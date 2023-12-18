const express = require("express");
const {verifyAnUser, verifyToken} = require("../controllers/register")
const router = express.Router();

router.post("/", async (req,res)=>{
    try{
        const {username,email,password} = req.body
        const responseFromController = await verifyAnUser(username,email,password)
        res.send(responseFromController)
    }catch(err){
        res.send("An error occured while registering :(");
    }

})

router.post("/verify",async (req,res)=>{
    try{
        const token = req.body.token
        const responseFromController = await verifyToken(token)
        if(responseFromController){
            res.send("We had succesfully verified Your email, Login to continue")
        }else{
            res.status(404).send("You haven't registered. Please register first")
        }
    }catch(err){
        console.log(err)
        res.status(404).send("an error occured while verifying")
    }
})

module.exports = router