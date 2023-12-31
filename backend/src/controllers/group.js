const groupModel = require("../models/groups")
const userModel = require("../models/user.js")
const tasksModel = require("../models/todo.js")
const {sendMail} = require("../controllers/sendMail.js")
const { response } = require("express")

const addGroup = async (groupName,groupAdmin,description)=>{
    try{
        const group = new groupModel({
            groupName:groupName,
            groupAdmin:groupAdmin,
            description:description,
            todo:[],
            groupMembers:[]
        })
        await group.save()
        await userModel.updateOne({_id:groupAdmin},{$push:{groupsIn:group._id}})
        return group
    }catch(err){
        throw err
    }
}

const reqAGroup = async (groupId,reqBy) => {
    const group = await groupModel.findOne({_id:groupId})
    if(group){
        const admin = await userModel.findOne({_id:group.groupAdmin})
        const reqURL = `${process.env.frontend_URL}/${groupId}/${reqBy._id}/accept`
        const content = `<h1>Hello ${admin.username},</h1><br><p>Mr/Mrs ${reqBy.username} requested to join your group (${group.groupName})</p><br><button><a href=${reqURL}>Accept</a></button>`
        sendMail(admin.email,content,"Someone requested to join your group->Tasks-Tracker-selvaragavan");
        return "Request Sent!"
    }else{
        throw new Error();
    }
}

const acceptAUser = async (groupId,userId)=>{
    await groupModel.updateOne({_id:groupId},{$push:{groupMembers:userId}})
    const group = await groupModel.findOne({_id:groupId})
    const user = await userModel.findOneAndUpdate({_id:userId},{$push:{groupsIn:group._id}})
    const content = `<h1>Hello, ${user.username}</h1><br><p>You're now an member of group ${group.groupName}, Admin accepted your request</p>`
    sendMail(user.email,content,"Accepted Your request!")
    return `Accepted ${user.username}'s request`
}

const fetchGroupsOfUser = async (userId)=>{
    const groups = await userModel.findById(userId,{_id:0,groupsIn:1}).populate({path:'groupsIn',select:'groupName groupAdmin description'})
    return groups.groupsIn
}

const deleteGroup = async (groupId,userId)=>{
    await userModel.updateOne({_id:userId},{$pull:{"groupsIn":groupId}})
    await groupModel.deleteOne({_id:groupId})
    return "Group Deleted"
}

const addTasks =async (groupId,taskDetails)=>{
    const newTask = new tasksModel({
        checked:false,
        content:taskDetails.content,
        assignedTo:taskDetails.assignedTo,
        dd:taskDetails.dd  
    })
    await newTask.save()
    await groupModel.updateOne({_id:groupId},{$push:{todo:newTask._id}})
    return "Added task!"
}

const delTask = async(taskId,groupId)=>{
    await tasksModel.deleteOne({_id:taskId})
    await groupModel.updateOne({_id:groupId},{$pull:{todo:taskId}})
    return "Task Deleted"
}

const fetchTodo = async(groupId)=>{
    const group = await groupModel.findById(groupId)
    const todos = await tasksModel.find({_id:{$in:group.todo}})
    return todos
}


const getAdmin = async (id)=>{
    const user =  await userModel.findById(id,{username:1})
    return user.username
}

const getGroupUsers = async (groupId) => {
    const response = await groupModel.findById(groupId)
    const users = await userModel.find({_id:{$in:response.groupMembers}},{_id:1,username:1})
    

    return users;
}

const fetchGroupHeaders = async (id)=>{
    return await groupModel.findById(id,{_id:0,groupName:1,description:1,groupAdmin:1})
}


const updateTodo = async(_id,checked)=>{
    await tasksModel.findByIdAndUpdate(_id,{$set:{checked:checked}})
}


const searchGroups = async (userId, query) => {
    const groups = await groupModel.find(
      {
        $and: [
          { groupAdmin: { $ne: userId } },
          { groupMembers: { $ne: userId } },
          { groupName: { $regex: new RegExp(query, 'i') } } 
        ]
      },
      {
        _id: 1,
        groupName: 1,
        groupAdmin: 1,
        description: 1
      }
    );
    return groups;
  };
  

module.exports = {addGroup,reqAGroup,acceptAUser,fetchGroupsOfUser,deleteGroup,addTasks,delTask,fetchTodo,getAdmin,getGroupUsers,fetchGroupHeaders,updateTodo,searchGroups}