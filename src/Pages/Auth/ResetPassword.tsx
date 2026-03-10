import { useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useFormik } from 'formik';
import { toast } from "react-toastify";
import axios from 'axios';
import baseURL from '../../utils/apiConfig';
import { Paragraph2Xl, ParagraphExtraSmallError, ParagraphSmall } from '../../Component/Paragraph';
import { ButtonsPrimary } from '../../Component/Buttons';
import { useLocation, useNavigate } from 'react-router-dom';
import Input from '../../Component/InputField';
import { Button } from '../../Component/Button';
type Err ={
    password: string;
    password_confirmation: string;
}
const validate = values => {
    const errors:Err = {} as Err;

    if (!values.password) {
        errors.password = 'Password is Required';
    } else if (values.password.length < 8) {
        errors.password = 'Password name must be greater than 8 characters';
    }

    if (!values.password_confirmation) {
        errors.password_confirmation = 'Password Confirmarion is Required';
    } else if (values.password_confirmation.length < 8) {
        errors.password_confirmation = 'Password Confirmation must be greater than 8 characters'
    } else if (values.password_confirmation !== values.password) {
        errors.password_confirmation = "Passwords don't match";
    }


    return errors;
};
const ResetPassword = () => {
    const [istoggle, setIstoggle] = useState(false);
    const [istoggleConfirm, setIstoggleConfirm] = useState(false);
    const navigate = useNavigate();
    const [loading, SetLoading] = useState(false);

    const location = useLocation();
    const CustID = location.state && location.state.data;
    const otp = location.state && location.state.otp;

    const toggle = () => {
        setIstoggle((prev) => !prev);
    };

    const toggleConfirmPassword = () => {
        setIstoggleConfirm((prev) => !prev);
    };

    const formik = useFormik({
        initialValues: {
            password: '',
            password_confirmation: '',
        },
        validate,
        onSubmit: values => {

            SetLoading(true);
            // console.log(data);
            axios.put(`${baseURL}auth/customer/password-reset/${CustID}/${otp}`, values, {
                headers: {
                    "Content-Type": "application/json",
                },
            })
                .then((res) => {
                    console.log(res);
                    SetLoading(false)
                    const message = res.data?.message;
                    const errorState = res.data?.errorState;
                    if (!errorState) {
                        toast.success(message, { autoClose: 5000 });
                        setTimeout(() => {
                            navigate("/login")
                        }, 3000)
                    } else {
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
        <main className='mt-4 mx-4 md:m-0 md:bg-green md:h-screen md:bg-cover'>
            <div className="md:mt-0 md:py-5 md:px-10 ">

                <div className=" flex justify-center items-center mt-20">
                    <div className="mt-10 md:mt-3 md:w-2/6 md:bg-white md:border-transparent md:p-5 md:rounded-lg">
                        <div className="mt-2 ">
                            <form onSubmit={formik.handleSubmit}>
                                <p className="text-2xl font-semibold">Set new password</p>
                                <p className="text-sm text-gray-500">Create a new password that would be used for authenticating all your apps.</p>
                                <div className="my-4 mx-4 relative">
                                    <Input type={istoggle ? 'text' : 'password'}
                                        placeholder="Password"
                                        name={"password"} onChange={formik.handleChange} value={formik.values.password} />
                                    <button
                                        className='absolute top-5 right-6'
                                        onClick={toggle}
                                        type='button'
                                    >
                                        {istoggle ? <FaEye /> : <FaEyeSlash />}
                                    </button>
                                        
                                                                   </div>

                                <div className="my-4 mx-4 relative">
                                    <Input type={istoggleConfirm ? 'text' : 'password'}
                                        placeholder="Confirm Password"
                                        name={"password_confirmation"} onChange={formik.handleChange} value={formik.values.password_confirmation} />
                                    <button
                                        className='absolute top-5 right-6'
                                        onClick={toggleConfirmPassword}
                                        type='button'
                                    >
                                        {istoggleConfirm ? <FaEye /> : <FaEyeSlash />}
                                    </button>
                                    {formik.errors.password_confirmation ? (
                  <p className="text-red-900 text-sm">*{formik.errors.password_confirmation}</p>
                ) : null}
                                                                    </div>
                                <div className="mx-4 my-8 w-full">
                                    <Button type={"submit"} loading={loading}>Set Password</Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </main>
    )
}

export default ResetPassword