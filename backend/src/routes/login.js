const express = require("express");
const { verifyLogin, getUserFromRedis } = require("../controllers/login");
const router = express.Router();

router.post("/",async (req,res)=>{
    try{
        const {email,password} = req.body
        const responseFromController = await verifyLogin(email,password)
        res.send(responseFromController)
    }catch(err){
        res.status(404).send("An error occured while logging in")
    }
});

router.post("/sessionedUser",async (req,res)=>{
    try{
        const token = req.body.token
        res.send(await getUserFromRedis(token))
    }catch(err){
        console.log(err)
        res.send(false)
    }
})

module.exports = router;