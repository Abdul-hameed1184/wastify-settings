import { ICustomerData } from "./customerdata.interface";

export interface IPaginatedCustomers {
     current_page: number;
      data: ICustomerData[];
      first_page_url: string;
      from: number;
      last_page: number;
      last_page_url: string;
      links;
      next_page_url: string;
      path: string;
      per_page: number;
      prev_page_url: string;
      to: number;
      total: number;
}