import React, {  useState } from 'react'
import {  FaBars, FaTimes, FaUserTie, } from "react-icons/fa";
import { LiaUserSolid } from "react-icons/lia";
import { GoPeople } from "react-icons/go";
import { Link, NavLink } from "react-router-dom";
import {
    AiFillFacebook, AiOutlineInstagram,
    AiOutlineTwitter,
    AiFillLinkedin
} from "react-icons/ai"
import { Button } from '../Component/Button';
import { LogoWithText } from '../Component/Logo';
import { PiHeadsetLight, PiUsersLight } from 'react-icons/pi';
import { TfiAngleDown, TfiAngleUp } from 'react-icons/tfi';
import { Modal } from '../Component/Modal/Modal';
import { BiShowAlt } from 'react-icons/bi';
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { SlSocialFacebook } from "react-icons/sl";
import { FaInstagram, FaXTwitter } from 'react-icons/fa6';
import { CiLinkedin } from 'react-icons/ci';


const Navbar:React.FC = () => {

    const [toggle, setToggle] = useState(false);
    const [ open, setOpen ] = useState(false);



    // To set mobile navbar toggle
    const handleToggle = () => {
        setToggle(!toggle);
    };

   
    const activeAuth = sessionStorage.getItem('SESSION_AUTH_TOKEN');
    return (
        <nav className={`mt-0 fixed top-0 left-0 w-full h-20 md:h-20  bg-white shadow-lg flex items-center justify-between   px-6  md:px-12 xl:px-12   text-black z-10  capitalize`}>
            <Link to="/"  className='mt-3 md:mt-0'>
                <div className="h-14 w-14">
                    <LogoWithText />
                </div>
            </Link>
            <div>
                <ul className="hidden md:flex space-x-4">
                    <li className="font-Poppins text-gray-500 hover:text-green cursor-pointer">
                        <Link to="/#whoWeAre">Who We Are</Link>
                    </li>
                    <li className="font-Poppins text-gray-500 hover:text-green cursor-pointer">
                        <Link to="/#howItWorks">How It Works</Link>
                    </li>
                    <li className="font-Poppins text-gray-500 hover:text-green cursor-pointer">
                        <Link to="/#contact">Contact</Link>
                    </li>
                </ul>
            </div>
            <button
                onClick={handleToggle}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        handleToggle();
                    }
                }}
                className="md:hidden z-10 pr-1.5"
                aria-label="Toggle navigation menu"
                tabIndex={0}
                type="button"
            >
                {!toggle ? (
                 
                        <FaBars className="text-black w-6 h-6   cursor-pointer transition-transform ease-in-out delay-300 duration-500 transform hover:scale-110" />
     
                ) : (
                    <FaTimes className="text-black w-6 h-6   cursor-pointer transition-transform ease-in-out delay-300 duration-500 transform hover:scale-110 " />
                )}
            </button>

            {/* mobile-view-navbar */}
 

                            {toggle &&

                <Modal title={<LogoWithText />} isOpen={toggle} onClose={() => handleToggle()}>
                   <div className='flex flex-col justify-between'>                   
                    
                     <div className='gap-4 flex-grow mb-8'>
                     {
                        [
                            {
                                icon:  <GoPeople size={30} />,
                                title: "Customer Login",
                                path: "/login"
                            },
                            {
                                icon:  <LiaUserSolid size={30}/>,
                                title: "Operator Login",
                                path: "/operator-login"
                            },
                            {
                                icon: <HiOutlineBuildingOffice2 size={30}  />,
                                title: "Who We Are",
                                path: "/#whoWeAre"
                            },
                            {
                                icon: <BiShowAlt size={30}  />,
                                title: "How It Works",
                                path: "/#howItWorks"
                            },
                            {
                                icon: <PiHeadsetLight size={30}  />,
                                title: "Contact Us",
                                path: "/#contact"
                            }
           
                        ].map(x => {
                            return (
                                <div className='flex flex-row items-center justify-start text-gray-400 p-2' >
                                    <div className='mr-4'>{x.icon}</div>
                                    <Link to={x.path} className='text-base' onClick={() => setToggle(false)}>{x.title}</Link>
                                </div>
                            )
                        })
                     }
                    </div>
                    <div className='flex-1'>
                        <h2 className='text-semibold text-black'>Follow Us</h2>
                        <div className="flex space-x-4">
                            <SlSocialFacebook size={10} className="text-gray-600 w-12 h-12 rounded-md   cursor-pointer transition-transform ease-in-out delay-300 duration-500 transform hover:scale-110 border border-gray-400 p-4" />
                            <FaInstagram size={10} className="text-gray-600 w-12 h-12 rounded-md cursor-pointer transition-transform ease-in-out delay-300 duration-500 transform hover:scale-110 border border-gray-400 p-4" />
                            <FaXTwitter size={10} className="text-gray-600 w-12 h-12 rounded-md   cursor-pointer transition-transform ease-in-out delay-300 duration-500 transform hover:scale-110 border border-gray-400 p-4" />
                            <CiLinkedin size={10} className="text-gray-600 w-12 h-12 rounded-md  cursor-pointer transition-transform ease-in-out delay-300 duration-500 transform hover:scale-110 border border-gray-400 p-4" />
                        </div>
                    </div>
                    </div>
                </Modal>
           
}

            {/* big screen topBar */}

            <ul className="hidden text-white flex-row space-x-4 lg:space-x-6  md:flex items-center">
                {activeAuth ?
                    <div className="w-full flex space-x-4 items-center lg:space-x-6">

                        <li>
                            <Link to="/profile">
                                        <button className="bg-green p-2 rounded-md text-white">
                                            DashBoard
        
                                        </button>
                                    </Link>
                        </li>

                    </div>
                    :
                    <div className="w-full flex space-x-4  lg:space-x-10 items-center">

                        <li className='flex items-center space-x-2'>
                            <Button>
                            <Link to="/login">
                                Login
                            </Link>
                            </Button>
                            <Button className="hover:border-2 hover:border-white hover:shadow-green hover:shadow-outer" onClick={() => setOpen(!open)}>
                                {!open ? <TfiAngleUp className='text-black' /> : <TfiAngleDown className='text-black' />}
                            </Button>
                               {open && (
        <div className="absolute right-0 mt-48 w-56  rounded-xl bg-white text-black shadow-lg border border-gray-200 z-50">
          <h3 className='p-4 font-semibold text-black'>Login As</h3>
          <NavLink
            to={"/login"}
            className="w-full flex items-center text-left py-2 px-4 hover:bg-gray-100 transition hover:bg-green/20"
          >
           <span className='mr-4'><PiUsersLight /></span><span> Customer</span>
          </NavLink>

          <NavLink
            to={"/operator-login"}
            className="w-full flex items-center text-left py-2 px-4 hover:bg-gray-100 transition hover:bg-green/20"
          >
            <span className='mr-4'><FaUserTie /></span><span> Operator</span>
          </NavLink>
          
        </div>
      )}
                        </li>

                        {/* <li>
                            <Link to="/signup">
                                <button className="bg-green p-2 rounded-md text-white">
                                    Sign Up

                                </button>
                            </Link>
                        </li> */}

                    </div>
                }



            </ul>
        </nav>
    )
}

export default Navbar