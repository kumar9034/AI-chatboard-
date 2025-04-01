import mongoose from "mongoose";
import { mongodb_name } from "../../mongoname.js";

const connectDB = async () => {
    try {
        const defaultMongoURL = "mongodb://localhost:27017"; // Default connection string for local development

        if (!process.env.MONGODB_URL) {
            console.warn("Warning: MONGODB_URL is not defined in environment variables. Falling back to default MongoDB URL.");
        }

        const connectionString = process.env.MONGODB_URL?.startsWith("mongodb://") || process.env.MONGODB_URL?.startsWith("mongodb+srv://")
            ? process.env.MONGODB_URL
            : `${defaultMongoURL}/${mongodb_name}`;
        
        const connectionInstance = await mongoose.connect(connectionString);
        console.log(` MongoDB connected !! DB HOST : ${connectionInstance.connection.host}`);
        
    } catch (error) {
        console.error("MONGODB connection FAILED. Ensure MongoDB is running and accessible.", error);
        process.exit(1); // Exit the process with failure code
    }
};

export default connectDB;