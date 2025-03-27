import React, { useEffect, useState } from "react";
import { Card } from "flowbite-react";
import { useSelector } from "react-redux";
import { selectUser } from "../../Features/authSlice"
import { RoundedLogo } from "../../Component/AlternateLogos";
import ProfileCard from "../../Component/Card/ProfileCard";
import ProfileSlider from "../../Component/Slider/ProfileSlider";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useLogout from "../../utils/useLogout";
import { customerDashboard } from "../../api/customer/customer.service";
import { IoHomeOutline, IoLogOutOutline } from "react-icons/io5";
import { BiSupport } from "react-icons/bi";
import { MdOutlinePayments } from "react-icons/md";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { ICustomerDashboard } from "../../models/customerdash.interface";
import { FiMenu, FiX } from "react-icons/fi";
import { UsernavBar } from "../../Component/UsernavBar";


const Profile:React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const logout = useLogout();
  const [dash, setDash] = useState<ICustomerDashboard>({} as ICustomerDashboard); 
  const location = useLocation();
  const cust = location.state;

  const HandleLogOut = () => {
    const isLoggedOut = logout();

    if (isLoggedOut) {
      navigate("/login");
    }
  };

        const customer = JSON.parse(sessionStorage.getItem("AUTH_USERDETAILS")||"");
      console.log("customer", customer);



  useEffect(() => {
 (async () => {
      const data = await customerDashboard(customer.customerId);
      setDash(data.data.data);
    })()
  }, []);

  return (
    <main className="bg-green py-10 h-screen bg-no-repeat">  
  
      <div className="flex md:items-center">
   
          <ProfileCard dashBoard={dash} />

        <div className="flex flex-col flex-1 max-w items-center justify-center">

        <div className="px-4 py-2">
          <ProfileSlider />
        </div>
        </div>
      </div>
    </main>
  );
};

export default Profile;
