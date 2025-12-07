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

export const getPropertyByOperator = async (operatorId: number, params) => {
    return await axios.get(`/property/${operatorId}/list-by-operator`, { params});
}