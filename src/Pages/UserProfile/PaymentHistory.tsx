import React, { useEffect, useState } from 'react'
import { Paragraph2Xl } from '../../Component/Paragraph'
import { getBillPayments } from '../../api/property/apartment.service';
import { IPaginatedBillPayment } from '../../models/paginatedBillPayment';
import { IApartmentBillingTransaction } from '../../models/billdata.interface';
import { Table, TableHead, TableHeadCell, TableBody, TableRow, TableCell } from 'flowbite-react';
import PaymentStatusBadge from '../../utils/PaymentStatusBadge';
import { GrOverview } from 'react-icons/gr';
import InfoModal from '../../Component/Modal/InfoModal';
import { Naira } from '../../utils/format';
import Loader from '../../Component/Loader';

const PaymentHistory:React.FC = () => {
    const [billPayments, setBillPayments] = React.useState<IPaginatedBillPayment>({} as IPaginatedBillPayment);
    const [page, setPage] = React.useState<number>(1);
    const [ modalDetails, setModalDetails ] = useState<boolean>(false)
    const [ billpayment, setBillPayment ] = useState<IApartmentBillingTransaction>();
    const [searchTerm, setSearchTerm] = useState<string>("");

    useEffect(() => {
        // This effect can be used to fetch payment history data if needed
        // For now, it just runs once when the component mounts
       (async () =>  {
        const data = await getBillPayments();
        setBillPayments(data.data.data);
        console.log("Payment History Component Mounted", data);
    })()
    },[])

    const viewExtraDetails = (item) => {
      setBillPayment(item);
      setModalDetails(!modalDetails)
    }


    return (
        <main className='min-h-screen bg-gray-50 py-6 px-4 md:px-10'>
                <div className="flex items-center mb-6">
                          <h1 className="text-xl font-semibold text-gray-700 ml-4">Payment History</h1>
                 </div>
                                          
                              
                    {/* <div className="w-full h-10 flex items-center justify-center rounded-md px-5">
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
                    </div> */}
                    {/* {
                      (billpayment && modalDetails) &&<InfoModal openModal={modalDetails} setOpenModal={setModalDetails} header={"Bill Payment Details"} 
                      content={<div className="row g-3">
          <div className="col-md-6">
            <strong>Property:</strong> {billpayment.propertyCode} - {billpayment.propertyAddress}
          </div>
          <div className="col-md-6">
            <strong>Apartment ID:</strong> {billpayment.apartmentId}
          </div>

          <div className="col-md-6">
            <strong>Apartment Type:</strong> {billpayment.apartmentType?.name || "N/A"}
          </div>
          <div className="col-md-6">
            <strong>Operator:</strong> {billpayment.OperatorName}
          </div>

          <div className="col-md-6">
            <strong>Bill Period:</strong> {billpayment.billPeriod}
          </div>
          <div className="col-md-6">
            <strong>Bill Amount:</strong> ₦{billpayment.billAmount}
          </div>

          <div className="col-md-6">
            <strong>Discount:</strong> {billpayment.discountPercentage}% (₦{billpayment.discountAmount})
          </div>
          <div className="col-md-6">
            <strong>Total Amount:</strong> ₦{billpayment.totalAmount}
          </div>

          <div className="col-md-6">
            <strong>Customer:</strong> {billpayment.customerName}
          </div>
          <div className="col-md-6">
            <strong>Phone:</strong> {billpayment.customerPhone}
          </div>

          <div className="col-md-6">
            <strong>Email:</strong> {billpayment.customerEmail}
          </div>
          <div className="col-md-6">
            <strong>Total Overdue Bill:</strong> ₦{billpayment.totalOverdueBill}
          </div>

          <div className="col-md-6">
            <strong>Payment Date:</strong> {billpayment.paidDateTime}
          </div>
          <div className="col-md-6">
            <strong>Receipt No:</strong> {billpayment.receiptNo}
          </div>

          <div className="col-md-6">
            <strong>Transaction ID:</strong> {billpayment.transactionId}
          </div>
          <div className="col-md-6">
            <strong>Amount Paid:</strong> ₦{billpayment.amountPaid}
          </div>

          <div className="col-md-6">
            <strong>Payment Mode:</strong> {billpayment.paymentMode}
          </div>
          <div className="col-md-6">
            <strong>Payment Status:</strong>{" "}
            <span
              className={`badge p-1 rounded-lg ${
                billpayment.paymentStatus === 1 ? "bg-success" : "bg-danger"
              }`}
            >
              {billpayment.paymentStatusLabel}
            </span>
          </div>
        </div>} buttonName={'Close'} handleConfirm={() => setModalDetails(!modalDetails)}></InfoModal>
                    } */}
                    <div className="m-6 flex justify-center">
  <input
    type="text"
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    placeholder="Search by billing period or apartment type..."
    className="w-full md:w-1/2 px-4 py-2 border border-gray-300 m-auto rounded-lg shadow-sm focus:outline-nonefocus:ring-green"
  />
</div>


                             { billPayments ?       
                                      <div className="overflow-x-auto bg-white rounded-xl shadow-md font-Poppins mt-3 mx-4  mt-4">
                                                    <Table striped >
                                                        <TableHead className=" font-Poppins text-lg capitalize text-white bg-green uppercase dark:text-white">
                                                            <TableHeadCell>Period</TableHeadCell>
                                                            <TableHeadCell>Property Address</TableHeadCell>
                                                            <TableHeadCell>Bill Amount</TableHeadCell>
                                                            <TableHeadCell>Amount paid</TableHeadCell>
                                                            <TableHeadCell>Status</TableHeadCell>
                                                            <TableHeadCell>View Details</TableHeadCell>
                                                        </TableHead> 
                                                        <TableBody className="divide-y font-Poppins text-lg ">
                                                 
                                                        {billPayments.data && billPayments.data.map((item:IApartmentBillingTransaction, index) => (
                                                                <TableRow className={index % 2 === 0 ? "odd:bg-tableBackground" : "bg-white dark:border-gray-700 dark:bg-gray-800"} key={index}>
                                                                    <TableCell>{item.billPeriod}</TableCell>
                                                                    <TableCell>{item.propertyAddress}</TableCell>
                                                                              <TableCell>{Naira.format(Number(item.billAmount))}</TableCell>
                                                                    <TableCell>{Naira.format(Number(item.amountPaid))}</TableCell>
                                                                            <TableCell><PaymentStatusBadge status={item.paymentStatus} /></TableCell>
                                                                            <TableCell onClick={() => viewExtraDetails(item)}><GrOverview /></TableCell>
                                                                              
                                                        
                                                                </TableRow>
                                                            ))}
                            
                                                        </TableBody>
                                                    </Table>
                  
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
                                        </div>
                                      </div>
                                    
                                     :<Loader />
                                    
                            }
                          
        </main>
    )
}

export default PaymentHistory