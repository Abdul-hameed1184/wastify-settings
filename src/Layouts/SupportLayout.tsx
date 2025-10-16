import React, { ReactNode, useEffect } from 'react'
import { ToastContainer, Zoom } from 'react-toastify';
import SupportNavbar from './SupportNavbar';
import SupportSidebar from './SupportSidebar';



type Props = {
    children: ReactNode;
  }

const SupportLayout:React.FC<Props> = ({children}) => {

    useEffect(() => {
        console.log('Support layout')
    })
    return (
        <div>
            <SupportNavbar />
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
            
                    <SupportSidebar />
 
                <div className="w-full flex-1 lg:w-4/5 mt-28 lg:mx-10">
                    <main>{children}</main>
                </div>
            </div>

        </div>
    )
}


export default SupportLayout;