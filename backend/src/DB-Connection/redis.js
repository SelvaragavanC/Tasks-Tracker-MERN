const redis = require("redis");

const getClient =  ()=>{
    return redis.createClient().on("error",err=>console.log(err))
}



module.exports = {getClient}