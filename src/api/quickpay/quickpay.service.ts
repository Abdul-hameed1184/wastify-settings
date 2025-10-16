import api from "../api.config";

export const getPropertyQuickPay = async (phoneNumber:string,propertyCode: string) => {
    return await api.get(`/billPayment/quick-pay/${phoneNumber}/${propertyCode}`);
}