import axios from "../api.config";

export const getCustomers = () => {
    return axios.get(`/customer/list`);
}

export const customerDashboard = (customerKey:string) => {
    return axios.get(`/customer/${customerKey}`);
}