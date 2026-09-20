import React from "react";
import { type FormikValues, useFormik } from 'formik';
import {  toast } from "react-toastify";
import Input from "../../../Component/InputField";
import { Button } from "../../../Component/Button";
import { Modal } from "../../../Component/Modal/Modal";
import { sendResetEmail } from "../../../api/auth.service";
import { useNavigate } from "react-router-dom";
import { MdOutlineEmail } from "react-icons/md";

type Err = {
    email: string
}
const validate= (values) => {
    const errors: Partial<Err> = {};

    if (!values.email) {
        errors.email = 'Email is Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
    }

    return errors;
};


type ResetModalProps = {
    openModal: boolean;
    setOpenModal: () => void;
};

export const SendEmailResetLink:React.FC<ResetModalProps> = ({openModal, setOpenModal}) => {
  const navigate = useNavigate();
    const formik = useFormik<FormikValues>({
        initialValues: {
            email: '',
        },
        validate,
        onSubmit: async (values) => {
            try{
                const res = await sendResetEmail(values);
                const message = res.data?.message;
                const errorState = res.data?.errorState;
                if (!errorState) {
                    toast.success(message, { autoClose: 5000 });
                    navigate("/");
                
                } else {
                    toast.error(message, { autoClose: 5000 });
                }
            } catch (err: any) {
                console.error("Submission error:", err);
                const message = err?.response?.data?.message || "An error occurred";
                toast.error(message, { autoClose: 7000 });
            }
        },
    });
    return (
   
        <Modal title="Reset Password" position="right" className='mt-4 mx-4 md:m-0 md:bg-white md:h-screen' isOpen={openModal} onClose={() => setOpenModal()}>
            <div className="md:mt-0 md:py-5 md:px-10 ">
                    
                        <div className="mt-2 ">
                            <form onSubmit={formik.handleSubmit} className="space-x-4">
                                <div>
                                <Input 
                                icon={<MdOutlineEmail />}
                                placeholder={"Enter your Email"} 
                                type={"email"} 
                                name={"email"}
                                label={"Email"}
                                required
                                 onChange={formik.handleChange} 
                                 onBlur={formik.handleBlur}
                                 value={formik.values.email}
                  
                               />
                                     {formik.touched.email && formik.errors.email ? (
                <p className="text-red-900 text-sm">*{formik.errors.email as string}</p>
              ) : null}
              </div>
                           
                                <div className="my-8 flex space-between gap-4">
                                    <Button type="button" className="border border-gray-400" variant="white" onClick={() => setOpenModal()}>
                                        Cancel
                                    </Button>
                                    <Button type={"submit"} loading={formik.isSubmitting}  className='w-full'>Send Reset Link</Button>
                                </div>
                            </form>
                        </div>
   
                    </div>
             

        </Modal>
    )
}

