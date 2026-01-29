import { useQuery } from "@tanstack/react-query";
import { customerDetails } from "../../api/customer/customer.service";
import { CiUser } from "react-icons/ci";
import { AiOutlineMail } from "react-icons/ai";
import { IoIosPhonePortrait } from "react-icons/io";
import { LuUsers } from "react-icons/lu";
import ImageWithFallback from "../../Component/ImageWithFallBack";
import * as Yup from "yup";

import { Naira } from "../../utils/format";
import { Modal } from "../../Component/Modal/Modal";
import { useState } from "react";
import { Button } from "../../Component/Button";
import Input from "../../Component/InputField";
import { useFormik } from "formik";
import { IoCameraOutline } from "react-icons/io5";

export const ProfileCard = () => {
        const user = JSON.parse(sessionStorage.getItem("AUTH_USERDETAILS") || "{}");
        const apartments = JSON.parse(sessionStorage.getItem("CUSTOMER_APARTMENT") || "{}");
        const [closeEditModal, setCloseEditModal] = useState(false);
      const { data: customer } = useQuery({
      queryKey: ['profile'],
      queryFn: async () => {
        console.log(user)
        const data =   await customerDetails(user.customerId);
        console.log(data.data.data)
        return data.data.data;
      }
  })

  const formik = useFormik({
    initialValues: {
      firstname: customer?.firstname,
      lastname: customer?.lastname,
      email: customer?.email,
      phone: customer?.phone,
      imgUrl: customer?.imgUrl,
    },
    validationSchema: Yup.object({
      firstname: Yup.string().required("First name is required"),
      lastname: Yup.string().required("Last name is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      phone: Yup.string().required("Phone number is required"),
      imgUrl: Yup.string().required("Image URL is required"),
    }),
    onSubmit: (values) => {
      console.log(values);
    },
  });
    return (
        
        <div className="p-4 w-full">
            <h3 className="flex gap-4 flex-row justify-between"><span className="text-2xl font-semibold">Profile</span>
            <button onClick={() => setCloseEditModal(true)} className="shadow-md p-2 rounded-md border border-1 border-primary">Edit Profile</button></h3>
        <div>

           {customer && <div className="flex flex-col gap-4 mb-8">
                        <div className="mb-4">
              <ImageWithFallback src={customer.imgUrl} alt="Customer"/>
            </div>
    <div className="flex flex-col">
      <span className="text-gray-500 flex flex-row items-center gap-2"><CiUser /> <span>Full name</span></span>
      <span className="font-semibold">{customer.firstname}  {customer.lastname}</span>
    </div>
        <div className="flex flex-col">
      <span className="text-gray-500  flex flex-row items-center gap-2"><AiOutlineMail />  <span>Email</span></span>
      <span className="font-semibold">{customer.email}</span>
    </div>
            <div className="flex flex-col">
      <span className="text-gray-500  flex flex-row items-center gap-2"><IoIosPhonePortrait /> <span>Phone</span></span>
      <span className="font-semibold">{customer.phone}</span>
    </div>
            <div className="flex flex-col">
      <span className="text-gray-500  flex flex-row items-center gap-2"><LuUsers /><span>Role</span></span>
      <span className="font-semibold">{customer.role || "Customer"}</span>
    </div>

        
                
                </div> }
                <Modal size="lg" position="top-right" isOpen={closeEditModal} onClose={() => setCloseEditModal(false)} title="Edit Profile"
                  footer={
                    <div className=" py-4">
                    <Button type="submit" className="w-full">Update</Button>
                  </div>
                  }
                  >
                  <div>
                    <form>
             <div className="relative w-16 h-16 rounded-md mb-4">
  {/* Image container */}
  <div className="flex justify-center items-center border border-gray-300 rounded-md w-16 h-16 overflow-hidden">
    <img
      src={formik.values.imgUrl}
      alt="Profile Image"
      className="object-cover w-full h-full"
    />
  </div>

  {/* Camera icon overlay */}
  <button
    type="button"
    className="absolute bottom-0 right-0 bg-black/60 hover:bg-black/80 text-white rounded-md"
  >
    <IoCameraOutline className="w-16 h-16 rounded-md"/>
  </button>

  {/* Hidden file input */}
  <input
    id="imageUpload"
    type="file"
    accept="image/*"
    className="hidden"
    onChange={(e) => {
      const file = e.target.files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = () => {
        formik.setFieldValue("imgUrl", reader.result);
      };
      reader.readAsDataURL(file);
    }}
  />
</div>
                  
                        <Input icon={<CiUser />} iconPosition="left" type="text" label="First Name" id="firstname" name="firstname" value={formik.values.firstname} onChange={formik.handleChange} />
                      
                        <Input icon={<CiUser />} iconPosition="left" type="text" label="Last Name" id="lastname" name="lastname" value={formik.values.lastname} onChange={formik.handleChange} />
                      
                      
                        <Input icon={<AiOutlineMail />} iconPosition="left" type="email" label="Email" id="email" name="email" value={formik.values.email} onChange={formik.handleChange} />
                      
                      
                        <Input icon={<IoIosPhonePortrait />} iconPosition="left" type="text" label="Phone" id="phone" name="phone" value={formik.values.phone} onChange={formik.handleChange} />
                      
                      
                                
                      

                    </form>
                  </div>
                </Modal>
                    </div>
                    <div className="mb-2 py-4 px-2 shadow-md rounded-md leading-loose p-2">
                      <h3 className="text-gray-500 tracking-tight">Total Overdue Bill</h3>
                     {customer && <h2 className="text-2xl font-semibold">{Naira.format(customer.totalOverdueBill)}</h2>}
                    </div>
                      <div className="mb-2 py-4 px-2 shadow-md rounded-md leading-loose p-2">
                      <h3 className="text-gray-500 tracking-tight">Total Apartment</h3>
                      {apartments &&<h2 className="text-2xl font-semibold">{apartments.length}</h2>}
                    </div>
        </div>

    )
}