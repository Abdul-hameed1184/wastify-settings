export interface ICustomerLoginDetails {
    created_at: string; 
    customerId: string; 
    email: string;
    firstname: string;
    hasloggedin: boolean;
    imgUrl: string | null;
    lastname: string;
    otp: string | null;
    phone: string;
    role: number;
    totalOverdueBill: string; 
    updated_at: string; 
    username: string | null;
}

export interface CustomerLogin