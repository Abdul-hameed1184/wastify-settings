import { ICreateApartmentBill } from "../../models/createApartmentBill.interface";
import api from "../api.config";

export const getPspOperatorDashboard = async (id:number) => {
    return await api.get(`/dashboard/psp-operator/${id}`)
}

export const createCustomer = async (data) => {
    return await api.post(`/customer`, data)
}

export const getPropertyByOperator = async (operatorId: number, params) => {
    return await api.get(`/property/${operatorId}/list-by-operator`, { params});
}

export const createApartmentBill = async (bill:ICreateApartmentBill) => {
    return await api.post(`/apartmentBilling`, bill)
}

export const getCustomerReports =  async (operatorId:string) => {
    return await api.get(`/customerReport/list-by-psp-operator-id/${operatorId}`);
}

export const getCustomers = async (operatorId: number, params: any) => {
    return await api.get(`/customer/psp-operator/${operatorId}`, { params });
}

export const getProfile = async (userId: string) => {
    return await api.get(`/pspOperator/${userId}`);
}

export const updateProfile = async (userId: string, data: any ) => {
    return await api.put(`/pspOperator/${userId}`, data);
}

export const getOperatorRevenue = async (operatorId: number) => {
    return await api.get(`/billPayment/monthly-summary-by-operator-id/${operatorId}`);
}

export const getStates = async () =>  {
    return await api.get(`/state/list`);
}

export const getLGAs = async (stateId: number) => {
    return await api.get(`/lga/stateid/${stateId}`)
}

export const getWards = async (lgaId:number) => {
    return await api.get(`/ward/lgaid/${lgaId}`)
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