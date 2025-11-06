import React, { useState } from 'react'
import { useFormik } from 'formik';
import { ToastContainer, toast } from "react-toastify";
import axios from 'axios';
import baseURL from '../../utils/apiConfig';
import { LogoWhite } from '../../Component/Logo';
import { Paragraph2Xl, ParagraphExtraSmallError, ParagraphSmall } from '../../Component/Paragraph';
import { ButtonsPrimary } from '../../Component/Buttons';
import { InputFieldSecondaryGreen } from '../../Component/InputField';
import { useNavigate } from 'react-router-dom';

const validate = values => {
    const errors = {};

    if (!values.phone) {
        errors.phone = 'Phone Number is Required';
    } else if ((values.phone.length > 11) || (values.phone.length < 11)) {
        errors.phone = 'Phone Must be 11 characters';
    }

    return errors;

};

const SendRestLink = () => {
    const [loading, SetLoading] = useState(false);
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            phone: '',
        },
        validate,
        onSubmit: values => {
            SetLoading(true);
            // console.log(data);
            axios.post(baseURL + 'auth/customer/forgot-Password', values, {
                headers: {
                    "Content-Type": "application/json",
                },
            })
                .then((res) => {
                    console.log(res);
                    SetLoading(false)
                    const message = res.data?.message;
                    const errorState = res.data?.errorState;
                    const data = res.data?.data;
                    console.log(data)
                    if (!errorState) {
                        toast.success(message, { autoClose: 5000 });
                        setTimeout(() => {
                            navigate("/forget-password-verify", { state: { data: data } })
                        }, 3000)
                    } else {
                    
                        toast.error(message, { autoClose: 5000 });
                    }
                })
                .catch((err) => {
                    console.log(err);
                    SetLoading(false)
                    const message = err.response.data?.message;
                    toast.error(message, { autoClose: 7000 });
                });

        },
    });
    return (
        <main className='mt-4 mx-4 md:m-0 md:bg-green md:h-screen md:bg-cover'>
            <div className="md:mt-0 md:py-5 md:px-10 ">
                <ToastContainer />
                <div className=" flex justify-start w-20 h-20">
                    <LogoWhite />
                </div>
                <div className=" flex justify-center items-center mt-20">
                    <div className="mt-10 md:mt-3 md:w-2/6 md:bg-white md:border-transparent md:p-5 md:rounded-lg">
                        <div className="mt-2 ">
                            <form onSubmit={formik.handleSubmit}>
                                <Paragraph2Xl content={"Reset Password"} />
                                <ParagraphSmall content={"Please enter your phone number to receive verification Code."} />
                                <div className="m-4">
                                <InputFieldSecondaryGreen placeholder={"Phone Number"} type={"tel"} name={"phone"} onChange={formik.handleChange} value={formik.values.phone} error={formik.errors.phone ? true : false} />
                                {formik.errors.phone ? <ParagraphExtraSmallError content={formik.errors.phone} /> : null}
                            </div>
                                <div className="mx-4 my-8">
                                    <ButtonsPrimary type={"submit"} name={"Set Password"} loading={loading} />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </main>
    )
}

export default SendRestLink