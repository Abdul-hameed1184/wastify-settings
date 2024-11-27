import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
const LoginProtect = () => {
    const loggedin  = sessionStorage.getItem('AUTH_USERDETAILS')
  return (
    loggedin ?  <Navigate to='/profile' /> : <Outlet />
  )
}

export default LoginProtect