import React, { useState } from "react";
import {  useNavigate } from "react-router-dom";
import useLogout from "../../utils/useLogout";
import { customerDetails, updateCustomer } from "../../api/customer/customer.service";

import { toast } from "react-toastify";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { RecentActivities } from "../../Component/Card/RecentActivities";
import { ProfileCard } from "./ProfileCard";

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
        const data =   await customerDetails(user.customerId);
        console.log(data.data.data)
        return data.data.data;
      }
  })

      const imageUrl = !imgError
    ? customer?.imgUrl
    : "https://via.placeholder.com/120x120.png?text=No+Image";



const handleUpdate = async (data:FormData) => {
  try{
  console.log(data);
  console.log(customer.customerId);
  await updateCustomer(customer.customerId, data);

  toast.success("Profile Updated successfully")
  await queryClient.invalidateQueries({queryKey: ['profile']})
  }catch(e){
    console.log(e);
    toast.error("Error updating profile")
  }
  
  }
  return (
    <div className="flex md:flex-row flex-col ">
      <div className="border border-r-1 border-gray h-full flex-1">
      <ProfileCard />
      </div>
      <div className="md:flex-grow flex-1 ">
      {/* <RecentActivities /> */}
      </div>
    </div>
  );
};



export default Profile;
