import { ICreateApartmentBill } from "../../models/createApartmentBill.interface";
import axios from "../api.config";

export const getPspOperatorDashboard = (id:number) => {
    return axios.get(`/dashboard/psp-operator/${id}`)
}

export const createCustomer = () => {
    return axios.post(`/customer`,)
}

export const getPropertyByOperator = (operatorId: number, page: number = 1) => {
    return axios.get(`/property/${operatorId}/list-by-operator?page=${page}`);
}

export const createApartmentBill = (bill:ICreateApartmentBill) => {
    console.log(bill)
    return axios.post(`/apartmentBilling`, bill)
}

