import React, { useEffect, useState } from 'react'
import { FaAngleUp, FaBars, FaCaretDown, FaTimes, } from "react-icons/fa";
import { TiTimes } from "react-icons/ti"
import { Link } from "react-router-dom";
import {
    AiFillFacebook, AiOutlineInstagram,
    AiOutlineTwitter,
    AiFillLinkedin
} from "react-icons/ai"
import { Button } from '../Component/Button';
import { LogoWithText } from '../Component/Logo';

const Navbar = () => {

    const [toggle, setToggle] = useState(false);

    // To set mobile navbar toggle
    const handleToggle = () => {
        setToggle(!toggle);
    };

    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > window.innerHeight) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const activeAuth = sessionStorage.getItem('SESSION_AUTH_TOKEN');
    return (
        <nav className={`mt-0 fixed w-full h-20 md:h-20  bg-white shadow-lg flex items-center justify-between items-center  px-6  md:px-12 xl:px-12   text-black z-10  capitalize`}>
            <Link to="/"  className='mt-3 md:mt-0'>
                <div className="h-14 w-14">
                    <LogoWithText />
                </div>
            </Link>
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
                {toggle ? (
                 
                        <FaBars className="text-black w-6 h-6   cursor-pointer transition-transform ease-in-out delay-300 duration-500 transform hover:scale-110" />
     
                ) : (
                    <FaTimes className="text-black w-6 h-6   cursor-pointer transition-transform ease-in-out delay-300 duration-500 transform hover:scale-110 " />
                )}
            </button>

            {/* mobile-view-navbar */}
            <ul
                className={` transform  ease-in-out duration-500 delay-300 ${toggle ? "translate-x-0" : "-translate-x-full"
                    } w-3/4 bg-white shadow-md shadow-gray absolute top-0 left-0 h-screen md:hidden flex flex-col pl-2 `}
            >
                <div className="flex justify-between px-4 mb-0 mt-10 items-center">
                    <Link to="/" className='mt-3 md:mt-0'>
                        <div className=" h-20   w-40">
                            <LogoWithText/>
                        </div>
                    </Link>
                    <div
                        onClick={handleToggle}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                                handleToggle();
                            }
                        }}
                        role="button"
                        tabIndex={0}
                        aria-label="Close navigation menu"
                        className="w-6 h-6 bg-green cursor-pointer flex justify-center items-center rounded-[20px] ">
                        <TiTimes className="text-white w-5 h-5 transition-transform ease-in-out delay-1000 duration-1000 transform hover:scale-110" />
                    </div>
                </div>

                {activeAuth ?
                    <div className=" ">

                        <Link to="/profile">
                            <li className="text-gray leading-5 text-xl flex font-Poppins">
                                <p className=" cursor-pointer font-normal">DashBoard</p>
                            </li>
                        </Link>
                    </div>
                    :
                    <div className=" mt-14 mx-5 ">
               
                            <Button>
                                         <Link to="login">Login</Link>
                            </Button>
                            <Button>
                                <FaAngleUp className='text-black'/>
                            </Button>
                

                        {/* <Link to="signup">
                            <li className="text-gray leading-5 text-xl flex  font-Poppins mb-8">
                            <img src={person1} alt="account" className="cursor-pointer" />
                                <p className=" cursor-pointer font-semibold">Register</p>
                            </li>
                        </Link> */}



                    </div>

                }

                <div className="mx-5 ">


                    <Link to="/">
                        <li className="text-gray leading-5 text-xl flex font-Poppins font-normal mb-8">

                            <p className=" cursor-pointer font-semibold">Learn</p>
                        </li>
                    </Link>

                    <Link to="/">
                        <li className="text-gray leading-5 text-xl flex  font-Poppins font-normal mb-8">

                            <p className=" cursor-pointer font-semibold">Legal</p>
                        </li>
                    </Link>
                </div>


                <li className="text-gray leading-5 text-xl flex flex-col px-6 py-6 font-Poppins font-normal ">
                    <p className='text-gray leading-5 text-xl font-Poppins font-semibold'>Follow us</p> <br />
                    <div className=" h-10 w-full flex">
                        <div className="w-8 h-8 bg-white rounded-full flex justify-center items-center">
                            <AiFillFacebook size={18} className="  cursor-pointer" />
                        </div>
                        <div className="w-8 h-8 bg-white rounded-full ml-5 flex justify-center items-center">
                            <AiOutlineInstagram size={18} className="  cursor-pointer " />
                        </div>
                        <div className="w-8 h-8 bg-white rounded-full ml-5 flex justify-center items-center">
                            <AiOutlineTwitter size={18} className="  cursor-pointer  " />
                        </div>
                        <div className="w-8 h-8 bg-white rounded-full ml-5 flex justify-center items-center ">
                            <AiFillLinkedin size={18} className="  cursor-pointer  " />
                        </div>
                    </div>
                </li>
            </ul>

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
                            <Button>
                                <FaCaretDown className="text-white"/>
                            </Button>
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