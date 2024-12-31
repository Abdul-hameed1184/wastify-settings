import React, { useEffect, useState } from 'react'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode';
import Loader from '../Component/Loader';
import { IDecodeToken } from './models/decodedtoken.interface';


const ProtectedRoutes:React.FC = () => {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [token] = useState<string>(sessionStorage.getItem('SESSION_AUTH_TOKEN')||"")
  const navigate = useNavigate();
  const [ loading, setLoading ] = useState<boolean>(true)

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
    const userDetails:IDecodeToken|null = decodeToken(token);
 
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
    setLoading(false)

  }, [navigate, token]);



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

  if(loading){
    return <Loader/>
  }

  return (
    loggedIn ? <Outlet /> : <Navigate to='/login' />
  )
}

export default ProtectedRoutes