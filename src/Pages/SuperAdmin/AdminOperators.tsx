import React, { useEffect, useState } from "react";

import { GrOverview } from "react-icons/gr";


import { useQuery } from "@tanstack/react-query";
import Loader from "../../Component/Loader";
import { IApartment } from "../../models/apartment.interface";
import CreateCustomer from "../Operator/AddCustomer/CreateCustomer";
import { useSearchParams } from "react-router-dom";
import { getAdminCustomers, getOperators } from "../../api/admin/admin.service";
import Input from "../../Component/InputField";
import { FaLongArrowAltRight } from "react-icons/fa";
import { IoSearchOutline } from "react-icons/io5";
import { PiUsersThree } from "react-icons/pi";
import { Button } from "../../Component/Button";
import Card from "../../Component/Card/Card";
import { Modal } from "../../Component/Modal/Modal";
import { Naira } from "../../utils/format";



const AdminOperators: React.FC = () => {
  const admin = JSON.parse(sessionStorage.getItem("AUTH_ADMIN_DETAILS") || "");
  const [openCreateCustomer, setOpenCreateCustomer] = useState<boolean>(false);
    const [customerApartments, setCustomerApartments] = useState<IApartment[]>();
    const [ openViewCustomer, setOpenViewCustomer ] = useState<boolean>(false);
    const [searchParams, setSearchParams] = useSearchParams();
   const [localSearch, setLocalSearch] = useState(searchParams.get("search") || "");
    const [page, setPage] = useState<number>(1);
  
    const searchTerm = searchParams.get("search") || "";
  
    const params = {
      page: page,
      perPage: 10,
      searchTerm: searchTerm,
    };
  
    useEffect(() => {
      const timer = setTimeout(() => {
        setSearchParams(prev => {
          if (localSearch) {
            prev.set("search", localSearch);
          } else {
            prev.delete("search");
          }
          return prev;
        });
        setPage(1);
      }, 500);
      return () => clearTimeout(timer);
    }, [localSearch, setSearchParams]);
  
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setLocalSearch(e.target.value);
    };
  
    const { data: allcustomers, isLoading, isError } = useQuery({
      queryKey: ['admin-operators', page, searchTerm],
      queryFn: async () => {
        const xy = await getOperators(params);
        console.log(xy)
        return xy;
      }
    });
  
  
  
  
  
    interface Customerx {
      customerId: string;
      customerFullname: string;
      customerPhone: string;
      customerEmail: string;
    }
  
  
    const viewCustomer = (customerId: string) => {
      const dy = allcustomers?.data.data.data.filter(item => item.customerId === customerId);
      
      setCustomerApartments(dy);
      console.log(dy)
      setOpenViewCustomer(true)
    };
  
    
  
   
  
  const comp = (
    <div className="p-1 w-full">
      {isError && <p className="text-red-500 mb-4 text-sm font-medium">Error loading apartments</p>}
      <div className="overflow-x-auto rounded-xl border border-gray-300 p-4">
        <table className="table-auto min-w-full divide-y divide-gray-200">
          <thead  className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">S/N</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Apartment Type</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Address</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {customerApartments && customerApartments.map((apartment: IApartment, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-sm text-gray-600">{index + 1}</td>
                <td className="px-4 py-3 text-sm text-gray-600">{apartment.apartmentTypeName}</td>
                <td className="px-4 py-3 text-sm text-gray-600">{apartment.propertyAddress}</td>
              </tr>
            ))}
            {(!customerApartments || customerApartments.length === 0) && (
              <tr>
                <td colSpan={3} className="px-6 py-10 text-center text-sm text-gray-500 italic">No apartments found for this customer.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
  
  
  
    if (isLoading) {
      return <Loader />;
    }
  
    return (
      <main className="mb-10  mx-auto px-2 md:px-8  sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col mb-8 px-4">
          <h3 className="font-bold text-2xl text-gray-900 tracking-tight">Operators</h3>
          <p className="text-gray-500 text-sm mt-1">{"Manage and view all your registered customers in one place."}</p>
        </div>
  
        <div className="flex items-center justify-between mb-8 gap-4">
          <Card className="flex-1 max-w-sm rounded-2xl overflow-hidden p-2">
            <div className="flex flex-row justify-between items-center px-4 py-2">
              <div>
                <p className="font-medium text-sm text-gray-500">Total Operators</p>
                <p className="font-bold text-3xl text-gray-900 py-1">{allcustomers?.data.data.total || 0}</p>
              </div>
              <span className="bg-green/10 flex items-center justify-center text-green p-4 rounded-xl text-3xl shadow-sm">
                <PiUsersThree />
              </span>
            </div>
          </Card>
        </div>
  
        <div className="bg-white border border-gray-300 rounded-2xl mb-10 overflow-hidden shadow-sm flex flex-col p-4">
          <div className="p-4 mb-4 flex justify-between rounded-lg items-center bg-gray-50/50 flex-wrap gap-4">
            <h2 className="text-xl font-bold text-gray-900 tracking-tight">Operators</h2>
            <div className="flex gap-3 items-center w-full md:w-auto md:flex-row flex-col">
              <div className="w-full md:w-auto">
                <Input 
                  iconPosition="left" 
                  className="mb-2" 
                  icon={<IoSearchOutline />} 
                  type="text" 
                  placeholder="Search Operators" 
                  value={localSearch}
                  onChange={handleSearchChange}
                />
              </div>
              {/* <Button 
                className="w-full md:w-auto px-5 py-2.5 text-sm mb-6 font-medium text-black bg-green rounded-lg hover:bg-green/90 transition-all shadow-sm hover:shadow-md whitespace-nowrap flex items-center gap-2 justify-center" 
                onClick={() => setOpenCreateCustomer(!openCreateCustomer)}
              >
                Add Operator <FaLongArrowAltRight />
              </Button> */}
            </div>
          </div>
  
          {!isLoading && allcustomers?.data.data.data.length > 0 && (
            <div className="w-full border border-gray-300 rounded-lg overflow-x-auto shadow-sm">
              <table className="table-auto min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">S/N</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Phone Number</th>
                                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Email</th>
                                                          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Location</th>
                    <th className="px-6 py-4 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">Action</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {allcustomers?.data.data.data.map((item, index: number) => (
                    <tr key={index} className="hover:bg-blue-50/50 transition-colors group">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {(page - 1) * (allcustomers?.data.data.per_page || 10) + index + 1}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-semibold">{item.businessName}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-medium">{item.phone}</td>
                                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-medium">{item.email}</td>
                             <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-medium">{item.wardName}{", "} {item.stateName}</td>
                           
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <button
                          onClick={() => viewCustomer(item.customerId)}
                          className="p-2 text-gray-500 hover:text-green hover:bg-green/10 rounded-lg transition-all inline-flex items-center gap-2"
                          title="View Details"
                        >
                          <GrOverview className="text-xl" />
                          <span className="text-sm font-medium">View Operator</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
  
              {/* Pagination */}
              <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100">
                <p className="text-sm text-gray-500">
                  Page {page} of {Math.ceil((allcustomers?.data.data.total || 0) / (allcustomers?.data.data.per_page || 10))}
                  <span className="ml-2 text-gray-400">({allcustomers?.data.data.total || 0} total)</span>
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => setPage(page - 1)}
                    disabled={page === 1}
                    className="px-4 py-2 text-sm font-semibold rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => setPage(page + 1)}
                    disabled={Math.ceil((allcustomers?.data.data.total || 0) / (allcustomers?.data.data.per_page || 10)) <= page}
                    className="px-4 py-2 text-sm font-semibold rounded-lg bg-green text-white hover:bg-green/90 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          )}
  
          {!isLoading && (!allcustomers?.data.data.data.length) && (
            <div className="flex flex-col items-center justify-center p-12 bg-white border-t border-gray-100 border-dashed">
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-1">No Customers Found</h2>
              <p className="text-gray-500 text-center max-w-sm">{"You haven't added any customers yet. Add a new customer to get started."}</p>
            </div>
          )}
        </div>
  
        {/* {openCreateCustomer && (
          <CreateCustomer
            openModal={openCreateCustomer}
            setOpenModal={setOpenCreateCustomer}
          />
        )}{" "} */}
  
        {/* {
       openViewCustomer &&  
  
      //  <InfoModal 
      //  openModal={openViewCustomer} setOpenModal={()=> setOpenViewCustomer(!openViewCustomer)} header={"Customer Apartments"} 
      //  content={comp} buttonName={"Ok"} handleConfirm={()=>{}} />
      <Modal isOpen={openViewCustomer} onClose={()=> setOpenViewCustomer(!openViewCustomer)} title="Customer Apartments">
              {comp}
        
      </Modal>
  
  
      
        } */}
  
      </main>
    );
  };

export default AdminOperators;
