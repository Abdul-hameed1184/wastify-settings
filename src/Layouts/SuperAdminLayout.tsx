import React, { ReactNode, useEffect } from 'react'
import SuperAdminNavbar from './SuperAdminNavbar'
import SuperAdminSidebar from './SuperAdminSidebar'
import { ToastContainer, Zoom } from 'react-toastify';


type Props = {
    children: ReactNode;
  }

const SuperAdminLayout:React.FC<Props> = ({children}) => {

    useEffect(() => {
        console.log('AdminLayout')
    })
    return (
        <div>
            <SuperAdminNavbar />
            <ToastContainer 
       position="top-center"
       autoClose={3000}
       hideProgressBar
       newestOnTop={false}
       closeOnClick
       rtl={false}
       pauseOnFocusLoss
       draggable
       pauseOnHover
       theme="light"
       transition={Zoom}
      />
            <div className="flex">
            
                    <SuperAdminSidebar />
 
                <div className="w-full flex-1 lg:w-4/5 mt-28 lg:mx-10">
                    <main>{children}</main>
                </div>
            </div>

        </div>
    )
}


export default SuperAdminLayout