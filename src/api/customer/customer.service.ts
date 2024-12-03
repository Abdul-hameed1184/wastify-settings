import axios from "../api.config";

export const getCustomers = () => {
    return axios.get(`/customer/list`);
}