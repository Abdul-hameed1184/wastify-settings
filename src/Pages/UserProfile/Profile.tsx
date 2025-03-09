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


const Profile:React.FC = () => {
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
      <div className="py-2 px-6 flex items-center gap-2">
        <RoundedLogo />
        <div className="border-transparent flex-1 pl-8">
            <div className="flex justify-between items-center flex-wrap">
              <div className="cursor-pointer">
                <Link to="/wastebills" className="flex flex-col items-center gap-2">
                <FaMoneyBillTrendUp />
                  <p className="text-xs font-Poppins font-medium not-italic text-white leading-6">
                    Waste bills
                  </p>
                </Link>
              </div>
              <div className="cursor-pointer">
                <Link to="/payment-history"  className="flex flex-col items-center gap-2">
                <MdOutlinePayments />

                  <p className="text-xs font-Poppins font-medium not-italic text-white leading-6">
                    Payment History
                  </p>
                </Link>
              </div>
              <div className="cursor-pointer">
                <Link to="/view-history"  className="flex flex-col items-center gap-2">
                <IoHomeOutline />
                  <p className="text-xs font-Poppins font-medium not-italic text-white leading-6">
                    View property
                  </p>
                </Link>
              </div>
              <div className="cursor-pointer">
                <Link to="/support"  className="flex flex-col items-center gap-2">
                <BiSupport />

                  <p className="text-xs font-Poppins font-medium not-italic text-white leading-6">
                    Help & Support
                  </p>
                </Link>
              </div>
              <div className="cursor-pointer">
                <button onClick={HandleLogOut}  className="flex flex-col items-center gap-2">
                <IoLogOutOutline />
                  <p className="text-xs font-Poppins font-medium not-italic text-error leading-6 text-center">
                    Log out
                  </p>
                </button>
              </div>
            </div>
          </div>
      </div>
      
                

      
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
