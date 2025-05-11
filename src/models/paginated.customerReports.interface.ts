import { IReport } from "./report.interface";

export interface IPaginatedCustomerReports {
    current_page: number,
    data:IReport[],
    first_page_url:string,
    last_page: number,
    last_page_url: string,
    total: number,
    to: number,
    links: string[],
    prev_page_url: string,
    per_page: number,
    path: string,
    next_page_url:string,

}