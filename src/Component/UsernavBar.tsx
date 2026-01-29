import { useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  IoLogOutOutline
} from "react-icons/io5";
import { MdOutlinePayments } from "react-icons/md";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { FiMenu, FiX } from "react-icons/fi";
import { logout } from "../Features/authSlice";
import { IoMdCall } from "react-icons/io";
import { TfiDashboard } from "react-icons/tfi";
import { CgProfile } from "react-icons/cg";
import { LogoWithText } from "./Logo";
const navLinks = [
    { to: "/dashboard", label: "Dashboard", icon: <TfiDashboard /> },
  { to: "/wastebills", label: "Waste bills", icon: <FaMoneyBillTrendUp /> },
  { to: "/payment-history", label: "Payment History", icon: <MdOutlinePayments /> },
  // { to: "/view-history", label: "View property", icon: <IoHomeOutline /> },
  // { to: "/support", label: "Support", icon: <BiSupport /> },
      { to: "/profile", label: "Profile", icon: <CgProfile /> },
  { to: "/contactus", label: "Contact us", icon: <IoMdCall /> },
];

export const UsernavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = useCallback(() => {
    const isLoggedOut = logout();
    if (isLoggedOut) {
      sessionStorage.removeItem("AUTH_USERDETAILS");
      sessionStorage.removeItem("SESSION_AUTH_TOKEN");
      navigate("/login");
    }
  }, [navigate]);

  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="p-4 bg-lightGreen shadow-md">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" aria-label="Home">
          <LogoWithText />
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6 font-medium text-gray-800">
{navLinks.map((link) => {
  const isActive = location.pathname === link.to;

  return (
    <li key={link.to}>
      <Link
        to={link.to}
        onClick={closeMenu}
        className={`flex flex-col items-center gap-2  font-Poppins text-lg ${
          isActive ? "text-green font-bold" : "text-gray-100 hover:text-green-700"
        }`}
      >
        {link.icon}
        <span>{link.label}</span>
      </Link>
    </li>
  );
})}

          <li>
            <button
              onClick={handleLogout}
              className="flex flex-col items-center gap-1 text-red-600 hover:text-red-800"
              aria-label="Logout"
            >
              <IoLogOutOutline />
              <span className="text-lg font-Poppins">Log out</span>
            </button>
          </li>
        </ul>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="md:hidden text-2xl text-gray-700"
          aria-label="Toggle navigation menu"
        >
          {isOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <ul className="md:hidden mt-3 px-4 space-y-4 text-gray-700">
{navLinks.map((link) => {
  const isActive = location.pathname === link.to;

  return (
    <li key={link.to}>
      <Link
        to={link.to}
        onClick={closeMenu}
        className={`flex items-center gap-3 py-2 font-Poppins text-md ${
          isActive ? "text-green-200 font-bold" : "text-gray-700 hover:text-green-200"
        }`}
      >
        {link.icon}
        <span>{link.label}</span>
      </Link>
    </li>
  );
})}

          <li>
            <button
              onClick={() => {
                closeMenu();
                handleLogout();
              }}
              className="flex items-center gap-3 py-2 text-red-600 hover:text-red-800"
            >
              <IoLogOutOutline />
              <span className="text-md font-Poppins">Log out</span>
            </button>
          </li>
        </ul>
      )}
    </nav>
  );
};
