import { IProperty } from "../../models/property.interface";
import axios from "../api.config";

export const getPropertyTypes = () => {
    return axios.get(`/propertyType/list`);
}

export const createProperty = (property: IProperty) => {
    return axios.post(`/property`, property)
}