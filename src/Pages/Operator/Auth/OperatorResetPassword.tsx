import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useFormik } from "formik";
import {  toast } from "react-toastify";
import axios from "axios";
import BgWasteOperator from "../../../assets/images/bg-waste-operator.png";
import baseURL from "../../../utils/apiConfig";
import { BsBarChartLine } from "react-icons/bs";
import { MdOutlineShield } from "react-icons/md";
import { Button } from "../../../Component/Button";
import Input from "../../../Component/InputField";
import { Logo } from "../../../Component/Logo";
type Err = {
  password:string;
  password_confirmation: string;
}
const validate = (values) => {
  const errors = {} as Err;

  if (!values.password) {
    errors.password = "Password is Required";
  } else if (values.password.length < 8) {
    errors.password = "Password name must be greater than 8 characters";
  }

  if (!values.password_confirmation) {
    errors.password_confirmation = "Password Confirmarion is Required";
  } else if (values.password_confirmation.length < 8) {
    errors.password_confirmation =
      "Password Confirmation must be greater than 8 characters";
  } else if (values.password_confirmation !== values.password) {
    errors.password_confirmation = "Passwords don't match";
  }

  return errors;
};

const AdminResetPassword:React.FC = () => {
  const [istoggle, setIstoggle] = useState(false);
  const [istoggleConfirm, setIstoggleConfirm] = useState(false);
  const [loading, SetLoading] = useState(false);
  const navigate = useNavigate();

  let { userId, token } = useParams();

  const toggle = () => {
    setIstoggle((prev) => !prev);
  };

  const toggleConfirmPassword = () => {
    setIstoggleConfirm((prev) => !prev);
  };
  const formik = useFormik({
    initialValues: {
      password: "",
      password_confirmation: "",
    },
    validate,
    onSubmit: (values) => {
      SetLoading(true);
      // console.log(data);

      axios
        .put(`${baseURL}auth/admin/password-reset/${userId}/${token}`, values, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          console.log(res);
          SetLoading(false);
          const message = res.data?.message;
          const errorState = res.data?.errorState;
          if (!errorState) {
            toast.success(message, { autoClose: 5000 });
            setTimeout(() => {
              navigate("/operator-login");
            }, 3000);
          } else {
            console.log(`${baseURL}auth/admin/password-reset/${userId}/${token}`)
            toast.error(message, { autoClose: 5000 });
          }
        })
        .catch((err) => {
          console.log(err);
          // SetLoading(false)
          // const message = err.response.data?.message;
          // toast.error(message, { autoClose: 7000 });
        });
    },
  });
  return (
     <div className="md:p-4 p-0 h-screen ">
      <main className="  md:bg-white p-0 md:p-4 md:flex  md:flex-row h-screen">
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
            <div className="absolute md:relative bottom-0 left-0 right-0 md:flex-1 flex  md:justify-center md:items-center p-4  bg-white rounded-xl  mx-auto md:m-0">

                   <div className="mt-2 w-full max-w-md mx-auto">
                              <div className="mt-2 ">
                            <form onSubmit={formik.handleSubmit}>
                              <div className="flex flex-col gap-4 w-full items-center mx-auto">
                                   <Logo className="m-0"/>
                              </div>
                                <p className="text-2xl font-semibold text-center">Set new password</p>
                                <p className="text-sm text-gray-500 text-center">Create a new password that would be used for authenticating all your apps.</p>
                                <div className="my-4 mx-4 relative">
                                    <Input type={istoggle ? 'text' : 'password'}
                                        placeholder="Password"
                                        name={"password"} onChange={formik.handleChange} value={formik.values.password} />
                                    <button
                                        className='absolute top-5 right-6'
                                        onClick={toggle}
                                        type='button'
                                    >
                                        {istoggle ? <FaEye /> : <FaEyeSlash />}
                                    </button>
                                        {formik.errors.password ? (
                  <p className="text-red-900 text-sm">*{formik.errors.password}</p>
                ) : null}
                                                                   </div>

                                <div className="my-4 mx-4 relative">
                                    <Input type={istoggleConfirm ? 'text' : 'password'}
                                        placeholder="Confirm Password"
                                        name={"password_confirmation"} onChange={formik.handleChange} value={formik.values.password_confirmation} />
                                    <button
                                        className='absolute top-5 right-6'
                                        onClick={toggleConfirmPassword}
                                        type='button'
                                    >
                                        {istoggleConfirm ? <FaEye /> : <FaEyeSlash />}
                                    </button>
                                    {formik.errors.password_confirmation ? (
                  <p className="text-red-900 text-sm">*{formik.errors.password_confirmation}</p>
                ) : null}
                                                                    </div>
                                <div className="mx-4 my-8">
                                    <Button type={"submit"} loading={loading} className="w-full">Set Password</Button>
                                </div>
                            </form>
                        </div>
           
                </div>
            </div>
    </main>
    </div>
  );
};

export default AdminResetPassword;
