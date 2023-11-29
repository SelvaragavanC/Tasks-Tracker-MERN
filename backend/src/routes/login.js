const express = require("express");
const { verifyLogin } = require("../controllers/login");
const router = express.Router();

router.post("/",async (req,res)=>{
    try{
        const {email,password} = req.body
        const responseFromController = await verifyLogin(email,password)
        res.send(responseFromController)
    }catch(err){
        res.send("An error occured while logging in")
    }
});

module.exports = router;