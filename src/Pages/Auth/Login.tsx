import React, { useState } from "react";
import { TiTimes } from "react-icons/ti";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FormikValues, useFormik } from "formik";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "../../Features/authSlice";
import {
  Paragraph2Xl,
  ParagraphExtraSmallError,
  ParagraphLargeWhite,
} from "../../Component/Paragraph";
import { InputFieldSecondaryGreen } from "../../Component/InputField";
import { ButtonsPrimary } from "../../Component/Buttons";
import baseURL from "../../utils/apiConfig";

const validate = (values: FormikValues) => {
  const errors: FormikValues = {};

  if (!values.phone) {
    errors.phone = "Phone Number is Required";
  } else if (values.phone.length > 11 || values.phone.length < 11) {
    errors.phone = "Phone Must be 11 characters";
  }

  if (!values.password) {
    errors.password = "Password is Required";
  } else if (values.password.length < 8) {
    errors.password = "Password name must be greater than 8 characters";
  }

  return errors;
};

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [istoggle, setIstoggle] = useState(false);
  const [loading, SetLoading] = useState(false);

  const toggle = () => {
    setIstoggle((prev) => !prev);
  };

  const formik = useFormik({
    initialValues: {
      phone: "",
      password: "",
    },
    validate,
    onSubmit: (values) => {
      SetLoading(true);
      axios
        .post(baseURL + "auth/customer/login", values, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          console.log("resLogin", res);
          const message = res.data.message;
          const errorState = res.data?.errorState;
          if (!errorState) {
            const user = res.data.data.CustomerDetails;
            const userApartment = res.data.data.customerApartments;

            // console.log("userInit", user);
            const token = res.data?.data?.authorisation.token;
            sessionStorage.setItem("SESSION_AUTH_TOKEN", token);
            sessionStorage.setItem("AUTH_USERDETAILS", JSON.stringify(user));
            sessionStorage.setItem(
              "CUSTOMER_APARTMENT",
              JSON.stringify(userApartment)
            );
            dispatch(login(user));
            console.log(user);
            toast.success(message, { 
              position:"top-center",
              
             });
            setTimeout(() => {
              SetLoading(false);
              navigate("/profile", { state: { user: user } });
            }, 3000);
          } else {
            toast.success(message, { autoClose: 5000 });
          }
        })
        .catch((err) => {
          console.log("got here", err);
          SetLoading(false);
          const message = err.response?.data?.message;
          toast.error(message, { autoClose: 7000 });
        });
    },
  });

  return (
    <main className="m-4 md:m-0 md:bg-green md:h-screen md:bg-bgdesktop-pattern md:bg-cover">
      <div className="md:mt-0 md:p-10 md:flex md:justify-between">
        <ToastContainer />
        <div className="hidden md:block md:p-10">
          <ParagraphLargeWhite content={"Log in"} />
        </div>
        <div className="mt-10 md:mt-3 md:w-2/6 md:bg-white md:border-transparent md:p-5 md:rounded-lg">
          <div className="flex justify-end mr-8">
            <Link to="/">
              <TiTimes size={24} className="bg-green text-white rounded-2xl" />
            </Link>
          </div>
          <div className="mt-2">
            <form onSubmit={formik.handleSubmit}>
              <Paragraph2Xl content={"Welcome Back"} />
              <div className=" m-auto h-20 w-20">
                <img src="Images/logo.png" alt="logo" srcSet="" />
              </div>
              <div className="m-4">
                <InputFieldSecondaryGreen
                  placeholder={"Phone Number"}
                  type={"tel"}
                  name={"phone"}
                  onChange={formik.handleChange}
                  value={formik.values.phone}
                />

                {formik.errors.phone ? (
                  <ParagraphExtraSmallError content={formik.errors.phone} />
                ) : null}
              </div>
              <div className="m-4 relative">
                <InputFieldSecondaryGreen
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
                {formik.errors.password ? (
                  <ParagraphExtraSmallError content={formik.errors.password} />
                ) : null}
              </div>
              <div className="flex justify-end mr-8">
                <Link
                  to="/forget-password"
                  className=" text-green text-sm underline"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="mx-4 my-8">
                <ButtonsPrimary
                  type={"submit"}
                  name={"Login"}
                  loading={loading}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;
