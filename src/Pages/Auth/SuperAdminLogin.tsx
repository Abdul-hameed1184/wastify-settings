import React, { useState } from "react";
import { TiTimes } from "react-icons/ti";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useFormik } from "formik";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "../../Features/authSlice";
import {
  Paragraph2Xl,
} from "../../Component/Paragraph";
import  Input  from "../../Component/InputField";
import baseURL from "../../utils/apiConfig";
import { Button } from "../../Component/Button";
type Err = {
  email: string,
  password: string
}
const validate = (values) => {  const errors: Err = {} as Err;

  if (!values.email) {
    errors.email = "Email is Required";
  }
  if (!values.password) {
    errors.password = "Password is Required";
  } else if (values.password.length < 8) {
    errors.password = "Password name must be greater than 8 characters";
  }

  return errors;
};

const SuperAdminLogin:React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [istoggle, setIstoggle] = useState(false);
  const [loading, SetLoading] = useState(false);

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
      console.log(values)
      SetLoading(true);
      axios
        .post(baseURL + "auth/login/admin-psp-operator", values, {
          headers: {
            "Content-Type": "application/json",
          },
        })
 .then((res) => {
          console.log(res);

          const errorState = res.data?.errorState;
          const message = res?.data?.message;
          const adminData = res.data?.data?.userData; 

          if (adminData && !errorState) {

            // const user = {
            //   userId,
            //   email,
            //   firstName,
            //   imgUrl,
            //   lastname,
            //   username,
            //   isAdmin,
            //   isBlocked,
            //   isVerified,
            //   phone,
            //   refToken,
            //   role,
            //   wardName,
            //   created_at,
            //   updated_at
            // } = adminData;

            const token = res.data?.data?.authorisation?.token;
            sessionStorage.setItem("SESSION_AUTH_TOKEN", token);
            sessionStorage.setItem("AUTH_ADMIN_DETAILS", JSON.stringify(adminData));

            toast.success(message, { autoClose: 3000 });

          if(adminData)
            setTimeout(() => {
              SetLoading(false);
              navigate("/admin");
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
<main className="m-4 md:m-0 bg-green md:h-screen bg-bgdesktop-pattern md:bg-cover">
  <div className="md:p-10 flex items-center justify-center min-h-screen">
    <ToastContainer />

<div className="mt-2 flex justify-center bg-white rounded-md max-w-2xl w-full p-6">

      <form onSubmit={formik.handleSubmit} className="w-full">
        <p className="text-center font-bold">Wasteefy Admin</p>
        <div className=" m-auto h-20 w-20">
          <img src="Images/logo.png" alt="logo" srcSet="" />
        </div>

        {/* Email */}
        <div className="m-4">
          <Input
            placeholder={"Email"}
            type={"email"}
            name={"email"}
            onChange={formik.handleChange}
            value={formik.values.email}
          />
          {formik.errors.email && (
            <p className="text-red-900 text-sm">*{formik.errors.email}</p>
          )}
        </div>

        {/* Password */}
        <div className="m-4 relative">
          <Input
            placeholder={"Password"}
            type={istoggle ? "text" : "password"}
            name={"password"}
            onChange={formik.handleChange}
            value={formik.values.password}
          />
          <button
            className="absolute top-5 right-6"
            onClick={toggle}
            type="button"
          >
            {istoggle ? <FaEye /> : <FaEyeSlash />}
          </button>
          {formik.errors.password && (
            <p className="text-red-900 text-sm">*{formik.errors.password}</p>
          )}
        </div>

        {/* Submit */}
        <div className="mx-4 my-8">
          <Button
            variant="primary"
            type="submit"
            className="w-full"
            loading={loading}
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  </div>
</main>

  );
};

export default SuperAdminLogin;
