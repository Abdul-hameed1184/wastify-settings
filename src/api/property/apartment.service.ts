
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