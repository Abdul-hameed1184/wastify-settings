import React, { useEffect, useState } from "react";

import {  useNavigate } from "react-router-dom";
import useLogout from "../../utils/useLogout";
import { customerDashboard } from "../../api/customer/customer.service";

import ProfileCard from "../../Component/Card/ProfileCard";
import ProfileSlider from "../../Component/Slider/ProfileSlider";

import { ICustomerDashboard } from "../../models/customerdash.interface";

const Dashboard: React.FC = () => {
  const [dashboard, setDashboard] = useState<ICustomerDashboard>({} as ICustomerDashboard);
  const navigate = useNavigate();
  const logout = useLogout();


  const handleLogout = () => {
    const isLoggedOut = logout();
    if (isLoggedOut) {
      navigate("/login");
    }
  };

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const stored = sessionStorage.getItem("AUTH_USERDETAILS");
        if (!stored) throw new Error("User session not found");

        const customer = JSON.parse(stored);
        if (!customer?.customerId) throw new Error("Invalid customer data");

        const response = await customerDashboard(customer.customerId);
        setDashboard(response.data.data);
      } catch (error) {
        console.error("Failed to fetch dashboard:", error);
        handleLogout(); // Optionally redirect on invalid session
      }
    };

    fetchDashboard();
  }, []);

  return (
    <main className="min-h-screen bg-green bg-no-repeat py-10">
      <div className="flex flex-col md:flex-row items-center justify-center gap-8 px-4">
        <ProfileCard dashBoard={dashboard} />

        <div className="flex-1 w-full max-w-4xl">
          <div className="p-4">
            <ProfileSlider />
          </div>
        </div>
      </div>
    </main>
  );
};



export default Dashboard;
