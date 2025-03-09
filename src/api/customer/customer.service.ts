import axios from "../api.config";

export const getCustomers = async () => {
    return await axios.get(`/customer/list`);
}

export const customerDashboard = async (customerKey:string) => {
    return await axios.get(`/dashboard/customer/${customerKey}`);
}

