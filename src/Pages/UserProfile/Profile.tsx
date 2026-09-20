import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useLogout from "../../utils/useLogout";
import { customerDetails, updateCustomer } from "../../api/customer/customer.service";

import { toast } from "react-toastify";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { RecentActivities } from "../../Component/Card/RecentActivities";
import { ProfileCard } from "./ProfileCard";
import Loader from "../../Component/Loader";

const Profile: React.FC = () => {
  const user = JSON.parse(sessionStorage.getItem("AUTH_USERDETAILS") || "{}");
  const [imgError, setImgError] = useState(false);
  const navigate = useNavigate();
  const logout = useLogout();
  const queryClient = useQueryClient()

  const handleLogout = () => {
    const isLoggedOut = logout();
    if (isLoggedOut) {
      navigate("/login");
    }
  };


  const { data: customer, isLoading } = useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const data = await customerDetails(user.customerId);
      console.log(data.data.data)
      return data.data.data;
    }
  })

  const imageUrl = !imgError
    ? customer?.imgUrl
    : "https://via.placeholder.com/120x120.png?text=No+Image";



  const handleUpdate = async (data: FormData) => {
    try {
      console.log(data);
      console.log(customer.customerId);
      await updateCustomer(customer.customerId, data);

      toast.success("Profile Updated successfully")
      await queryClient.invalidateQueries({ queryKey: ['profile'] })
    } catch (e) {
      console.log(e);
      toast.error("Error updating profile")
    }

  }

  if (isLoading) {
    return <div className="p-4 w-full"><Loader /></div>
  }
  return (
    <div className="flex flex-col md:flex-row gap-6 p-4 md:p-6 bg-gray-50/30 min-h-screen">
      <div className="w-full md:w-[320px] lg:w-[360px] shrink-0">
        <ProfileCard />
      </div>
      <div className="flex-1 min-w-0">
        <RecentActivities />
      </div>
    </div>
  );
};



export default Profile;
