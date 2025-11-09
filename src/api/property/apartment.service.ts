
import { IApartmentType } from '../../models/apartmentType.interface';
import axios from '../api.config'

export const getPropertyApartments = (propertyId:number) => {
    return axios.get(`/apartment/apartment-by-property-id/${propertyId}`);
}

export const getApartmentType = () => {
    return axios.get(`/apartmentType/list`);
}

export const createApartment = ({propertyId, apartmentData }: {propertyId: number, apartmentData: {customerId?: string, apartmentTypeId: number, description: string, status: number}[]}) => {
    return axios.post(`/apartment`, {propertyId, apartmentData });
}
export const updateApartment = (apartmentId:number, propertyId: number, apartmentData: {customerId?: string, apartmentTypeId: number, description: string}) => {
    console.log(propertyId, apartmentData)
    return axios.put(`/apartment/${apartmentId}`, { propertyId, apartmentData: [apartmentData] });
}

export const createApartmentType =(apartmentType: IApartmentType) => {
    return axios.post(`/apartmentType`, apartmentType);
}

export const getApartmentTypeList = () => {
    return axios.get(`/apartmentType/list`);
}

export const getApartmentBillings = (billingId: number) => {
    return axios.get(`/apartmentBilling/${billingId}`);
}

export const getBillingsByApartmentId = (apartmentId: number, params) => {
    return axios.get(`/apartmentBilling/billing-by-apartment-id/${apartmentId}?page=${params.page}&perPage=${params.perPage}`);
}

export const getBillingsPaymentByApartmentId = (apartmentId: number) => {
    return axios.get(`/billPayment/bill-payment-by-apartment/${apartmentId}`);
}

export const getBillPayments = () => {
    return axios.get(`/billPayment`);
}

export const getApartmentsByPspOperator = (page:number, id: number) => {
    return axios.get(`/apartment/apartment-by-psp-operator-id/${id}?page=${page}&perPage=${500}`);
}

export const getApartmentTypePrice = (apartmentTypeId: number, operatorId: number) => {
    return axios.get(`/billSetup/get-bill-setup-by-apartment-operator/${apartmentTypeId}/${operatorId}`);
}

