import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
const AdminLoginProtect:React.FC = () => {
    const loggedin  = sessionStorage.getItem('AUTH_ADMIN_DETAILS')
  return (
    loggedin ?  <Navigate to='/dashboard' /> : <Outlet />
  )
}

export default AdminLoginProtect