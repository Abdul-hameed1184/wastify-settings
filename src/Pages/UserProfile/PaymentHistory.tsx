import React, { useEffect, useState } from 'react'
import { getBillingsPaymentByApartmentId } from '../../api/property/apartment.service';
import { IPaginatedBillPayment } from '../../models/paginatedBillPayment';
import { IApartmentBillingTransaction } from '../../models/billdata.interface';
import { Table, TableHead, TableHeadCell, TableBody, TableRow, TableCell } from 'flowbite-react';
import PaymentStatusBadge from '../../utils/PaymentStatusBadge';
import { Naira } from '../../utils/format';

import { IApartment } from '../../models/apartment.interface';


import OccupancyStatusBadge from '../../utils/OccupyStatusBadge';

const PaymentHistory:React.FC = () => {
    const customerApartments:IApartment[] = JSON.parse(
      sessionStorage.getItem("CUSTOMER_APARTMENT") || "[]"
    );
    const [billPayments, setBillPayments] = React.useState<IPaginatedBillPayment>({
    data: [],
    total: 0,
    per_page: 10
  } as unknown as IPaginatedBillPayment);
    const [ apartment, setApartment ] = useState<IApartment>(customerApartments[0])
    const [page, setPage] = React.useState<number>(1);
    const [ modalDetails, setModalDetails ] = useState<boolean>(false)
   // const [ billpayment, setBillPayment ] = useState<IApartmentBillingTransaction>();
    const [searchTerm, setSearchTerm] = useState<string>("");

useEffect(() => {
  (async () => {
    try {
      const response = await getBillingsPaymentByApartmentId(apartment.id);

      // normalize the response
      const payments: IPaginatedBillPayment = response.data?.data ?? {
        data: [],
        total: 0,
        per_page: 10,
      };
      console.log(payments)

      setBillPayments(payments);
      console.log("Payment History Fetched:", payments);
    } catch (e) {
      console.error("Error fetching payments:", e);
      setBillPayments({
        data: [],
        total: 0,
        per_page: 10,
        current_page: 1,
        first_page_url: "",
        from: 0,
        last_page: 1,
        last_page_url: "",
        next_page_url: "",
        path: "",
        prev_page_url: null,
        to: 0
      });
    }
  })();
}, [apartment.id]); // optional: if you want it to refetch on pagination/apartment change

    // const viewExtraDetails = (item) => {
    //   setBillPayments(item);
    //   setModalDetails(!modalDetails)
    // }

      const handleSelectedApartment = (e) => {
        const id = parseInt(e.target.value);
        const apartment = customerApartments.find(x => x.id  == id)||{} as IApartment;
        setApartment(apartment);
      }


    return (
        <div className='min-h-screen bg-gray-50 py-6 px-4 md:px-10'>
         <h2>Payment History</h2>
                          
        </div>
    )
}

export default PaymentHistory