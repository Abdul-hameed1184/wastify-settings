import React,{ useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import {  useFormik } from "formik";
import { ToastContainer, Zoom, toast } from "react-toastify";
import axios from "axios";
import { Input } from "../../../Component/InputField";
import { AdminLogo } from "../../../Component/AlternateLogos";
import baseURL from "../../../utils/apiConfig";
import { Button } from "../../../Component/Button";

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

const SupportLogin:React.FC = () => {
  const navigate = useNavigate();
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

            toast.success(message, { autoClose: 3000 });

          if(pspOperatorData)
            setTimeout(() => {
              SetLoading(false);
              navigate("/support");
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
      <div className="flex items-center justify-center mt-10">
        <AdminLogo />
      </div>
      <div className="flex flex-col lg:flex-row justify-around py-20">
        <div className="text-center w-full lg:text-start max-w-md">
          <form onSubmit={formik.handleSubmit}>
            <p className="text-2xl font-Poppins font-semibold not-italic text-black leading-8 my-4">
              Login to{" "}
              <span className="text-green">Wasteefy Support System</span>
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

            <div className="w-full flex flex-col justify-left my-4">
              <label className="font-semibold text-gray text-left">{"Email"}</label>
              <Input
                id="email"
                type={"email"}
                name={"email"}
                placeholder={"Email"}
                onChange={formik.handleChange}
                value={formik.values.email}
              />

              {formik.errors.email ? (
                           <p className="text-red-500 text-sm">{formik.errors.email}</p>
              ) : null}
            </div>
            <div className=" relative w-full flex flex-col justify-left">
              <label htmlFor="password" className="font-semibold text-gray text-left">Password</label>
              <Input
                id="password"
                type={istoggle ? "text" : "password"}
                name={"password"}
                placeholder={"Password"}
                onChange={formik.handleChange}
                value={formik.values.password}
              />
              <button
                className="absolute top-10 right-5"
                onClick={toggle}
                type="button"
              >
                {istoggle ? <FaEye /> : <FaEyeSlash />}
              </button>
                         {formik.errors.password ? (
                <p className="text-red-500 text-sm">{formik.errors.password}</p>
              ) : null}
              <div className="flex justify-end mt-2">
                <Link
                  to={"/operator-forgot-password"}
                  className="text-sm font-inter font-normal not-italic text-gray leading-4"
                >
                  Forget Password?
                </Link>
              </div>

   
            </div>



            <div className="w-full mt-6">
              <Button
                type={"submit"}
                variant="primary"
                loading={loading}
                className="w-full"
              > Login </Button>
            </div>

                        <div className="text-center w-full  my-8">
              {/* <p>
                New Psp Operator?{" "}
                <span>
                  <Link
                    to={"/operator-register"}
                    className="font-inter font-normal not-italic text-gray leading-4"
                  >
                    Sign up
                  </Link>
                </span>
              </p> */}
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default SupportLogin;