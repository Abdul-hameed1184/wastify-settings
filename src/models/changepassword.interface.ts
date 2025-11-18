export interface IChangepassword {
    customerId: string, 
    oldPassword: string, 
    password: string,
    password_confirmation: string 
}

export interface IOperatorChangepassword {
    userId: string, 
    oldPassword: string, 
    password: string,
    password_confirmation: string 
}