import { ICreateApartmentBill } from "../../models/createApartmentBill.interface";
import axios from "../api.config";

export const getPspOperatorDashboard = (id:number) => {
    return axios.get(`/dashboard/psp-operator/${id}`)
}

export const createCustomer = (data) => {
    return axios.post(`/customer`, data)
}

export const getPropertyByOperator = (operatorId: number, page: number = 1) => {
    return axios.get(`/property/${operatorId}/list-by-operator?page=${page}`);
}

export const createApartmentBill = (bill:ICreateApartmentBill) => {
    console.log(bill)
    return axios.post(`/apartmentBilling`, bill)
}

export const getCustomerReports =  () => {
    return axios.get(`/property/customerReport`);
}

