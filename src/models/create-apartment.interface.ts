export interface ICreateApartment {
    propertyId: string;
    apartmentData: IApartmentData[];
}


export interface IApartmentData {
    customerId: string;
    apartmentTypeId: string;
    description: string;
}