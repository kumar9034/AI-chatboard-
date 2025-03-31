import Redis from "ioredis";


const redisClint= new Redis({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASSWORD
})

redisClint.on('connect',()=>{
    console.log("redis connceting");
    
})

export default redisClint