import React, { useState, useEffect } from "react";
import { TiTick } from "react-icons/ti";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useFormik } from "formik";
import {
  ParagraphExtraSmallError,
  ParagraphSmall2,
} from "../../../Component/Paragraph";
import Input from "../../../Component/InputField";
import { ButtonsPrimary } from "../../../Component/Buttons";
import { AdminLogo } from "../../../Component/AlternateLogos";
import axios from "axios";
import baseURL from "../../../utils/apiConfig";
import { IState } from "../../../models/location.interface";
type Erro = {
  businessName: string;
  phone: string;
  state:string;
  lga: string;
  ward:string;
  password: string;
  password_confirmation:string;
}
const validate = (values) => {
  const errors = {} as Erro;
  if (!values.businessName) {
    errors.businessName = "Business Name is Required";
  }
  if (!values.phone) {
    errors.phone = "Phone is Required";
  }

  if (!values.state) {
      errors.state = 'State is Required';
  }
  if (!values.lga) {
      errors.lga = 'Local Government is Required';
  }

  if (!values.ward) {
    errors.ward = "Ward is Required";
  }

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

  console.log("Validation result:", errors);

  return errors;
};

const AdminReg = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: "",
    email_confrim: "",
  });

  const [inputs, setInputs] = useState(["", "", "", "", "", ""]);
  const inputRefs = [
    React.createRef(),
    React.createRef(),
    React.createRef(),
    React.createRef(),
    React.createRef(),
    React.createRef(),
  ];

  const [enterOtp, setEntereOtp] = useState();
  const [errors, setErrors] = useState({});
  //get all state
  const [allState, setAllState] = useState([]);

  //get all lgas with state id
  const [StateSelectedID, setStateSelectedID] = useState();
  const [lgas, setLgas] = useState([]);

  //get all wards with lga id
  const [LgaSelectedID, setLgaSelectedID] = useState();
  const [wards, setWards] = useState(null);

  const [WardSelectedID, setWardSelectedID] = useState();

  const [selectedState, setSelectedState] = useState(null);
  const [selectedLGA, setSelectedLGA] = useState(null);
  const [selectedWard, setSelectedWard] = useState();

  const [loading, SetLoading] = useState(false);
type Err = {
  email: string;
  email_confrim: string
}
  //validating the email and confirm email form
  const validateForm = () => {
    const newErrors = {} as Err;

    if (!formData.email.trim()) {
      newErrors.email = "Company Email is required";
    }

    if (!formData.email_confrim.trim()) {
      newErrors.email_confrim = "Company Confirm Email is required";
    } else if (formData.email_confrim !== formData.email) {
      newErrors.email_confrim = "Email is not the same as Company Email";
    }

    return newErrors;
  };

  //handle changes for the email and confirm email
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Clear validation error for the changed field
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const handleInputChange = (event, index) => {
    const value = event.target.value;

    if (/^\d*$/.test(value) && value.length <= 1) {
      // Update the input value
      inputs[index] = value;
      setInputs([...inputs]);
      const updatedInputs = [...inputs];
      updatedInputs[index] = value;

      setInputs(updatedInputs);
      setEntereOtp(updatedInputs.join(""));

      // Move to the next input if not at the end
      if (index < inputRefs.length - 1 && value !== "") {
        inputRefs[index + 1].current.focus();
      } else if (index > 0 && value === "") {
        // Move to the previous input if at the beginning and input is empty
        inputRefs[index - 1].current.focus();
      }
    } else if (value === "") {
      // Handle backspace when deleting
      inputs[index] = "";
      setInputs([...inputs]);

      // Move to the previous input if not at the beginning
      if (index > 0) {
        inputRefs[index - 1].current.focus();
      }
    }
  };

  const handleSendEmail = (e) => {
    e.preventDefault();
    SetLoading(true);
    // Here you can submit the form data or perform any additional actions

    const newErrors = validateForm();

    if (Object.keys(newErrors).length === 0) {
      // Form is valid, perform form submission logic here
      axios
        .post(baseURL + "auth/operator/signup/verify-email", formData, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          SetLoading(false);
          const message = res.data.message;
          const errorState = res.data?.errorState;
          if (!errorState) {
            toast.success(message, { autoClose: 5000 });
            setTimeout(() => {
              nextStep();
            }, 5000);
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
    } else {
      // Update state with validation errors
      setErrors(newErrors);
      toast.error("Validation Error", { autoClose: 7000 });
    }
  };

  const handleSendOtp = (e) => {
    e.preventDefault();
    SetLoading(true);
    if (enterOtp.length === 6) {
      // Here you can submit the form data or perform any additional actions
      const data = {
        otp: enterOtp,
        email: formData.email,
      };

      axios
        .post(baseURL + "auth/operator/signup/verify-otp", data, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          SetLoading(false);
          const message = res.data.message;
          const errorState = res.data?.errorState;
          if (!errorState) {
            toast.success(message, { autoClose: 5000 });
            setTimeout(() => {
              nextStep();
            }, 5000);
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
    } else {
      toast.error("Incomplete token", { autoClose: 7000 });
      SetLoading(false);
    }
  };

  const nextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const prevStep = () => {
    setStep((prevStep) => prevStep - 1);
  };

  // Fetch all states
  const HandleFetchState = () => {
    axios
      .get(baseURL + "state/list", {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setAllState(res.data.data);
        console.log("All states fetched", res.data.data);
        
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Fetch LGAs based on selected state ID
  const HandleFetchLGA = (stateId) => {
    axios
      .get(baseURL + "lga/stateid/" + stateId, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log(res.data)
        setLgas(res.data.data);
        // console.log("LGAs fetched", res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Fetch Wards based on selected LGA ID
  const HandleFetchWard = (lgaId) => {
    axios
      .get(baseURL + "ward/lgaid/" + lgaId, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setWards(res.data.data);
        console.log("Wards fetched", res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Trigger the state fetch on page load
  useEffect(() => {
    HandleFetchState();
  }, []);

  // Handle State change
  const handleStateChange = (e) => {
    const stateId = parseInt(e.target.value, 10);
    setStateSelectedID(stateId);

    const selectedState = allState.find((state) => state.id === stateId);
    setSelectedState(selectedState); // Set the selected state object
    setLgas([]); // Reset LGAs when a new state is selected
    setSelectedLGA(null); // Reset selected LGA
    setWards([]); // Reset Wards when a new state is selected

    if (stateId) {
      HandleFetchLGA(stateId); // Fetch LGAs for the selected state
    }
    // console.log("Selected State:", selectedState);
  };

  // Handle LGA change
  const handleLGAChange = (e) => {
    const lgaId = parseInt(e.target.value, 10);
    setLgaSelectedID(lgaId);

    const selectedLGA = lgas.find((lga) => lga.id === lgaId);
    setSelectedLGA(selectedLGA); // Set the selected LGA object
    setWards([]); // Reset wards when a new LGA is selected

    if (lgaId) {
      HandleFetchWard(lgaId); // Fetch wards for the selected LGA
    }
    // console.log("Selected LGA:", selectedLGA);
  };

  // Handle Ward change (optional if you need to handle something for wards)
  const handleWardChange = (e) => {
    const wardId = parseInt(e.target.value, 10);
    setWardSelectedID(wardId);

    const selectedWard = wards.find((ward) => ward.id === wardId);
    setSelectedWard(selectedWard); // Set the selected ward object

    // console.log("Selected Ward:", selectedWard);
  };

  const someValues = {
    email: formData.email, // ensure formData has the correct email
  };

  const formik = useFormik({
    initialValues: {
      businessName: "",
      phone: "",
      state: "", // Include state in formik's values
      lga: "", // Include lga in formik's values
      ward: "", // Ensure ward is part of formik values
      password: "",
      password_confirmation: "",
    },
    validate,
    onSubmit: (values) => {
      // console.log("got here", values);
      SetLoading(true);
      const data = {
        ...values,
        ...someValues,
      };

      // console.log("data", data);
      // navigate("/dashboard")
      axios
        .post(baseURL + "auth/operator/signup/create-account", data, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          const message = res.data?.message;
          const errorState = res.data?.errorState;
          if (!errorState) {
            toast.success(message, { autoClose: 5000 });
            setTimeout(() => {
              SetLoading(false);
              navigate("/admin-login");
            }, 5000);
          } else {
            toast.error(message, { autoClose: 5000 });
          }
        })
        .catch((err) => {
          SetLoading(false);
          const message = err.response.data?.message;
          toast.error(message, { autoClose: 7000 });
        });
    },
  });

  const renderRegisterForm = () => {
    // console.log("some values", someValues);
    // console.log("formik", formik);
    const handleSubmit = (e) => {
      e.preventDefault(); // Prevent form refresh
      formik.handleSubmit(); // Ensure formik submission works
    };
    switch (step) {
      case 1:
        return (
          <div>
            <p className="text-2xl font-Poppins font-semibold not-italic text-black leading-8 my-4">
              Register to{" "}
              <span className="text-green">Wasteefy Management System</span>
            </p>

            <form action="" onSubmit={handleSendEmail}>
              <div className="w-full lg:w-4/5">
                <ParagraphSmall2 content={"Company Email"} />
                <Input
                  type={"text"}
                  value={formData.email}
                  onChange={handleChange}
                  name={"email"}
                />
                <ParagraphExtraSmallError content={errors.email} />
              </div>
              <div className="w-full lg:w-4/5">
                <ParagraphSmall2 content={"Confirm Company Email"} />
                <Input
                  type={"text"}
                  value={formData.email_confrim}
                  onChange={handleChange}
                  name={"email_confrim"}
                />
                <ParagraphExtraSmallError content={errors.email_confrim} />
              </div>
              <div className="w-full lg:w-4/5 my-14">
                <ButtonsPrimary
                  name={"Confirm"}
                  onClick={handleSendEmail}
                  loading={loading}
                />
                {/* <ButtonsPrimary name={"Confirm"} type={'submit'} /> */}
              </div>
            </form>
          </div>
        );
      case 2:
        return (
          <div>
            <p className="text-2xl font-Poppins font-semibold not-italic text-black leading-8 my-4">
              Register to{" "}
              <span className="text-green">Wasteefy Management System</span>
            </p>

            {/* <div className="w-full lg:w-4/5">
                            <ParagraphSmall2 content={"Input the 4 digit code sent to your mail"} />
                            <Input name={'enterOtp'} type={'number'} value={enterOtp} onChange={(e) => setEntereOtp(e.target.value)} />
                        </div> */}
            <div className="lg:mx-2 my-10 flex justify-start">
              <form className="space-x-2">
                {inputs.map((value, index) => (
                  <input
                    key={index}
                    type="text"
                    value={value}
                    onChange={(e) => handleInputChange(e, index)}
                    className="rounded-lg border px-5 border-gray w-14 h-14 text-xl font-bold text-gray  focus:ring-gray focus:outline-none focus:ring-2 focus:border-transparent lg:w-14 lg:h-14"
                    ref={inputRefs[index]}
                  />
                ))}
              </form>
            </div>
            <div className="w-full lg:w-4/5 my-14">
              <ButtonsPrimary
                name={"Confrim"}
                onClick={handleSendOtp}
                loading={loading}
              />
            </div>
          </div>
        );
      case 3:
        return (
          <div>
            <p className="text-2xl font-Poppins font-semibold not-italic text-black leading-8 my-4">
              Register to{" "}
              <span className="text-green">Wasteefy Management System</span>
            </p>
            <form onSubmit={handleSubmit}>
              <div className="w-full lg:w-4/5">
                <ParagraphSmall2 content={"Operators Business Name"} />
                <Input
                  type={"text"}
                  name={"businessName"}
                  onChange={formik.handleChange}
                  value={formik.values.businessName}
                />
                {formik.errors.businessName ? (
                  <ParagraphExtraSmallError
                    content={formik.errors.businessName}
                  />
                ) : null}
              </div>

              {/* State Selection */}
              <div className="w-full lg:w-4/5">
                <ParagraphSmall2 content={"State"} />
                <select
                  name="state"
                  id="state"
                  className="border-2 px-2 py-3 pl-5 bg-grayInput shadow-sm rounded-lg block font-Poppins w-full h-14 text-black text-base mt-1"
                  onChange={(e) =>{
                    formik.setFieldValue("state", e.target.value)
                    handleStateChange(e)
                  }

                  } // Set formik field value manually
                  value={formik.values.state} // Bind to formik values
                >
                  <option value="">Select State</option>
                  {allState && allState.map((state:IState) => (
                    <option key={state.id} value={state.id}>
                      {state.name}
                    </option>
                  ))}
                </select>
                {formik.errors.state && (
                  <ParagraphExtraSmallError content={formik.errors.state} />
                )}
              </div>
              <div className="w-full lg:w-4/5 flex gap-10">
                <div className="w-3/6">
                  <ParagraphSmall2 content={"LGA/LCDA"} />
                  <select
                    name="lga"
                    id="lga"
                    className="border-2 px-2 py-3 pl-5 bg-grayInput shadow-sm rounded-lg block font-Poppins w-full h-14 text-black text-base mt-1"
                    onChange={(e) =>{
                      formik.setFieldValue("lga", e.target.value)
                      handleLGAChange(e)
                    }
                    } // Manually set LGA field value
                    value={formik.values.lga} // Bind LGA to formik values
                    disabled={!StateSelectedID} // Disable if no state is selected
                  >
                    <option value="">Select LGA/LCDA</option>
                    {lgas?.map((lga) => (
                      <option key={lga.id} value={lga.id}>
                        {lga.name}
                      </option>
                    ))}
                  </select>
                  {formik.errors.lga && (
                    <ParagraphExtraSmallError content={formik.errors.lga} />
                  )}
                </div>

                {/* Ward Selection */}
                <div className="w-3/6">
                  <ParagraphSmall2 content={"Wards"} />
                  <select
                    name="ward"
                    id="ward"
                    className="border-2 px-2 py-3 pl-5 bg-grayInput shadow-sm rounded-lg block font-Poppins w-full h-14 text-black text-base mt-1"
                    onChange={(e) =>{ 
                      formik.setFieldValue("ward", e.target.value);
                      handleWardChange(e);
                    }
                    } // Manually set Ward field value
                    value={formik.values.ward} // Bind Ward to formik values
                    disabled={!LgaSelectedID} // Disable if no LGA is selected
                  >
                    <option value="">Select Ward</option>
                    {wards?.map((ward) => (
                      <option key={ward.id} value={ward.id}>
                        {ward.name}
                      </option>
                    ))}
                  </select>

                  {formik.errors.ward && (
                    <ParagraphExtraSmallError content={formik.errors.ward} />
                  )}
                </div>
              </div>

              {/* Phone Number */}
              <div className="w-full lg:w-4/5">
                <ParagraphSmall2 content={"Phone Number"} />
                <Input
                  name={"phone"}
                  type={"text"}
                  onChange={formik.handleChange}
                  value={formik.values.phone} // Bind phone to formik values
                />
                {formik.errors.phone ? (
                  <ParagraphExtraSmallError content={formik.errors.phone} />
                ) : null}
              </div>

              {/* Password Fields */}
              <div className="w-full lg:w-4/5 flex gap-10">
                <div className="w-3/6">
                  <ParagraphSmall2 content={"Password"} />
                  <Input
                    onChange={formik.handleChange}
                    value={formik.values.password} // Bind password to formik values
                    name={"password"}
                    type={"password"}
                  />
                  {formik.errors.password ? (
                    <ParagraphExtraSmallError
                      content={formik.errors.password}
                    />
                  ) : null}
                </div>

                <div className="w-3/6">
                  <ParagraphSmall2 content={"Confirm password"} />
                  <Input
                    onChange={formik.handleChange}
                    value={formik.values.password_confirmation} // Bind password confirmation to formik values
                    name={"password_confirmation"}
                    type={"password"}
                  />
                  {formik.errors.password_confirmation ? (
                    <ParagraphExtraSmallError
                      content={formik.errors.password_confirmation}
                    />
                  ) : null}
                </div>
              </div>
              <div className="w-full lg:w-4/5 my-14 border border-red-700">
                <ButtonsPrimary
                  name={"Sign Up"}
                  type={"Submit"}
                  onClick={handleSubmit}
                  loading={loading}
                />
                <div className="flex justify-center mt-2">
                  <p className="text-sm font-inter font-normal not-italic text-gray leading-4">
                    Already have an account yet?{" "}
                    <Link to="/admin-login" className="text-green"  >
                      Login
                    </Link>
                  </p>
                </div>

                <ButtonsPrimary
                  name={"Test Button"}
                  type={"submit"}
                  loading={loading}
                />
              </div>
            </form>
            {/* <button onClick={prevStep}>Previous</button> */}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <main className="p-10">
      <div className="flex items-center justify-center mt-10 lg:justify-start">
        <AdminLogo />
      </div>
      <div className="flex flex-col lg:flex-row justify-around py-2">
        <div className="hidden lg:block w-2/5">
          {/* <img src="Images/admin.png" alt="icon" srcSet="" /> */}
          <ToastContainer />
          <div className="py-10 px-10 flex gap-3">
            <div className="">
              <div className="rounded-full bg-grayRounded w-12 h-12 px-5 py-3 text-white">
                1
              </div>
              <div className="w-0.5 h-36 bg-grayRounded ml-5"></div>
              <div
                className={`rounded-full bg-grayRounded w-12 h-12 px-5 py-3 text-white ${
                  step >= 2 ? "bg-grayRounded" : "opacity-25"
                } `}
              >
                2
              </div>
              <div className="w-0.5 h-36 bg-grayRounded ml-5"></div>
              <div
                className={`rounded-full bg-grayRounded w-12 h-12 px-5 py-3 text-white ${
                  step != 3 ? "opacity-25" : "bg-grayRounded"
                } `}
              >
                3
              </div>
            </div>
            <div className="">
              <p className="text-3xl font-Poppins font-semibold not-italic text-grayRounded leading-8 m-4">
                Personal Details
              </p>
              <div className="flex gap-3">
                <div className="rounded-full h-6 w-6 border-4 border-grayRounded ">
                  <TiTick className="text-grayRounded" />
                </div>
                <p className="text-2xl font-Poppins font-light not-italic text-grayRounded leading-4">
                  verify email{" "}
                </p>
              </div>
              <div className="mt-28">
                <p
                  className={`text-3xl font-Poppins font-semibold not-italic text-grayRounded leading-8 m-4 ${
                    step >= 2 ? " text-grayRounded" : "opacity-25"
                  }`}
                >
                  Verification OTP
                </p>
                <div className="flex gap-3">
                  <div
                    className={`rounded-full h-6 w-6 border-4 border-grayRounded ${
                      step >= 2 ? "border-grayRounde" : "opacity-25"
                    }`}
                  >
                    <TiTick
                      className={`text-grayRounded  ${
                        step >= 2 ? "block" : "hidden"
                      }`}
                    />
                  </div>
                  <p
                    className={`text-2xl font-Poppins font-light not-italic text-grayRounded leading-4 ${
                      step >= 2 ? "text-grayRounded" : "opacity-25"
                    }`}
                  >
                    Enter the otp sent to your mail{" "}
                  </p>
                </div>
              </div>
              <div className="mt-28">
                <p
                  className={`text-3xl font-Poppins font-semibold not-italic text-grayRounded leading-8 m-4 ${
                    step != 3 ? "opacity-25" : "text-grayRounded"
                  }`}
                >
                  Organisation Details
                </p>
                <div className="flex gap-3">
                  <div
                    className={`rounded-full h-6 w-6 border-4 border-grayRounded ${
                      step != 3 ? "opacity-25" : "border-grayRounded"
                    }`}
                  >
                    <TiTick
                      className={`text-grayRounded  ${
                        step != 3 ? "hidden" : "block"
                      }`}
                    />
                  </div>
                  <p
                    className={`text-2xl font-Poppins font-light not-italic text-grayRounded leading-4 ${
                      step != 3 ? "opacity-25" : "text-grayRounded"
                    }`}
                  >
                    fill in the required information{" "}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="text-center w-full lg:text-start lg:w-[45%]">
          {renderRegisterForm()}
        </div>
      </div>
    </main>
  );
};

export default AdminReg;
