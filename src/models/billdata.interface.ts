export interface IBillData {
    apartmentId: number;
  apartmentTypeId: number;
  apartmentTypeName: string;
  billAmount: string;
  billPeriod: string;
  created_at: string;
  customerFullname: string;
  customerId: string;
  customerPhone: string;
  discountAmount: string;
  discountPercentage: string;
  id: number;
  paymentStatus: PaymentStatus; 
  propertyAddress: string;
  propertyCode: string;
  propertyId: number;
  pspOperatorBusinessname: string;
  pspOperatorEmail: string;
  pspOperatorId: number;
  pspOperatorPhone: string;
  pspOperatorUserId: string;
  totalAmount: string;
  updated_at: string;
}

enum PaymentStatus {
    "Successful" = 1,
    "Failed" = 2,
    "Pending" = 3
}