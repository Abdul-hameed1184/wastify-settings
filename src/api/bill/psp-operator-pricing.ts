import { ICreateBill } from "../../models/createbill.interface";
import { IUpdateBill } from "../../models/update.bill.interface";
import axios from "../api.config";

export const getPspOperatorBill = (pspOperatorId) => {
    return axios.get(`/billSetup/bill-setup-by-psp-operator/${pspOperatorId}`);
}

export const createBillSetup = (bill: ICreateBill) => {
    return axios.post(`/billSetup`, bill);
}

export const updateBillSetup = (bill: IUpdateBill) => {
    console.log(bill)
    return axios.put(`/billSetup/7`, bill);
}
