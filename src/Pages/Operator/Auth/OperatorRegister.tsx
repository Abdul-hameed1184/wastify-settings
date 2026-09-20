import React, { useState, useRef } from "react";
import { TiTick } from "react-icons/ti";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useFormik } from "formik";
import * as Yup from "yup"; // ← better than manual validate
import {
  ParagraphSmall2,
} from "../../../Component/Paragraph";
import Input from "../../../Component/InputField";
import { Logo, LogoWithText } from "../../../Component/Logo"; // assuming you have this
import success from "../../../assets/images/success.png"
import { createOperator, operatorVerifyEmail, operatorVerifyOTP } from "../../../api/auth.service";
import { Button } from "../../../Component/Button";
import { ILga, IState, IWard } from "../../../models/location.interface";
import { useQuery } from "@tanstack/react-query";
import { getLGAs, getStates, getWards } from "../../../api/psp-operator/psp-operator.service";
import { Modal } from "../../../Component/Modal/Modal";



const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Company Email is required"),
  email_confirm: Yup.string()
    .oneOf([Yup.ref("email")], "Emails must match")
    .required("Confirm Email is required"),
  businessName: Yup.string().required("Company Name is required"),
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


export const OperatorRegister = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [successModal, setSuccessModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const inputRefs = useRef(Array(6).fill(null).map(() => React.createRef()));
  const [otpInputs, setOtpInputs] = useState(["", "", "", "", "", ""]);
  const otpValue = otpInputs.join("");


  const formik = useFormik({
    initialValues: {
      email: "",
      email_confirm: "",
      businessName: "",
      phone: "",
      state: 1,
      lga: 1,
      ward: 1,
      password: "",
      password_confirmation: "",
    },
    validationSchema,
    validateOnChange: false, // less aggressive – only on blur/submit
    validateOnBlur: true,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const res = await createOperator(values);
        const { message, errorState } = res.data;
        if (!errorState) {
          toast.success(message || "Account created successfully!");
          setSuccessModal(true)
          setTimeout(() => navigate("/operator-login"), 3000);
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

  const { data:states } = useQuery({
    queryKey: ['states'],
    queryFn: async () => {
     const data = await getStates()
    return data.data.data;
    }
  })

    const { data:lgas } = useQuery({
    queryKey: ['lgas', formik.values.state],
    queryFn: async () => {
     if (!formik.values.state) return [];
     const data = await getLGAs(formik.values.state)
    return data.data.data;
    },
    enabled: !!formik.values.state
  })

      const { data:wards } = useQuery({
    queryKey: ['wards', formik.values.lga],
    queryFn: async () => {
     if (!formik.values.lga) return [];
     const data = await getWards(formik.values.lga)
    return data.data.data;
    },
    enabled: !!formik.values.lga
  })



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
           

            <div className="w-full">
              <Input
                type="email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                label="Company Email"
              />
            
                           {formik.touched.email && formik.errors.email ? (
                <p className="text-red-900 text-sm">*{formik.errors.email}</p>
              ) : null}
            </div>
            <div className="w-full  mt-4">
              <Input
                type="email"
                name="email_confirm"
                value={formik.values.email_confirm}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                label={"Confirm Company Email"}
              />
                         {formik.touched.email_confirm && formik.errors.email_confirm ? (
                <p className="text-red-900 text-sm">*{formik.errors.email}</p>
              ) : null}
            </div>
            <div className="w-full my-10">
              <Button  onClick={nextStep} loading={loading} className="w-full">Confirm</Button>
            </div>
          </div>
        );

      case 2:
        return (
          <div>
            <p className="text-xl font-semibold text-black my-4">
              Enter OTP sent to <span className="text-green">{formik.values.email}</span>
            </p>
            <div className="flex justify-around my-10 space-x-2 w-full">
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
            
            <div className="w-full ">
              <Button onClick={nextStep} loading={loading} className="w-full">Confirm OTP</Button>
            </div>
          </div>
        );

      case 3:
        return (
          <form onSubmit={formik.handleSubmit} className="space-y-6">
            <p className="text-2xl font-semibold text-black my-4">
              Organization Details
            </p>

            <div className="w-full">
         
              <Input 
              placeholder="Input your company name"
              label="Company Name"
              {...formik.getFieldProps("businessName")} />
              {formik.touched.businessName && formik.errors.businessName ? (
                <p className="text-red-900 text-sm">*{formik.errors.businessName}</p>
              ) : null}
            </div>

                   <div className="w-full">
             
              <Input
              label="Phone number"
              placeholder="Enter Phone number"
              {...formik.getFieldProps("phone")} />

              {formik.touched.phone && formik.errors.phone ? (
                <p className="text-red-900 text-sm">*{formik.errors.phone}</p>
              ) : null}
            </div>

            <div className="w-full">
              <label>State</label>
              <select
      
                className="border-2 px-4 py-3 bg-gray-100 rounded-lg w-full h-14"
                {...formik.getFieldProps("state")}
                onChange={(e) => {
                  formik.handleChange(e);
                  formik.setFieldValue("lga", "");
                  formik.setFieldValue("ward", "");
                }}
              >
                <option value="">Select State</option>
                {states && states.map((s:IState) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </select>

                                         {formik.touched.state && formik.errors.state ? (
                <p className="text-red-900 text-sm">*{formik.errors.state}</p>
              ) : null}
            </div>

            <div className="w-full  flex gap-6">
              <div className="flex-1">
                <ParagraphSmall2 content="LGA / LCDA" />
                <select
 
                  className="border-2 px-4 py-3 bg-gray-100 rounded-lg w-full h-14"
                  disabled={!formik.values.state}
                  {...formik.getFieldProps("lga")}
                  onChange={(e) => {
                    formik.handleChange(e);
                    formik.setFieldValue("ward", "");
                  }}
                >
                  <option value="">Select LGA</option>
                  {lgas && lgas.map((l:ILga) => (
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
                  {wards && wards.map((w:IWard) => (
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

     

            <div className="w-full flex flex-col gap-6">
              <div className="flex-1">
    
                <Input type="password"
                label="Password"
                placeholder="Password"

                {...formik.getFieldProps("password")} />
                    {formik.touched.password && formik.errors.password ? (
                <p className="text-red-900 text-sm">*{formik.errors.password}</p>
              ) : null}
              </div>
              <div className="flex-1">
                <Input
                  label="Confirm Password"
                  type="password"
                  placeholder="Confirm Password"
          
                  {...formik.getFieldProps("password_confirmation")}
                />

              {formik.touched.password_confirmation && formik.errors.password_confirmation ? (
                <p className="text-red-900 text-sm">*{formik.errors.password_confirmation}</p>
              ) : null}
              </div>
            </div>

            <div className="w-full pt-6">
              <Button
              className="w-full"
                type="submit"
                disabled={loading || !formik.isValid}
                loading={loading}
              >Confirm </Button>
              <p className="text-center mt-3 text-sm text-gray-600">
                Already have an account?{" "}
                <Link to="/operator-login" className="w-full text-green  hover:underline font-medium">
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
      <div className="hidden lg:block flex-1 bg-green bg-gradient-to-b from-white via-green-50 to-lightGreen/30">
        <div className="flex flex-col justify-center items-center h-screen sticky top-0 p-10">
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
      </div>

      {/* Right – form content */}
      <div className="flex-1 p-12 flex flex-col items-center justify-center mx-4">
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
      {
        successModal && <Modal title="Registration Success" closeButton={false} isOpen={successModal} onClose={() => setSuccessModal(!successModal) }>
           <div className="flex items-center justify-center">
          <img src={success} className="w-30 h-30 object-contain"/>
          </div>
          <h2 className="py-2 text-center text-2xl font-semibold">Registration Successful</h2>
          <p className="text-center pb-4">We will review your account and mail you on your account status after sometime.</p>
          <Button className="w-full" onClick={() => navigate("/")}>Go to Homepage</Button>
        </Modal>
      }
    </div>
  );
};