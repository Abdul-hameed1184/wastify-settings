import React, { ReactNode, useEffect, useState } from 'react'
import AdminNavbar from './OperatorNavbar'
import AdminSidebar from './OperatorSidebar'
import { Zoom } from 'react-toastify';
import SuperAdminNavbar from './SuperAdminNavbar';
import SuperAdminSidebar from './SuperAdminSidebar';
import { FaCircleUser, FaMoneyBill, FaToggleOff } from 'react-icons/fa6';
import { HiX, HiMenuAlt3 } from 'react-icons/hi';
import { useNavigate, useLocation, Link, Outlet } from 'react-router-dom';
import { LogoWithText } from '../Component/Logo';
import { logout } from '../Features/authSlice';
import { GiSettingsKnobs } from 'react-icons/gi';
import { IoWalletOutline, IoPeople } from 'react-icons/io5';
import { MdOutlineHeadsetMic } from 'react-icons/md';
import { PiBuildingsBold } from 'react-icons/pi';
import { TfiDashboard } from 'react-icons/tfi';




// const AdminLayout:React.FC = () => {

//     useEffect(() => {
//         console.log('AdminLayout')
//     })
//     return (
//         <div>
//             <SuperAdminNavbar />
//             {/* <ToastContainer 
//        position="top-center"
//        autoClose={3000}
//         hideProgressBar={true}
//        newestOnTop={false}
//        closeOnClick
//        rtl={false}
//        pauseOnFocusLoss
//        draggable
//        pauseOnHover
//        theme="light"
//        transition={Zoom}
//       /> */}
//             <div className="flex">
            
//                     <SuperAdminSidebar />
 
//                 <div className="w-full flex-1 lg:w-4/5 mt-28 lg:mx-10">
//                     <main>{children}</main>
//                 </div>
//             </div>

//         </div>
//     )
// }

const navLinks = [
  { to: "/dashboard", label: "Dashboard", icon: <TfiDashboard /> },
//   { to: "/revenue", label: "Revenue", icon: <FaMoneyBill /> },
  { to: "/properties", label: "Properties", icon: <PiBuildingsBold /> },
//   { to: "/transactions", label: "Transactions", icon: <IoWalletOutline /> },
// { to: "/complaint", label: "Complaints", icon: <MdOutlineHeadsetMic /> },
  { to: "/operators", label: "Operators", icon: <IoPeople /> },
    { to: "/customers", label: "Customers", icon: <IoPeople /> },
// { to: "/settings", label: "Settings", icon: <GiSettingsKnobs /> }
];

const AdminLayout:React.FC = () => {
  const [open, setOpen] = useState(false);
    const navigate =   useNavigate();
    const location = useLocation();

    const handleLogout = () => {
      logout();
      sessionStorage.clear();
      navigate("/login");
    };

    const labels =  [
      { to: "/dashboard", label: "Dashboard Overview" },
    //   { to: "/revenue", label: "Revenue Update " },
     { to: "/properties", label: "Properties" },
    //   { to: "/transactions", label: "Transactions" },
    //   { to: "/complaint", label: "Complaints" },
     { to: "/operators", label: "Operators" },
    //   { to: "/settings", label: "Settings" }
    ]

    const activeLink = labels.find((link) => location.pathname.includes(link.to));
    const pageTitle = activeLink ? activeLink.label : "Account Overview";

    return (
        <>
        


      <div className="min-h-screen bg-lightGreen flex flex-col">
        {/* ===== Header ===== */}
        <header className="flex items-center  justify-between p-2 bg-lightGreen md:px-6">
          <Link to="/">
            <LogoWithText />
          </Link>

          <span className="font-medium text-2xl">
            {pageTitle}
          </span>

          <span className='hidden md:block '><FaCircleUser className='text-2xl text-gray-500'/></span>

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
                  const isActive = location.pathname === "/admin"+link.to;

                  return (
                    <li key={link.to} className=''>
                      <Link
                        to={"/admin"+link.to}
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


export default AdminLayout