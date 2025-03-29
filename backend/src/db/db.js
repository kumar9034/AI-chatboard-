import mongoose from "mongoose";
import { mongodb_name } from "../../mongoname.js";

const connectDB = async () => {
    try {
        if (!process.env.MONGODB_URL) {
            throw new Error("MONGODB_URL is not defined in environment variables.");
        }

        const connectionString = process.env.MONGODB_URL.startsWith("mongodb://") || process.env.MONGODB_URL.startsWith("mongodb+srv://")
            ? process.env.MONGODB_URL
            : `mongodb://${process.env.MONGODB_URL}`;
        
        const connectionInstance = await mongoose.connect(`${connectionString}/${mongodb_name}`);
        console.log(` MongoDB connected !! DB HOST : ${connectionInstance.connection.host}`);
        
    } catch (error) {
        console.log("MONGODB connection FAILED ", error);
        process.exit(1);
    }
};

export default connectDB;