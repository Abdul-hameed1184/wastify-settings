export interface IApartmentTypeBill {
  amount: string; // Assuming the amount is a string (e.g., "2100.00")
  apartmentTypeId: number;
  apartmentTypeName: string;
  created_at?: string; // ISO date string
  id?: number;
  pspOperatorBusinessname: string;
  pspOperatorEmail: string;
  pspOperatorId: number;
  pspOperatorPhone: string;
  pspOperatorUserId: string;
  updated_at?: string; // ISO date string
}