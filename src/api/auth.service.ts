import { IChangepassword } from "../models/changepassword.interface";
import axios from "./api.config";
export  const  changeCustomerPassword = async (data: IChangepassword) => {
    return await axios.post('/auth/customer/change-password', data);
}

export  const  changeOperatorPassword = async (data: IChangepassword) => {
    return await axios.post('/auth/admin/change-password', data);
}

export const sendResetEmail = async (data) => {
    return await axios.post(`/auth/admin/forgot-password`, data)
}

export const customerLogin = async (data) => {
    return await axios.post(`/auth/customer/login`, data)
}

export const forgotPassword = async (data) => {
    return await axios.post(`/auth/customer/forgot-Password`, data)
}

export const verifyOTP = async (phone, otp) => {
    return await axios.get(`/auth/customer/verify-reset-password/${phone}/${otp}`)
}

export const customerPasswordReset = async (customerId, otp, data) => {
    return await axios.put(`/auth/customer/password-reset/${customerId}/${otp}`, data)
}

export const operatorVerifyEmail = async (data) => {
    return await axios.post(`/auth/operator/signup/verify-email`, data)
}

export const operatorVerifyOTP = async (data) => {
    return await axios.post(`/auth/operator/signup/verify-otp`, data)
}

export const createOperator = async (data) => {
    return await axios.post(`/auth/operator/signup/create-account`, data)
}

export const operatorPasswordReset = async (operatorId: string, token: string, data) => {
    return await axios.put(`/auth/admin/password-reset/${operatorId}/${token}`, data)
}