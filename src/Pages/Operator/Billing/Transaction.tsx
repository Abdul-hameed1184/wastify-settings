import { useState } from "react";
import { autoBillingByOperator, getBillingByOperator } from "../../../api/bill/psp-operator-pricing";
import { IOperator } from "../../../models/operator.interface";
import { formatDate, Naira } from "../../../utils/format";
import PaymentStatusBadge from "../../../utils/PaymentStatusBadge";
import Loader from "../../../Component/Loader";
import { GrOverview } from "react-icons/gr";
import { IBillData } from "../../../models/billdata.interface";

import { useQuery } from "@tanstack/react-query";
import { Button } from "../../../Component/Button";
import { Modal } from "../../../Component/Modal/Modal";
import { toast } from "react-toastify";
import { IoSearchOutline } from "react-icons/io5";
import Input from "../../../Component/InputField";
import { FaLongArrowAltRight } from "react-icons/fa";
import { ReceiptModal } from "../../../Component/ReceiptModal";

const Transaction = () => {
  const operator: IOperator = JSON.parse(
    sessionStorage.getItem("AUTH_ADMIN_DETAILS") || ""
  );
  const [page, setPage] = useState<number>(1);
  const [showDetails, setShowDetails] = useState<boolean>(false);
  const [billpayment, setBillPayment] = useState<IBillData>({} as IBillData);
  const [autoX, setAutoX] = useState<boolean>(false);
    const [selectedTransaction, setSelectedTransaction] = useState<any>(null);

  const params = { page, perPage: 10 };

  const { data: bills, isLoading } = useQuery({
    queryKey: ["bills", operator.id, page],
    queryFn: async () => await getBillingByOperator(operator.id, params),
  });

  if (isLoading) return <Loader />;

  const handleViewDetails = (item) => {
    setBillPayment(item);
    setShowDetails(true);
  };

  const handleAutoBilling = async () => {
    try {
      await autoBillingByOperator(operator.id);
      toast.success("Auto Bills Generated");
    } catch (error) {
      console.log(error);
      toast.error("Error generating Bills");
    }
    setAutoX(false);
  };

  const totalPages = Math.ceil(
    (bills?.data.data.total || 1) / (bills?.data.data.per_page || 10)
  );

  const billList = bills?.data.data.data;

  return (
    <>
      {/* Details Modal */}
      {showDetails && (
        <Modal
          isOpen={showDetails}
          onClose={()=>setShowDetails(!showDetails)}
          title="Bill Data Details"
          >
            <div className="row g-3">
              <div className="col-md-6"><strong>Property:</strong> {billpayment.propertyCode} - {billpayment.propertyAddress}</div>
              <div className="col-md-6"><strong>Apartment ID:</strong> {billpayment.apartmentId}</div>
              <div className="col-md-6"><strong>Apartment Type:</strong> {billpayment.apartmentTypeName || "N/A"}</div>
              <div className="col-md-6"><strong>Bill Period:</strong> {billpayment.billPeriod}</div>
              <div className="col-md-6"><strong>Bill Amount:</strong> ₦{billpayment.billAmount}</div>
              <div className="col-md-6"><strong>Discount:</strong> {billpayment.discountPercentage}% (₦{billpayment.discountAmount})</div>
              <div className="col-md-6"><strong>Total Amount:</strong> ₦{billpayment.totalAmount}</div>
              <div className="col-md-6"><strong>Customer:</strong> {billpayment.customerFullname}</div>
              <div className="col-md-6"><strong>Phone:</strong> {billpayment.customerPhone}</div>
              <div className="col-md-6"><strong>Email:</strong> {billpayment.customerPhone}</div>
            </div>
    
    
        </Modal>)
      }

      <div className="mb-10 mx-auto md:px-8 sm:px-6 lg:px-8 py-6">

        {/* Header Card */}


        {/* Table Card */}
        <div className="border border-gray-300 rounded-xl p-4">
                      <div className="p-4 mb-4 flex justify-between rounded-lg items-center bg-gray-50/50 flex-wrap gap-4">
                      <div>
              <h2 className="text-xl font-bold text-gray-900 tracking-tight font-Poppins">
                Customer Billings
              </h2>
              {bills?.data.data.total !== undefined && (
                <p className="text-sm text-gray-500 mt-1 font-Poppins">
                  {bills.data.data.total} record{bills.data.data.total !== 1 ? "s" : ""} found
                </p>
              )}
            </div>
          <div className="flex gap-3 items-center w-full md:w-auto md:flex-row flex-col">
            <div className="w-full md:w-auto">
              <Input iconPosition="left" className="mb-2" icon={<IoSearchOutline />} type="text" placeholder="Search Property" />
            </div>
            <Button onClick={() => setAutoX(true)} className="w-full md:w-auto px-5 py-2.5 text-sm mb-6 font-medium text-black bg-green rounded-lg hover:bg-green/90 transition-all shadow-sm hover:shadow-md whitespace-nowrap flex items-center gap-2 justify-center">
              Auto Billing <FaLongArrowAltRight />
            </Button>
          </div>
        </div>
          {/* Empty State */}
          {!billList || billList.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-12 bg-white rounded-2xl border border-gray-100 border-dashed">
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-1 font-Poppins">No Billing Records</h2>
              <p className="text-gray-500 text-center max-w-sm font-Poppins">
                There are no billing records for customers at this time.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto rounded-2xl border border-gray-200 shadow-sm bg-white mb-6">
              <table className="table-auto min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    {["Bill Period", "Property Address", "Customer", "Amount", "Discounted", "Status", "Action"].map((heading) => (
                      <th
                        key={heading}
                        className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider font-Poppins"
                      >
                        {heading}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 bg-white">
                  {billList.map((item, index) => (
                    <tr key={index} className="hover:bg-blue-50/50 transition-colors group">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 font-Poppins">
                            {formatDate(item.billPeriod)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-medium font-Poppins">
                        {item.propertyAddress}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-Poppins">
                        {item.customerFullname}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-700 font-Poppins">
                        {Naira.format(Number(item.billAmount))}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-700 font-Poppins">
                        {Naira.format(Number(item.totalAmount))}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <PaymentStatusBadge status={item.paymentStatus} />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                       {
                      item.paymentStatus === 1 ? (
                        <button
                          onClick={() => setSelectedTransaction(item)}
                          className="text-primary hover:underline transition-colors"
                        >
                          View Receipt
                        </button>
                      ) : (
                        <button className="text-red-500 hover:text-red-600 hover:underline transition-colors">
                          No Payment
                        </button>
                      )
                    }
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Pagination */}
              <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100">
                <p className="text-sm text-gray-500 font-Poppins">
                  Page {page} of {totalPages}
                  <span className="ml-2 text-gray-400">({bills?.data.data.total} total)</span>
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => setPage(page - 1)}
                    disabled={page <= 1}
                    className="px-4 py-2 text-sm font-semibold rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors font-Poppins"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => setPage(page + 1)}
                    disabled={page >= totalPages}
                    className="px-4 py-2 text-sm font-semibold rounded-lg bg-green text-white hover:bg-green/90 disabled:opacity-40 disabled:cursor-not-allowed transition-colors font-Poppins"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Auto Billing Confirm Modal */}
      <Modal isOpen={autoX} title="Auto Billing" onClose={() => setAutoX(false)}>
        <p className="text-base text-gray-700 p-2 font-Poppins">
          I hereby confirm that I want to start auto billing.
        </p>
        <div className="flex justify-end pt-4">
          <Button type="button" onClick={handleAutoBilling}>
            Confirm
          </Button>
        </div>
      </Modal>

            <ReceiptModal
              isOpen={!!selectedTransaction}
              onClose={() => setSelectedTransaction(null)}
              transaction={selectedTransaction}
            />
    </>
  );
};

export default Transaction;