import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';



const PrivateRoute = ({ element, ...rest }) => {
//   const token = Cookies.get('token');
const token =localStorage.getItem('token')
  console.log(token)
  return (
    token?<Outlet/>:<Navigate to='/'/>
  )


};

export default PrivateRoute;
