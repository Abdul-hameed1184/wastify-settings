import axios from "../api.config";

export const createTicket = async (data) => {
    return await axios.post(`/ticket`, data);
}
