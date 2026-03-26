import React, { useState } from "react";
import { getBillingsByApartmentId } from "../../api/property/apartment.service";
import { ButtonsPrimary } from "../../Component/Buttons";
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
import { IApartment } from "../../models/apartment.interface";
import OccupancyStatusBadge from "../../utils/OccupyStatusBadge";
import { PayBillModal } from "../../Component/Modal/PayBillModal";
import { useQuery } from "@tanstack/react-query";

const Wastebills: React.FC = () => {
  const customer: ICustomer = JSON.parse(
    sessionStorage.getItem("AUTH_USERDETAILS") || "{}"
  );
  const customerApartments: IApartment[] = JSON.parse(
    sessionStorage.getItem("CUSTOMER_APARTMENT") || "[]"
  );


  const [apartment, setApartment] = useState<IApartment>(customerApartments[0]);

  const [searchTerm, setSearchTerm] = useState<string>("");

  const [billData, setBillData] = useState<IBillData>({} as IBillData);
  const [billModal, setBillModal] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1)
  const params = {
    page: page,
    perPage: 10,
  };

  const { data: apartmentBills } = useQuery({
    queryKey: ['apartmentBills', apartment],
    queryFn: async () => {
      const xy = await getBillingsByApartmentId(apartment.id, params);
      console.log(xy);
      return xy.data.data;
    }
  })
  const handleBillModal = (x: IBillData) => {
    setBillData(x);
    setBillModal(!billModal);
  }
  const handleBillPayment = async (x: IBillData) => {
    setBillModal(!billModal)
    try {
      const pop = new PaystackPop();
      pop.newTransaction({
        key: paystackPublicKey,
        email: customer.email,
        amount: parseFloat(x.totalAmount) * 100,
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

  const handleSelectedApartment = (e) => {
    const id = parseInt(e.target.value);
    const apartment = customerApartments.find(x => x.id == id) || {} as IApartment;
    setApartment(apartment);
  }

  const createTransaction = async (x: IBillData, transaction) => {
    try {
      const billPaymentData = [
        {
          apartmentBillingId: x.id,
          customerId: customer.customerId,
          transactionId: "TXN" + transaction.transaction,
          amountPaid: parseFloat(parseFloat(x.totalAmount).toFixed(2)),
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
            className=" border-2 px-2 py-3 pl-5 bg-grayInput shadow-sm rounded-lg font-Poppins h-14 text-black text-base mt-1
          block
          w-full

          border
          border-gray
          text-base
          text-gray-800
          placeholder:text-gray-400
          transition-all
          duration-200
          ease-in-out
          focus:outline-none
          focus:ring-2
          focus:ring-offset-1"
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
      <div className="flex flex-col items-center mb-6">

        <h1 className="text-3xl font-semibold text-gray-700 ml-4 text-center">Waste Bills</h1>
        <p className="text-center font-semibold">Property Code - {apartment.propertyCode}</p>
      </div>
      <div className="mb-6 mt-4 flex justify-center w-full">
        <div className="relative w-full md:w-1/2">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by billing period or apartment type..."
            className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-green/50 focus:border-green transition-all duration-200"
          />
        </div>
      </div>

      {
        <div className="overflow-hidden overflow-x-auto bg-white rounded-2xl shadow-lg border border-gray-100 w-full mt-4">
          <table className="w-full text-left border-collapse whitespace-nowrap">
            <thead>
              <tr className="bg-green text-white text-sm tracking-wider uppercase">
                <th className="px-6 py-5 font-semibold">Period</th>
                <th className="px-6 py-5 font-semibold">Bill Amount</th>
                <th className="px-6 py-5 font-semibold">Discount</th>
                <th className="px-6 py-5 font-semibold">Amount to Pay</th>
                <th className="px-6 py-5 font-semibold">Status</th>
                <th className="px-6 py-5 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {apartmentBills?.data?.length ? (
                apartmentBills.data
                  // .filter((x: any) => x.paymentStatus !== 1)
                  // .filter((x: IBillData) => parseFloat(x.totalAmount) !== 0)
                  .map((item: IBillData, index: number) => (
                    <tr
                      className="hover:bg-green-50/50 transition-colors duration-200 bg-white"
                      key={index}
                    >
                      <td className="px-6 py-5 font-medium text-gray-800">{item.billPeriod}</td>
                      <td className="px-6 py-5 text-gray-600">{Naira.format(Number(item.billAmount))}</td>
                      <td className="px-6 py-5 text-gray-600">{Naira.format(Number(item.discountAmount))}</td>
                      <td className="px-6 py-5 font-bold text-gray-900">{Naira.format(Number(item.totalAmount))}</td>
                      <td className="px-6 py-5">
                        <PaymentStatusBadge status={item.paymentStatus} />
                      </td>
                      <td className="px-6 py-5">
                     { !item.paymentStatus ?   <ButtonsPrimary
                          name="Pay"
                          disabled={Number(item.billAmount) <= 0}
                          onClick={() => handleBillModal(item)}
                        />: <span className="text-gray-500 italic">Already Paid</span>}
                      </td>
                    </tr>
                  ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-16 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <div className="bg-gray-50 rounded-full p-4 mb-4">
                        <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                        </svg>
                      </div>
                      <h2 className="text-lg font-semibold text-gray-700">No pending bills found</h2>
                      <p className="text-sm text-gray-500 mt-1">{"You're all caught up on your payments!"}</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {apartment && apartmentBills?.data?.length > 0 && (
            <div className="flex justify-between items-center mt-6 p-4 w-100">
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
                    className={`w-8 h-8 rounded-full text-sm font-medium transition-all duration-150 ${page === index + 1 ? "bg-green text-white" : "bg-gray-200 text-gray-700"
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
            </div>)}
        </div>
      }
      {
       billData && <PayBillModal handleBillPayment={() => handleBillPayment(billData)} bill={billData} isOpen={billModal} onClose={() => setBillModal(!billModal)} />
      }
    </main>
  );
};

// const Wastebills:React.FC = () => {
//   return (
//     <div className="p-4">
//       <ApartmentsTable /> 
//     </div>
//   )
// }

export default Wastebills;
