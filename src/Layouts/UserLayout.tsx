import React, { useState } from "react";
import { ToastContainer, Zoom } from "react-toastify";
import { Link, Outlet, useNavigate, useLocation, NavLink } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { FaMoneyBill, FaToggleOff } from "react-icons/fa6";
import { TfiDashboard } from "react-icons/tfi";
import { BiSupport } from "react-icons/bi";
import { IoWalletOutline } from "react-icons/io5";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { logout } from "../Features/authSlice";
import { LogoWithText } from "../Component/Logo";
import { ICustomer } from "../models/customer.interface";
import { getInitials } from "../utils/format";

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
    const customer: ICustomer = JSON.parse(
      sessionStorage.getItem("AUTH_USERDETAILS") || "{}"
    );

  const handleLogout = () => {
    logout();
    sessionStorage.clear();
    navigate("/login");
  };

  return (
    <>
      <ToastContainer position="top-center" autoClose={3000} transition={Zoom} />

      <div className="min-h-screen bg-lightGreen flex flex-col">
        {/* ===== Header ===== */}
        <header className="flex items-center justify-between p-2 bg-lightGreen md:px-6">
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
          <NavLink to="/profile" className="hidden rounded-full md:block bg-white p-2 text-white bg-primary font-semibold">
            {getInitials(customer.firstname+" "+customer.lastname)}
          </NavLink>
        </header>

        <div className="flex flex-1 relative">
          {/* ===== Sidebar ===== */}
          <aside
            
            className={`
              fixed md:static top-0 left-0 h-full w-64 bg-lightGreen z-40
              transform transition-transform duration-300
              ${open ? "translate-x-0" : "-translate-x-full"}
              md:translate-x-0
            `}
          >
            <nav className="flex flex-col mt-20 md:mt-6 justify-between">
              <ul>
                {navLinks.map((link) => {
                  const isActive = location.pathname === link.to;

                  return (
                    <li key={link.to} className="px-4 my-2">
                      <Link
                        to={link.to}
                        onClick={() => setOpen(false)}
                        className={`flex items-center gap-4 p-4 rounded-lg font-semibold
                          ${
                            isActive
                              ? "bg-green text-black"
                              : "text-gray-600 hover:bg-green/20"
                          }
                        `}
                      >
                        {link.icon}
                        {link.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="flex items-center gap-4 m-4 p-4 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                <FaToggleOff />
                Logout
              </button>
            </nav>
          </aside>

          {/* Overlay (mobile) */}
          {open && (
            <div
              onClick={() => setOpen(false)}
              className="fixed inset-0 bg-black/40 z-30 md:hidden"
            />
          )}

          {/* ===== Main Content ===== */}
          <main className="flex-1 p-4 md:p-6 md:ml-0">
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
