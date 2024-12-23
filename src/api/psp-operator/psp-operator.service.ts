import axios from "../api.config";

export const getPspOperatorDashboard = (id) => {
    return axios.get(`/dashboard/psp-operator/${id}`)
}

export const createCustomer = () => {
    return axios.post(`/customer`,)
}