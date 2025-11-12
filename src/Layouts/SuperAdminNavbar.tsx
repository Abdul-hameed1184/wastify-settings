import { NavLink } from 'react-router-dom'
import { FaBars, } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { IoNotificationsCircleSharp } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { AdminLogo2 } from '../Component/AlternateLogos'
import { toggleSidebar } from '../Features/adminSidebarSlice';

const SuperAdminNavbar = () => {
    const dispatch = useDispatch();
    const toggle = useSelector((state: {sidebar: { isOpen: boolean}}) => state.sidebar.isOpen);

    const handleToggle = () => {
        dispatch(toggleSidebar());
    };
    return (
        <main className='fixed w-full shadow-2xl items-center px-4 bg-white h-20 flex z-30 justify-between'>
            <div className=" flex gap-3 lg:px-5 lg:w-1/5">
<button
    onClick={handleToggle}
    className="z-10 bg-transparent border-none p-0 m-0"
    aria-label={toggle ? "Close sidebar" : "Open sidebar"}
    type="button"
>
    {!toggle ? 
        <FaBars className="text-black w-8 h-8  cursor-pointer transition-transform ease-in-out delay-300 duration-500 transform hover:scale-110" />
        : 
        <AiOutlineClose className="text-black w-8 h-8  cursor-pointer transition-transform ease-in-out delay-300 duration-500 transform hover:scale-110 " />
    }
</button>
                <div className="w-20 lg:w-12 ">
                    <NavLink to="/">
                        <AdminLogo2 />
                    </NavLink>
                </div>
            </div>

            <div className="lg:w-1/3 flex justify-end gap-2">
                <IoNotificationsCircleSharp className='h-8 w-8 text-grayRounded' />
                <img src="/Images/admin-person.png" alt="" className='w-8  h-8 lg:w-10 lg:h-10 rounded-full' />
            </div>
        </main>
    )
}

export default SuperAdminNavbar