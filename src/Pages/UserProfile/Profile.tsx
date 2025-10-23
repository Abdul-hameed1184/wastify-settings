import React, { useEffect, useState } from "react";
import { AiFillEdit } from "react-icons/ai";
import {  useNavigate } from "react-router-dom";
import useLogout from "../../utils/useLogout";
import { customerDashboard, updateCustomer } from "../../api/customer/customer.service";

import { ICustomerDashboard } from "../../models/customerdash.interface";
import { ProfileForm } from "../../Component/ProfileForm";
import { ICustomer } from "../../models/customer.interface";
import { Naira } from "../../utils/format";
import { Button } from "../../Component/Button";
import { ChangePasswordModal } from "../../Component/Modal/ChangePasswordModal";
import { toast } from "react-toastify";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const Profile: React.FC = () => {
    const customer:ICustomer = JSON.parse(sessionStorage.getItem("AUTH_USERDETAILS") || "{}");
  const [dashboard, setDashboard] = useState<ICustomerDashboard>({} as ICustomerDashboard);
  const [ showModalPassword, setShowModalPassword] = useState<boolean>(false)
  const navigate = useNavigate();
  const logout = useLogout();
  const queryClient = useQueryClient()

  const handleLogout = () => {
    const isLoggedOut = logout();
    if (isLoggedOut) {
      navigate("/login");
    }
  };

  const { data: customerProfile, isLoading } = useQuery({
      queryKey: ['profile'],
      queryFn: async () => {
        const data =   await customerDashboard(customer.customerId);
        return data.data.data;
      }
  })



const handleUpdate = async (data: {phone: string, lastname: string, firstname:string, email: string}) => {
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
const [ edit, setEdit ] = useState<boolean>(false);
  return (
    <main className="min-h-screen bg-green bg-no-repeat py-10 flex justify-center">
        <div className="flex flex-col items-center h-full bg-white shadow-md rounded-xl p-6 max-w-xl w-full m-4">
      {edit ? (
        <ProfileForm submitProfile={handleUpdate} user={customer} profileX={customerProfile} handleEdit={()=>setEdit(!edit)} />
      ) : (
        <div className="w-full m-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-2xl text-gray-400 font-semibold">User Profile</h2>
            <button
              onClick={()=>setEdit(!edit)}
              className="flex items-center gap-1 text-white bg-red-800 rounded-md px-4 py-2 hover:underline"
            >
              <AiFillEdit />
              <span>Edit</span>
            </button>
          </div>

          {/* User Info */}
          <div className="space-y-4">
       
            <ProfileItem label="Full Name" value={customerProfile?.customerFullname} />
            <ProfileItem label="Email" value={customer?.email || "—"} />
            <ProfileItem label="Phone" value={customer?.phone} />
            <ProfileItem label="Apartments" value={customerProfile?.totalApartment?.toString()||""} />
            <ProfileItem
              label="Role"
              value={customer.role === 1 ? "Operator" : "User"}
            />
            <ProfileItem label="Overdue Bill" value={Naira.format(parseFloat(customerProfile?.totalBills))} />
          </div>
          <div className="w-full mt-4">
            <Button onClick={()=>setShowModalPassword(!showModalPassword)} variant="primary" className="w-full">Change Password</Button>
          </div>
        </div>
      )}
    </div>
  
        <ChangePasswordModal isOpen={showModalPassword} customer={customer} onClose={()=>setShowModalPassword(!showModalPassword)} />

    </main>
  );
};

const ProfileItem: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="flex justify-between  pb-2 text-2xl items-center">
    <span className="text-gray font-semibold">{label}</span>
    <span className="text-gray-900">{value}</span>
  </div>
);

export default Profile;
