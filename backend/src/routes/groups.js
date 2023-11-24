const express = require("express");
const router = express.Router();

router.post("/create",(req,res)=>res.send("trying to create a group"));

router.post("/delete",(req,res)=>res.send("Trying to delete a group"));

router.get("/:id",(req,res)=>res.send("fetching group info"));

router.post("/:id/addTask",(req,res)=>res.send("adding tasks"));

router.post("/:id/delTask",(req,res)=>res.send("deleting tasks"));


module.exports = router;