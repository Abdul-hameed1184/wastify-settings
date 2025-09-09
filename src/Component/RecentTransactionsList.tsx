import React from "react";
import { IBillData } from "../models/billdata.interface";
import { LoadMoreTable } from "./LoadMoreTable"
type Props = {
    transactions: IBillData[];
    loadMore: number,
    loaded: boolean,
}

export const RecentTransactionsList:React.FC<Props> = ({transactions, loadMore, loaded}) => {
    const columns = [
       [
      { header: "paidDateTime", accessor: "Date" },
      { header: "Email", accessor: "Customer Name" },
      {header: "totalAmount", accessor: "Bill Amount"},
      { header: "propertyAddress", accessor: "Address"},
      {header:"amountPaid",accessor:"Amount Paid"},
          { header: "billPeriod", accessor: "Bill Period" },
      {header: "paymentMode", accessor: "Mode of Payment"},
      { header: "paymentStatus", accessor: "Status"},
            { header: "paymentStatusLabel", accessor: "Total Overdue Bills" },
    ]
    ];
   
    return (
        <LoadMoreTable
    columns={columns}
    data={transactions}
    total={transactions.length}
    loaded={loaded}
    loadMore={loadMore}
  />

    )
}