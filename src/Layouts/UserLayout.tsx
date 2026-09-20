import React, { useState } from "react";
import { Link, Outlet, useNavigate, useLocation, NavLink } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { FaMoneyBill, FaToggleOff, FaUserTie } from "react-icons/fa6";
import { TfiAngleDown, TfiAngleUp, TfiDashboard } from "react-icons/tfi";
import { BiSupport } from "react-icons/bi";
import { IoWalletOutline } from "react-icons/io5";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { logout } from "../Features/authSlice";
import { LogoWithText } from "../Component/Logo";
import { PiUsersLight } from "react-icons/pi";
import { Button } from "../Component/Button";
import { FaUserCircle } from "react-icons/fa";

const navLinks = [
  { to: "/dashboard", label: "Dashboard", icon: <TfiDashboard /> },
  { to: "/wastebills", label: "Waste bills", icon: <FaMoneyBill /> },
  { to: "/payment-history", label: "Payments", icon: <IoWalletOutline /> },
  { to: "/profile", label: "Profile", icon: <CgProfile /> },
  { to: "/contactus", label: "Contact us", icon: <BiSupport /> },
];

const UserLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    logout();
    sessionStorage.clear();
    navigate("/login");
  };

  return (
    <>
      <div className="min-h-screen bg-lightGreen flex flex-col">
        {/* ===== Header ===== */}
        <header className="flex items-center justify-between p-2 bg-lightGreen md:px-6 w-full">
          <Link to="/">
            <LogoWithText />
          </Link>
          <span className="text-xl flex-grow w-full block font-semibold text-center">
            Account Overview
          </span>
                                        <div className=" flex-1">

                        <li className='flex items-center space-x-2'>
                            <FaUserCircle size={30} onClick={() => setOpen(!open)} className="text-gray-300" />
                               {/* {open && (
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
      )} */}
                        </li>

                        {/* <li>
                            <Link to="/signup">
                                <button className="bg-green p-2 rounded-md text-white">
                                    Sign Up

                                </button>
                            </Link>
                        </li> */}

                    </div>

      

          {/* Mobile Menu Button */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-2xl"
          >
            {open ? <HiX /> : <HiMenuAlt3 />}
          </button>
        </header>

        <div className="flex flex-1 relative px-4">
          {/* ===== Sidebar ===== */}
          <aside
            className={`
              fixed md:static top-0 left-0 h-screen md:h-full w-72 bg-lightGreen z-40
              transform transition-transform duration-300 ease-in-out border-r border-gray-100/50
              ${open ? "translate-x-0" : "-translate-x-full"}
              md:translate-x-0 flex flex-col
            `}
          >
            <nav className="flex flex-col flex-1 mt-20 md:mt-6 overflow-y-auto justify-between">
              <ul className="flex-1 px-8 space-y-4">
                {navLinks.map((link) => {
                  const isActive = location.pathname === link.to;

                  return (
                    <li key={link.to} className="">
                      <Link
                        to={link.to}
                        onClick={() => setOpen(false)}
                        className={`flex items-center gap-4 px-4 py-4 rounded-xl transition-all duration-200 group
                          ${
                            isActive
                              ? "bg-green/70 text-black shadow-sm font-semibold border-green/70"
                              : "text-gray-500 hover:text-green hover:bg-green/10"
                          }
                        `}
                      >
                        <span className={`text-lg transition-colors ${isActive ? 'text-black font-bold' : 'text-gray-400 group-hover:text-green'}`}>
                          {link.icon}
                        </span>
                        <span>{link.label}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>

              {/* Logout */}
              <div className="px-8 pt-4 border-t border-gray-100/30">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3.5 text-gray-400 hover:text-white hover:font-bold hover:bg-red-600 rounded-xl transition-all duration-200 border border-transparent hover:border-red-100 group"
                >
                  <FaToggleOff className="text-xl group-hover:scale-110 transition-transform" />
                  Logout
                </button>
              </div>
            </nav>
          </aside>

          {/* Overlay (mobile) */}
          {open && (
            <button
              onClick={() => setOpen(false)}
              className="fixed inset-0 bg-black/40 z-30 md:hidden"
            />
          )}

          {/* ===== Main Content ===== */}
          <main className="flex-1 p-4 overflow-x-hidden">
            <div className="bg-white rounded-xl min-h-full">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default UserLayout;
