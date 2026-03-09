import React,{ useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import {  useFormik } from "formik";
import { toast } from "react-toastify";
import axios from "axios";
import Input from "../../../Component/InputField";

import baseURL from "../../../utils/apiConfig";
import { Button } from "../../../Component/Button";
import { BsBarChartLine } from "react-icons/bs";
import { IoMdKeypad } from "react-icons/io";
import { MdOutlineShield } from "react-icons/md";
import { Logo } from "../../../Component/Logo";
import { PiUser } from "react-icons/pi";
import BgWasteOperator from "../../../assets/images/bg-waste-operator.png";
import { SendEmailResetLink } from "./SendEmailResetLink";

type Err  = {
  email:string;
  password: string;
}
const validate = (values: {email: string, password: string}) => {
  const errors= {} as Err;

  if (!values.email) {
    errors.email = "Email is Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  if (!values.password) {
    errors.password = "Password is Required";
  } else if (values.password.length < 8) {
    errors.password = "Password name must be greater than 8 characters";
  }

  return errors;
};

const OperatorLogin:React.FC = () => {
  const navigate = useNavigate();
  const [istoggle, setIstoggle] = useState(false);
  const [loading, SetLoading] = useState(false);
  const [openResetModal, setOpenResetModal] = useState(false);

  const toggle = () => {
    setIstoggle((prev) => !prev);
  };



  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate,
    onSubmit: (values) => {
      SetLoading(true);
      axios
        .post(baseURL + "/auth/login/admin-psp-operator", values, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => {

          const errorState = res.data?.errorState;
          const message = res?.data?.message;
          const pspOperatorData = res.data?.data?.PspOperatorData?.[0]; // Access the first object in the array
 
          if (pspOperatorData && !errorState) {
            // Ensure pspOperatorData exists and errorState is false
            const {
              id,
              businessName,
              email,
              phone,
              stateId,
              stateName,
              lgaId,
              lgaName,
              wardId,
              wardName,
              created_at,
              updated_at,
              userId,
            } = pspOperatorData;

            const user = {
              id,
              businessName,
              email,
              phone,
              stateId,
              stateName,
              lgaId,
              lgaName,
              wardId,
              wardName,
              created_at,
              updated_at,
              userId,
            };

            const token = res.data?.data?.authorisation?.token;
            sessionStorage.setItem("SESSION_AUTH_TOKEN", token);
            sessionStorage.setItem("AUTH_ADMIN_DETAILS", JSON.stringify(user));

            // toast.success(message, { autoClose: 3000 });

          if(pspOperatorData)
            setTimeout(() => {
              SetLoading(false);
              navigate("/operator");
            }, 2000);
          } else {
            toast.error(message, { autoClose: 5000 });
          }
        })
        .catch((err) => {
          console.log(err);
          SetLoading(false);
          const message = err.response?.data?.message;
          toast.error(message, { autoClose: 7000 });
        });
    },
  });

  return (
    <div className="md:p-4 p-0 h-screen ">

        <main className="  md:bg-white p-0 md:p-4 md:flex  md:flex-row h-screen">



    {/* Overlay */}
<div className="relative flex bg-white overflow-hidden rounded-none md:rounded-xl h-screen md:h-auto md:flex-1">
  
  {/* Image */}
  <div className="absolute inset-0 z-0">
    <img
      src={BgWasteOperator}
      alt="Background Waste Login"
      className="w-full h-full object-cover"
    />
  </div>

  {/* Bottom Overlay (desktop only) */}
  <div className="hidden md:block absolute bottom-0 left-0 right-0 p-6 m-4 z-10">
    <div className="bg-white rounded-xl p-6">
      <h3 className="text-black text-2xl font-semibold mb-2">
        From Chaos to Coordination.
      </h3>

      <p className="text-gray-500 text-lg mb-4">
        Waste management simplified by replacing cash, paper, and guesswork with digital payments, clear records, and reliable communication.
      </p>

      <div className="flex gap-6">
        <div className="flex items-center gap-2 shadow-lg p-2 rounded-xl">
          <BsBarChartLine className="text-green text-lg" />
          <span className="text-black">Smart Tracking</span>
        </div>

        <div className="flex items-center gap-2 shadow-lg p-2 rounded-xl">
          <MdOutlineShield className="text-green text-lg" />
          <span className="text-black">Secure Data</span>
        </div>
      </div>
    </div>
  </div>
</div>
 

      <div className="absolute md:relative bottom-0 left-0 right-0 md:flex-1 flex  md:justify-center md:items-center p-4  bg-white rounded-xl  m-4 md:m-0">

          <div className="mt-2 w-full max-w-md">
            <form onSubmit={formik.handleSubmit} className="text-left">
          
            
                <Logo className="m-0"/>
           
                  <h3 className="text-black text-2xl">Log in as Operator</h3>
                  <p className="text-gray-500 ">Please enter your details to sign in</p>
              <div className="mt-4">
                <label className="text-black font-semibold mb-2 block" htmlFor="email">Email Address</label>
                <Input
                  id="email"
                  icon={<PiUser />}
                  placeholder={"Email"}
                  type={"email"}
                  name={"email"}
                  onChange={formik.handleChange}
                  value={formik.values.email}
                />

                {formik.errors.password ? (
                  <p className="text-red-900 text-sm">*{formik.errors.password}</p>
                ) : null}
              </div>
              <div className="mt-4 relative">
                <label className="text-black font-semibold mb-2 block" htmlFor="password">Password</label>
                <Input
                  id="password"
                  icon={<IoMdKeypad />}
                  iconPosition="left"
                  placeholder={"Password"}
                  type={istoggle ? "text" : "password"}
                  name={"password"}
                  onChange={formik.handleChange}
                  value={formik.values.password}
                />
                <button
                  className="absolute top-12 right-6"
                  onClick={toggle}
                  type="button"
                >
                  {istoggle ? <FaEye /> : <FaEyeSlash />}
                </button>
                {formik.errors.password ? (
                  <p className="text-red-900 text-sm">*{formik.errors.password}</p>
                ) : null}
              </div>
                  <div className="flex justify-end  mt-4">
              <button
         
                onClick={()=>setOpenResetModal(true)}
                className=" text-green text-sm underline"
              >
                Reset password?
              </button>
            </div>
 
                <Button variant="primary" className="mt-8 w-full" type="submit"  loading={loading}>Login &#8594; </Button>
                <p className="text-center mt-4"><span>{"New PSP Operator?"}</span> <Link to="/operator-register" className="hover:underline text-green">Sign up</Link></p>
      
            </form>
          </div>
                              {
                                openResetModal && <SendEmailResetLink openModal={openResetModal} setOpenModal={() =>setOpenResetModal(!openResetModal)} />
                              }
      </div>
    </main>
    </div>
  );
};

export default OperatorLogin;