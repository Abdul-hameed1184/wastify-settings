import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useFormik } from "formik";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import {
  ParagraphExtraSmallError,
} from "../../../Component/Paragraph";
import { ButtonsPrimary } from "../../../Component/Buttons";
import { AdminLogo } from "../../../Component/AlternateLogos";
import baseURL from "../../../utils/apiConfig";
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
    <main className="p-10">
      <div className="flex items-center justify-center mt-10 lg:justify-start">
        <AdminLogo />
      </div>
      <div className="flex flex-col lg:flex-row justify-around py-20">
        <div className="hidden lg:block w-2/5">
          <img src="/Images/admin.png" alt="icon" srcSet="" />
        </div>
        <div className="text-center w-full lg:text-start lg:w-[45%]">
          <form onSubmit={formik.handleSubmit}>
            <p className="text-2xl font-Poppins font-semibold not-italic text-black leading-8 my-4">
              Reset Password{" "}
              <span className="text-green">Wasteefy Management System</span>
            </p>
          

            <div className="my-4 mx-4 relative w-full lg:w-4/5">
              <input
                type={istoggle ? "text" : "password"}
                placeholder="Password"
                className="border-2 px-2.5 py-3.5 pl-8  bg-white shadow-sm rounded-lg block font-Poppins w-full h-14 text-black text-base mt-1 ring-gray  placeholder:text-green focus:outline-none focus:ring-2 focus:border-purple focus:border-transparent focus:ring-gray"
                name={"password"}
                onChange={formik.handleChange}
                value={formik.values.password}
              />
              <button className="absolute top-5 right-6" onClick={toggle}>
                {istoggle ? <FaEye /> : <FaEyeSlash />}
              </button>
              {formik.errors.password ? (
                <ParagraphExtraSmallError content={formik.errors.password} />
              ) : null}
            </div>

            <div className="my-4 mx-4 w-full lg:w-4/5 relative">
              <input
                type={istoggleConfirm ? "text" : "password"}
                placeholder="Confirm Password"
                className="border-2 px-2.5 py-3.5 pl-8  bg-white shadow-sm rounded-lg block font-Poppins w-full h-14 text-black text-base mt-1 ring-gray  placeholder:text-green focus:outline-none focus:ring-2 focus:border-purple focus:border-transparent focus:ring-gray"
                name={"password_confirmation"}
                onChange={formik.handleChange}
                value={formik.values.password_confirmation}
              />
              <button
                className="absolute top-5 right-6"
                onClick={toggleConfirmPassword}
              >
                {istoggleConfirm ? <FaEye /> : <FaEyeSlash />}
              </button>
              {formik.errors.password_confirmation ? (
                <ParagraphExtraSmallError
                  content={formik.errors.password_confirmation}
                />
              ) : null}
            </div>

            <div className="w-full mx-4 lg:w-4/5 mt-14">
              <ButtonsPrimary
                name={"Reset Password"}
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

export default AdminResetPassword;
