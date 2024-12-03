export interface ICustomer {
  created_at: string;
  customerId: string;
  email: string;
  firstname: string;
  hasloggedin: "0" | "1";
  imgUrl: string;
  lastname: string;
  otp: string;
  phone: string;
  role: number;
  totalOverdueBill: string;
  updated_at: string;
  username: string;
}
