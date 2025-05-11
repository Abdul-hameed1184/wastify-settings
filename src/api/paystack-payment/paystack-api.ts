import axios from "../api.config";

export const getPayStackSettings = () => {
    return axios.get(`/settings/pay-stack-settings`);
}

export const initializePayment = async (email:string, amount: number) => {
    return await  axios.post(`/billPayment/initiate-payment`,{email, amount});
}

export const verifyPayment = async (reference: string) => {
    return await  axios.post(`/billPayment/verify-payment`,{reference});
}

export const create_transaction = async (data: any) => {
    return await  axios.post(`/billPayment`,data);
}