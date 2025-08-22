import { IBillData } from "./billdata.interface";

export interface IPspOperatorDashboard {
    operatorsName: string,
recentTransactions: Array<IBillData>,
totalCustomers: number,
totalOverDuePayment:number,
totalProperties:number,
totalRevenue:number,
}