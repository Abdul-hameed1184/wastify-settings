import React, { useEffect, useState } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { RiDashboardFill } from "react-icons/ri";
import { BsBarChartFill } from "react-icons/bs";
import { PiBookFill } from "react-icons/pi";
import { RiBillFill } from "react-icons/ri";
import { IoMdAlert } from "react-icons/io";
import { IoPersonAdd } from "react-icons/io5";
import { IoSettings } from "react-icons/io5";
import { FaPowerOff } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import useLogout from '../utils/useLogout';
import { toggleSidebar } from '../Features/adminSidebarSlice';

const AdminSidebar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [isActive, setIsActive] = useState("/dashboard")
    const { pathname } = location;
    const logout = useLogout();
    const dispatch = useDispatch();
    const toggle = useSelector((state: { sidebar: { isOpen:boolean}}) => state.sidebar.isOpen);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    const handleOptionClick = (option) => {
        setIsActive(option)

        // if (windowWidth < 1010) {
            
            dispatch(toggleSidebar()); 
        // }
    };
    const handleLogOut = () => {
        const isLoggedOut = logout();

        if (isLoggedOut) {
            navigate("/admin-login")
        }
    };
    useEffect(() =>{
        handleOptionClick(pathname);

        const handleResize = () => {
            setWindowWidth(window.innerWidth);
          };
      
          window.addEventListener('resize', handleResize);
      
          return () => {
            window.removeEventListener('resize', handleResize);
          };
    },[]);

    return (
        <>
         {/* desktop viww */}
        <main className={`admin-sidebar fixed transform  ease-in-out duration-500 delay-300 ${toggle ? "translate-x-0" : "-translate-x-full"} w-4/5 lg:w-1/5 py-10 mt-10 h-screen lg:flex flex-col bg-white shadow-2xl font-Poppins z-20 overflow-auto`}>
            
            <NavLink to="/dashboard/"
                className={` w-full p-4 ${isActive === "/dashboard/" ? "lg:bg-green lg:text-white text-green" : " text-grayRounded"} hover:lg:bg-green  hover:lg:text-white`}
                onClick={() => handleOptionClick("/dashboard")}
            >
                    <p className="text-center flex justify-start px-5 py-3 gap-2">
                        <RiDashboardFill className={` text-center mt-1 ${isActive  === "/dashboard/" ? 'lg:text-white text-green' : 'text-grayRounded'}`} />  Dashboard
                    </p>
         
            </NavLink>
            
            <NavLink to="/dashboard/revenue"
                className={` w-full p-4 ${isActive === "/dashboard/revenue" ? "lg:bg-green lg:text-white text-green " : " text-grayRounded"} hover:lg:bg-lightGreen  hover:lg:text-white`}
                onClick={() => handleOptionClick("/dashboard/revenue")}
            >
                    <p className="text-center flex justify-start px-5 py-3 gap-2">
                        <BsBarChartFill className={`text-center mt-1 ${isActive  === "/dashboard/revenue" ? 'lg:text-white text-green' : 'text-grayRounded'}`} />  Revenue
                    </p>
         
            </NavLink>

            <NavLink to="/dashboard/properties"
                className={` w-full p-4 ${isActive === "/dashboard/properties" ? "lg:bg-green lg:text-white text-green " : " text-grayRounded"} hover:lg:bg-green  hover:lg:text-white`}
                onClick={() => handleOptionClick("/dashboard/properties")}
            >
                    <p className="text-center flex justify-start px-5 py-3 gap-2">
                        <PiBookFill className={`text-center mt-1 ${isActive  === "/dashboard/properties" ? 'lg:text-white text-green' : 'text-grayRounded'}`} />  Properties
                    </p>
         
            </NavLink>

            <NavLink to="/dashboard/billing"
                className={` w-full p-4 ${isActive === "/dashboard/billing" ? "lg:bg-green lg:text-white text-green " : " text-grayRounded"} hover:lg:bg-green  hover:lg:text-white`}
                onClick={() => handleOptionClick("/dashboard/billing")}
            >
                    <p className="text-center flex justify-start px-5 py-3 gap-2">
                        <RiBillFill className={`text-center mt-1 ${isActive  === "/dashboard/billing" ? 'lg:text-white text-green' : 'text-grayRounded'}`} />  Billing & Transactions
                    </p>
         
            </NavLink>

            <NavLink to="/dashboard/reports"
                className={` w-full p-4 ${isActive === "/dashboard/reports" ? "lg:bg-green lg:text-white text-green " : " text-grayRounded"} hover:lg:bg-green  hover:lg:text-white`}
                onClick={() => handleOptionClick("/dashboard/reports")}
            >
                    <p className="text-center flex justify-start px-5 py-3 gap-2">
                        <IoMdAlert className={`text-center mt-1 ${isActive  === "/dashboard/reports" ? 'lg:text-white text-green' : 'text-grayRounded'}`} />  Customer Reports
                    </p>
         
            </NavLink>

            <NavLink to="/dashboard/customers"
                className={` w-full p-4  ${isActive === "/dashboard/customer" ? "lg:bg-green lg:text-white text-green " : " text-grayRounded"} hover:lg:bg-green  hover:lg:text-white`}
                onClick={() => handleOptionClick("/dashboard/customer")}
            >
                    <p className="text-center flex justify-start px-5 py-3 gap-2">
                        <IoPersonAdd className={`text-center mt-1 ${isActive  === "/dashboard/customer" ? 'lg:text-white text-green' : 'text-grayRounded'}`} />  Customers
                    </p>
         
            </NavLink>

            <NavLink to="/dashboard/settings"
                className={` w-full p-4 ${isActive === "/dashboard/settings" ? "lg:bg-green lg:text-white text-green " : " text-grayRounded"} hover:lg:bg-green  hover:lg:text-white`}
                onClick={() => handleOptionClick("/dashboard/settings")}
            >
                    <p className="text-center flex justify-start px-5 py-3 gap-2">
                        <IoSettings className={`text-center mt-1 ${isActive  === "/dashboard/settings" ? 'lg:text-white text-green' : 'text-grayRounded'}`} />  Settings
                    </p>
         
            </NavLink>

            <button
                className={` w-full p-4 ${isActive === "/admin-login" ? " lg:bg-green lg:text-white text-green " : " text-grayRounded"} hover:lg:bg-green  hover:lg:text-white`}
                onClick={() => handleLogOut()} type='button'
            >
                    <p className="text-center flex justify-start px-5 py-3 gap-2">
                        <FaPowerOff className={`text-center mt-1 ${isActive  === "/admin-login" ? 'lg:text-white text-green' : 'text-grayRounded'}`} />  Logout
                    </p>
         
            </button>

            
            

        </main>

        </>
    )
}

export default AdminSidebar