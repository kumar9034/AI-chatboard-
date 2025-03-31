import express from "express"
import morgan from "morgan"
import connect from "./src/db/db.js"
import userRoutes from "./src/routers/user.router.js"

connect()

const app = express()


// app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());

app.get("/", (req, res)=>{
 res.send("hello bhai ")
})

app.use("/user", userRoutes)
export { app }