import axios from "../api.config";

export const getCustomers = async () => {
    return await axios.get(`/customer/list`);
}

export const createCustomer = async (data: {phone:string, lastname:string, firstname:string, email:string}) => {
    return await axios.post('/customer', data)
}

export const getPaginatedCustomers = async (page= 1) => {
    return await axios.get(`/customer?page=${page}`);
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

export const getCustomerTickets = async(customerId: string) => {
    return await axios.get(`/ticket/ticket-by-customer-id/${customerId}`);
}

export const ticketsByOperator = async(operatorId: number) => {
    return await axios.get(`/ticket/ticket-by-psp-operator-id/${operatorId}`);
}

export const updateMessageReadStatus = async (reportId: number) => {
    return await axios.put(`/customerReport/update_read_status/${reportId}`, {});
}

export const updateCustomer = async (customerId: string, data ) => {
    console.log(data)
    return await axios.post(`/customer/${customerId}`, data, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
}

export const uploadBulkCustomer = async (data: FormData) => {
    return await axios.post(`/customer/import`, data, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
}

