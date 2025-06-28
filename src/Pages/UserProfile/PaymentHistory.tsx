import React, { useEffect, useState } from 'react'
import { Paragraph2Xl } from '../../Component/Paragraph'
import { getBillPayments } from '../../api/property/apartment.service';
import { IPaginatedBillPayment } from '../../models/paginatedBillPayment';
import { IApartmentBillingTransaction } from '../../models/billdata.interface';
import { Table, TableHead, TableHeadCell, TableBody, TableRow, TableCell } from 'flowbite-react';
import PaymentStatusBadge from '../../utils/PaymentStatusBadge';
import { GrOverview } from 'react-icons/gr';
import InfoModal from '../../Component/Modal/InfoModal';

const PaymentHistory:React.FC = () => {
    const [billPayments, setBillPayments] = React.useState<IPaginatedBillPayment>({} as IPaginatedBillPayment);
    const [page, setPage] = React.useState<number>(1);
    const [ modalDetails, setModalDetails ] = useState<boolean>(false)
    const [ billpayment, setBillPayment ] = useState<IApartmentBillingTransaction>();

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
        <main>
            {/* <div className="flex justify-start mt-10 ml-6">
                <Link to="/profile">
                    <IoChevronBack size={28} className='bg-green text-white rounded-2xl' />
                </Link>
            </div>
            <div className="mx-4">
                <Paragraph2Xl content={"Payment History"} />
            </div>
            <div className="m-4">
                {billPayments.data && billPayments.data.map((payment:IApartmentBillingTransaction) => (
                    <PaymentHistoryCard key={payment.id} data={payment} />
                ))}

            </div> */}
                                          
                                            <div 
                                            // className="flex justify-center items-center h-20 my-10 w-full "
                                            >
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
                    {
                      (billpayment && modalDetails) && <InfoModal openModal={modalDetails} setOpenModal={setModalDetails} header={"Bill Payment Details"} 
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
                    }

                             { billPayments ?       
                                      <div className="overflow-x-auto font-Poppins mt-3 mx-4">
                                                    <Table striped >
                                                        <TableHead className=" font-Poppins text-sm capitalize text-white bg-green dark:text-white">
                                                            <TableHeadCell>Period</TableHeadCell>
                                                            <TableHeadCell>Apartment Type</TableHeadCell>
                                                            <TableHeadCell>Bill Amount</TableHeadCell>
                                                            <TableHeadCell>Amount paid</TableHeadCell>
                                                            <TableHeadCell>Status</TableHeadCell>
                                                            <TableHeadCell>View Details</TableHeadCell>
                                                        </TableHead>
                                                        <TableBody className="divide-y font-Poppins ">
                                                 
                                                        {billPayments.data && billPayments.data.map((item:IApartmentBillingTransaction, index) => (
                                                                <TableRow className={index % 2 === 0 ? "odd:bg-tableBackground" : "bg-white dark:border-gray-700 dark:bg-gray-800"} key={index}>
                                                                    <TableCell>{item.billPeriod}</TableCell>
                                                                    <TableCell>{item.apartmentType}</TableCell>
                                                                              <TableCell>{item.billAmount}</TableCell>
                                                                    <TableCell>{item.amountPaid} </TableCell>
                                                            
                                                          
                                                                            <TableCell><PaymentStatusBadge status={item.paymentStatus} /></TableCell>
                                                                            <TableCell onClick={() => viewExtraDetails(item)}><GrOverview /></TableCell>
                                                                              
                                                        
                                                                </TableRow>
                                                            ))}
                            
                                                        </TableBody>
                                                    </Table>
                                                    <div className="flex justify-center items-center h-20 my-10 w-full ">
                                        <div className="w-full h-10 flex items-center justify-center rounded-md px-5">
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
                                                </div> : <Paragraph2Xl content={"no Billing for Customers"} />
                            }
                  </div>
        </main>
    )
}

export default PaymentHistory