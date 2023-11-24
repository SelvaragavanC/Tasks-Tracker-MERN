const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();
const mongoDbConnectionStr  = process.env.DB_connection;

async function connectDb(){
    try{
        await mongoose.connect(mongoDbConnectionStr);
        console.log("Connected to mongoDB");
    }catch(err){
        console.log(err);
    }
}

module.exports = {connectDb}