export interface ICustomerData 
{
  created_at: string;
  customerId: string;
  email: string | null;
  firstname: string | null;
  hasloggedin: string; // or boolean if it's "0"/"1" used as flags
  imgUrl: string | null;
  lastname: string | null;
  otp: string;
  phone: string;
  role: number;
  totalOverdueBill: string; // or number, depending on usage
  updated_at: string;
  username: string | null;
}