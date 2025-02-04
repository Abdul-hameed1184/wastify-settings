import React, { useEffect, useState } from "react";
import { Card } from "flowbite-react";
import { useSelector } from "react-redux";
import { selectUser } from "../../Features/authSlice"
import { RoundedLogo } from "../../Component/AlternateLogos";
import ProfileCard from "../../Component/Card/ProfileCard";
import ProfileSlider from "../../Component/Slider/ProfileSlider";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import baseURL from "../../utils/apiConfig";
import useLogout from "../../utils/useLogout";


const Profile = () => {
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const logout = useLogout();
  const [dash, setDash] = useState([]);
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

  const FetchDash = () => {
    axios
      .get(baseURL + "dashboard/customer/" + customer.id, {
        // Update to use customer ID
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem(
            "SESSION_AUTH_TOKEN"
          )}`, // Include the auth token in the header
        },
      })
      .then((res) => {
        const responseData = res.data?.data;
        setDash(responseData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    console.log(cust)
    console.log(customer);
    console.log(user)
    FetchDash();
  }, []);

  return (
    <main className="bg-green py-10 h-screen bg-no-repeat">
      <div className="py-2 px-6">
        <RoundedLogo />
      </div>
      <div className="md:flex md:items-center md:pt-40 md:pl-20">
        <div className="px-4 py-2">
          <ProfileCard dashBoard={dash} />
        </div>
        <div className="flex">
        <div className="px-4 py-2">
          <Card className="max-w-sm border-transparent">
            <div className="flex justify-around flex-wrap">
              <div className="w-[30%] cursor-pointer">
                <Link to="/wastebills">
                  <img
                    src="Images/wastebill.png"
                    alt=""
                    className="w-16 h-16"
                  />
                  <p className="text-xs font-Poppins font-medium not-italic text-green leading-6">
                    Waste bills
                  </p>
                </Link>
              </div>
              <div className="w-[30%] cursor-pointer">
                <Link to="/payment-history">
                  <img
                    src="Images/paymenthistory.png"
                    alt=""
                    className="w-16 h-16"
                  />
                  <p className="text-xs font-Poppins font-medium not-italic text-gray leading-6">
                    Payment History
                  </p>
                </Link>
              </div>
              <div className="w-[30%] cursor-pointer">
                <Link to="/view-history">
                  <img src="Images/property.png" alt="" className="w-20 h-16" />
                  <p className="text-xs font-Poppins font-medium not-italic text-gray leading-6">
                    View property
                  </p>
                </Link>
              </div>
              <div className="mt-5 cursor-pointer">
                <Link to="/support">
                  <img src="Images/support.png" alt="" className="w-16 h-16" />
                  <p className="text-xs font-Poppins font-medium not-italic text-support leading-6">
                    Help & Support
                  </p>
                </Link>
              </div>
              <div className="mt-5 cursor-pointer">
                <button onClick={HandleLogOut}>
                  <img src="Images/logout.png" alt="" className="w-16 h-16" />
                  <p className="text-xs font-Poppins font-medium not-italic text-error leading-6 text-center">
                    Log out
                  </p>
                </button>
              </div>
            </div>
          </Card>
        </div>
        <div className="px-4 py-2">
          <ProfileSlider />
        </div>
        </div>
      </div>
    </main>
  );
};

export default Profile;
