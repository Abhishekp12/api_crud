import express from "express";
import mongoose from "mongoose";
import userRouter from "./Routes/user.js";
import contactRouter from "./Routes/contact.js";
import {config} from "dotenv";

// In server.js
const app = express();
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

config({path:".env"})
const port=process.env.Path || 7000;
// To parse application/json
app.use(express.json()); // use to when u pass json formatted body data
// routing
//user route
//@api endpoint api/user/register

//post api - create created in Routes
app.use("/api/user", userRouter ) // userRouter endpoint urll will get append to base url /api/user
app.use("/api/contact", contactRouter ) // userRouter endpoint urll will get append to base url /api/user


//db connection
mongoose.connect(process.env.MONGO_URI, {
    dbName: "nodejs_tutorial"
}).then(()=>console.log("mongodb connected !!")).catch((err)=>console.log("err", err))


//server
app.listen(port,()=>{
    console.log(`server is running at  ${port} !!`)
})