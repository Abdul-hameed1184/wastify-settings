import { ICreateComment } from "../../models/icreatecomment";
import axios from "../api.config";
export const getAllTickets = async (params) => {
    return axios.get(`/ticket`, { params });
}

export const postComment = async (data: ICreateComment) => {
    return axios.post(`/ticket/store-comment`, data)
}



export const getTicketsByOperator = async (operatorId: string) => {
    return axios.get(`/ticket/ticket-by-psp-operator-id/${operatorId}`)
}
