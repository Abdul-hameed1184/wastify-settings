import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
const SuperAdminLoginProtect:React.FC = () => {
    const loggedin  = sessionStorage.getItem('AUTH_ADMIN_DETAILS')
  return (
    loggedin ?  <Navigate to='/' /> : <Outlet />
  )
}

export default SuperAdminLoginProtect