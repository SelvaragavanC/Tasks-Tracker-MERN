const express = require("express");
const { verifyLogin, getUserFromRedis, fetchUserDetails } = require("../controllers/login");
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

router.post("/user",async(req,res)=>{
    try{
        const id = req.body.id
        res.send(await fetchUserDetails(id))
    }catch(err){
        console.log(err)
        res.status(404).send("An error occurred while fetching details")
    }
})

router.post("/sessionedUser",async (req,res)=>{
    try{
        const id = req.body.id
        res.setHeader('Content-Type', 'application/json')
        res.send(await getUserFromRedis(id))
    }catch(err){
        console.log(err)
        res.status(404).send("session timed out")
    }
})

module.exports = router;