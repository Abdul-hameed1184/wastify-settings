import { IChangepassword } from "../models/changepassword.interface";
import axios from "./api.config";
export  const  changeCustomerPassword = async (data: IChangepassword) => {
    return await axios.post('/auth/customer/change-password', data);
}