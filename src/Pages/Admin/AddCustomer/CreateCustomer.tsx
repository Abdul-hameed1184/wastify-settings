import axios from "axios";
import { useFormik } from "formik";
import React,{ useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ButtonsPrimary } from "../../../Component/Buttons";
import { InputFieldSecondaryGreen } from "../../../Component/InputField";
import { Paragraph2Xl, ParagraphSmall, ParagraphExtraSmallError } from "../../../Component/Paragraph";
import baseURL from "../../../utils/apiConfig";



const validate = (values) => {
    const errors = {
        firstname: "",
        lastname: "",
        email: "",
        phone: ""

    

    };

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

    if (!values.phone) {
        errors.phone = 'Phone number is Required';
    } else if (values.phone.length > 15) {
        errors.phone = 'Invalid Phone number';
    }


    return errors;
};

const CreateCustomer:React.FC = () => {
    const navigate = useNavigate();
    //const operator:IOperator = JSON.parse(sessionStorage.getItem("AUTH_ADMIN_DETAILS")||"");


    const [loading, SetLoading] = useState(false);

    const someValues = {
        phone: localStorage.getItem('phone')
    }


    const formik = useFormik({
        initialValues: {
            firstname: '',
            lastname: '',
            email: '',
            phone: ''
        },
        validate,
        onSubmit: values => {

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
        <main className='md:m-0 md:bg-green md:h-screen md:bg-bgdesktop-pattern md:bg-cover'>
            <div className="md:mt-0 md:py-5 md:px-10 md:flex md:justify-between">
   


                <div className="md:mt-1 md:w-2/6 md:bg-white md:border-transparent md:p-5 md:rounded-lg">
                    <div className="mt-4 md:mt-2 ">
                        <Paragraph2Xl content={"Create Customer Account"} />
                        <ParagraphSmall content={"Fill in Customer details to create an account"} />
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
                            <div className="mt-4">
                                <InputFieldSecondaryGreen placeholder={"Phone number"} type={"text"} name={"phone"} onChange={formik.handleChange} value={formik.values.phone} />

                                {formik.errors.phone ? <ParagraphExtraSmallError content={formik.errors.phone} /> : null}
                            </div>
                            <div className="my-6">
                                <ButtonsPrimary name={"Create Customer"} type={"submit"} loading={loading} />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    )
}


export default CreateCustomer;