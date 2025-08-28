import { ICreateBill } from "../../models/createbill.interface";
import { IUpdateBill } from "../../models/update.bill.interface";
import axios from "../api.config";

export const getPspOperatorBill = (pspOperatorId) => {
    return axios.get(`/billSetup/${pspOperatorId}`);
}

export const deletePspOperatorBill = (pspOperatorId) => {
    return axios.delete(`/billSetup/${pspOperatorId}`);
}

export const getBillSetupByPspOperatorBill = (page, pspOperatorId) => {
    return axios.get(`/billSetup/bill-setup-by-psp-operator/${pspOperatorId}?page=${page}`);
}

export const createBillSetup = (bill: ICreateBill) => {
    return axios.post(`/billSetup`, bill);
}

export const updateBillSetup = (id?:number, bill?: IUpdateBill) => {
    return axios.put(`/billSetup/${id}`, bill);
}

export const getBillingByOperator = (operatorId:number, page: number = 1) => {
    return axios.get(`/apartmentBilling/billing-by-psp-operator-id/${operatorId}?page=${page}`)
}
