const express = require("express");
const { addGroup, reqAGroup, acceptAUser,fetchGroupsOfUser } = require("../controllers/group");
const router = express.Router();

router.post("/create",async (req,res)=>{
    try{
        const {groupName,groupAdmin,description} = req.body
        const resFromController = await addGroup(groupName,groupAdmin,description)
        if(resFromController){
            res.send("Group created successfully")
        }else{
            throw new Error()
        }
    }catch(err){
        console.log(err);
        res.send("An error occured,Please try again later")
    }
});

router.post("/sendRequest",async (req,res)=>{
    try{
        const {groupId,reqBy} = req.body
        res.send(await reqAGroup(groupId,reqBy))
    }catch(err){
        console.log(err);
        res.send("request not sent!, Try again later")
    }
})

router.post("/acceptRequest",async (req,res)=>{
    try{
        const {groupId,userId} = req.body
        res.send(await acceptAUser(groupId,userId))
    }catch(err){
        console.log(err)
        res.send("can't accept him/her")
    }
})

router.post("/userGroups",async (req,res)=>{
    try{
        const userId = req.body.userId;
        res.send(await fetchGroupsOfUser(userId))
    }catch(err){
        console.log(err)
        res.send("Server Busy, Please try again later")
    }
})

router.post("/delete",(req,res)=>res.send("Trying to delete a group"));

router.get("/:id",(req,res)=>res.send("fetching group info"));

router.post("/:id/addTask",(req,res)=>res.send("adding tasks"));

router.post("/:id/delTask",(req,res)=>res.send("deleting tasks"));


module.exports = router;