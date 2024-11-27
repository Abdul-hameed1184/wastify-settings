import axios from '../api.config'

export const getPropertyApartments = (propertyId:number) => {
    return axios.get(`/apartment/apartment-by-property-id/${propertyId}`);
}