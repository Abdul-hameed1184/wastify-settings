export interface IRecentTransaction {
  OperatorName: string;
  amountPaid: string;
  apartmentBillingId: number;
  apartmentId: number;
  apartmentType: string | null;
  apartmentTypeId: number;
  billAmount: string;
  billPeriod: string; // e.g., "09-2025"
  created_at: string; // ISO or datetime string
  customerEmail: string;
  customerId: string; // UUID
  customerName: string;
  customerPhone: string;
  discountAmount: string;
  discountPercentage: string;
  id: number;
  paidDateTime: string; // datetime string
  paymentMode: string;
  paymentStatus: number;
  paymentStatusLabel: string;
  propertyAddress: string;
  propertyCode: string;
  propertyId: number;
  pspOperatorId: number;
  receiptNo: string;
  totalAmount: string;
  totalOverdueBill: string;
  transactionId: string;
  updated_at: string;

}