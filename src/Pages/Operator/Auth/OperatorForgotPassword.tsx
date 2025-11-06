import React, { useState } from "react";
import { useFormik } from "formik";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import {
  ParagraphExtraSmallError,
  ParagraphSmall2,
} from "../../../Component/Paragraph";
import { InputFieldGray } from "../../../Component/InputField";
import { ButtonsPrimary } from "../../../Component/Buttons";
import { AdminLogo } from "../../../Component/AlternateLogos";
import baseUrl from "../../../utils/apiConfig";

type Err = {
  email: string;
  email_confirmation: string;
};
const validate = (values) => {
  const errors = {} as Err;

  if (!values.email) {
    errors.email = "Email is Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  if (!values.email_confirmation) {
    errors.email_confirmation = "Email Confirmarion is Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email_confirmation = "Invalid email address";
  } else if (values.email_confirmation !== values.email) {
    errors.email_confirmation = "Emails don't match";
  }

  return errors;
};
const OperatorForgotPassword:React.FC = () => {
  const [loading, SetLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      email: "",
      email_confirmation: "",
    },
    validate,
    onSubmit: (values) => {
      SetLoading(true);
      // console.log(data);
      axios
        .post(baseUrl + "auth/admin/forgot-password", values, {
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
            // setTimeout(() => {
            //     navigate("/admin-reset-password")
            // }, 3000)
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
              Reset Password{" "}
              <span className="text-green">Wasteefy Management System</span>
            </p>
            <ToastContainer />

            <div className="w-full lg:w-4/5">
              <ParagraphSmall2 content={"Email"} />
              <InputFieldGray
                type={"email"}
                name={"email"}
                onChange={formik.handleChange}
                value={formik.values.email}
              />

              {formik.errors.email ? (
                <ParagraphExtraSmallError content={formik.errors.email} />
              ) : null}
            </div>
            <div className="w-full lg:w-4/5 relative">
              <ParagraphSmall2 content={"Confirm Email"} />
              <InputFieldGray
                type={"email"}
                name={"email_confirmation"}
                onChange={formik.handleChange}
                value={formik.values.email_confirmation}
              />

              {formik.errors.email_confirmation ? (
                <ParagraphExtraSmallError
                  content={formik.errors.email_confirmation}
                />
              ) : null}
            </div>
            <div className="w-full lg:w-4/5 mt-14">
              <ButtonsPrimary
                name={"Send Reset Link"}
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

export default OperatorForgotPassword;
