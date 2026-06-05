import axios from "../api.config";
export const loginAdmin = async () => {
    return axios.get(`/ticket`);
}


export const getAdminDashboard = async (id:number) => {
    return await axios.get(`/dashboard/admin/${id}`)
}

export const getOperatorRevenue = async (operatorId: number) => {
    return await axios.get(`/billPayment/monthly-summary-by-operator-id/${operatorId}`);
}

export const getAdminProperties = async (params) => {
    return await axios.get(`/property`, { params});
}

export const getBillingByAdmin = (params) => {
    return axios.get(`/apartmentBilling`,{params})
}

export const getOperators = (params) => {
    return axios.get(`/pspOperator`,{params})
}

export const getAdminCustomers = (params) => {
    return axios.get(`/customer`,{params})
}