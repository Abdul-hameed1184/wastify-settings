
import { IApartmentType } from '../../models/apartmentType.interface';
import axios from '../api.config'

export const getPropertyApartments = (propertyId:number) => {
    return axios.get(`/apartment/apartment-by-property-id/${propertyId}`);
}

export const getApartmentType = () => {
    return axios.get(`/apartmentType/list`);
}

export const createApartment = ({propertyId, apartmentData }: {propertyId: number, apartmentData: {customerId?: string, apartmentTypeId: number, description: string}[]}) => {
    console.log({propertyId, apartmentData})
    return axios.post(`/apartment`, {propertyId, apartmentData });
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

export const getBillingsByApartmentId = (apartmentId: number) => {
    return axios.get(`/apartmentBilling/billing-by-apartment-id/${apartmentId}`);
}

export const getBillPayments = () => {
    return axios.get(`/billPayment`);
}