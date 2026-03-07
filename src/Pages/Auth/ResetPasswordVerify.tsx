import React, { useState } from 'react';
import { toast } from "react-toastify";
import { Modal } from '../../Component/Modal/Modal';
import { verifyOTP } from '../../api/auth.service';
import { Button } from '../../Component/Button';
import ResetPasswordOTP from './ResetPasswordOTP';

const ResetPasswordVerify:React.FC<{ phone:string; openOTPModal: boolean; handleOpenOTPModal: () => void }> = ({ phone, openOTPModal, handleOpenOTPModal }) => {
    const [enteredOTP, setEnteredOTP] = useState('');
    const [otperror, setOtpError] = useState(false);
    const [customerId, setCustomerId] = useState('');
    const [ openResetPasswordModal, setOpenResetPasswordModal ] = useState(false);
    const [inputs, setInputs] = useState(['', '', '', '']);
    const inputRefs = [React.createRef(), React.createRef(), React.createRef(), React.createRef()];

    const [loading, SetLoading] = useState(false);



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


    const HandleSendOtp = async () => {
        try{
        if (enteredOTP.length === 4) {
            setOtpError(false);
            SetLoading(true)
            const res = await verifyOTP(phone, enteredOTP);
                    SetLoading(false)
                    const message = res.data?.message;
                    const errorState = res.data?.errorState;
                    const data = res.data?.data;
                    setCustomerId(data);
                    console.log(data)
                    if (!errorState) {
                        toast.success(message, { autoClose: 5000 });
                        setTimeout(() => {
                            setOpenResetPasswordModal(true);
            
                        }, 3000)
                    // navigate("/reset-password", { state: { data: data, otp: enteredOTP } })
                    } else {
                        toast.error(message, { autoClose: 5000 });
                    }

                            } else {
            SetLoading(false)
            setOtpError(true);

        }



                }catch(err) {
                    // console.log(err);
                    SetLoading(false)
                    const message = err.response.data?.message;
                    toast.error(message, { autoClose: 7000 });
                };


        // navigate("/createaccount")
    }

    return (
        <Modal title={"Verify OTP"} position="right" className='mt-4 mx-4 md:m-0 md:bg-white md:h-screen md:bg-cover' 
        isOpen={openOTPModal} 
        onClose={handleOpenOTPModal}
        >
    


                        <p> {"Please enter your phone number to receive verification Code."} </p>

                        <div className="mx-4 my-10 flex justify-center">

                            <form className="space-x-4">
                                {inputs.map((value, index) => (
                                    <input
                                        key={index}
                                        type="text"
                                        value={value}
                                        onChange={(e) => handleInputChange(e, index)}
                                        className="rounded-lg border px-5 border-green w-10 h-10 text-xl font-bold  text-black  focus:ring-gray focus:outline-none focus:ring-2 focus:border-transparent md:w-14 md:h-14"
                                        ref={inputRefs[index]}
                                    />
                                ))}
                            </form>

                        </div>
                        <div className='flex justify-between'><span></span><span className='text-green'>Resend OTP</span></div>
                        <div className="mx-4 my-20 md:my-14">
                            <Button onClick={HandleSendOtp} loading={loading}>{"Verify Code"}</Button>
                        </div>

   
                {
                    openResetPasswordModal && <ResetPasswordOTP customerId={customerId} otp={enteredOTP} openResetPasswordModal={openResetPasswordModal} handleOpenResetPasswordModal={() =>setOpenResetPasswordModal(!openResetPasswordModal)} />
                }

        </Modal>
    )
}

export default ResetPasswordVerify