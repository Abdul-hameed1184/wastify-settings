import { IApartment } from "./apartment.interface";

export interface IProperty {
    id: number;
    propertyAddress: string;
    lgaName: string;
    wardName: string;
    propertyCode: string;
    noOfDistinctApartment: number;
    propertyTypeName: string;
    ownerFullname: string;
    ownerId:string;
    stateName: string;
    pspOperatorId: number;
    propertyDescription: string;
    created_at: string;
    propertyTypeId: number;
    apartments?: IApartment[];
    
}