import React, { useState } from "react";
import { AiFillEdit } from "react-icons/ai";
import {  useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useLogout from "../../../utils/useLogout";
import { customerDetails, updateCustomer } from "../../../api/customer/customer.service";
import { Button } from "../../../Component/Button";
import { ProfileForm } from "../../../Component/ProfileForm";
import { ChangePasswordModal } from "../../../Component/Modal/ChangePasswordModal";
import { Naira } from "../../../utils/format";
import { getProfile, updateProfile } from "../../../api/psp-operator/psp-operator.service";
import { OperatorProfileForm } from "../../../Component/OperatorProfileForm";
import { OperatorChangePasswordModal } from "../../../Component/Modal/OperatorChangePasswordModal";

const AppSettings: React.FC = () => {
  const operator = JSON.parse(sessionStorage.getItem("AUTH_ADMIN_DETAILS")||"");
    console.log(operator)
  const [ showModalPassword, setShowModalPassword] = useState<boolean>(false);
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
        const data =   await getProfile(operator.userId);
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
  console.log(operator.userId);
  await updateProfile(operator.userId, data);

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
        <OperatorProfileForm submitProfile={handleUpdate} user={customer}  handleEdit={()=>setEdit(!edit)} />
      ) : (
        <div className="w-full m-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-2xl text-gray-400 font-semibold">Operator Profile</h2>
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
<div className="flex flex-col items-center mb-6">
          <div className="relative w-28 h-28 mb-3">
            <img
              src={imageUrl}
              alt="Not Found"
              onError={() => setImgError(true)}
              className="w-28 h-28 rounded-full object-cover border-4 border-gray-200 shadow-sm"
            />
          </div>
          <h2 className="text-xl font-semibold text-gray-800">
            {customer && <>{customer?.businessName}</>}
          </h2>
          <p className="text-gray-500">{customer?.email}</p>
        </div>
            <ProfileItem label="Phone" value={customer?.phone} />
            <ProfileItem
              label="Role"
              value={customer?.role === 1 ? "User" : "Operator"}
            />
            {/* <ProfileItem label="Overdue Bill" value={Naira.format(parseFloat(customer?.totalOverdueBill))} /> */}
          </div>
          <div className="w-full mt-4">
            <Button onClick={()=>setShowModalPassword(!showModalPassword)} variant="primary" className="w-full">Change Password</Button>
          </div>
        </div>
      )}
    </div>
  
       <OperatorChangePasswordModal isOpen={showModalPassword} customer={customer} onClose={()=>setShowModalPassword(!showModalPassword)} /> 

    </main>
  );
};

const ProfileItem: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="flex justify-between  pb-2 text-2xl items-center">
    <span className="text-gray font-semibold">{label}</span>
    <span className="text-gray-900">{value}</span>
  </div>
);

export default AppSettings;
