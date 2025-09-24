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
        <main className='min-h-screen bg-gray-50 py-6 px-4 md:px-10'>
                <div className="flex md:flex-row flex-col justify-between mb-2">
<div className="">
  <label
    htmlFor="apartment"
    className="block text-sm font-medium text-gray-700 mb-1"
  >
    Select Apartment
  </label>

  <select
    id="apartment"
    onChange={handleSelectedApartment}
    defaultValue=""
    className="block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-300 focus:ring-opacity-50"
  >
    {customerApartments?.map((x: IApartment, index) => (
      <option key={index} value={x.id}>
        {x.propertyAddress} - {x.apartmentTypeName}
      </option>
    ))}
  </select>
</div>
        <h3 className="text-center text-2xl mt-2 font-semibold"><OccupancyStatusBadge status={apartment.status} /> - {apartment.apartmentTypeName.toLocaleUpperCase()},{apartment.propertyAddress.toLocaleUpperCase()}</h3>


      </div>
                <div className="flex items-center mb-6">
                          <h1 className="text-xl font-semibold text-gray-700 ml-4">Payment History</h1>
                 </div>
                                    
                    <div className="m-6 flex justify-center">
  <input
    type="text"
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    placeholder="Search by billing period or apartment type..."
    className="w-full md:w-1/2 px-4 py-2 border border-gray-300 m-auto rounded-lg shadow-sm focus:outline-nonefocus:ring-green"
  />
</div>


                             { apartment.id &&       
                                      <div className="overflow-x-auto bg-white rounded-xl shadow-md font-Poppins mt-3 mx-4  mt-4">
                                                    <Table striped >
                                                        <TableHead className=" font-Poppins text-lg capitalize text-white bg-green uppercase dark:text-white">
                                                            <TableHeadCell>Period</TableHeadCell>
                                                            <TableHeadCell>Property Address</TableHeadCell>
                                                            <TableHeadCell>Bill Amount</TableHeadCell>
                                                            <TableHeadCell>Amount paid</TableHeadCell>
                                                            <TableHeadCell>Status</TableHeadCell>
                                                            {/* <TableHeadCell>View Details</TableHeadCell> */}
                                                        </TableHead> 
                                                        <TableBody className="divide-y font-Poppins text-lg ">
                                                 
                                                        {billPayments && billPayments.data.length > 0 ? billPayments.data.map((item:IApartmentBillingTransaction, index) => (
                                                                <TableRow className={index % 2 === 0 ? "odd:bg-tableBackground" : "bg-white dark:border-gray-700 dark:bg-gray-800"} key={index}>
                                                                    <TableCell>{item.billPeriod}</TableCell>
                                                                    <TableCell>{item.propertyAddress}</TableCell>
                                                                              <TableCell>{Naira.format(Number(item.billAmount))}</TableCell>
                                                                    <TableCell>{Naira.format(Number(item.amountPaid))}</TableCell>
                                                                            <TableCell><PaymentStatusBadge status={item.paymentStatus} /></TableCell>
                                                                            {/* <TableCell onClick={() => viewExtraDetails(item)}><GrOverview /></TableCell> */}
                                                                              
                                                        
                                                                </TableRow>
                                                            )) : (
                                                                <TableRow>
                                                                    <TableCell colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500">
                                                                        <h2 className="text-xl font-semibold text-gray-100">No payment history found.</h2>
                                                                    </TableCell>
                                                                </TableRow>
                                                            )}
                                                        </TableBody>
                                                    </Table>
                  
                               {  billPayments.data.length > 0 && (
                                   <div className="flex justify-between items-center mt-6 p-4 w-100">
                                          <button
                                            className={`text-green font-weight-bold`}
                                            onClick={() => setPage(page - 1)}
                                            disabled={page === 1}
                                          >
                                            Previous
                                          </button>
                                          <div className="mx-8 h-full">
                                            {
                                              Array.from({
                                                length: Math.ceil(
                                                  (billPayments.total/billPayments.per_page)
                                                ),
                                              }).map((_, index) => (
                                                <button
                                                  className={`w-8 h-full  ${
                                                    page === index + 1 ? "bg-green text-white " : ""
                                                  } mr-2`}
                                                  key={index}
                                                  onClick={() => setPage(page + 1)}
                                                >
                                                  {index + 1}
                                                </button>
                                              ))}
                                          </div>
                                          <button
                                            className={`text-green font-weight-bold`}
                                            onClick={() => setPage(page + 1)}
                                            disabled={Math.ceil(billPayments.total/billPayments.per_page) <= page + 1}
                                          >
                                            Next
                                          </button>
                                        </div>)}
                                      </div>
                                    
                            
                                    
                            }
                          
        </main>
    )
}

export default PaymentHistory