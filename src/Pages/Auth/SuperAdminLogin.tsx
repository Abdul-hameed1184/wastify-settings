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
  const [ formType, setFormType ] = useState<boolean>(false);

  const toggle = () => {
    setIstoggle((prev) => !prev);
  };

  const handleFormTypeSwitch = () => {
    setFormType(!formType);
  }

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
              navigate("/super-admin/dashboard");
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

  
  const regFormik = useFormik({
    initialValues: {
      lastname: "",
      firstname: "",
      username: "",
      phone: "",
      email: "",
      password: "",
      password_confirmation:""
    },
    validate,
    onSubmit: (values) => {
      console.log(values)
      SetLoading(true);
      axios
        .post(baseURL + "auth/signup/admin/registration", values, {
          headers: {
            "Content-Type": "application/json",
          },
        })
 .then((res) => {
          console.log(res);

          if(res.status === 200){
            toast.success("Registration Successful! Check your email", { autoClose: 3000 });
            navigate("/")
            SetLoading(false);
          }else{
            toast.error("Registration Failed! Please try again", { autoClose: 5000 });
            SetLoading(false);
          }



          // const errorState = res.data?.errorState;
          // const message = res?.data?.message;
          // const adminData = res.data?.data?.userData; 

          // if (adminData && !errorState) {
          //   const token = res.data?.data?.authorisation?.token;
          //   sessionStorage.setItem("SESSION_AUTH_TOKEN", token);
          //   sessionStorage.setItem("AUTH_ADMIN_DETAILS", JSON.stringify(adminData));

          //   toast.success(message, { autoClose: 3000 });

          // if(adminData)
          //   setTimeout(() => {
          //     SetLoading(false);
          //     navigate("/admin");
          //   }, 2000);
          // } else {
          //   toast.error(message, { autoClose: 5000 });
          // }
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
<main className="m-4 md:m-0 bg-slate-900 md:h-screen bg-bgdesktop-pattern md:bg-cover">
  <div className="md:p-10 flex items-center justify-center min-h-screen">
    {/* <ToastContainer /> */}

<div className="mt-2 flex justify-center bg-white rounded-md max-w-2xl w-full p-6">
{    !formType  ?
      <form onSubmit={formik.handleSubmit} className="w-full">
        <h2 className="text-center text-3xl font-extrabold text-slate-900">Wasteefy Admin</h2>
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
            
            type="submit"
            className="w-full bg-slate-900 text-white py-3 rounded-md hover:bg-slate-700"
            loading={loading}
          >
            Submit
          </Button>
         

        </div>
          <p  className="w-full flex my-2 justify-between" >
            <span></span>
            <span
  role="button"
  tabIndex={0}
  onClick={handleFormTypeSwitch}
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleFormTypeSwitch();
    }
  }}
  className="font-semibold cursor-pointer select-none hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 text-slate-900 hover:text-green"
>
  Register as a new Admin
</span></p>
      </form>: 
      <form onSubmit={regFormik.handleSubmit} className="w-full">
  <h2 className="text-center text-3xl font-extrabold text-slate-900">Wasteefy Admin</h2>

  <div className="m-auto h-20 w-20">
    <img src="Images/logo.png" alt="logo" />
  </div>

  {/* Firstname */}
  <div className="m-4">
    <Input
      placeholder="Firstname"
      type="text"
      name="firstname"
      onChange={regFormik.handleChange}
      value={regFormik.values.firstname}
    />
    {regFormik.errors.firstname && (
      <p className="text-red-900 text-sm">*{regFormik.errors.firstname}</p>
    )}
  </div>

  {/* Lastname */}
  <div className="m-4">
    <Input
      placeholder="Lastname"
      type="text"
      name="lastname"
      onChange={regFormik.handleChange}
      value={regFormik.values.lastname}
    />
    {regFormik.errors.lastname && (
      <p className="text-red-900 text-sm">*{regFormik.errors.lastname}</p>
    )}
  </div>

  {/* Username */}
  <div className="m-4">
    <Input
      placeholder="Username"
      type="text"
      name="username"
      onChange={regFormik.handleChange}
      value={regFormik.values.username}
    />
    {regFormik.errors.username && (
      <p className="text-red-900 text-sm">*{regFormik.errors.username}</p>
    )}
  </div>

  {/* Phone */}
  <div className="m-4">
    <Input
      placeholder="Phone"
      type="text"
      name="phone"
      onChange={regFormik.handleChange}
      value={regFormik.values.phone}
    />
    {regFormik.errors.phone && (
      <p className="text-red-900 text-sm">*{regFormik.errors.phone}</p>
    )}
  </div>

  {/* Email */}
  <div className="m-4">
    <Input
      placeholder="Email"
      type="email"
      name="email"
      onChange={regFormik.handleChange}
      value={regFormik.values.email}
    />
    {regFormik.errors.email && (
      <p className="text-red-900 text-sm">*{regFormik.errors.email}</p>
    )}
  </div>

  {/* Password */}
  <div className="m-4 relative">
    <Input
      placeholder="Password"
      type={istoggle ? "text" : "password"}
      name="password"
      onChange={regFormik.handleChange}
      value={regFormik.values.password}
    />
    <button className="absolute top-5 right-6" onClick={toggle} type="button">
      {istoggle ? <FaEye /> : <FaEyeSlash />}
    </button>

    {regFormik.errors.password && (
      <p className="text-red-900 text-sm">*{regFormik.errors.password}</p>
    )}
  </div>

  {/* Confirm Password */}
  <div className="m-4 relative">
    <Input
      placeholder="Confirm Password"
      type={istoggle ? "text" : "password"}
      name="password_confirmation"
      onChange={regFormik.handleChange}
      value={regFormik.values.password_confirmation}
    />
    <button className="absolute top-5 right-6" onClick={toggle} type="button">
      {istoggle ? <FaEye /> : <FaEyeSlash />}
    </button>

    {regFormik.errors.password_confirmation && (
      <p className="text-red-900 text-sm">*{regFormik.errors.password_confirmation}</p>
    )}
  </div>

  {/* Submit */}
  <div className="mx-4 my-8">
    <Button
      type="submit"
      className="w-full bg-slate-900 text-white py-3 rounded-md hover:bg-slate-700"
      loading={loading}
    >
      Submit
    </Button>
  </div>

  <p
    role="button"
    tabIndex={0}
    onClick={handleFormTypeSwitch}
    className="font-semibold cursor-pointer text-slate-900 hover:underline text-center"
    onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleFormTypeSwitch();
    }
  }}
  >
    Already have an account? Login
  </p>
</form>
          
      }
    </div>
  </div>
</main>

  );
};

export default SuperAdminLogin;