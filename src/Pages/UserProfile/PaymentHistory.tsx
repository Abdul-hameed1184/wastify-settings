import React, { useEffect, useRef, useState } from 'react'
import { getBillingsPaymentByApartmentId } from '../../api/property/apartment.service';
import { IPaginatedBillPayment } from '../../models/paginatedBillPayment';

import { IApartment } from '../../models/apartment.interface';
import { useQuery } from '@tanstack/react-query';
import OccupancyStatusBadge from '../../utils/OccupyStatusBadge';
import PaymentStatusBadge from '../../utils/PaymentStatusBadge';
import { IoIosCheckmarkCircle, IoIosArrowRoundBack, IoIosArrowRoundForward } from 'react-icons/io';
import { ButtonsPrimary } from '../../Component/Buttons';
import { Naira } from '../../utils/format';

const PaymentHistory: React.FC = () => {
    const selectRef = useRef<HTMLDivElement>(null);
  const customerApartments: IApartment[] = JSON.parse(
    sessionStorage.getItem("CUSTOMER_APARTMENT") || "[]"
  );
  const [billPayments, setBillPayments] = React.useState<IPaginatedBillPayment>({
    data: [],
    total: 0,
    per_page: 10
  } as unknown as IPaginatedBillPayment);
  const [apartment, setApartment] = useState<IApartment>(customerApartments[0])
  const [params, setParams] = useState({
    page: 1,
    perPage: 10,
    search: ''
  })

  const { data: apartmentBills } = useQuery({
    queryKey: ['apartmentBills', apartment.id],
    queryFn: async () => {
      const response = await getBillingsPaymentByApartmentId(apartment.id);
      return response.data.data;
    }
  })

  const [isSelectOpen, setIsSelectOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsSelectOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
    const apartment = customerApartments.find(x => x.id == id) || {} as IApartment;
    setApartment(apartment);
  }




  return (
    <main className="min-h-screen bg-gray-50 py-6 px-4 md:px-10">
      <div className="flex md:flex-row flex-col justify-between mb-2">
        <div className="w-full md:w-2/5 relative" ref={selectRef}>
          <label
            htmlFor="apartment"
            className="block text-sm font-semibold text-gray-700 mb-1.5 ml-1"
          >
            Select Apartment
          </label>

          <div
            onClick={(e) => setIsSelectOpen(!isSelectOpen)}
            className={`w-full bg-white border-2 flex items-center justify-between px-4 py-2.5 min-h-[56px] rounded-xl cursor-pointer transition-all duration-300 shadow-sm ${isSelectOpen ? 'border-green ring-4 ring-green/10' : 'border-gray-200 hover:border-green/50 hover:shadow-md'}`}
          >
            <div className="flex flex-col flex-1 justify-center overflow-hidden">
              <span className="text-gray-900 font-semibold text-sm md:text-base leading-tight truncate overflow-hidden text-ellipsis whitespace-nowrap">
                {apartment ? apartment.propertyAddress : 'Select an apartment'}
              </span>
              {apartment && (
                <span className="text-xs text-gray-500 font-medium mt-0.5 truncate overflow-hidden text-ellipsis whitespace-nowrap">
                  {apartment.apartmentTypeName}
                </span>
              )}
            </div>
            <div className={`flex items-center justify-center p-1.5 rounded-full transition-transform duration-300 shrink-0 ml-3 ${isSelectOpen ? 'rotate-180 bg-green/10 text-green' : 'text-gray-400 bg-gray-50'}`}>
              <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          <div
            className={`absolute z-20 w-full mt-2 bg-white border border-gray-100 rounded-xl shadow-2xl overflow-hidden transition-all duration-200 origin-top
              ${isSelectOpen ? 'opacity-100 scale-y-100 translate-y-0 visible' : 'opacity-0 scale-y-95 -translate-y-2 invisible'}`}
          >
            <div className="max-h-64 overflow-y-auto py-2 custom-scrollbar">
              {customerApartments?.map((x: IApartment, index) => (
                <div
                  key={index}
                  onClick={() => {
                    setApartment(x);
                    setIsSelectOpen(false);
                  }}
                  className={`px-4 py-3 mx-2 my-1 rounded-lg cursor-pointer transition-all duration-200 flex items-center justify-between group
                    ${apartment?.id === x.id ? 'bg-green/10 border border-green/20 text-green shadow-sm' : 'text-gray-700 hover:bg-gray-50 border border-transparent'}`}
                >
                  <div className="flex flex-col mr-3 overflow-hidden">
                    <span className={`text-sm md:text-base truncate ${apartment?.id === x.id ? 'font-bold text-green' : 'font-medium group-hover:text-green'}`}>
                      {x.propertyAddress}
                    </span>
                    <span className={`text-xs mt-0.5 truncate ${apartment?.id === x.id ? 'text-green/70 font-medium' : 'text-gray-500'}`}>
                      {x.apartmentTypeName}
                    </span>
                  </div>
                  {apartment?.id === x.id && (
                    <div className="bg-green text-white p-1 rounded-full shrink-0 shadow-sm">
                      <IoIosCheckmarkCircle className="text-white bg-green" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center mb-10 mt-6 space-y-4">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 tracking-tight text-center">
          Payment History
        </h1>

        <div className="flex flex-col md:flex-row items-center gap-3 bg-white px-6 py-3 rounded-2xl shadow-sm border border-gray-100 transition-all hover:shadow-md">
          <div className="flex items-center gap-2">
            <OccupancyStatusBadge status={apartment.status} />
            <span className="font-bold text-gray-700 tracking-wide text-sm md:text-base">CODE: {apartment.propertyCode}</span>
          </div>
          <div className="hidden md:block w-1.5 h-1.5 rounded-full bg-gray-300"></div>
          <p className="text-center text-gray-600 font-medium text-sm md:text-base">
            <span className="text-gray-800">{apartment.propertyAddress}</span>
            <span className="mx-2 text-gray-300">|</span>
            {apartment.apartmentTypeName}
          </p>
        </div>
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
            value={params.search}
            onChange={(e) => setParams({ ...params, search: e.target.value })}
            placeholder="Search by billing period..."
            className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-green/50 focus:border-green transition-all duration-200"
          />
        </div>
      </div>


      {/* {
        billData && <PayBillModal handleBillPayment={() => handleBillPayment(billData)} bill={billData} isOpen={billModal} onClose={() => setBillModal(!billModal)} />
      } */}

      {apartmentBills?.data && apartmentBills?.data?.length > 0 &&
        <div className="hidden md:block overflow-x-auto rounded-2xl border border-gray-200 m-0 p-0 rounded-2xl">
          <table className="min-w-full divide-y divide-gray-300     bg-gray-200">
            <thead className="">
              <tr>
                <th className="px-6 py-4 text-left font-normal text-xs text-gray-500 uppercase tracking-wider">Period</th>
                <th className="px-6 py-4 text-left font-normal text-xs text-gray-500 uppercase tracking-wider">Bill Amount</th>
                <th className="px-6 py-4 text-left font-normal text-xs text-gray-500 uppercase tracking-wider">Discount Amount</th>
                <th className="px-6 py-4 text-left font-normal text-xs text-gray-500 uppercase tracking-wider">Amount to Pay Amount</th>
                <th className="px-6 py-4 text-left font-normal text-xs text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left font-normal text-xs text-gray-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-300">
              {apartmentBills.data.map((item: Payme, index: number) => (
                <tr key={index} className="hover:bg-primary/5 hover:shadow-sm hover:-translate-y-0.5 transition-all duration-200 cursor-default">
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{item.billPeriod}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{Naira.format(Number(item.billAmount))}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{Naira.format(Number(item.discountAmount))}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{Naira.format(Number(item.totalAmount))}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                    ><PaymentStatusBadge status={item.paymentStatus} /></span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {!item.paymentStatus ? <ButtonsPrimary
                      name="Pay"
                      disabled={Number(item.billAmount) <= 0}
                      onClick={() => handleBillModal(item)}
                    /> : <span className="text-gray-500 italic">Already Paid</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="hidden md:flex  px-6 py-4 border-t border-gray-100  items-center justify-between bg-white text-sm">
            <button
              onClick={() => setParams((params) => ({ ...params, page: Math.max(1, params.page - 1) }))}
              disabled={params.page === 1}
              className="flex items-center text-black  hover:text-primary disabled:text-gray-200 disabled:cursor-not-allowed transition-colors"
            >
              <IoIosArrowRoundBack className="text-xl mr-1" />
              <span>Previous</span>
            </button>

            <span className=" font-medium">
              Page {params.page} of {apartmentBills.last_page}
            </span>

            <button
              onClick={() => setParams((params) => ({ ...params, page: params.page + 1 }))}
              disabled={params.page === apartmentBills.last_page}
              className="flex items-center text-black hover:text-primary disabled:text-gray-200 disabled:cursor-not-allowed transition-colors"
            >
              <span>Next</span>
              <IoIosArrowRoundForward className="text-xl ml-1" />
            </button>
          </div>
        </div>}
    </main>
  )
}

export default PaymentHistory