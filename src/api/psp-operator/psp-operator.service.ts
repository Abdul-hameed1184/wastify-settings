import { ICreateApartmentBill } from "../../models/createApartmentBill.interface";
import axios from "../api.config";

export const getPspOperatorDashboard = async (id:number) => {
    return await axios.get(`/dashboard/psp-operator/${id}`)
}

export const createCustomer = async (data) => {
    return await axios.post(`/customer`, data)
}

export const getPropertyByOperator = async (operatorId: number, page: number = 1) => {
    return await axios.get(`/property/${operatorId}/list-by-operator?page=${page}`);
}

export const createApartmentBill = async (bill:ICreateApartmentBill) => {
    return await axios.post(`/apartmentBilling`, bill)
}

export const getCustomerReports =  async () => {
    return await axios.get(`/property/customerReport`);
}

