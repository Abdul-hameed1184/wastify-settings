import axios from "../api.config";
export const getAllTickets = async () => {
    return axios.get(`/ticket`);
}

export const getTicketsByOperator = async (operatorId: string) => {
    return axios.get(`/ticket/ticket-by-psp-operator-id/${operatorId}`)
}
