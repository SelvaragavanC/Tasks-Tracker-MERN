const groupModel = require("../models/groups")
const userModel = require("../models/user.js")

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

module.exports = {addGroup}