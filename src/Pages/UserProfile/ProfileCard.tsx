import { useQuery, useQueryClient } from "@tanstack/react-query";
import { customerDetails, updateCustomer } from "../../api/customer/customer.service";
import { CiUser } from "react-icons/ci";
import { AiOutlineMail } from "react-icons/ai";
import { IoIosPhonePortrait } from "react-icons/io";
import { LuUsers } from "react-icons/lu";
import ImageWithFallback from "../../Component/ImageWithFallBack";
import * as Yup from "yup";

import { Naira } from "../../utils/format";
import { Modal } from "../../Component/Modal/Modal";
import { useState, useRef } from "react";
import { Button } from "../../Component/Button";
import Input from "../../Component/InputField";
import { useFormik } from "formik";
import { IoCameraOutline } from "react-icons/io5";
import Loader from "../../Component/Loader";
import { toast } from "react-toastify";
import RoleBadge from "../../utils/RoleBadge";

export const ProfileCard = () => {
  const user = JSON.parse(sessionStorage.getItem("AUTH_USERDETAILS") || "{}");
  const apartments = JSON.parse(sessionStorage.getItem("CUSTOMER_APARTMENT") || "{}");
  const [closeEditModal, setCloseEditModal] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();

  const { data: customer, isLoading } = useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const data = await customerDetails(user.customerId);
      return data.data.data;
    }
  })

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      firstname: customer?.firstname || "",
      lastname: customer?.lastname || "",
      email: customer?.email || "",
      phone: customer?.phone || "",
      imgUrl: null as File | null,
    },
    validationSchema: Yup.object({
      firstname: Yup.string().required("First name is required"),
      lastname: Yup.string().required("Last name is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      phone: Yup.string().required("Phone number is required"),
    }),
    onSubmit: async (values) => {
      try {
        const formData = new FormData();
        formData.append("firstname", values.firstname);
        formData.append("lastname", values.lastname);
        formData.append("email", values.email);
        formData.append("phone", values.phone);
        formData.append("_method", "PUT");

        if (values.imgUrl instanceof File) {
          formData.append("imgUrl", values.imgUrl);
        }

        await updateCustomer(customer.customerId, formData);
        toast.success("Profile updated successfully");
        queryClient.invalidateQueries({ queryKey: ['profile'] });
        setCloseEditModal(false);
        setPreviewUrl(null);
      } catch (e) {
        toast.error("Error updating profile");
        console.error(e);
      }
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      formik.setFieldValue("imgUrl", file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };


  if (isLoading) {
    return <div className="p-4 w-full"><Loader /></div>
  }
  return (

    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 w-full h-full flex flex-col">
      <div className="flex gap-4 flex-row justify-between items-center mb-6 border-b border-gray-100 pb-4">
        <span className="text-xl font-bold text-gray-800">Profile</span>
        <button onClick={() => setCloseEditModal(true)} className="shadow-sm px-4 py-2 rounded-xl border border-primary text-primary hover:bg-primary/5 transition-colors font-medium text-sm">
          Edit Profile
        </button>
      </div>
      <div className="flex-1">

        {customer && <div className="flex flex-col gap-5 mb-8">
          <div className="mb-4 flex justify-center">
            <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-gray-50 shadow-sm flex items-center justify-center">
              <ImageWithFallback src={customer.imgUrl} alt="Customer" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-gray-500 text-sm mb-1 flex flex-row items-center gap-2"><CiUser /> <span>Full name</span></span>
            <span className="font-semibold text-gray-800 text-lg">{customer.firstname}  {customer.lastname}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-gray-500 text-sm mb-1 flex flex-row items-center gap-2"><AiOutlineMail />  <span>Email</span></span>
            <span className="font-semibold text-gray-800">{customer.email}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-gray-500 text-sm mb-1 flex flex-row items-center gap-2"><IoIosPhonePortrait /> <span>Phone</span></span>
            <span className="font-semibold text-gray-800">{customer.phone}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-gray-500 text-sm mb-1 flex flex-row items-center gap-2"><LuUsers /><span>Role</span></span>
            <span className="font-semibold"><RoleBadge role={customer.role} /></span>
          </div>



        </div>}
        <Modal size="lg" position="top-right" isOpen={closeEditModal} onClose={() => setCloseEditModal(false)} title="Edit Profile"
          footer={
            <div className=" py-4">
              <Button type="button" className="w-full" onClick={formik.handleSubmit}>Update</Button>
            </div>
          }
        >
          <div>
            <form onSubmit={formik.handleSubmit}>
              <div className="relative w-24 h-24 mx-auto mb-6">
                {/* Image container */}
                <div className="flex justify-center items-center border border-gray-300 rounded-full w-24 h-24 overflow-hidden shadow-sm">
                  <img
                    src={previewUrl || customer?.imgUrl || "https://via.placeholder.com/150"}
                    alt="Profile Image"
                    className="object-cover w-full h-full"
                  />
                </div>

                {/* Camera icon overlay */}
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute bottom-0 right-0 bg-primary hover:bg-primary/90 text-white p-2 rounded-full shadow-md transition-colors"
                >
                  <IoCameraOutline className="w-5 h-5" />
                </button>

                {/* Hidden file input */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </div>

              <Input icon={<CiUser />} iconPosition="left" type="text" label="First Name" id="firstname" name="firstname" value={formik.values.firstname} onChange={formik.handleChange} onBlur={formik.handleBlur} error={typeof formik.errors.firstname === 'string' ? formik.errors.firstname : undefined} />

              <Input icon={<CiUser />} iconPosition="left" type="text" label="Last Name" id="lastname" name="lastname" value={formik.values.lastname} onChange={formik.handleChange} onBlur={formik.handleBlur} error={typeof formik.errors.lastname === 'string' ? formik.errors.lastname : undefined} />


              <Input icon={<AiOutlineMail />} iconPosition="left" type="email" label="Email" id="email" name="email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} error={typeof formik.errors.email === 'string' ? formik.errors.email : undefined} />


              <Input icon={<IoIosPhonePortrait />} iconPosition="left" type="text" label="Phone" id="phone" name="phone" value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur} error={typeof formik.errors.phone === 'string' ? formik.errors.phone : undefined} />






            </form>
          </div>
        </Modal>
      </div>
      <div className="flex flex-col gap-4 mt-auto">
        <div className="bg-gray-50/50 p-4 border border-gray-100 shadow-sm rounded-2xl flex flex-col justify-center transition-colors hover:bg-gray-50">
          <h3 className="text-gray-500 text-sm font-medium tracking-wide uppercase">Total Overdue Bill</h3>
          {customer && <h2 className="text-2xl font-bold text-error mt-1">{Naira.format(customer.totalOverdueBill)}</h2>}
        </div>
        <div className="bg-gray-50/50 p-4 border border-gray-100 shadow-sm rounded-2xl flex flex-col justify-center transition-colors hover:bg-gray-50">
          <h3 className="text-gray-500 text-sm font-medium tracking-wide uppercase">Total Apartment</h3>
          {apartments && <h2 className="text-2xl font-bold text-primary mt-1">{apartments.length}</h2>}
        </div>
      </div>
    </div>

  )
}