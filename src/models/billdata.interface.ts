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


export interface IApartmentBillingTransaction {
  id: number;
  apartmentBillingId: number;
  apartmentId: number;
  propertyId: number;
  propertyCode: string;
  propertyAddress: string;
  apartmentTypeId: number;
  apartmentType: any; // You can replace 'any' with a more specific type if available
  pspOperatorId: number;
  OperatorName: string;
  billPeriod: string;
  billAmount: string;
  discountPercentage: string;
  discountAmount: string;
  totalAmount: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  totalOverdueBill: string;
  paidDateTime: string;
  receiptNo: string;
  transactionId: string;
  amountPaid: string;
  paymentMode: string;
  paymentStatus: number;
  paymentStatusLabel: string;
  created_at: string;
  updated_at: string;
}
