import React, { useState } from "react";
import { getBillingsByApartmentId } from "../../api/property/apartment.service";
import {
  Table,
  TableHead,
  TableHeadCell,
  TableBody,
  TableRow,
  TableCell,
} from "flowbite-react";
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
  const customerApartments:IApartment[] = JSON.parse(
    sessionStorage.getItem("CUSTOMER_APARTMENT") || "[]"
  );


  const [ apartment, setApartment ] = useState<IApartment>(customerApartments[0]);

  const [searchTerm, setSearchTerm] = useState<string>("");

  const [ billData, setBillData ] = useState<IBillData>({} as IBillData);
  const [ billModal, setBillModal ] = useState<boolean>(false);
  const [ page, setPage ] = useState<number>(1)
    const params = {
    page: page,
    perPage: 10,
  };

const { data:apartmentBills } = useQuery({
  queryKey: ['apartmentBills', apartment],
  queryFn: async () => {
    const xy =  await getBillingsByApartmentId(apartment.id, params);
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
    const apartment = customerApartments.find(x => x.id  == id)||{} as IApartment;
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
        {/* <Link to="/profile">
          <IoChevronBack size={28} className="bg-green text-white rounded-xl p-1" />
        </Link> */}
        <h1 className="text-3xl font-semibold text-gray-700 ml-4 text-center">Waste Bills</h1>
        <p className="text-center font-semibold">Property Code - {apartment.propertyCode}</p>
      </div>
      <div className=" m-6 flex justify-center">

  <input
    type="text"
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    placeholder="Search by billing period or apartment type..."
    className="w-full md:w-1/2 px-4 py-2 border border-gray-300 m-auto rounded-lg shadow-sm focus:outline-nonefocus:ring-green"
  />
</div>

      {
       <div className="overflow-x-auto bg-white rounded-xl shadow-md mt-4 p-0 w-full">

          <Table striped>
            <TableHead className="bg-green text-white text-lg uppercase">
              <TableHeadCell>Period</TableHeadCell>
              <TableHeadCell>Bill Amount</TableHeadCell>
              <TableHeadCell>Discount Amount</TableHeadCell>
              <TableHeadCell>Amount to Pay</TableHeadCell>
              <TableHeadCell>Status</TableHeadCell>
              <TableHeadCell>Action</TableHeadCell>
            </TableHead>
            <TableBody className="divide-y font-Poppins text-lg">
              {apartmentBills?.data?.length ? (
  apartmentBills.data
    .filter((x) => x.paymentStatus !== 1)
                .filter((x:IBillData) => parseFloat(x.totalAmount) != 0 )
                .map((item: IBillData, index) => (
                  <TableRow
                    className={
                      
                      index % 2 === 0
                        ? "bg-gray-50 text-lg"
                        : "bg-white dark:bg-gray-800 text-lg"
                    }
                    key={index}
                  >
                    <TableCell>{item.billPeriod}</TableCell>

  
                    <TableCell >{Naira.format(Number(item.billAmount))}</TableCell>
                                <TableCell>{Naira.format(Number(item.discountAmount))}</TableCell>
                                     <TableCell className="font-semibold">{Naira.format(Number(item.totalAmount))}</TableCell>
                      <TableCell>
                      <PaymentStatusBadge status={item.paymentStatus} />
                    </TableCell>
                    <TableCell>
                      <ButtonsPrimary
                        name="Pay"
                        disabled={Number(item.billAmount) <= 0}
                        onClick={() => handleBillModal(item)}
                      />
                    </TableCell>
                  </TableRow>
                  )))
                : (
                  <TableRow>
                    <TableCell colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500">
                      <h2 className="text-xl font-semibold text-gray-100">No bills found.</h2>
                    </TableCell>
                  </TableRow>
                )}
            </TableBody>
          </Table>

          {/* Pagination */}
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
          </div>)}
        </div>
      }
      {
        <PayBillModal handleBillPayment={()=>handleBillPayment(billData)} bill={billData} isOpen={billModal} handleOpen={()=>setBillModal(!billModal)} />
      }
    </main>
  );
};

export default Wastebills;
