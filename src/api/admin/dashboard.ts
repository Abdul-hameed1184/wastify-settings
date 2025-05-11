import axios from "../api.config";

export const getDashboardData = (id: string) => {
    return axios.get(`/dashboard/admin/${id}`);
}   

export const getCustomerReports = () => {
    return axios.get(`/customerReports`);
}   

