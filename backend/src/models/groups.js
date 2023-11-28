const mongoose = require("mongoose")

const groupsSchema = new mongoose.Schema({
    groupName:String,
    groupAdmin:String,
    description:String,
    groupMembers : [{
        type:String
    }],
    todo:[{
        type:String
    }]
})

module.exports = mongoose.model("groups",groupsSchema);