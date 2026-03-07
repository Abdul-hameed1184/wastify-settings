import React from "react";
import { type FormikValues, useFormik } from 'formik';
import {  toast } from "react-toastify";
import Input from '../../Component/InputField';
import { Button } from '../../Component/Button';
import { Modal } from '../../Component/Modal/Modal';
import { BsPhone } from "react-icons/bs";
import { forgotPassword } from "../../api/auth.service";
import ResetPasswordVerify from "./ResetPasswordVerify";

type Err = {
    phone: string
}
const validate= (values) => {
    const errors: Partial<Err> = {};

    if (!values.phone) {
        errors.phone = 'Phone Number is Required';
    } else if (values.phone.length !== 11) {
        errors.phone = 'Phone must be 11 characters';
    }

    return errors;
};


type ResetModalProps = {
    openModal: boolean;
    setOpenModal: () => void;
};

export const SendResetLink:React.FC<ResetModalProps> = ({openModal, setOpenModal}) => {
    const [openOTPModal, setOpenOTPModal] = React.useState(false);
    const formik = useFormik<FormikValues>({
        initialValues: {
            phone: '',
        },
        validate,
        onSubmit: async (values) => {
            console.log("Form submitted with values:", values);
            console.log("Validation errors:", formik.errors);
            try{
                const res = await forgotPassword(values);
                console.log("API Response:", res);
                const message = res.data?.message;
                const errorState = res.data?.errorState;
                const data = res.data?.data;
                console.log(data)
                if (!errorState) {
                    toast.success(message, { autoClose: 5000 });
                    setOpenOTPModal(true);
                
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
        <>
        <Modal title="Reset Password" position="right" className='mt-4 mx-4 md:m-0 md:bg-white md:h-screen' isOpen={openModal} onClose={() => setOpenModal()}>
            <div className="md:mt-0 md:py-5 md:px-10 ">
                    
                        <div className="mt-2 ">
                            <form onSubmit={formik.handleSubmit} className="space-x-4">
                                <div>
                                <Input 
                                icon={<BsPhone />}
                                placeholder={"Enter your Phone Number"} 
                                type={"tel"} 
                                name={"phone"}
                                label={"Phone Number"}
                                required
                                 onChange={formik.handleChange} 
                                 onBlur={formik.handleBlur}
                                 value={formik.values.phone}
                  
                               />
                                     {formik.touched.phone && formik.errors.phone ? (
                <p className="text-red-900 text-sm">*{formik.errors.phone as string}</p>
              ) : null}
              </div>
                           
                                <div className="my-8 flex space-between gap-4">
                                    <Button type="button" className="border border-gray-400" variant="white" onClick={() => setOpenModal()}>
                                        Cancel
                                    </Button>
                                    <Button type={"submit"} loading={formik.isSubmitting}  className='w-full'>Get OTP</Button>
                                </div>
                            </form>
                        </div>
   
                    </div>
             

        </Modal>
        {
            openOTPModal && <ResetPasswordVerify phone={formik.values.phone} openOTPModal={openOTPModal} handleOpenOTPModal={() =>setOpenOTPModal(!openOTPModal)} />
        }
        </>
    )
}

