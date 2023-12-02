const groupModel = require("../models/groups")
const userModel = require("../models/user.js")
const {sendMail} = require("../controllers/sendMail.js")

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
        const reqURL = `${process.env.URL}/${groupId}/${reqBy._id}/accept`
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
    const user = await userModel.findOne({_id:userId})
    const content = `<h1>Hello, ${user.username}</h1><br><p>You're now an member of group ${group.groupName}, Admin accepted your request</p>`
    sendMail(user.email,content,"Accepted Your request!")
    return `Accepted ${user.username}'s request`
}

const fetchGroupsOfUser = async (userId)=>{
    const user = await userModel.findOne({_id:userId})
    const userGroups = user.groupsIn
    const groups = await groupModel.find({_id:{$in:userGroups}})

    return groups
}

module.exports = {addGroup,reqAGroup,acceptAUser,fetchGroupsOfUser}