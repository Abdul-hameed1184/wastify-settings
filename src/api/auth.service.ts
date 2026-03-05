import { IChangepassword } from "../models/changepassword.interface";
import axios from "./api.config";
export  const  changeCustomerPassword = async (data: IChangepassword) => {
    return await axios.post('/auth/customer/change-password', data);
}

export  const  changeOperatorPassword = async (data: IChangepassword) => {
    return await axios.post('/auth/admin/change-password', data);
}

export const customerLogin = async (data) => {
    return await axios.post(`/auth/customer/login`, data)
}