import { useNavigate } from 'react-router-dom';
import MstLogo from '../images/mstLoGo.jpg'
import React from 'react';
import axios from 'axios'
import "./style.css"
import { toast } from 'react-toastify';
const AdminLogin = () => {

    const [number, setNumber] = React.useState(null)

    const navigate = useNavigate()
    
    const signupHandler = () => {
        axios.post('https://mstapplication-backend.onrender.com/user/generateotp', { number })
            .then((resp) => {
                console.log(resp.data)

                if (number.length !== 10) {
                    alert('Enter 10 digit Mobile Number')
                }
                else if (resp.data.success) {
                    localStorage.setItem('phoneNumber', number)
                    // alert('otp Sended')
                    toast('otp sended',{
                        style:{
                            background:'#2676c2',
                            opacity:0.2,
                            color: '#2676c2'

                        }
                    })
                    navigate('/verifyOtp')
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }


    return (
        <div className='main-parent' >
            <div className='main-parent-child'>
                <img src={MstLogo} alt="" />
                <div className='main-parent-child2' >
                    <h3 style={{ fontSize: '26px', color: "#017EC4", fontWeight: 600 }}>Welcome To Mindstay</h3>
                    <h3 style={{ fontSize: '20px', color: "#434343", fontWeight: 400 }}>Mobile number</h3>
                    <div style={{display:"flex", justifyContent:"center", alignItems:"center", flexDirection:"column"}}>
                    <input 
                        type="tel"
                        maxLength={10}
                        value={number}
                        onChange={(e) => { setNumber(e.target.value) }}
                        onKeyDown={(e) => {
                            // Allow only numeric input
                            if (!/[0-9]/.test(e.key) && e.key !== 'Backspace' && e.key !== 'Delete' && e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') {
                                e.preventDefault();
                            }
                        }}                 
                         placeholder='Enter Mobile number' />
                    <button onClick={signupHandler} >GET OTP</button>
                
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminLogin;




