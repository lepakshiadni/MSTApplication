import { useNavigate } from 'react-router-dom';
import MstLogo from '../images/mstLoGo.jpg'
import './style.css'
import { useState } from 'react';
import Axios from 'axios'



const AdminOtp = () => {
    const [validotp, setOtp] = useState(["", "", "", ""]);

    const phoneNumber = localStorage.getItem('phoneNumber')
    const number=phoneNumber
    console.log(phoneNumber)
    const navigate = useNavigate()

    const handleChange = (e, index) => {
        const value = e.target.value;

        // Check if the input is a digit
        if (/^\d*$/.test(value)) {
            // Update the OTP array with the new value at the specified index
            setOtp((prevOtp) => {
                const newOtp = [...prevOtp];
                newOtp[index] = value;
                return newOtp;
            });

            // Move to the next input box if a digit is entered
            if (index < 3 && value !== "") {
                document.getElementById(`otp-input-${index + 1}`).focus();
            }
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace") {
            // Handle backspace functionality
            e.preventDefault();
            setOtp((prevOtp) => {
                const newOtp = [...prevOtp];
                newOtp[index] = "";

                // Move focus to the previous input box on backspace
                if (index > 0) {
                    document.getElementById(`otp-input-${index - 1}`).focus();
                } else {
                    // If it's the first input box, set focus to the current input
                    document.getElementById(`otp-input-${index}`).focus();
                }
                return newOtp;

            });
        }
    };
    const handleVerifyOtp = (e) => {
        e.preventDefault()
        const otp = validotp.join("");
        if (otp.length !== 4) {
            alert('please enter the 4 digit number')
        }
        else {
            Axios.post('https://mstapplication-backend.onrender.com/user/verifyotp', { phoneNumber, otp })
                .then((resp) => {
                    console.log(resp.data)
                    if (resp.data.success && resp.data?.existinguser?.role === "admin") {
                        localStorage.setItem('token',resp.data?.token)
                        navigate('/landing')
                        localStorage.removeItem()
                    }
                    else {
                        alert("Not an Admin")
                        navigate('/')
                    }
                })
                .catch((error) => {
                    console.log(error)
                })
        }
    }
    const signupHandler = () => {
        Axios.post('https://mstapplication-backend.onrender.com/user/generateotp', { number })
            .then((resp) => {
                console.log(resp.data)

                if (number.length !== 10) {
                    alert('Enter 10 digit Mobile Number')
                }
                else if (resp.data.success) {
                    localStorage.setItem('phoneNumber', number)
                    alert('otp Sended')
                    navigate('/verefyOtp')

                }
            })
            .catch((error) => {
                console.log(error)
            })
    }
    return (
        <div className='main-parent'>
            <div className='main-parent-child'>
                <img src={MstLogo} alt="" />
                <div className='content-verify'>
                    <h3 style={{margin:"5px 0px"}} >Verify Your Account</h3>
                    <p  style={{margin:"5px 0px"}}>Enter the 4-digit OTP to verify your Mindstay technology, <br />
                        Resend OTP if needed</p>
                    <div className="otp-input-container"  style={{margin:"15px 0px"}}>
                        {validotp.map((digit, index) => (
                            <input
                                className='otpInput'
                                key={index}
                                id={`otp-input-${index}`}
                                type="text"
                                value={digit}
                                maxLength="1"
                                onChange={(e) => handleChange(e, index)}
                                onKeyDown={(e) => handleKeyDown(e, index)}
                                style={{
                                    textAlign: "center",
                                    fontFamily: "poppins",
                                    fontSize: "1.5rem",
                                    color: "#2676C2",
                                }}
                            />
                        ))}
                    </div>
                    <button onClick={handleVerifyOtp}>Verify</button>
                    <h4>If you haven't received the OTP ? <span style={{ color: '#2676C2', cursor: 'pointer' , fontSize:"16px", fontFamily:"Poppins", marginLeft:"20px"}} onClick={signupHandler}>Resend !</span></h4>
                </div>
            </div>
        </div>
    );
}

export default AdminOtp;