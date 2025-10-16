import axios from "../api.config";
export const loginAdmin = async () => {
    return axios.get(`/ticket`);
}
