export interface ICreateApartmentBill {
    pspOperatorId: number;
    billPeriod: string;
    billingData: IBillingData[]
}

export interface IBillingData {
    apartmentId: number;
    billAmount: number;
    discountPercentage?: number;
    discountAmount?: number;
    totalAmount: number;
}