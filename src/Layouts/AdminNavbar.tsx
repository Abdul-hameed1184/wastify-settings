import React from 'react'
import { Link } from 'react-router-dom'
import { FaSearch } from "react-icons/fa";
import { FaBars, } from "react-icons/fa";
import { IoNotificationsCircleSharp } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { AdminLogo, AdminLogo2 } from '../Component/AlternateLogos'
import { InputFieldGreenWhite } from '../Component/InputField'
import { toggleSidebar } from '../Features/adminSidebarSlice';

const AdminNavbar = () => {
    const dispatch = useDispatch();
    const toggle = useSelector(state => state.sidebar.isOpen);

    const handleToggle = () => {
        dispatch(toggleSidebar());
    };
    return (
        <main className='fixed w-full shadow-2xl items-center px-4 lg:px-10 bg-white h-20 flex z-30 justify-between'>
            <div className=" flex gap-3 lg:px-5 lg:w-1/5">
                <div onClick={handleToggle} className=" z-10 ">
                    {toggle ? (
                        <div  >
                            <FaBars className="text-black w-8 h-8  cursor-pointer transition-transform ease-in-out delay-300 duration-500 transform hover:scale-110" />
                        </div>

                    ) : <FaBars className="text-black w-8 h-8  cursor-pointer transition-transform ease-in-out delay-300 duration-500 transform hover:scale-110 " />}
                </div>
                <div className="w-10 lg:w-12 ">
                    <Link to="/" smooth="true" duration={500}>
                        <AdminLogo2 />
                    </Link>
                </div>
            </div>
            <div className="hidden lg:block w-2/5 ">
                <div className="relative w-4/6">
                    <InputFieldGreenWhite />
                    <FaSearch className='text-green absolute top-3 left-3' />
                </div>
            </div>
            <div className="lg:w-1/3 flex justify-end gap-2">
                <IoNotificationsCircleSharp className='h-8 w-8 text-grayRounded' />
                <img src="/Images/admin-person.png" alt="" className='w-8  h-8 lg:w-10 lg:h-10 rounded-full' />
            </div>
        </main>
    )
}

export default AdminNavbar