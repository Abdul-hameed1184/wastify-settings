import React, { useEffect, useState } from 'react'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode';

const ProtectedRoutes = () => {
  const [loggedIn, setLoggedIn] = useState<boolean>(null);
  const [token] = useState(sessionStorage.getItem('SESSION_AUTH_TOKEN'))
  const navigate = useNavigate();

  // const checkAuthenticated = async () => {
  //   try {
  //     const response = await axios.post(baseURL + `auth/validate-token-expiration`, {
  //       validateTokenExpiration: sessionStorage.getItem('SESSION_AUTH_TOKEN')
  //     });
  //     console.log('response from protected Route', response);
  //     if (!response.data.errorState) {
  //       console.log(response.data.data);
  //     }
  //   } catch (error) {
  //     console.log('error from protected Route', error);
  //   }
  // }

  // useEffect(() => {
  //   checkAuthenticated()
  // }, []);

  useEffect(() => {
    const userDetails = decodeToken(token);
 
    if (userDetails) {
      const tokenExpired = isTokenExpired(userDetails.exp);

      if (tokenExpired) {

        //send logout request

        //navigate user to login page based on customer or psp
        if (userDetails.role === 1) {
          sessionStorage.removeItem('SESSION_AUTH_TOKEN')
          sessionStorage.removeItem('AUTH_USERDETAILS')
          navigate('/login')
        }

        if (userDetails.role === 2) {
          sessionStorage.removeItem('SESSION_AUTH_TOKEN')
          sessionStorage.removeItem('AUTH_ADMIN_DETAILS')
          navigate('/admin-login')

        }
        setLoggedIn(false)
      } else {

        setLoggedIn(true)
      }
    } else {
      setLoggedIn(false)
    }

  }, [token]);



  const decodeToken = (token) => {
    try {
      return jwtDecode(token);
    } catch (error) {
      console.log('Error decoding token:', error);
      return null;
    }
  };

  const isTokenExpired = (exp) => {
    const currentTimeInSeconds = Math.floor(Date.now() / 1000);
    return exp < currentTimeInSeconds;
  };

  if (loggedIn === null) {
    return <div className='flex justify-center items-center h-screen'> <img src='loader.gif' className='w-60 h-60' alt='loader' /> </div>;
  }

  return (
    loggedIn ? <Outlet /> : <Navigate to='/login' />
  )
}

export default ProtectedRoutes