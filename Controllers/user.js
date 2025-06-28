import express from "express";
import mongoose from "mongoose";
import {User} from "../Models/User.js"
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";


export const register=async(req,res)=>{
    const{name,email,password}=req.body;
console.log(req.body, "register")
if(!name || !email || !password) return res.json({message: "Required fields missing !!"})

    let user = await User.findOne({email})
if(user)return res.json({message:"user already exist", success:false})  // check if user already exist or not in db

// password hashing, we mean:
// 🔐 Converting the user's plain password into a scrambled, unreadable form using a one-way function — before storing it in the database.
// 💡 Why hash a password?
// Security:If someone hacks your database, they can’t see real passwords — only hashes.
// One-way:Hashing can’t be reversed (unlike encryption). You can only verify by hashing the input again and comparing.
// use bcrypt for it 
const hashpassword = await bcrypt.hash(password, 10);

 user = await User.create({name, email, password:hashpassword})  // creates a new user in the database with the values
    res.json({message:"user registered succefully !!", success:true, data: user})
}


export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.json({ message: "Fill the required field", success: false });

  const user = await User.findOne({ email });
  if (!user) return res.json({ message: "User does not exist", success: false });

  const matchedpassword =  bcrypt.compare(password, user.password);
  if (!matchedpassword)
    return res.json({ message: "Invalid password", success: false });

  const jwtTokan = jwt.sign({
   userId: user._id

}, process.env.JWT , { expiresIn: '1h' });

  return res.json({
    message: `${user.name} logged in successfully`,
    tokan:jwtTokan,
    success: true,
    data: user,
  });
};


