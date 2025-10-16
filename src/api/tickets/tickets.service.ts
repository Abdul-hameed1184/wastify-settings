import axios from "../api.config";
export const getAllTickets = async () => {
    return axios.get(`/ticket`);
}
