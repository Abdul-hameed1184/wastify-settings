import React, { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { RiDashboardFill, RiBillFill } from "react-icons/ri";
import { BsBarChartFill } from "react-icons/bs";
import { PiBookFill } from "react-icons/pi";

import { IoMdAlert } from "react-icons/io";
import { IoPersonAdd, IoSettings } from "react-icons/io5";

import { FaPowerOff } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import useLogout from "../utils/useLogout";
import { toggleSidebar } from "../Features/adminSidebarSlice";

const OperatorSidebar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState("/operator");
  const { pathname } = location;
  const logout = useLogout();
  const dispatch = useDispatch();
  const toggle = useSelector(
    (state: { sidebar: { isOpen: boolean } }) => state.sidebar.isOpen
  );
  // const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const handleOptionClick = (option) => {
    setIsActive(option);

    // if (windowWidth < 1010) {

    dispatch(toggleSidebar());
    // }
  };
  const handleLogOut = () => {
    const isLoggedOut = logout();

    if (isLoggedOut) {
      navigate("/operator-login");
    }
  };
  useEffect(() => {
    handleOptionClick(pathname);

    const handleResize = () => {
      // setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      {/* desktop viww */}
      <main
        className={`admin-sidebar fixed transform  ease-in-out duration-500 delay-300 ${toggle ? "translate-x-0" : "-translate-x-full"} w-4/5 lg:w-1/5 py-10 mt-10 h-screen lg:flex flex-col bg-white shadow-2xl font-Poppins z-20 overflow-auto`}
      >
        <NavLink
          to="/operator/"
          className={` w-full p-4 ${isActive === "/operator/" ? "lg:bg-green lg:text-white text-green" : " text-grayRounded"} hover:lg:bg-green  hover:lg:text-white`}
          onClick={() => handleOptionClick("/operator")}
        >
          <p className="text-center flex justify-start px-5 py-3 gap-2">
            <RiDashboardFill
              className={` text-center mt-1 ${isActive === "/operator/" ? "lg:text-white text-green" : "text-grayRounded"}`}
            />{" "}
            Dashboard
          </p>
        </NavLink>

        <NavLink
          to="/operator/revenue"
          className={` w-full p-4 ${isActive === "/operator/revenue" ? "lg:bg-green lg:text-white text-green " : " text-grayRounded"} hover:lg:bg-lightGreen  hover:lg:text-white`}
          onClick={() => handleOptionClick("/operator/revenue")}
        >
          <p className="text-center flex justify-start px-5 py-3 gap-2">
            <BsBarChartFill
              className={`text-center mt-1 ${isActive === "/operator/revenue" ? "lg:text-white text-green" : "text-grayRounded"}`}
            />{" "}
            Revenue
          </p>
        </NavLink>

        <NavLink
          to="/operator/properties"
          className={` w-full p-4 ${isActive === "/operator/properties" ? "lg:bg-green lg:text-white text-green " : " text-grayRounded"} hover:lg:bg-green  hover:lg:text-white`}
          onClick={() => handleOptionClick("/operator/properties")}
        >
          <p className="text-center flex justify-start px-5 py-3 gap-2">
            <PiBookFill
              className={`text-center mt-1 ${isActive === "/operator/properties" ? "lg:text-white text-green" : "text-grayRounded"}`}
            />{" "}
            Properties
          </p>
        </NavLink>

        <NavLink
          to="/operator/billing"
          className={` w-full p-4 ${isActive === "/operator/billing" ? "lg:bg-green lg:text-white text-green " : " text-grayRounded"} hover:lg:bg-green  hover:lg:text-white`}
          onClick={() => handleOptionClick("/operator/billing")}
        >
          <p className="text-center flex justify-start px-5 py-3 gap-2">
            <RiBillFill
              className={`text-center mt-1 ${isActive === "/operator/billing" ? "lg:text-white text-green" : "text-grayRounded"}`}
            />{" "}
            Billing & Transactions
          </p>
        </NavLink>

        <NavLink
          to="/operator/reports"
          className={` w-full p-4 ${isActive === "/operator/reports" ? "lg:bg-green lg:text-white text-green " : " text-grayRounded"} hover:lg:bg-green  hover:lg:text-white`}
          onClick={() => handleOptionClick("/operator/reports")}
        >
          <p className="text-center flex justify-start px-5 py-3 gap-2">
            <IoMdAlert
              className={`text-center mt-1 ${isActive === "/operator/reports" ? "lg:text-white text-green" : "text-grayRounded"}`}
            />{" "}
            Customer Reports
          </p>
        </NavLink>

        <NavLink
          to="/operator/customers"
          className={` w-full p-4  ${isActive === "/operator/customer" ? "lg:bg-green lg:text-white text-green " : " text-grayRounded"} hover:lg:bg-green  hover:lg:text-white`}
          onClick={() => handleOptionClick("/operator/customer")}
        >
          <p className="text-center flex justify-start px-5 py-3 gap-2">
            <IoPersonAdd
              className={`text-center mt-1 ${isActive === "/operator/customer" ? "lg:text-white text-green" : "text-grayRounded"}`}
            />{" "}
            Customers
          </p>
        </NavLink>

        <NavLink
          to="/operator/settings"
          className={` w-full p-4 ${isActive === "/operator/settings" ? "lg:bg-green lg:text-white text-green " : " text-grayRounded"} hover:lg:bg-green  hover:lg:text-white`}
          onClick={() => handleOptionClick("/operator/settings")}
        >
          <p className="text-center flex justify-start px-5 py-3 gap-2">
            <IoSettings
              className={`text-center mt-1 ${isActive === "/operator/settings" ? "lg:text-white text-green" : "text-grayRounded"}`}
            />{" "}
            Settings
          </p>
        </NavLink>

        <button
          className={` w-full p-4 ${isActive === "/admin-login" ? " lg:bg-green lg:text-white text-green " : " text-grayRounded"} hover:lg:bg-green  hover:lg:text-white`}
          onClick={() => handleLogOut()}
          type="button"
        >
          <p className="text-center flex justify-start px-5 py-3 gap-2">
            <FaPowerOff
              className={`text-center mt-1 ${isActive === "/operator-login" ? "lg:text-white text-green" : "text-grayRounded"}`}
            />{" "}
            Logout
          </p>
        </button>
      </main>
    </>
  );
};

export default OperatorSidebar;
