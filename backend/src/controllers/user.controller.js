import mongoose from "mongoose";
import {User} from "../models/users.model.js"
import { APIError } from "../utils/APIError.js";
import {APIrespones} from "../utils/APIresponse.js"
import { asynchandling } from "../utils/asynchandling.js";

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

