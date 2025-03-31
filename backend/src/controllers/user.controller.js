import mongoose from "mongoose";
import {User} from "../models/users.model.js"
import { APIError } from "../utils/APIError.js";
import {APIrespones} from "../utils/APIresponse.js"
import { asynchandling } from "../utils/asynchandling.js";
import redisClient from "../services/redis.js";

export const register = asynchandling(async(req,res)=>{
   try {
      const {email, password, username} = req.body;

      if (
         [email, password, username].some((field) => field?.trim() === "")
      ) {
         throw new APIError(400, "All fields are required");
      }

      const existedUser = await User.findOne({
         $or: [{ email }, { username }]
      });

      if (existedUser) {
         throw new APIError(409, "User with email or username already exists");
      }

      const newUser = await User.create({
         email,
         password,
         username
      });

      const createdUser = await User.findById(newUser._id).select("-password");

      if (!createdUser) {
         throw new APIError(500, "Something went wrong while registering the user");
      }
      const token = await createdUser.generateJWT()
      return res.status(201).json(
         new APIrespones(200, {createdUser, token}, "User registered Successfully")
      );
   } catch (error) {
      if (error instanceof SyntaxError && error.message.includes("JSON")) {
         console.error("Invalid JSON payload:", error);
         throw new APIError(400, "Invalid JSON payload");
      }
      console.error("Error in register function:", error);
      throw error;
   }
});

export const login = asynchandling(async(req , res)=>{
   const {email, username, password } = req.body

   if(!email && !username){
      throw new APIError(400, "email and username not valid")
   }

   const user = await User.findOne({
      $or: [{email}, {username}]
   }).select("+password")

   if(!user){
      throw new APIError(409,  'email or username is not exist')
   }

 const Password =  await user.isPasswordCorrect(password)

   if(!Password){
      throw new APIError(401, "password is incorrect")
   }

   const token =  await user.generateJWT()

   return res.status(200).json(
      new APIrespones(200, { user, token }, "login successfully user")
   )
})

export const userProfile = asynchandling(async(req, res)=>{
   res.status(200).json(
      new APIrespones(201, {user : req.user}, )
   )
})

export const logoutController = async (req, res) => {
   try {

       const token = req.cookies.token || req.headers.authorization.split(' ')[ 1 ];

       redisClient.set(token, 'logout', 'EX', 60 * 60 * 24);

       res.status(200).json({
           message: 'Logged out successfully'
       });


   } catch (err) {
       console.log(err);
       res.status(400).send(err.message);
   }
}
