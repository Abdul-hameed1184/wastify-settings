import { ICreateBill } from "../../models/createbill.interface";
import { IUpdateBill } from "../../models/update.bill.interface";
import axios from "../api.config";

export const getPspOperatorBill = (pspOperatorId, params) => {
    return axios.get(`/billSetup/${pspOperatorId}`, { params});
}

export const deletePspOperatorBill = (pspOperatorId) => {
    return axios.delete(`/billSetup/${pspOperatorId}`);
}

export const getBillSetupByPspOperatorBill = (page=1, pspOperatorId) => {
    return axios.get(`/billSetup/bill-setup-by-psp-operator/${pspOperatorId}?page=${page}`);
}

export const createBillSetup = (bill: ICreateBill) => {
    return axios.post(`/billSetup`, bill);
}

export const updateBillSetup = (id?:number, bill?: IUpdateBill) => {
    return axios.put(`/billSetup/${id}`, bill);
}

export const getBillingByOperator = (operatorId:number, params) => {
    return axios.get(`/apartmentBilling/billing-by-psp-operator-id/${operatorId}`,{params})
}
