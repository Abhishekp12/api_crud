import { User } from "../Models/User.js";
import jwt from "jsonwebtoken";

export const isAuthenticated = async (req, res, next) => {
  const tokan = req.header("Auth");
  if (!tokan) return res.json({ message: "login first", message: false });
  const decode = jwt.verify(tokan, process.env.JWT);
  const ID = decode.userId;
  console.log(decode, "decode222222");
 const user = await User.findById(ID);
  console.log(user, "user222222");

    if (!user) {
      return res.status(401).json({ message: "User not found", success: false });
    }
req.user=user
    next();

console.log(tokan, "tokan123"  );


};
