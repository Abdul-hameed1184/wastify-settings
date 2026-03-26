import React, { useState } from 'react'

import { IoPeople, IoWalletOutline } from 'react-icons/io5';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { LogoWithText } from '../Component/Logo';
import { HiMenuAlt3, HiX } from 'react-icons/hi';
import { TfiDashboard } from 'react-icons/tfi';
import { FaMoneyBill, FaToggleOff } from 'react-icons/fa';
import { PiBuildingsBold } from 'react-icons/pi';
import { MdOutlineHeadsetMic } from 'react-icons/md';
import { GiSettingsKnobs } from "react-icons/gi";
import { logout } from '../Features/authSlice';



const navLinks = [
  { to: "/dashboard", label: "Dashboard", icon: <TfiDashboard /> },
  { to: "/revenue", label: "Revenue", icon: <FaMoneyBill /> },
  { to: "/properties", label: "Properties", icon: <PiBuildingsBold /> },
  { to: "/transactions", label: "Transactions", icon: <IoWalletOutline /> },
{ to: "/complaint", label: "Complaints", icon: <MdOutlineHeadsetMic /> },
  { to: "/customers", label: "Customers", icon: <IoPeople /> },
{ to: "/settings", label: "Settings", icon: <GiSettingsKnobs /> }
];
const OperatorLayout:React.FC = () => {
  const [open, setOpen] = useState(false);
    const navigate =   useNavigate();
    const location = useLocation();

    const handleLogout = () => {
      logout();
      sessionStorage.clear();
      navigate("/login");
    };
    return (
        <>
        


      <div className="min-h-screen bg-lightGreen flex flex-col">
        {/* ===== Header ===== */}
        <header className="flex items-center  justify-between p-2 bg-lightGreen md:px-6">
          <Link to="/">
            <LogoWithText />
          </Link>

          <span className="hidden md:block font-semibold">
            Account Overview
          </span>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-2xl"
          >
            {open ? <HiX /> : <HiMenuAlt3 />}
          </button>

          {/* Desktop Profile Button */}
          {/* <NavLink to="/profile" className="hidden rounded-full md:block bg-white p-2 text-white bg-primary font-semibold">
            {getInitials(customer.firstname+" "+customer.lastname)}
          </NavLink> */}
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
                  const isActive = location.pathname === "/operator"+link.to;

                  return (
                    <li key={link.to} className=''>
                      <Link
                        to={"/operator"+link.to}
                        onClick={() => setOpen(false)}
                        className={`flex items-center gap-4 px-4 py-4 rounded-xl transition-all duration-200 group
                          ${
                            isActive
                              ? "bg-green/70 text-black shadow-sm font-semibold shadow-green/5 border-r-4 border-green/70"
                              : "text-gray-500 hover:text-green hover:bg-green/10"
                          }
                        `}
                      >
                        <span className={`text-xl transition-colors ${isActive ? 'text-black font-bold' : 'text-gray-400 group-hover:text-green'}`}>
                          {link.icon}
                        </span>
                        <span>{link.label}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>

              {/* Logout */}
              <div className="p-4 border-t border-gray-100/30">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3.5 text-white font-bold bg-red-600 rounded-xl transition-all duration-200 border border-transparent hover:border-red-100 group"
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
          <main className="flex-1 p-4 overflow-x-hidden ">
            <div className="bg-white rounded-xl min-h-full">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
        </>
    )
}


export default OperatorLayout;