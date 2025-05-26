export interface IReport {
    id: number;
    subject: string;
    message: string;
    customerId: string;
    customerFullname: string;
    customerEmail: string;
    customerPhone: string;
    apartmentTypeName: string;
    propertyCode: string;
    propertyAddress: string;
    pspOperatorId: number;
    readStatus: number;
    dateSent: string; // or Date if you parse it
    created_at: string; // or Date
    updated_at: string; // or Date
  }
  