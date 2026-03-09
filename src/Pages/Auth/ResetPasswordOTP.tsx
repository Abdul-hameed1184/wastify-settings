import React, { useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useFormik } from 'formik';
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import { Modal } from '../../Component/Modal/Modal';
import { customerPasswordReset } from '../../api/auth.service';
import { Button } from '../../Component/Button';
import Input from '../../Component/InputField';
type Err = {
    password:string;
    password_confirmation: string;
};

const validate = (values:Err) => {
    const errors:Err = {} as Err;

    if (!values.password) {
        errors.password = 'Password is Required';
    } else if (values.password.length < 8) {
        errors.password = 'Password name must be greater than 8 characters';
    }

    if (!values.password_confirmation) {
        errors.password_confirmation = 'Password Confirmation is Required';
    } else if (values.password_confirmation.length < 8) {
        errors.password_confirmation = 'Password Confirmation must be greater than 8 characters'
    } else if (values.password_confirmation !== values.password) {
        errors.password_confirmation = "Passwords don't match";
    }


    return errors;
};
const ResetPassword:React.FC<{ customerId:string, otp:string, openResetPasswordModal: boolean; handleOpenResetPasswordModal: () => void }> = ({ customerId, otp, openResetPasswordModal, handleOpenResetPasswordModal }) => {
    const [istoggle, setIstoggle] = useState(false);
    const [istoggleConfirm, setIstoggleConfirm] = useState(false);
    const navigate = useNavigate();
    const [loading, SetLoading] = useState(false);


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
        onSubmit: async values => {
            try{
            SetLoading(true);
            // console.log(data);
            const res = await customerPasswordReset(customerId, otp, values);

        
                            console.log(res);
                    SetLoading(false)
                    const message = res.data?.message;
                    const errorState = res.data?.errorState;
                    if (!errorState) {
                        toast.success(message, { autoClose: 5000 });
                        setTimeout(() => {
                          handleOpenResetPasswordModal();
                            navigate('/');
                        }, 3000)
                    } else {
                        toast.error(message, { autoClose: 5000 });
                    }
     
        
       

        }catch(err){
            console.log(err);
            const message = err.response.data?.message;
            toast.error(message, { autoClose: 7000 });
        }
    }

});
    return (

            <Modal className="mt-4 mx-4 md:m-0 md:bg-white md:h-screen md:bg-cover" position="right" title='Reset Password'
            isOpen={openResetPasswordModal} onClose={handleOpenResetPasswordModal} >

 
                        <div className="mt-4 "> 
                            <form onSubmit={formik.handleSubmit}>
                    <div className="my-2 relative">
                                    <Input type={istoggle ? 'text' : 'password'}
                                        placeholder="Password"
                                        label="New Password"
                        
                                       name={"password"} onChange={formik.handleChange} value={formik.values.password} />
                                                                        <button
                                              className="absolute top-12 right-6"
                                        onClick={toggle}
                                        type='button'
                                    >
                                            {istoggle ? <FaEye /> : <FaEyeSlash />}
                                    </button>
                                    {formik.errors.password ? <p className="text-red-900 text-sm">*{formik.errors.password} </p> : null}
                                </div>

                                <div className="my-2 relative">
                                    <Input type={istoggleConfirm ? 'text' : 'password'}
                                    label='Confirm new password'
        
                                        placeholder="Confirm Password"
                                       name={"password_confirmation"} onChange={formik.handleChange} value={formik.values.password_confirmation} />
                                    <button
                                                  className="absolute top-12 right-6"
                                        onClick={toggleConfirmPassword}
                                        type='button'
                                    >
                                        {istoggleConfirm ? <FaEye /> : <FaEyeSlash />}
                                    </button>
                                    {formik.errors.password_confirmation ? <p className="text-red-900 text-sm">*{formik.errors.password_confirmation} </p> : null}
                                </div>
                                <div className="my-4 flex gap-2 flex-row">
                                    <Button type="button" className="border border-gray-400" variant="white" onClick={() => handleOpenResetPasswordModal()}>
                                        Cancel
                                    </Button>
                                     <Button type={"submit"} loading={loading}  className='w-full'>Set Password</Button>
    
                                 </div>
                            </form>
                        </div>
        
                                   

        </Modal>
    )
}

export default ResetPassword