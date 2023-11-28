const express = require("express");
const {verifyAnUser} = require("../controllers/register")
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

module.exports = router