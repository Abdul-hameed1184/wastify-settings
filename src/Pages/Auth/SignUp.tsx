import React, { useState } from 'react'
import { TiTimes } from "react-icons/ti"
import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik';
import { ToastContainer, toast } from "react-toastify";
import { Paragraph2Xl, ParagraphExtraSmallError, ParagraphLargeWhite, ParagraphSmall } from '../../Component/Paragraph'
import { InputFieldSecondary } from '../../Component/InputField'
import { ButtonsPrimary } from '../../Component/Buttons'
import baseURL from '../../utils/apiConfig';
import axios from 'axios';

const validate = values => {
    const errors = {};
    if (!values.phone) {
        errors.phone = 'Phone Number is Required';
    } else if ((values.phone.length > 11) || (values.phone.length < 11)) {
        errors.phone = 'Phone Must be 11 characters';
    }

    return errors;
};

const SignUp = () => {
    const navigate = useNavigate();
    const [loading, SetLoading] = useState(false);

    const formik = useFormik({
        initialValues: {
            phone: '',
        },
        validate,
        onSubmit: values => {
            SetLoading(true)
            axios.post(baseURL + 'auth/customer/signup/verify-phone', values, {
                headers: {
                    "Content-Type": "application/json",
                },
            })
                .then((res) => {
                    // console.log(res);
                    const message = res.data.message;
                    const errorState = res.data?.errorState;
                    if (!errorState) {
                        toast.success(message, { autoClose: 5000 });
                        setTimeout(() => {
                            SetLoading(false)
                            navigate("/verifyotp")
                            localStorage.setItem("phone", values.phone);
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

        },
    });
    return (
        <main className=' md:bg-green md:h-screen md:bg-bgdesktop-pattern md:bg-cover  '>
            <div className="md:mt-0 md:p-10 md:flex md:justify-between">
                <ToastContainer />
                <div className="hidden md:block md:p-10">
                    <ParagraphLargeWhite content={"Sign Up"} />
                </div>
                <div className="mt-10 md:mt-3 md:w-2/6 md:bg-white md:border-transparent md:p-5 md:rounded-lg">
                    <div className="flex justify-end mr-8 md:mr-2">
                        <Link to="/" smooth="true" duration={500}>
                            <TiTimes size={24} className='bg-green text-white rounded-2xl' />
                        </Link>
                    </div>
                    <div className="mt-10 md:text-center">
                        <Paragraph2Xl content={"Create Account"} />
                        <ParagraphSmall content={"Enter your phone number to receive code"} />
                        <form onSubmit={formik.handleSubmit}>
                            <div className="m-4">
                                <InputFieldSecondary placeholder={"Phone Number"} type={"tel"} name={"phone"} onChange={formik.handleChange} value={formik.values.phone} error={formik.errors.phone ? true : false} />
                                {formik.errors.phone ? <ParagraphExtraSmallError content={formik.errors.phone} /> : null}
                            </div>
                            <div className="mx-4 my-16 md:my-20">
                                <ButtonsPrimary type={"submit"} name={"Send Code"} loading={loading} />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default SignUp