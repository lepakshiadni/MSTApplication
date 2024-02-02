const route=require('express').Router()
const {generateopt,verifyOtp,createUser,getuser}=require('../controllers/userctrl')
const {jwtverify,isadmin}=require('../middleware/jwtverify')

//User routes 
route.post("/generateotp",generateopt)
route.post("/verifyotp",verifyOtp)
route.post("/register",createUser)
route.get("/getuser",jwtverify,getuser)

module.exports=route

