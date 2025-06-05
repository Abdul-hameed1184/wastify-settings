import axios from "../api.config";

export const getCustomers = async () => {
    return await axios.get(`/customer/list`);
}

export const customerDashboard = async (customerKey:string) => {
    return await axios.get(`/dashboard/customer/${customerKey}`);
}

export const customerDetails = async (customerId:string) => {
    return await axios.get(`/customer/${customerId}`);
}

export const sendMessage = async (data: { customerId:string, message:string, subject:string}) => {
    return await axios.post(`/customerReport`, data);
}

export const readMessage = async (reportId:string) => {
    return await axios.put(`/customerReport/update-read-status/${reportId}`, {});
}

export const getCustomerReportPaginatedByCustomer = async(customerId: string) => {
    return await axios.get(`/customerReport/list-by-customer-id/${customerId}`);
}

export const updateMessageReadStatus = async (reportId: number) => {
    return await axios.put(`/customerReport/update_read_status/${reportId}`, {});
}

