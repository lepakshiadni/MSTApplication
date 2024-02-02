const express = require('express')
const bodyparser = require('body-parser')
const cors = require('cors')
const dbconnect = require('./config/dbconnect')
const cookieParser = require('cookie-parser')
const app = express()
const dotenv = require('dotenv').config()
const userauth = require('./route/useroute')
const jwt = require('jsonwebtoken')
const cloudinary = require('cloudinary').v2;
const feetroute=require('./route/feedroute')
const os=require('os')



app.use(bodyparser.json())
app.use(bodyparser.json({ limit: '30mb' }));
app.use(bodyparser.urlencoded({ extended: true, limit: '30mb' }));
app.use(express.json())
app.use(cookieParser())

app.use('*',cors({
    origin: '*', // or specify your frontend's domain
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204
}))


dbconnect()

//cloudinary config
cloudinary.config({
    cloud_name : process.env.CLODINARY_NAME,
    api_key : process.env.CLODINARY_API_KEY,
    api_secret : process.env.CLODINARY_SECRET
});
// cloudinary.config

//All user routes

app.use("/user", userauth)
app.use("/feed",feetroute)





function getLocalIpAddress() {
    const interfaces = os.networkInterfaces();

    for (const interfaceName of Object.keys(interfaces)) {
        const networkInterface = interfaces[interfaceName];

        for (const iface of networkInterface) {
            if (!iface.internal && iface.family === 'IPv4') {
                return iface.address;
            }
        }
    }

    return 'localhost'; // Default to localhost if no suitable address is found
}

const localIp = getLocalIpAddress();
console.log(localIp)

app.get("/", (req, res)=>{
    res.send("<h1>working</h1>")
})

app.get("/localip",(req,resp)=>{
    try{
        resp.json({message:'localIpfected',localIp:localIp})
    }
    catch(error){
        resp.json({message:'error in ip'})
    }
})
const PORT = process.env.PORT 

const server = app.listen(PORT,() => {
    console.log(`server is running in the ${PORT}`)
})

