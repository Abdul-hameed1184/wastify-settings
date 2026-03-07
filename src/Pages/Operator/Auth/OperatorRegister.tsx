import React, { useState, useEffect, useRef } from "react";
import { TiTick } from "react-icons/ti";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useFormik } from "formik";
import * as Yup from "yup"; // ← better than manual validate
import {
  ParagraphExtraSmallError,
  ParagraphSmall2,
} from "../../../Component/Paragraph";
import Input from "../../../Component/InputField";
import { ButtonsPrimary } from "../../../Component/Buttons";
import { Logo, LogoWithText } from "../../../Component/Logo"; // assuming you have this
import axios from "axios";
import baseURL from "../../../utils/apiConfig";
import { operatorVerifyEmail, operatorVerifyOTP } from "../../../api/auth.service";

// ──────────────────────────────────────────────
// Yup Schema (cleaner & more powerful than manual validate)
const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Company Email is required"),
  email_confirm: Yup.string()
    .oneOf([Yup.ref("email")], "Emails must match")
    .required("Confirm Email is required"),
  businessName: Yup.string().required("Business Name is required"),
  phone: Yup.string().required("Phone is required"),
  state: Yup.string().required("State is required"),
  lga: Yup.string().required("Local Government is required"),
  ward: Yup.string().required("Ward is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  password_confirmation: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
});

// ──────────────────────────────────────────────
export const OperatorRegister = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  // ──── Location data ────
  const [allStates, setAllStates] = useState([]);
  const [lgas, setLgas] = useState([]);
  const [wards, setWards] = useState([]);

  const inputRefs = useRef(Array(6).fill(null).map(() => React.createRef()));

  const [otpInputs, setOtpInputs] = useState(["", "", "", "", "", ""]);
  const otpValue = otpInputs.join("");

  // ──── Formik (one instance for the whole wizard) ────
  const formik = useFormik({
    initialValues: {
      email: "",
      email_confirm: "",
      businessName: "",
      phone: "",
      state: "",
      lga: "",
      ward: "",
      password: "",
      password_confirmation: "",
    },
    validationSchema,
    validateOnChange: false, // less aggressive – only on blur/submit
    validateOnBlur: true,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const res = await axios.post(`${baseURL}auth/operator/signup/create-account`, values);
        const { message, errorState } = res.data;
        if (!errorState) {
          toast.success(message || "Account created successfully!");
          setTimeout(() => navigate("/admin-login"), 3000);
        } else {
          toast.error(message || "Something went wrong");
        }
      } catch (err) {
        const msg = err.response?.data?.message || "Registration failed";
        toast.error(msg, { autoClose: 7000 });
      } finally {
        setLoading(false);
      }
    },
  });

  // ──── Fetch states on mount ────
  useEffect(() => {
    axios
      .get(`${baseURL}state/list`)
      .then((res) => setAllStates(res.data.data || []))
      .catch((err) => console.error("States fetch failed", err));
  }, []);

  // Fetch LGAs when state changes
  useEffect(() => {
    if (!formik.values.state) {
      setLgas([]);
      formik.setFieldValue("lga", "");
      setWards([]);
      formik.setFieldValue("ward", "");
      return;
    }
    axios
      .get(`${baseURL}lga/stateid/${formik.values.state}`)
      .then((res) => setLgas(res.data.data || []))
      .catch((err) => console.error("LGA fetch failed", err));
  }, [formik.values.state]);

  // Fetch Wards when LGA changes
  useEffect(() => {
    if (!formik.values.lga) {
      setWards([]);
      formik.setFieldValue("ward", "");
      return;
    }
    axios
      .get(`${baseURL}ward/lgaid/${formik.values.lga}`)
      .then((res) => setWards(res.data.data || []))
      .catch((err) => console.error("Ward fetch failed", err));
  }, [formik.values.lga]);

  // ──── OTP handlers ────
  const handleOtpChange = (e, index) => {
    const val = e.target.value;
    if (!/^\d?$/.test(val)) return;

    const newOtp = [...otpInputs];
    newOtp[index] = val;
    setOtpInputs(newOtp);

    if (val && index < 5) inputRefs.current[index + 1]?.current?.focus();
    if (!val && index > 0) inputRefs.current[index - 1]?.current?.focus();
  };

  // ──── Step navigation + actions ────
  const nextStep = async () => {
    if (step === 1) {
      const emailErrors = await formik.validateField("email");
      const confirmErrors = await formik.validateField("email_confirm");
      if (emailErrors || confirmErrors || formik.values.email !== formik.values.email_confirm) {
        formik.setTouched({ email: true, email_confirm: true });
        toast.error("Please fix email fields");
        return;
      }

      setLoading(true);
      try {
        const res = await operatorVerifyEmail({email: formik.values.email});
        if (!res.data.errorState) {
          toast.success(res.data.message);
          setStep(2);
        } else {
          toast.error(res.data.message);
        }
      } catch (err) {
        toast.error(err.response?.data?.message || "Email verification failed");
      } finally {
        setLoading(false);
      }
    } else if (step === 2) {
      if (otpValue.length !== 6) {
        toast.error("Please enter complete OTP");
        return;
      }
      setLoading(true);
      try {
        const res = await operatorVerifyOTP({email: formik.values.email, otp: otpValue});
        if (!res.data.errorState) {
          toast.success(res.data.message);
          setStep(3);
        } else {
          toast.error(res.data.message);
        }
      } catch (err) {
        toast.error(err.response?.data?.message || "OTP verification failed");
      } finally {
        setLoading(false);
      }
    }
  };

  const prevStep = () => setStep((s) => s - 1);

  // ──── Render steps ────
  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div>
           

            <div className="w-full lg:w-4/5">
              <ParagraphSmall2 content="Company Email" />
              <Input
                type="email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            
                           {formik.touched.email && formik.errors.email ? (
                <p className="text-red-900 text-sm">*{formik.errors.email}</p>
              ) : null}
            </div>
            <div className="w-full lg:w-4/5 mt-4">
              <ParagraphSmall2 content="Confirm Company Email" />
              <Input
                type="email"
                name="email_confirm"
                value={formik.values.email_confirm}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
                         {formik.touched.email_confirm && formik.errors.email_confirm ? (
                <p className="text-red-900 text-sm">*{formik.errors.email}</p>
              ) : null}
            </div>
            <div className="w-full lg:w-4/5 my-10">
              <ButtonsPrimary name="Confirm" onClick={nextStep} loading={loading} />
            </div>
          </div>
        );

      case 2:
        return (
          <div>
            <p className="text-xl font-semibold text-black my-4">
              Enter OTP sent to <span className="text-green">{formik.values.email}</span>
            </p>
            <div className="flex justify-center lg:justify-start my-10 space-x-2">
              {otpInputs.map((val, i) => (
                <input
                  key={i}
                  type="text"
                  maxLength={1}
                  value={val}
                  onChange={(e) => handleOtpChange(e, i)}
                  ref={inputRefs.current[i]}
                  className="w-14 h-14 text-center text-xl font-bold border border-gray-300 rounded-lg focus:ring-2 focus:ring-green focus:outline-none"
                />
              ))}
            </div>
            
            <div className="w-full lg:w-4/5">
              <ButtonsPrimary name="Confirm OTP" onClick={nextStep} loading={loading} />
            </div>
          </div>
        );

      case 3:
        return (
          <form onSubmit={formik.handleSubmit} className="space-y-6">
            <p className="text-2xl font-semibold text-black my-4">
              Organization Details
            </p>

            <div className="w-full lg:w-4/5">
              <ParagraphSmall2 content="Operator's Business Name" />
              <Input {...formik.getFieldProps("businessName")} />
              {formik.touched.businessName && formik.errors.businessName ? (
                <p className="text-red-900 text-sm">*{formik.errors.businessName}</p>
              ) : null}
            </div>

            <div className="w-full lg:w-4/5">
              <ParagraphSmall2 content="State" />
              <select
      
                className="border-2 px-4 py-3 bg-gray-100 rounded-lg w-full h-14"
                {...formik.getFieldProps("state")}
              >
                <option value="">Select State</option>
                {allStates.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </select>

                                         {formik.touched.state && formik.errors.state ? (
                <p className="text-red-900 text-sm">*{formik.errors.state}</p>
              ) : null}
            </div>

            <div className="w-full lg:w-4/5 flex gap-6">
              <div className="flex-1">
                <ParagraphSmall2 content="LGA / LCDA" />
                <select
 
                  className="border-2 px-4 py-3 bg-gray-100 rounded-lg w-full h-14"
                  disabled={!formik.values.state}
                  {...formik.getFieldProps("lga")}
                >
                  <option value="">Select LGA</option>
                  {lgas && lgas.map((l) => (
                    <option key={l.id} value={l.id}>
                      {l.name}
                    </option>
                  ))}
                </select>

                                           {formik.touched.lga && formik.errors.lga ? (
                <p className="text-red-900 text-sm">*{formik.errors.lga}</p>
              ) : null}
              </div>

              <div className="flex-1">
                <ParagraphSmall2 content="Ward" />
                <select
       
                  className="border-2 px-4 py-3 bg-gray-100 rounded-lg w-full h-14"
                  disabled={!formik.values.lga}
                  {...formik.getFieldProps("ward")}
                >
                  <option value="">Select Ward</option>
                  {wards && wards.map((w) => (
                    <option key={w.id} value={w.id}>
                      {w.name}
                    </option>
                  ))}
                </select>

                                           {formik.touched.ward && formik.errors.ward ? (
                <p className="text-red-900 text-sm">*{formik.errors.ward}</p>
              ) : null}
              </div>
            </div>

            <div className="w-full lg:w-4/5">
              <ParagraphSmall2 content="Phone Number" />
              <Input  {...formik.getFieldProps("phone")} />

                                         {formik.touched.phone && formik.errors.phone ? (
                <p className="text-red-900 text-sm">*{formik.errors.phone}</p>
              ) : null}
            </div>

            <div className="w-full lg:w-4/5 flex gap-6">
              <div className="flex-1">
                <ParagraphSmall2 content="Password" />
                <Input type="password"  {...formik.getFieldProps("password")} />
                    {formik.touched.password && formik.errors.password ? (
                <p className="text-red-900 text-sm">*{formik.errors.password}</p>
              ) : null}
              </div>
              <div className="flex-1">
                <ParagraphSmall2 content="Confirm Password" />
                <Input
                  type="password"
          
                  {...formik.getFieldProps("password_confirmation")}
                />

              {formik.touched.password_confirmation && formik.errors.password_confirmation ? (
                <p className="text-red-900 text-sm">*{formik.errors.password_confirmation}</p>
              ) : null}
              </div>
            </div>

            <div className="w-full lg:w-4/5 pt-6">
              <ButtonsPrimary
                name="Sign Up"
                type="submit"
                disabled={loading || !formik.isValid}
                loading={loading}
              />
              <p className="text-center mt-3 text-sm text-gray-600">
                Already have an account?{" "}
                <Link to="/admin-login" className="text-green-600 font-medium">
                  Login
                </Link>
              </p>
            </div>
          </form>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      <div className="md:hidden">
           <LogoWithText size={100} />
           <h2 className=" text-2xl text-center mt-8 font-bold">Wasteefy <br /> Management System</h2>
      </div>
      {/* Left sidebar – progress */}
      <div className="hidden lg:flex flex-col justify-center items-center h-screen flex-1 bg-green p-10 bg-gradient-to-b from-white via-green-50 to-lightGreen/30 space-y-10">
                    <div className="flex flex-col gap-8">
                    <div className="flex items-center gap-4">
                      <h2 className="text-2xl font-semibold">Wasteefy Management System</h2>
                    </div>
          <div className="flex items-center gap-4">
            <div className={`rounded-full w-10 h-10 border-2 flex bg-green items-center justify-center ${step >= 1 ? "bg-green" : "bg-white"}`} style={{ borderColor: step >= 1 ? "#22c55e" : "#d1d5db" }}>
              <TiTick className={`text-4xl ${step >= 1 ? "text-white" : "hidden"}`} />
            </div>
            <div className="text-left">
              <p className="text-2xl font-semibold">Personal Details</p>
              <p className="text-lg text-gray-600">Verify email</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className={`rounded-full w-10 h-10 border-2 flex items-center justify-center  ${step >= 2 ? "bg-green" : "bg-white"}`} style={{ borderColor: step >= 2 ? "#22c55e" : "#d1d5db" }}>
              <TiTick className={`text-4xl ${step >= 2 ? "text-white" : "hidden"}`} />
            </div>
            <div className="text-left">
              <p className="text-2xl font-semibold">Verification OTP</p>
              <p className="text-lg text-gray-600">Enter OTP sent to your email</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className={`rounded-full w-10 h-10 border-2 flex items-center justify-center  ${step >= 3 ? "bg-green" : "bg-white"}`} style={{ borderColor: step >= 3 ? "#22c55e" : "#d1d5db" }}>
              <TiTick className={`text-4xl ${step >= 3 ? "text-white" : "hidden"}`} />
            </div>
            <div className="text-left">
              <p className="text-2xl font-semibold">Organisation Details</p>
              <p className="text-lg text-gray-600">Fill required information</p>
            </div>
          </div>
          </div>
 
      </div>

      {/* Right – form content */}
      <div className="flex-1 lg:p-12 flex flex-col items-center justify-center">
         <div className="w-full max-w-xl">            
          <div className="hidden md:block">  
              <Logo size={100} />
              </div>
            <p className="text-2xl font-semibold text-black my-4">
              Register on Wasteefy Management System
            </p>
            <p className="text-gray-400 mt-1 p-0">
              Please enter your details to create an account.
            </p>
            </div>
        <div className="w-full max-w-xl">{renderStep()}</div>
      </div>
    </div>
  );
};