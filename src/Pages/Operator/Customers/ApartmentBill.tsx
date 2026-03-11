import React, { useState } from "react";
import { IOperator } from "../../../models/operator.interface";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { getApartmentById, getApartmentTypePrice, getBillingsByApartmentId } from "../../../api/property/apartment.service";
import { IBillData } from "../../../models/billdata.interface";
import Loader from "../../../Component/Loader";
import { MdDeleteForever, MdEdit, MdOutlineArrowBackIosNew } from "react-icons/md";
import PaymentStatusBadge from "../../../utils/PaymentStatusBadge";
import { Naira } from "../../../utils/format";

import { Button } from "../../../Component/Button";
import OccupancyStatusBadge from "../../../utils/OccupyStatusBadge";
import DataCard from "../../../Component/DataCard";
import { UpdateApartmentModal } from "../../../Component/Modal/UpdateApartmentModal";
import { useQuery } from "@tanstack/react-query";
import CreateApartmentBill from "../../../Component/Modal/CreateApartmentBill";
import { toast } from "react-toastify";
import { GoArrowRight } from "react-icons/go";


const ApartmentBill: React.FC = () => {
    const { apartmentId } = useParams();
    const navigate = useNavigate();
  const [ updateModal, setUpdateModal ] = useState<boolean>(false)
  const [openCreateBillModal, setOpenCreateBillModal] =
    useState<boolean>(false);
  const operator: IOperator = JSON.parse(
    sessionStorage.getItem("AUTH_ADMIN_DETAILS") || ""
  );
  const location = useLocation();
  const { state: { property} } = location;
  const [ page, setPage ] = useState<number>(1);
  console.log(property)


  const { data:apartment } = useQuery({
    queryKey: ['apartment'],
    queryFn: async () => {
      const data = await getApartmentById(Number(apartmentId));
      console.log(data);
      return data.data.data;
    }
  })





  

  // const [ currentBill, setCurrentBill ] = useState<string>("0")
  const months = [
    { id: "01", name: "January" },
    { id: "02", name: "February" },
    { id: "03", name: "March" },
    { id: "04", name: "April" },
    { id: "05", name: "May" },
    { id: "06", name: "June" },
    { id: "07", name: "July" },
    { id: "08", name: "August" },
    { id: "09", name: "September" },
    { id: "10", name: "October" },
    { id: "11", name: "November" },
    { id: "12", name: "December" },
  ];

  const params = {
    page: page,
    perPage: 10,
  };
  const { data : bill = null } = useQuery({
        queryKey: ['bill', property],
        queryFn: async() => {
          const data =  await getApartmentTypePrice(apartment.apartmentTypeId, operator.id, property?.propertyTypeId)
          console.log(data);
          return data.data.data[0];
        },
        placeholderData: null
  })


const { data: billHistory, isLoading } = useQuery({
  queryKey: ['billHistory', apartmentId, page],
  queryFn: async () => {
    try {
      const history = await getBillingsByApartmentId(apartment.id, params);
      console.log(history)
      return history;
    } catch (error: any) {
      if (error.response && error.response.status === 404) {
        return { data: { data: { data: [] } } }; // empty array fallback
      }
      throw error;
    }
  },
});

if(isLoading){
  return <Loader />;
}

const apartmentField = [
  { key: "apartmentTypeName", label: "Apartment Type"},
  {key: "propertyAddress", label:"Property Address"},
  { key: "propertyCode", label: "Property Code"},
  { key:"customerFullname", label:"Customer Name"},
  { key: "customerPhone", label: "Customer Phone"}
]


  function formatDate(dx: string): string {
    const splitted = dx.split("-");
    return getMonthById(splitted[0]).name + ", " + splitted[1];
  }

  function getMonthById(id: string): { id: string; name: string } {
    const month = months.find((month) => month.id === id);
    return month ? month : months[0];
  }



  return (
    <main className="mb-10 max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 py-6">
      {
        <div>
          <div className="flex flex-row items-center gap-3 mb-8">
            <div 
              onClick={() => navigate("/properties")}
              className="flex items-center justify-center border border-gray-200 text-gray-500 rounded-xl cursor-pointer w-10 h-10 hover:bg-gray-100 hover:text-gray-900 hover:border-gray-300 transition-all shadow-sm"
            >
              <MdOutlineArrowBackIosNew className="text-lg" />
            </div>
            <h2 className="text-sm font-medium tracking-wide">
              <span className="text-gray-400">Properties / Apartment / </span>
              <span className="text-gray-900">Details</span>
            </h2>
          </div>

          <div className="bg-white border border-gray-300 rounded-2xl mb-10 overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <div className="flex items-center gap-3">
                <h2 className="text-xl font-bold text-gray-900 tracking-tight">Apartment Information</h2>
                {apartment && <OccupancyStatusBadge status={apartment?.status} />}
              </div>
              <Button 
                onClick={() => setUpdateModal(!updateModal)}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-black border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors shadow-sm"
              >
                <MdEdit className="text-black" />
                Edit Details
              </Button>
            </div>
            <div className="p-6">
              { apartment && <DataCard data={apartment} fields={apartmentField} /> }
            </div>
          </div>

          <div className="flex justify-between items-center mb-6 px-1">
            <div>
              <h3 className="text-xl font-bold text-gray-900 tracking-tight">Billing History</h3>
              <p className="text-sm text-gray-500 mt-1">Manage and view all bills for this apartment.</p>
            </div>
            <Button
              onClick={() =>{
                if(bill == null){
                    toast.error("No price setup for this customer")
                }else{
                 setOpenCreateBillModal(true);
                } 
              }}
              className="flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-black bg-green rounded-lg hover:bg-green/90 transition-all shadow-sm hover:shadow-md"
            >
              Create Bill <GoArrowRight className="text-lg" />
            </Button>
          </div>
        </div>
      }
      

      
      { (!billHistory?.data || billHistory?.data?.data?.data?.length === 0) && (
        <div className="flex flex-col items-center justify-center p-12 bg-white rounded-2xl border border-gray-100 border-dashed mb-10">
          <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-1">No Bills Found</h2>
          <p className="text-gray-500 text-center max-w-sm">There are currently no bills associated with this apartment. Create a new bill to get started.</p>
        </div>
      )}
      { billHistory?.data?.data?.data?.length > 0 && 
        <div className="overflow-x-auto rounded-2xl border border-gray-200 shadow-sm bg-white mb-6">
          <table className="table-auto min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Bill Amount</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Discount %</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Discount Value</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Final Amount</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>    
            <tbody className="divide-y divide-gray-100 bg-white">
              {billHistory?.data?.data?.data?.map((bill: IBillData, index: number) => (
                <tr key={index} className="hover:bg-blue-50/50 transition-colors group">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {formatDate(bill.billPeriod)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-medium">
                    {Naira.format(Number(bill.billAmount))}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      {parseInt(bill.discountPercentage)}%
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-red-500 font-medium">
                    -{Naira.format(Number(bill.discountAmount))}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-bold">
                    {Naira.format(Number(bill.billAmount) - Number(bill.discountAmount))}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                      <PaymentStatusBadge status={bill.paymentStatus} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
      
          {/* Pagination */}
          <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100">
            <p className="text-sm text-gray-500">
              Page {page} of {Math.ceil((billHistory?.data?.data?.total || 1) / (billHistory?.data?.data?.per_page || 10))}
              <span className="ml-2 text-gray-400">({billHistory?.data?.data?.total} total)</span>
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setPage(page - 1)}
                disabled={page <= 1}
                className="px-4 py-2 text-sm font-semibold rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                Previous
              </button>
              <button
                onClick={() => setPage(page + 1)}
                disabled={page >= Math.ceil((billHistory?.data?.data?.total || 1) / (billHistory?.data?.data?.per_page || 10))}
                className="px-4 py-2 text-sm font-semibold rounded-lg bg-green text-white hover:bg-green/90 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      
      
      }
 
      {
      
        openCreateBillModal && <CreateApartmentBill openModal={openCreateBillModal} setOpenModal={setOpenCreateBillModal} apartmentBill={bill.amount||"0.00"} apartment={apartment} />
      }


      {
        updateModal && <UpdateApartmentModal apartment={apartment} openModal={updateModal} handleUpdateModal={()=>setUpdateModal(!updateModal)} owing={ billHistory?.data.data.data.filter(x => x.paymentStatus = 0)} />
      }
      
    </main>
  );
};

export default ApartmentBill;
