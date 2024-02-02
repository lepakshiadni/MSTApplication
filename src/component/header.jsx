import MstLogo from '../images/image 30.svg';
import profileImg from '../images/profileTrainer.png';
import  { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios'
const Header = () => {
    const [open, setOpen] = useState(false);
    const [user,setUser]=useState(null)
    const navigate = useNavigate();
    const token=localStorage.getItem('token')
    // console.log(token)

    // console.log(user)
    useEffect(()=>{
        Axios.get('https://mstapplication-backend.onrender.com/user/getuser',{
            headers:{
                authorization:`Bearer ${token}`
            }
        })
        .then((resp)=>{
            // console.log(resp.data)
            setUser(resp.data?.user)
        })
        .catch((error)=>{
            console.log(error)
        })

    },[token])
    // console.log('user',user)
    
    return (
        <div className="header-parent">
            <div className='header-child'>
                <img src={MstLogo} alt="" />
                <div className='profile-header'  onClick={() => setOpen(!open)} >
                    <div className='profile-child1'>
                        {/* <img style={{ width: '64px', height: '64px', borderRadius: '50px', cursor: 'pointer' }} src={profileImg} alt="" /> */}
                        <div style={{ width: '64px', height: '64px', borderRadius: '50px', cursor: 'pointer', background:"#2676c2",display:'flex',justifyContent:'center',alignItems:'center', color:'#ffff',fontSize:'25px' }} >
                            {/* <p style={{color:'#2676c2',display:'flex',justifyContent:'center',alginItems:'center'}}>{user?.name[0].toUpperCase()}</p> */}
                            {user?.name[0].toUpperCase()}
                        </div>
                        {open && (
                            <div className='viewprofile-div'>
                                <div className='option'>View Profile</div>
                                <div className='option' onClick={() => navigate('/adminPost')}>Recent Activity</div>
                            </div>
                        )}
                    </div>
                    <div className='profile-child2'>
                        <h3 className='uppercase-letter lowercase-letter'>{user?.name}</h3>
                        <p className='uppercase-letter lowercase-letter'>{user?.role }</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;
