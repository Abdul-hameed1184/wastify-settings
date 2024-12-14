import { ICreateBill } from "../../models/createbill.interface";
import { IUpdateBill } from "../../models/update.bill.interface";
import axios from "../api.config";

export const getPspOperatorBill = (pspOperatorId) => {
    return axios.get(`/billSetup/bill-setup-by-psp-operator/${pspOperatorId}`);
}

export const createBillSetup = (bill: ICreateBill) => {
    console.log(bill);
    return axios.post(`/billSetup`, bill);
}

export const updateBillSetup = (id:number, bill: IUpdateBill) => {
    console.log(id, bill)
    return axios.put(`/billSetup/${id}`, bill);
}

export const getBillingByOperator = (operatorId:number) => {
    return axios.get(`/apartmentBilling/billing-by-psp-operator-id/${operatorId}`)
}
