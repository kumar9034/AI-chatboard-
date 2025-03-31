import http from "http"
import "dotenv/config"
import { app }from "./app.js"

const server = http.createServer(app)

server.listen(process.env.PORT, ()=>{
    console.log("server running on port  5000");
    
})