const feedUserSchema = require('../models/usermodel')
const otpSchema = require('../models/otpmodel')
const { generateToken } = require('../config/jwttoken.js')
const { generateOtp, compareOtp, sendOTP, decodedpassword } = require('../utils/services.js')
const localStorage = require('localStorage')
const Cookies = require('js-cookie')


// Generate opt api 

const generateopt = async (req, resp) => {
    const { number } = req.body
    if (number) {
        try {
            let user = await otpSchema.findOne({ phoneNumber: number })
            if (!user) {
                user = new otpSchema({
                    phoneNumber: number
                })
            }        
                const otp = generateOtp()
                user.Otp = otp
                await user.save();
                await sendOTP(number,otp)
                console.log(otp)
                await localStorage.setItem('phoneNumber', JSON.stringify(number))
                resp.status(200).json({ success: true, message: 'Otp sended', user })

        }
        catch (err) {
            console.log(err)
        }
    }

}

//Verify opt api 

const verifyOtp = async (req, resp) => {
    const { otp, phoneNumber, } = req.body
    const existinguser = await feedUserSchema.findOne({ phoneNumber: phoneNumber })
    const finduser = await otpSchema.findOne({ phoneNumber: phoneNumber })
    if (existinguser && finduser) {
        const valid = await compareOtp(otp, phoneNumber)
        
        if (valid) {
           
            const token = await generateToken(existinguser._id)
            resp.status(200).json({ success: true, message: 'Verified Exitinguser', existinguser, token })
        }
        else {
            resp.status(404).json({ success: false, message: 'Invalid OTP' })
        }
    }
    else {
        if (finduser) {
            const valid = await compareOtp(otp, phoneNumber)
            if (valid) {
                resp.json({ success: true, message: 'New user', phoneNumber })
            }
            else {
                resp.json({ success: false, message: 'invalid otp' })
            }
        }
    }
}

const createUser = async (req, resp) => {
    const { name, location, number } = req.body

    const findUser = await feedUserSchema.findOne({ phoneNumber: number })
    if (!findUser) {
        const newUser = new feedUserSchema({
            name: name,
            location: location,
            phoneNumber: number,
        });
        await newUser.save()
        const token=await generateToken(newUser?._id)

        // console.log(token)
        resp.status(200).json({ success:true, message: 'Profile Saved Successfully', data: newUser ,token })
    }
    else {
        resp.status(409).send('Phone Number already in use')
    }

};

//update user profile 

const updateProfile = async (req, resp) => {

}


//get all user 
const getAlluser = async (req, resp) => {
    const finduser = await feedUserSchema.find()
    try {
        resp.status(200).json({ sucess: true, message: 'All User Fetched', finduser })
    }
    catch (err) {
        resp.status(404).json({ sucess: false, message: 'User Not found ' })
    }
}

//get user by verification 

const getuser = async (req, resp) => {
    const user = await req.user
    // console.log('get api is working')
    if (user) {
        resp.json({ success: true, message: 'feched', user })
    }
    else {
        resp.json({ success: false, message: 'not found' })
    }


}


// get user by userID

const getuserId = async (req, resp) => {
    const { userId, userfullName } = req.params
    try {
        const user = userId ? await feedUserSchema.findById(userId) : await feedUserSchema.findOne({ fullName: userfullName })
        resp.status(200).json({ success: true, message: 'user found', user })
    }
    catch (err) {
        resp.status(404).json({ success: false, message: 'User not found' })
    }
}






module.exports = { generateopt, verifyOtp, createUser, getuser, getuserId, getAlluser, updateProfile }
