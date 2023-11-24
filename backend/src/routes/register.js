const express = require("express");
const router = express.Router();

router.post("/", async (req,res)=>{
    res.send("we'll build this soon");
})

module.exports = router