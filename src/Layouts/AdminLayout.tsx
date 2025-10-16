import React, { ReactNode, useEffect } from 'react'
import AdminNavbar from './OperatorNavbar'
import AdminSidebar from './OperatorSidebar'
import { ToastContainer, Zoom } from 'react-toastify';


type Props = {
    children: ReactNode;
  }

const AdminLayout:React.FC<Props> = ({children}) => {

    useEffect(() => {
        console.log('AdminLayout')
    })
    return (
        <div>
            <AdminNavbar />
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
            
                    <AdminSidebar />
 
                <div className="w-full flex-1 lg:w-4/5 mt-28 lg:mx-10">
                    <main>{children}</main>
                </div>
            </div>

        </div>
    )
}


export default AdminLayout