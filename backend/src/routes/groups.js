const express = require("express");
const { addGroup, reqAGroup, acceptAUser,fetchGroupsOfUser, deleteGroup , addTasks, delTask,fetchTodo,getAdmin,getGroupUsers,fetchGroupHeaders,updateTodo} = require("../controllers/group");
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
        res.status(404).send("An error occured,Please try again later")
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

router.post("/delete",async (req,res)=>{
    try{
        const {groupId,userId} = req.body;
        res.send(await deleteGroup(groupId,userId))
    }catch(err){
        console.log(err)
        res.send("Sorry You Can't delete this group.")
    }
});

router.post("/:id/addTask",async (req,res)=>{
    try{
        const groupId = req.params.id
        const taskDetails = req.body.taskDetails
        res.send(await addTasks(groupId,taskDetails))
    }catch(err){
        console.log(err)
        res.send("Sorry An error occured while adding tasks :(")
    }
});

router.post("/:id/delTask",async (req,res)=>{
    try{
        const taskId = req.body.taskId
        const groupId = req.params.id
        res.send(await delTask(taskId,groupId) )
    }catch(err){
        console.log(err)
        res.send("An error occured while deleting this")
    }
});

router.get("/fetchTasks/:id",async (req,res)=>{
    try{
        const groupId = req.params.id
        res.send(await fetchTodo(groupId))
    }catch(err){
        console.log(err)
        res.status(404).send("Sorry Try again later")
    }
})



router.get("/user/:id",async (req,res)=>{
    const id = req.params.id
    try{
        const name = await getAdmin(id)
        res.send(name)
    }catch(err){
        console.log(err)
        res.status(404).send("No One")
    }
})

router.get("/users/:id",async(req,res)=>{
    const id = req.params.id
    try{
        const response = await getGroupUsers(id)
        res.send(response)
    }catch(err){
        console.log(err)
        res.status(404).send("An error occured! Please refresh")
    }
})

router.get("/headers/:id",async (req,res)=>{
    const id = req.params.id
    try{
        res.send(await fetchGroupHeaders(id))
    }catch(err){
        console.log(err)
        res.status(404).send("An error occurred")
    }
})

router.post("/updateTodo/:id",async(req,res)=>{
    try{
        const _id = req.params.id;
        const checked = req.body.checked
        await updateTodo(_id,checked)
        res.send("Succesfully updated")
    }catch(err){
        console.log(err)
        res.status(404).send("Sorry cant update")
    }
})


module.exports = router;