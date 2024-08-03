import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Router } from "express";

const authRouter = Router()

export const register = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, password, role } = req.body;
    if (!fullname || !email || !phoneNumber || !password || !role) {
      return res.status(400).json({
        message: "Something is missing",
        success: false,
      });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "User already exist with this email.",
        success: false,
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      fullname,
      email,
      phoneNumber,
      password: hashedPassword,
      role,
    });
    return res.status(201).json({
        message: "User successfully created"
    })
  } catch (error) {
    console.log(error)
  }
};
export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
      return res.status(400).json({
        message: "Something is missing",
        success: false,
      });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Incorrect email or password.",
        success: false,
      });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
        return res.status(400).json({
            message: "Incorrect email or password.",
            success:false,
        })
    };
    //check role is correct or not
    if (role != user.role){
        return res.status(400).json({
            message:"Account does't exist with current role.",
            success:false
        })
    };

    const tokenData = {
        userID:user._id
    }
    const token = await jwt.sign(tokenData, process.env.SECRET_KEY,{expiresIn:'1d'});
    
    return res.status(200).json({ token })

  } catch (error) {
    console.log(error);
    return res.status(500).json({ error })
  }
};

authRouter.post("/register", register)
authRouter.post("/login", login)
authRouter.get('/status', (req, res) => {
    res.send("Everything ok from Auth route")
})

export default authRouter;