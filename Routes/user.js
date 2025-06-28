import express from "express";
import { register,login } from "../Controllers/user.js";

const router = express.Router();
//@api url api/user/register- post-create
router.post("/register", register )  // in url u write endpoint like /register....which gets append to base url look in server.js


//@api url api/user/login- login api 
router.post("/login", login )


export default router