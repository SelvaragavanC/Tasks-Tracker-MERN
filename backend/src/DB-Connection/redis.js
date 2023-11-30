const redis = require("redis");

const getClient = async ()=>{
    return await redis.createClient().on("error",err=>console.log(err)).connect()
}



module.exports = {getClient}