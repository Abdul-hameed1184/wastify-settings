import { Link, useNavigate } from "react-router-dom"
import { RoundedLogo } from "./AlternateLogos"
import { IoHomeOutline, IoLogOutOutline } from "react-icons/io5";
import { BiSupport } from "react-icons/bi";
import { MdOutlinePayments } from "react-icons/md";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { FiMenu, FiX } from "react-icons/fi";
import { useState } from "react";
import { logout } from "../Features/authSlice";
import { TbReportSearch } from "react-icons/tb";

export const UsernavBar = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const navigate = useNavigate();
    
  const HandleLogOut = () => {
    const isLoggedOut = logout();
    
    if (isLoggedOut) {
      sessionStorage.removeItem('AUTH_USERDETAILS')
      sessionStorage.removeItem('SESSION_AUTH_TOKEN')
      navigate("/login");
    }
  };
    return (
              <nav className="p-4">
              <div className="max-w-6xl mx-auto flex justify-between items-center">
                {/* Logo */}
                <Link to="/" className="text-2xl font-bold">
                <RoundedLogo />
                </Link>
        
                {/* Desktop Menu */}
                <ul className="hidden md:flex space-x-6 font-medium">
                  <li><Link to="/wastebills" onClick={()=> setIsOpen(false)} className="hover:text-gray-300 cursor-pointer flex flex-col items-center gap-2">
                
               
                        <FaMoneyBillTrendUp />
                          <p className="text-sm font-Poppins font-medium not-italic  leading-6">
                            Waste bills
                          </p>

                  </Link></li>
                  <li><Link to="/payment-history" onClick={()=> setIsOpen(false)}  className="hover:text-gray-300 cursor-pointer flex flex-col items-center gap-2">
                
                        <MdOutlinePayments />
        
                          <p className="text-sm font-Poppins font-medium not-italic  leading-6">
                            Payment History
                          </p>

                  </Link></li>
                  <li><Link to="/view-history" className="hover:text-gray-300 cursor-pointer flex flex-col items-center gap-2">
                  
                        <IoHomeOutline />
                          <p className="text-sm font-Poppins font-medium not-italic  leading-6">
                            View property
                          </p>
                        </Link>
                      </li>
                  <li><Link to="/support"  className="hover:text-gray-300 cursor-pointer flex flex-col items-center gap-2 cursor-pointer">
                 
                        <BiSupport />
        
                          <p className="text-sm font-Poppins font-medium not-italic  leading-6">
                            Help & Support
                          </p>
                  </Link>
                  </li>
                  <li>
                  <Link to="/reports"  className="hover:text-gray-300 cursor-pointer flex flex-col items-center gap-2 cursor-pointer">
                 
                  <TbReportSearch />
 
                   <p className="text-sm font-Poppins font-medium not-italic  leading-6">
                     Reports
                   </p>
           </Link>
                  </li>
                  <li>
                  <div     className="hover:text-gray-300 cursor-pointer flex flex-col items-center gap-2">
                  
                        <button onClick={HandleLogOut}  className="flex flex-col bg-red items-center gap-2 w-full">
                        <IoLogOutOutline />
                          <p className="text-sm font-Poppins font-medium not-italic leading-6 text-center">
                            Log out
                          </p>
                        </button>
            
                  </div></li>
                </ul>
        
                {/* Mobile Menu Button */}
                <button
                  className="md:hidden  text-2xl"
                  onClick={() => setIsOpen(!isOpen)}
                >
                  {isOpen ? <FiX /> : <FiMenu />}
                </button>
              </div>
        
              {/* Mobile Menu */}
              {isOpen && (
                <ul className="md:hidden p-4 mt-2 space-y-4 text-center">
                  <li><Link to="/wastebills" onClick={()=> setIsOpen(false)} className="flex py-2 items-center hover:text-gray-300 cursor-pointer">
                  
                        <FaMoneyBillTrendUp className="flex-none mr-4"/>
                          <p className="text-sm font-Poppins font-medium not-italic  leading-6">
                            Waste bills
                          </p>
                    
            
                  </Link></li>
                  <li><Link to="/payment-history" onClick={()=> setIsOpen(false)} className="flex py-2 hover:text-gray-300 items-center cursor-pointer">
                
                        <MdOutlinePayments  className="flex-none mr-4" />
        
                          <p className="text-sm font-Poppins font-medium not-italic  leading-6">
                            Payment History
                          </p>
                        
                    
                  </Link></li>
                  <li><Link to="/view-history" onClick={()=> setIsOpen(false)} className="flex items-center py-2 hover:text-gray-300 cursor-pointer"> 
                    
                        <IoHomeOutline className="flex-none mr-4"  />
                          <p className="text-sm font-Poppins font-medium not-italic  leading-6">
                            View property
                          </p>
                    
                      </Link></li>
                  <li><Link to="/support" onClick={()=> setIsOpen(false)} className="flex items-center py-2 hover:text-gray-300 cursor-pointer">
                
                        <BiSupport className="flex-none mr-4"  />
        
                          <p className="text-sm font-Poppins font-medium not-italic  leading-6 ">
                            Help & Support
                          </p>
                    
                      
                  </Link></li>
                  <li>
                
                        <button onClick={HandleLogOut} className="flex  items-center  py-2 hover:text-gray-300  cursor-pointer">
                        <IoLogOutOutline className="flex-none mr-4" />
                          <p className="text-sm font-Poppins font-medium not-italic  leading-6 flex  item-center">
                            Log out
                          </p>
                        </button>
                      
                  </li>
                </ul>
              )}
            </nav>
    )
}