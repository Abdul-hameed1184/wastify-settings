import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { ToastContainer, toast } from "react-toastify";
import axios from 'axios';
import baseURL from '../../utils/apiConfig';
import { LogoWhite } from '../../Component/Logo'
import { Paragraph2Xl, ParagraphSmall } from '../../Component/Paragraph';
import { ButtonsPrimary } from '../../Component/Buttons';

const ResetPasswordVerify = () => {
    const navigate = useNavigate();
    const [enteredOTP, setEnteredOTP] = useState('');
    const [otperror, setOtpError] = useState(false);
    const [inputs, setInputs] = useState(['', '', '', '']);
    const inputRefs = [React.createRef(), React.createRef(), React.createRef(), React.createRef()];

    const [loading, SetLoading] = useState(false);

    const location = useLocation();
    const result = location.state && location.state.data;
    // const result = "08177207125";

    const handleInputChange = (event, index) => {
        const value = event.target.value;

        if (/^\d*$/.test(value) && value.length <= 1) {
            // Update the input value
            inputs[index] = value;
            setInputs([...inputs]);
            const updatedInputs = [...inputs];
            updatedInputs[index] = value;

            setInputs(updatedInputs);
            setEnteredOTP(updatedInputs.join(''));

            // Move to the next input if not at the end
            if (index < inputRefs.length - 1 && value !== '') {
                inputRefs[index + 1].current.focus();
            } else if (index > 0 && value === '') {
                // Move to the previous input if at the beginning and input is empty
                inputRefs[index - 1].current.focus();
            }
        } else if (value === '') {
            // Handle backspace when deleting
            inputs[index] = '';
            setInputs([...inputs]);

            // Move to the previous input if not at the beginning
            if (index > 0) {
                inputRefs[index - 1].current.focus();
            }
        }
    };


    const HandleSendOtp = () => {

        if (enteredOTP.length === 4) {
            setOtpError(false);
            SetLoading(true)

            axios.get(`${baseURL}auth/customer/verify-reset-password/${result}/${enteredOTP}`, {
                headers: {
                    "Content-Type": "application/json",
                },
            })
                .then((res) => {
                    // console.log(res);
                    SetLoading(false)
                    const message = res.data?.message;
                    const errorState = res.data?.errorState;
                    const data = res.data?.data;
                    if (!errorState) {
                        toast.success(message, { autoClose: 5000 });
                        setTimeout(() => {
                            navigate("/reset-password", { state: { data: data, otp: enteredOTP } })
                        }, 3000)
                    } else {
                        toast.error(message, { autoClose: 5000 });
                    }



                })
                .catch((err) => {
                    // console.log(err);
                    SetLoading(false)
                    const message = err.response.data?.message;
                    toast.error(message, { autoClose: 7000 });
                });
        } else {
            SetLoading(false)
            setOtpError(true);

        }

        // navigate("/createaccount")
    }
    return (
        <main className='mt-4 mx-4 md:m-0 md:bg-green md:h-screen md:bg-cover'>
            <div className="md:mt-0 md:py-5 md:px-10 ">
                <ToastContainer />
                <div className=" flex justify-start w-20 h-20">
                    <LogoWhite />
                </div>
                <div className=" flex justify-center items-center mt-20">
                    <div className="mt-10 md:mt-3 md:w-2/6 md:bg-white md:border-transparent md:p-5 md:rounded-lg">

                        <Paragraph2Xl content={"Reset Password"} />
                        <ParagraphSmall content={"Please enter your phone number to receive verification Code."} />

                        <div className="mx-4 my-10 flex justify-center">

                            <form className="space-x-4">
                                {inputs.map((value, index) => (
                                    <input
                                        key={index}
                                        type="text"
                                        value={value}
                                        onChange={(e) => handleInputChange(e, index)}
                                        className="rounded-lg border px-5 border-gray w-10 h-10 text-xl font-bold text-gray  focus:ring-gray focus:outline-none focus:ring-2 focus:border-transparent md:w-14 md:h-14"
                                        ref={inputRefs[index]}
                                    />
                                ))}
                            </form>

                        </div>
                        <div className="mx-4 my-20 md:my-14">
                            <ButtonsPrimary name={"Verify Code"} onClick={HandleSendOtp} loading={loading} />
                        </div>

                    </div>
                </div>
            </div>

        </main>
    )
}

export default ResetPasswordVerify