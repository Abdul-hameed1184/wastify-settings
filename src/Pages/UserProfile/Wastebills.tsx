import React, { useEffect, useState } from "react";
import { IoChevronBack } from "react-icons/io5";
import { Link } from "react-router-dom";
import { getBillingsByApartmentId } from "../../api/property/apartment.service";
import { IPaginatedApartmentBills } from "../../models/paginatedApartmentBillsForCustomer";
import {
  Table,
  TableHead,
  TableHeadCell,
  TableBody,
  TableRow,
  TableCell,
} from "flowbite-react";
import { ButtonsPrimary } from "../../Component/Buttons";
import { Paragraph2Xl } from "../../Component/Paragraph";
import { IBillData } from "../../models/billdata.interface";
import {
  create_transaction,
  verifyPayment,
} from "../../api/paystack-payment/paystack-api";
import PaystackPop from "@paystack/inline-js";
import { ICustomer } from "../../models/customer.interface";
import { toast } from "react-toastify";
import { paystackPublicKey } from "../../utils/apiConfig";
import PaymentStatusBadge from "../../utils/PaymentStatusBadge";
import { Naira } from "../../utils/format";

const Wastebills: React.FC = () => {
  const [page, setPage] = useState<number>(1);
  const [apartmentBills, setApartmentBills] =
    useState<IPaginatedApartmentBills>({} as IPaginatedApartmentBills);
    const [searchTerm, setSearchTerm] = useState<string>("");

  const customer: ICustomer = JSON.parse(
    sessionStorage.getItem("AUTH_USERDETAILS") || "{}"
  );
  const customerApartments = JSON.parse(
    sessionStorage.getItem("CUSTOMER_APARTMENT") || "[]"
  );

  useEffect(() => {
    (async () => {
      const data = await getBillingsByApartmentId(customerApartments[0]?.id);
      setApartmentBills(data.data.data);
    })();
  }, [customerApartments, page]);

  const handleBillPayment = async (x: IBillData) => {
    try {
      const pop = new PaystackPop();
      pop.newTransaction({
        key: paystackPublicKey,
        email: customer.email,
        amount: parseFloat(x.billAmount) * 100,
        onSuccess: async (transaction) => {
          await createTransaction(x, transaction);
          toast.success("Payment Successful");
        },
        onLoad: async (response) => {
          await verifyPayment(response.reference);
        },
        onCancel: () => {
          console.log("Payment cancelled");
        },
        onError: (error) => {
          console.error("Payment error:", error.message);
          toast.error("Error during payments");
        },
      });
    } catch (err) {
      console.error(err);
      toast.error("Error initializing payment");
    }
  };

  const createTransaction = async (x: IBillData, transaction) => {
    try {
      const billPaymentData = [
        {
          apartmentBillingId: x.id,
          customerId: customer.customerId,
          transactionId: "TXN" + transaction.transaction,
          amountPaid: parseFloat(parseFloat(x.billAmount).toFixed(2)) * 100,
          paymentMode: "PayStack Payment",
          paymentStatus: 1,
        },
      ];
      const response = await create_transaction({ billPaymentData });
      console.log("Transaction response:", response);
    } catch (error) {
      console.error("Transaction error:", error);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 py-6 px-4 md:px-10">
      <div className="flex items-center mb-6">
        <Link to="/profile">
          <IoChevronBack size={28} className="bg-green text-white rounded-xl p-1" />
        </Link>
        <h1 className="text-xl font-semibold text-gray-700 ml-4">Waste Bills</h1>
      </div>
      <div className="mt-6 mx-4 flex justify-center">
  <input
    type="text"
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    placeholder="Search by billing period or apartment type..."
    className="w-full md:w-1/2 px-4 py-2 border border-gray-300 m-auto rounded-lg shadow-sm focus:outline-nonefocus:ring-green"
  />
</div>

      {apartmentBills && apartmentBills.data ? (
        <div className="overflow-x-auto bg-white rounded-xl shadow-md p-4">
          <Table striped>
            <TableHead className="bg-green text-white text-sm uppercase">
              <TableHeadCell>Period</TableHeadCell>
              <TableHeadCell>Apartment Type</TableHeadCell>
              <TableHeadCell>Bill Amount</TableHeadCell>
              <TableHeadCell>Discount Amount</TableHeadCell>
              <TableHeadCell>Status</TableHeadCell>
              <TableHeadCell>Action</TableHeadCell>
            </TableHead>
            <TableBody>
              {apartmentBills.data
                .filter((x) => x.paymentStatus !== 1)
                .map((item: IBillData, index) => (
                  <TableRow
                    className={
                      index % 2 === 0
                        ? "bg-gray-50"
                        : "bg-white dark:bg-gray-800"
                    }
                    key={index}
                  >
                    <TableCell>{item.billPeriod}</TableCell>
                    <TableCell>{item.apartmentTypeName}</TableCell>
  
                    <TableCell className="text-xl">{Naira.format(Number(item.billAmount))}</TableCell>
                                <TableCell className="text-xl">{Naira.format(Number(item.discountAmount))}</TableCell>
                                              <TableCell>
                      <PaymentStatusBadge status={item.paymentStatus} />
                    </TableCell>
                    <TableCell>
                      <ButtonsPrimary
                        name="Pay"
                        disabled={Number(item.billAmount) <= 0}
                        onClick={() => handleBillPayment(item)}
                      />
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>

          {/* Pagination */}
          <div className="flex justify-between items-center mt-6">
            <button
              className="text-green font-medium disabled:opacity-50"
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
            >
              Previous
            </button>
            <div className="flex space-x-2">
              {Array.from({
                length: Math.ceil(
                  apartmentBills.total / apartmentBills.per_page
                ),
              }).map((_, index) => (
                <button
                  key={index}
                  className={`w-8 h-8 rounded-full text-sm font-medium transition-all duration-150 ${
                    page === index + 1 ? "bg-green text-white" : "bg-gray-200 text-gray-700"
                  }`}
                  onClick={() => setPage(index + 1)}
                >
                  {index + 1}
                </button>
              ))}
            </div>
            <button
              className="text-green font-medium disabled:opacity-50"
              onClick={() => setPage(page + 1)}
              disabled={
                page + 1 > Math.ceil(apartmentBills.total / apartmentBills.per_page)
              }
            >
              Next
            </button>
          </div>
        </div>
      ) : (
        <div className="mt-10">
          <Paragraph2Xl content="No billing record available." />
        </div>
      )}
    </main>
  );
};

export default Wastebills;
