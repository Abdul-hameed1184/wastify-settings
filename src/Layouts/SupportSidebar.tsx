import React, { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { RiDashboardFill } from "react-icons/ri";
import { FaPowerOff } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import useLogout from "../utils/useLogout";
import { toggleSidebar } from "../Features/adminSidebarSlice";
import { useQuery } from "@tanstack/react-query";

const SupportSidebar: React.FC = () => {
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


  const routeDetails = [
    { 
      path: "/support/",
      icon: <RiDashboardFill className={` text-center mt-1 ${isActive === "/operator/" ? "lg:text-white text-green" : "text-grayRounded"}`}/>,
      name: "Dashboard"
    },
        { 
      path: "/support/tickets",
      icon: <RiDashboardFill className={` text-center mt-1 ${isActive === "/operator/ticket" ? "lg:text-white text-green" : "text-grayRounded"}`}/>,
      name: "Ticket"
    }
  ]

  const handleOptionClick = (option) => {
    setIsActive(option);

    // if (windowWidth < 1010) {

    dispatch(toggleSidebar());
    // }
  };
  const handleLogOut = () => {
    const isLoggedOut = logout();

    if (isLoggedOut) {
      navigate("/support-login");
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
        className={`admin-sidebar fixed transform ease-in-out duration-500 delay-300 ${toggle ? "translate-x-0" : "-translate-x-full"} w-4/5 lg:w-1/5 py-10 mt-10 h-screen lg:flex flex-col bg-white shadow-2xl font-Poppins z-20 overflow-auto`}
      >
     
        {
          
        routeDetails && routeDetails.map((x, index) => 
        <NavLink
          key={index}
          to={x.path}
          className={` w-full p-4 ${isActive === x.path ? "lg:bg-green lg:text-white text-green" : " text-grayRounded"} hover:lg:bg-green  hover:lg:text-white`}
          onClick={() => handleOptionClick("/support")}
        >
          <p className="text-center flex justify-start px-5 py-3 gap-2">
            {x.icon}{" "}
            {x.name}
          </p>
        </NavLink>)

}


      

        <button
          className={` w-full p-4 ${isActive === "/support-login" ? " lg:bg-green lg:text-white text-green " : " text-grayRounded"} hover:lg:bg-red-900  hover:lg:text-white`}
          onClick={() => handleLogOut()}
          type="button"
        >
          <p className="text-center flex justify-start px-5 py-3 gap-2">
            <FaPowerOff
              className={`text-center mt-1 ${isActive === "/support-login" ? "lg:text-white text-green" : "text-grayRounded"}`}
            />{" "}
            Logout
          </p>
        </button>

      </main>
    </>
  );
};

export default SupportSidebar;
