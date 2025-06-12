import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { IoChevronBack } from "react-icons/io5";
import { Paragraph2Xl } from '../../Component/Paragraph'
import PaymentHistoryCard from '../../Component/Card/PaymentHistoryCard';
import { getBillPayments } from '../../api/property/apartment.service';
import { IPaginatedBillPayment } from '../../models/paginatedBillPayment';
import { IApartmentBillingTransaction } from '../../models/billdata.interface';

const PaymentHistory:React.FC = () => {
    const [billPayments, setBillPayments] = React.useState<IPaginatedBillPayment>({} as IPaginatedBillPayment);
    const [page, setPage] = React.useState<number>(1);

    useEffect(() => {
        // This effect can be used to fetch payment history data if needed
        // For now, it just runs once when the component mounts
       (async () =>  {
        const data = await getBillPayments();
        setBillPayments(data.data.data);
        console.log("Payment History Component Mounted", data);
    })()
    },[])


    return (
        <main>
            <div className="flex justify-start mt-10 ml-6">
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

            </div>
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
        </main>
    )
}

export default PaymentHistory