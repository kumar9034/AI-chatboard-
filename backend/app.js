import express from "express"
import morgan from "morgan"
import connect from "./src/db/db.js"
import userRoutes from "./src/routers/user.router.js"
import cookieParser from "cookie-parser"
import cors from 'cors'
connect()

const app = express()


app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res)=>{
 res.send("hello bhai ")
})

app.use("/user", userRoutes)

// Global error-handling middleware
app.use((err, req, res, next) => {
    console.error("Error:", err.message); // Log the error for debugging
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        success: false,
        message: err.message || "Internal Server Error",
        error: err.error || [],
    });
});

export { app }