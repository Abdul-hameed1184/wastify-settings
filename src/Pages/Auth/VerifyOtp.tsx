import React, { useState } from 'react'
import { IoChevronBack } from "react-icons/io5";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import { Paragraph2Xl, ParagraphExtraSmallError, ParagraphLargeWhite, ParagraphSmall } from '../../Component/Paragraph';
import { ButtonsPrimary } from '../../Component/Buttons';
import baseURL from '../../utils/apiConfig';

const VerifyOtp = () => {
    const navigate = useNavigate();
    const [enteredOTP, setEnteredOTP] = useState('');
    const [otperror, setOtpError] = useState(false);
    const [inputs, setInputs] = useState(['', '', '', '']);
    const inputRefs = [React.createRef(), React.createRef(), React.createRef(), React.createRef()];

    const [loading, SetLoading ]= useState(false);

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
            const phone = localStorage.getItem('phone');

            const data = {
                "otp": enteredOTP,
                "phone": phone,
            };
            axios.post(baseURL + 'auth/customer/signup/verify-otp', data, {
                headers: {
                    "Content-Type": "application/json",
                },
            })
                .then((res) => {
                    // console.log(res);
                    SetLoading(false)
                    const message = res.data?.message;
                    const errorState = res.data?.errorState;
                    if (!errorState) {
                        toast.success(message, { autoClose: 5000 });
                        setTimeout(() => { 
                            navigate("/createaccount")
                        }, 3000)
                    }else{
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
        <main className='mt-10 md:mt-0 md:bg-green md:h-screen md:bg-bgdesktop-pattern md:bg-cover'>
            <ToastContainer />
            <div className="md:mt-0 md:p-10 md:flex md:justify-between ">
                <div className="hidden md:block md:p-10">
                    <ParagraphLargeWhite content={"Sign Up"} />
                </div>
                <div className=" md:mt-3 md:w-2/6 md:bg-white md:border-transparent md:p-5 md:rounded-lg">

                    <div className="flex justify-start mt-10 ml-6 md:mt-3 md:ml-3">
                        <Link to="/signup" smooth="true" duration={500}>
                            <IoChevronBack size={28} className='bg-green text-white rounded-2xl' />
                        </Link>
                    </div>
                    <div className="mt-8 text-center">
                        <Paragraph2Xl content={"Create Account"} />
                        <ParagraphSmall content={"Enter 4 digit code sent to you"} />
                    </div>
                    {
                        otperror ? <ParagraphExtraSmallError content={"Please enter the complete OTP code"} /> : null
                    }
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
        </main>
    )
}

export default VerifyOtp