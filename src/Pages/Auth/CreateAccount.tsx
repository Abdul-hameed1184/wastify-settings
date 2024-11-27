import React, { useState } from 'react'
import { IoChevronBack } from "react-icons/io5";
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useFormik } from 'formik';
import { ToastContainer, toast } from "react-toastify";
import axios from 'axios';
import { Paragraph2Xl, ParagraphExtraSmallError, ParagraphLargeWhite, ParagraphSmall } from '../../Component/Paragraph';
import { InputFieldSecondaryGreen } from '../../Component/InputField';
import { ButtonsPrimary } from '../../Component/Buttons';
import styles from './Checkbox.module.css';
import baseURL from '../../utils/apiConfig';

const validate = values => {
    const errors = {};

    if (!values.firstname) {
        errors.firstname = 'First Name is Required';
    } else if (values.firstname.length > 30) {
        errors.firstname = 'First name must be lesser than 30 characters';
    }

    if (!values.lastname) {
        errors.lastname = 'Last Name is Required';
    } else if (values.lastname.length > 30) {
        errors.lastname = 'Last name must be lesser than 30 characters';
    }

    if (!values.email) {
        errors.email = 'Email is Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
    }

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

const CreateAccount = () => {
    const navigate = useNavigate();
    const [istoggle, setIstoggle] = useState(false);
    const [istoggleConfirm, setIstoggleConfirm] = useState(false);

    const [loading, SetLoading] = useState(false);

    const toggle = () => {
        setIstoggle((prev) => !prev);
    };

    const toggleConfirmPassword = () => {
        setIstoggleConfirm((prev) => !prev);
    };


    const someValues = {
        phone: localStorage.getItem('phone')
    }


    const formik = useFormik({
        initialValues: {
            firstname: '',
            lastname: '',
            email: '',
            password: '',
            password_confirmation: '',
        },
        validate,
        onSubmit: values => {
            // alert(JSON.stringify(values, null, 2));
            // navigate("/propertyunit")
            const data = {
                ...values,
                ...someValues
            }
            SetLoading(true);
            // console.log(data);
            axios.post(baseURL + 'auth/customer/signup/create-account', data, {
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
                            navigate("/propertyunit")
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
        <main className='mt-4 mx-4 md:m-0 md:bg-green md:h-screen md:bg-bgdesktop-pattern md:bg-cover'>
            <div className="md:mt-0 md:py-5 md:px-10 md:flex md:justify-between">
                <ToastContainer />
                <div className="hidden md:block md:p-10">
                    <ParagraphLargeWhite content={"Sign Up"} />
                </div>

                <div className="md:mt-1 md:w-2/6 md:bg-white md:border-transparent md:p-5 md:rounded-lg">
                    <div className="flex justify-start mt-6 ml-6 md:mt-1 md:ml-3">
                        <Link to="/signup" smooth="true" duration={500}>
                            <IoChevronBack size={28} className='bg-green text-white rounded-2xl' />
                        </Link>
                    </div>
                    <div className="mt-4 md:mt-2 ">
                        <Paragraph2Xl content={"Create Account"} />
                        <ParagraphSmall content={"Fill in your details to create an account"} />
                    </div>
                    <div className="mx-4 mt-8 md:mt-4">
                        <form onSubmit={formik.handleSubmit}>
                            <div className="mt-4">
                                <InputFieldSecondaryGreen placeholder={"First Name"} type={"text"} name={"firstname"} onChange={formik.handleChange} value={formik.values.firstname} />

                                {formik.errors.firstname ? <ParagraphExtraSmallError content={formik.errors.firstname} /> : null}
                            </div>
                            <div className="mt-4">
                                <InputFieldSecondaryGreen placeholder={"Last Name"} type={"text"} name={"lastname"} onChange={formik.handleChange} value={formik.values.lastname} />

                                {formik.errors.lastname ? <ParagraphExtraSmallError content={formik.errors.lastname} /> : null}
                            </div>
                            <div className="mt-4">
                                <InputFieldSecondaryGreen placeholder={"Email"} type={"email"} name={"email"} onChange={formik.handleChange} value={formik.values.email} />
                                {formik.errors.email ? <ParagraphExtraSmallError content={formik.errors.email} /> : null}
                            </div>
                            <div className="mt-4 relative">
                                <input type={istoggle ? 'text' : 'password'}
                                    placeholder="Password"
                                    className="border-2 px-2.5 py-3.5 pl-8  bg-white shadow-sm rounded-lg block font-Poppins w-full h-14 text-black text-base mt-1 ring-gray  placeholder:text-green focus:outline-none focus:ring-2 focus:border-purple focus:border-transparent focus:ring-gray" name={"password"} onChange={formik.handleChange} value={formik.values.password} />
                                <button
                                    className='absolute top-5 right-6'
                                    onClick={toggle}
                                >
                                    {istoggle ? <FaEye /> : <FaEyeSlash />}
                                </button>
                                {formik.errors.password ? <ParagraphExtraSmallError content={formik.errors.password} /> : null}
                            </div>

                            <div className="mt-4 relative">
                                <input type={istoggleConfirm ? 'text' : 'password'}
                                    placeholder="Confirm Password"
                                    className="border-2 px-2.5 py-3.5 pl-8  bg-white shadow-sm rounded-lg block font-Poppins w-full h-14 text-black text-base mt-1 ring-gray  placeholder:text-green focus:outline-none focus:ring-2 focus:border-purple focus:border-transparent focus:ring-gray" name={"password_confirmation"} onChange={formik.handleChange} value={formik.values.password_confirmation} />
                                <button
                                    className='absolute top-5 right-6'
                                    onClick={toggleConfirmPassword}
                                >
                                    {istoggleConfirm ? <FaEye /> : <FaEyeSlash />}
                                </button>
                                {formik.errors.password_confirmation ? <ParagraphExtraSmallError content={formik.errors.password_confirmation} /> : null}
                            </div>
                            <div className="mt-4">
                                <input type="checkbox" name="terms" id="termscheckbox" className={`${styles.auto}`} />
                                <label htmlFor="termscheckbox" className="ml-3 font-Poppins font-light">
                                    By continuing, you agree to our <Link to={"/createaccount"} className=' font-bold'>Terms of service</Link> and <Link to={"/createaccount"} className=' font-bold'>Privacy </Link>
                                </label>
                                {/* {formik.errors.terms ? <ParagraphExtraSmallError content={formik.errors.password_confirmation} /> : null} */}
                            </div>
                            <div className="my-6">
                                <ButtonsPrimary name={"Create Account"} type={"submit"} loading={loading} />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default CreateAccount