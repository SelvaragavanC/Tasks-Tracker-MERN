const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");


//importing routes
const registerRoutes = require("./routes/register.js");
const loginRoutes = require("./routes/login.js");
const groupRoutes = require("./routes/groups.js");

//connecting Db
const {connectDb} = require("./DB-Connection/db.js");

connectDb();

dotenv.config();
const PORT = process.env.PORT||4000;

//Using middlewares
app.use(cors({origin:"*"}));
app.use(express.json());

//adding Routes
app.use("/register",registerRoutes);
app.use("/login",loginRoutes);
app.use("/group",groupRoutes);

app.get("/",(req,res)=>res.send("Hello"));

app.listen(PORT,(err)=>err?console.log(err):console.log("App is listening at "+PORT));