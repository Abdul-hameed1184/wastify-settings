import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
const useLogout = () => {
    const [token] = useState(sessionStorage.getItem('SESSION_AUTH_TOKEN'))
    const navigate = useNavigate();

    const decodeToken = (token) => {
        try {
          return jwtDecode(token);
        } catch (error) {
          console.log('Error decoding token:', error);
          return null;
        }
      };
    

    const logout = () => {
        try {
            const userDetails = decodeToken(token);
            if (userDetails.role === 1) {
                sessionStorage.removeItem('SESSION_AUTH_TOKEN')
                sessionStorage.removeItem('AUTH_USERDETAILS')
                return true;
              }
        
              if (userDetails.role === 2) {
                sessionStorage.removeItem('SESSION_AUTH_TOKEN')
                sessionStorage.removeItem('AUTH_ADMIN_DETAILS')
                return true;
              }

        } catch (err) {
            return false;
            console.log(err)
        }
    }
    return logout;
}

export default useLogout