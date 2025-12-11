import React, { useCallback, useEffect, useState } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { RiDashboardFill , RiBillFill } from "react-icons/ri";
import { BsBarChartFill } from "react-icons/bs";
import { PiBookFill } from "react-icons/pi";

import { IoPersonAdd  } from "react-icons/io5";

import { FaPowerOff, FaUsers } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import useLogout from '../utils/useLogout';
import { toggleSidebar } from '../Features/adminSidebarSlice';

const SuperAdminSidebar:React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [isActive, setIsActive] = useState("/dashboard")
    const { pathname } = location;
    const logout = useLogout();
    const dispatch = useDispatch();
    const toggle = useSelector((state: { sidebar: { isOpen:boolean}}) => state.sidebar.isOpen);
  //  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    const handleOptionClick = useCallback((option) => {
        setIsActive(option)

        // if (windowWidth < 1010) {
            
            dispatch(toggleSidebar()); 
        // }
    },[dispatch]);
    const handleLogOut = () => {
        console.log('logout')
        const isLoggedOut = logout();

        if (isLoggedOut) {
            navigate("/admin-login")
        }
    };
    useEffect(() =>{
        handleOptionClick(pathname);
    },[handleOptionClick, pathname]);

    return (
        <>
         {/* desktop viww */}
        <main className={`admin-sidebar fixed transform flex flex-col justify-between ease-in-out duration-500 delay-300 ${toggle ? "translate-x-0" : "-translate-x-full"} w-4/5 lg:w-1/5 py-10 mt-10 h-screen lg:flex flex-col bg-white shadow-2xl font-Poppins z-20 overflow-auto`}>
            <div className='flex flex-col'>
                <h2 className='text-2xl bg-slate-900 text-white uppercase text-center p-2 text-bold'>Super Admin</h2>
            <NavLink to="/super-admin/dashboard/"
                className={` w-full p-4 ${isActive === "/dashboard/" ? "lg:bg-slate-900 lg:text-white text-slate-900" : " text-grayRounded"} hover:lg:bg-slate-900  hover:lg:text-white`}
                onClick={() => handleOptionClick("/dashboard")}
            >
                    <p className="text-center flex justify-start px-5 py-3 gap-2">
                        <RiDashboardFill className={` text-center mt-1 ${isActive  === "/super-admin/" ? 'lg:text-white text-slate-900' : 'text-grayRounded'}`} />  Dashboard
                    </p>
         
            </NavLink>
            
            {/* <NavLink to="/super-admin/revenue"
                className={` w-full p-4 ${isActive === "/super-admin/revenue" ? "lg:bg-slate-900 lg:text-white text-slate-900 " : " text-grayRounded"} hover:lg:bg-lightslate-900  hover:lg:text-white`}
                onClick={() => handleOptionClick("/super-admin/revenue")}
            >
                    <p className="text-center flex justify-start px-5 py-3 gap-2">
                        <BsBarChartFill className={`text-center mt-1 ${isActive  === "/super-admin/revenue" ? 'lg:text-white text-slate-900' : 'text-grayRounded'}`} />  Revenue
                    </p>
         
            </NavLink> */}

            <NavLink to="/super-admin/properties"
                className={` w-full p-4 ${isActive === "/super-admin/properties" ? "lg:bg-slate-900 lg:text-white text-slate-900 " : " text-grayRounded"} hover:lg:bg-slate-900  hover:lg:text-white`}
                onClick={() => handleOptionClick("/super-admin/properties")}
            >
                    <p className="text-center flex justify-start px-5 py-3 gap-2">
                        <PiBookFill className={`text-center mt-1 ${isActive  === "/super-admin/properties" ? 'lg:text-white text-slate-900' : 'text-grayRounded'}`} />  Properties
                    </p>
         
            </NavLink>

            <NavLink to="/super-admin/billing"
                className={` w-full p-4 ${isActive === "/super-admin/billing" ? "lg:bg-slate-900 lg:text-white text-slate-900 " : " text-grayRounded"} hover:lg:bg-slate-900  hover:lg:text-white`}
                onClick={() => handleOptionClick("/super-admin/billing")}
            >
                    <p className="text-center flex justify-start px-5 py-3 gap-2">
                        <RiBillFill className={`text-center mt-1 ${isActive  === "/super-admin/billing" ? 'lg:text-white text-slate-900' : 'text-grayRounded'}`} />  Billing & Transactions
                    </p>
         
            </NavLink>

            {/* <NavLink to="/super-admin/reports"
                className={` w-full p-4 ${isActive === "/super-admin/reports" ? "lg:bg-slate-900 lg:text-white text-slate-900 " : " text-grayRounded"} hover:lg:bg-slate-900  hover:lg:text-white`}
                onClick={() => handleOptionClick("/super-admin/reports")}
            >
                    <p className="text-center flex justify-start px-5 py-3 gap-2">
                        <IoMdAlert className={`text-center mt-1 ${isActive  === "/dashboard/reports" ? 'lg:text-white text-slate-900' : 'text-grayRounded'}`} />  Customer Reports
                    </p>
         
            </NavLink> */}

            <NavLink to="/super-admin/customers"
                className={` w-full p-4  ${isActive === "/super-admin/customer" ? "lg:bg-slate-900 lg:text-white text-slate-900 " : " text-grayRounded"} hover:lg:bg-slate-900  hover:lg:text-white`}
                onClick={() => handleOptionClick("/super-admin/customer")}
            >
                    <p className="text-center flex justify-start px-5 py-3 gap-2">
                        <IoPersonAdd className={`text-center mt-1 ${isActive  === "/super-admin/customer" ? 'lg:text-white text-slate-900' : 'text-grayRounded'}`} />  Customers
                    </p>
         
            </NavLink>
            
            <NavLink to="/super-admin/operators"
                className={` w-full p-4  ${isActive === "/super-admin/operators" ? "lg:bg-slate-900 lg:text-white text-slate-900 " : " text-grayRounded"} hover:lg:bg-slate-900  hover:lg:text-white`}
                onClick={() => handleOptionClick("/super-admin/operators")}
            >
                    <p className="text-center flex justify-start px-5 py-3 gap-2">
                        <FaUsers  className={`text-center mt-1 ${isActive  === "/super-admin/operators" ? 'lg:text-white text-slate-900' : 'text-grayRounded'}`} />  PSP Operators
                    </p>
         
            </NavLink>

            {/* <NavLink to="/super-admin/settings"
                className={` w-full p-4 ${isActive === "/super-admin/settings" ? "lg:bg-slate-900 lg:text-white text-slate-900 " : " text-grayRounded"} hover:lg:bg-slate-900  hover:lg:text-white`}
                onClick={() => handleOptionClick("/super-admin/settings")}
            >
                    <p className="text-center flex justify-start px-5 py-3 gap-2">
                        <IoSettings className={`text-center mt-1 ${isActive  === "/super-admin/settings" ? 'lg:text-white text-slate-900' : 'text-grayRounded'}`} />  Settings
                    </p>
         
            </NavLink> */}
            </div>

            <NavLink to="/admin-login"
                className={` w-full p-4 hover:text-lg  ${isActive === "/admin-login" ? " lg:bg-red-900 lg:text-white text-red-900 " : " text-grayRounded"} hover:lg:bg-red-900  hover:lg:text-white`}
                onClick={handleLogOut}
            >
                    <p className="text-center flex justify-start px-5 py-3 gap-2" >
                        <FaPowerOff className={`text-center mt-1 ${isActive  === "/admin-login" ? 'lg:text-white text-red-900' : 'text-grayRounded'}`} />  Logout
                    </p>
         
            </NavLink>

            
            

        </main>

        </>
    )
}

export default SuperAdminSidebar