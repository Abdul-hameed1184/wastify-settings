import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FormikValues, useFormik } from "formik";
import { ToastContainer, Zoom, toast } from "react-toastify";
import axios from "axios";
import { useDispatch } from "react-redux";
import {
  ParagraphExtraSmallError,
  ParagraphSmall2,
} from "../../../Component/Paragraph";
import { InputFieldGray } from "../../../Component/InputField";
import { ButtonsPrimary } from "../../../Component/Buttons";
import { AdminLogo } from "../../../Component/AlternateLogos";
import baseURL from "../../../utils/apiConfig";

interface Errors {
  email: string;
  password:string;
}
const validate = (values: {email: string, password: string}) => {
  const errors:FormikValues= {};

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

const AdminLogin = () => {
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

            console.log("psp", pspOperatorData);

            console.log("user", user);

            toast.success(message, { autoClose: 3000 });
            setTimeout(() => {
              SetLoading(false);
              navigate("/dashboard");
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
    <main className="p-10">
      <div className="flex items-center justify-center mt-10 lg:justify-start">
        <AdminLogo />
      </div>
      <div className="flex flex-col lg:flex-row justify-around py-20">
        <div className="hidden lg:block w-2/5">
          <img src="Images/admin.png" alt="icon" srcSet="" />
        </div>
        <div className="text-center w-full lg:text-start lg:w-[45%]">
          <form onSubmit={formik.handleSubmit}>
            <p className="text-2xl font-Poppins font-semibold not-italic text-black leading-8 my-4">
              Login to{" "}
              <span className="text-green">Wasteefy Management System</span>
            </p>
            <ToastContainer 
       position="top-center"
       autoClose={5000}
       hideProgressBar
       newestOnTop={false}
       closeOnClick
       rtl={false}
       pauseOnFocusLoss
       draggable
       pauseOnHover
       theme="light"
       transition={Zoom}
      />

            <div className="w-full lg:w-4/5">
              <ParagraphSmall2 content={"Email"} />
              <InputFieldGray
                type={"email"}
                name={"email"}
                placeholder={"Email"}
                onChange={formik.handleChange}
                value={formik.values.email}
              />

              {formik.errors.email ? (
                <ParagraphExtraSmallError content={formik.errors.email} />
              ) : null}
            </div>
            <div className="w-full lg:w-4/5 relative">
              <ParagraphSmall2 content={"Password"} />
              <InputFieldGray
                type={istoggle ? "text" : "password"}
                name={"password"}
                placeholder={"Password"}
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
              <div className="flex justify-end mt-2">
                <Link
                  to={"/admin-forgot-password"}
                  className="text-sm font-inter font-normal not-italic text-gray leading-4"
                >
                  Forget Password?
                </Link>
              </div>

              {formik.errors.password ? (
                <ParagraphExtraSmallError content={formik.errors.password} />
              ) : null}
            </div>

            <div className="text-center w-full lg:w-4/5 my-8">
              <p>
                New Psp Operator?{" "}
                <span>
                  <Link
                    to={"/admin-register"}
                    className="font-inter font-normal not-italic text-gray leading-4"
                  >
                    Sign up
                  </Link>
                </span>
              </p>
            </div>

            <div className="w-full lg:w-4/5">
              <ButtonsPrimary
                name={"Login"}
                type={"submit"}
                loading={loading}
              />
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default AdminLogin;