import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { login } from "../../Features/authSlice";
import Input from "../../Component/InputField";
import { Button } from "../../Component/Button";
import BgWasteLogin from "../../assets/images/bg-waste-login.png";
import { Logo } from "../../Component/Logo";
import { BsBarChartLine, BsPhone } from "react-icons/bs";
import { MdOutlineShield } from "react-icons/md";
import { IoMdKeypad } from "react-icons/io";
import { customerLogin } from "../../api/auth.service";
import { AxiosError } from "axios";
type Err = {
  phone: string,
  password: string
}
const validate = (values) => {
  const errors: Err = {} as Err;

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

const Login: React.FC = () => {
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
    onSubmit: async (values) => {
      try{
      SetLoading(true);
        const res = await customerLogin(values);
          const message = res.data.message;
          const errorState = res.data?.errorState;
          if (!errorState) {

            SetLoading(false);
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



                        toast.success(message, { autoClose: 5000 });
            navigate("/dashboard", { state: { user: user } });

          } 
        }catch(e){ 
          console.log("got here", e);
          const message = e?.response?.data?.message || e?.message || "An error occurred during login";
          toast.error(message, { autoClose: 5000 });
          SetLoading(false);
        }
      
  }});


  return (
    <>
 
    <div className=" m-0  md:bg-white p-0 md:p-4 md:flex  md:flex-row h-screen">
  
      {/* Overlay */}
      <div className="relative flex bg-white overflow-hidden rounded-none md:rounded-xl h-screen md:h-auto md:flex-1">

        {/* Image */}
        <div className="absolute inset-0 z-0">
          <img
            src={BgWasteLogin}
            alt="Background Waste Login"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Bottom Overlay (desktop only) */}
        <div className="hidden md:block absolute bottom-0 left-0 right-0 p-6 m-4 z-10">
          <div className="bg-white rounded-xl p-6">
            <h3 className="text-black text-2xl font-semibold mb-2">
              Manage Your Waste Bill Efficiently.
            </h3>

            <p className="text-gray-500 text-lg mb-4">
              Secure login for residents, businesses, and municipal partners. Access
              your dashboard to view bills, schedule pickups, and manage services in
              one place.
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


            <Logo className="m-0" />

            <h3 className="text-black text-2xl">Welcome Back</h3>
            <p className="text-gray-500 ">Please enter your details to sign in</p>
            <div className="mt-4">
              <label className="text-black font-semibold mb-2 block" htmlFor="phoneNumber">Phone Number</label>
              <Input
                id="phoneNumber"
                icon={<BsPhone />}
                placeholder={"Phone Number"}
                type={"tel"}
                name={"phone"}
                onChange={formik.handleChange}
                value={formik.values.phone}
              />

              {formik.errors.phone ? (
                <p className="text-red-900 text-sm">*{formik.errors.phone}</p>
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
              <Link
                to="/forget-password"
                className=" text-green text-sm underline"
              >
                Reset password?
              </Link>
            </div>

            <Button variant="primary" className="mt-8 w-full" type="submit" loading={loading}>Login &#8594; </Button>

          </form>
        </div>

      </div>
              </div>
    </>
  );
};

export default Login;
