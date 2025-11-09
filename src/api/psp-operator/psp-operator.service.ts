import { ICreateApartmentBill } from "../../models/createApartmentBill.interface";
import axios from "../api.config";

export const getPspOperatorDashboard = async (id:number) => {
    return await axios.get(`/dashboard/psp-operator/${id}`)
}

export const createCustomer = async (data) => {
    return await axios.post(`/customer`, data)
}

export const getPropertyByOperator = async (operatorId: number, params) => {
    return await axios.get(`/property/${operatorId}/list-by-operator`, { params});
}

export const createApartmentBill = async (bill:ICreateApartmentBill) => {
    return await axios.post(`/apartmentBilling`, bill)
}

export const getCustomerReports =  async (operatorId:string) => {
    return await axios.get(`/customerReport/list-by-psp-operator-id/${operatorId}`);
}

export const getCustomers = async (page:number, operatorId:number ) => {
    return await axios.get(`/customer/psp-operator/${operatorId}?page=${page}`);
}

export const getProfile = async (userId: string) => {
    return await axios.get(`/pspOperator/${userId}`);
}

export const updateProfile = async (userId: string, data: any ) => {
    return await axios.put(`/pspOperator/${userId}`, data);
}

// export const getPropertyByOperator = async (operatorId: string, params: any) => {
//   const { perPage, searchTerm, sortBy, sortOrder, page } = params;

//   const res = await axios.get(`${BaseUrl}/propertyType`, {
//     params: {
//       operatorId,
//       perPage,
//       searchTerm,
//       sortBy,
//       sortOrder,
//       page,
//     },
//   });

//   return res.data;
// };