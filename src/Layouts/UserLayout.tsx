import React from 'react'

import { ToastContainer, Zoom } from 'react-toastify';
import { UsernavBar } from '../Component/UsernavBar';
import { Outlet } from 'react-router-dom';



const UserLayout:React.FC = () => {

    return (
        <div>
     <UsernavBar />
     <ToastContainer 
       position="top-center"
       autoClose={3000}
       newestOnTop={false}
       closeOnClick
       rtl={false}
       pauseOnFocusLoss
       draggable
       pauseOnHover
       theme="light"
       transition={Zoom}
      />
        
                    <main><Outlet /></main>

        </div>
    )
}


export default UserLayout