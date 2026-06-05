import React, { useEffect, useState } from "react";
import { FaLongArrowAltRight } from "react-icons/fa";
import { IoSearchOutline } from "react-icons/io5";
import { LuGlasses } from "react-icons/lu";
import { MdEdit, MdDeleteForever } from "react-icons/md";
import { PiBuildings } from "react-icons/pi";
import { Link, useSearchParams } from "react-router-dom";
import { Button } from "../../Component/Button";
import Card from "../../Component/Card/Card";
import DropdownMenu from "../../Component/DropdownMenu";
import Input from "../../Component/InputField";
import UpdatePropertyModal from "../../Component/Modal/UpdatePropertyModal";
import { IProperty } from "../../models/property.interface";
import { useQuery } from "@tanstack/react-query";
import { getPropertyByOperator } from "../../api/psp-operator/psp-operator.service";
import { getAdminProperties } from "../../api/admin/admin.service";
// import { LuGlasses } from "react-icons/lu";

// import { FaPlusCircle } from "react-icons/fa";
// import { useQuery } from "@tanstack/react-query";
// import { MdDeleteForever, MdEdit } from "react-icons/md";
// import { Link } from "react-router-dom";
// import Loader from "../../Component/Loader";
// import DropdownMenu from "../../Component/DropdownMenu";
// import CreatePropertyModal from "../../Component/Modal/CreatePropertyModal";
// import InfoModal from "../../Component/Modal/InfoModal";
// import UpdatePropertyModal from "../../Component/Modal/UpdatePropertyModal";
// import { ParagraphLargeGreen } from "../../Component/Paragraph";
// import { IProperty } from "../../models/property.interface";
// import { getAdminProperties } from "../../api/admin/admin.service";



const AdminProperties:React.FC = () => {
  const admin = JSON.parse(sessionStorage.getItem("AUTH_ADMIN_DETAILS")||"");
//   const [ openCreateProperty, setOpenCreateProperty] = useState<boolean>(false);
//     const [ openUpdateProperty, setOpenUpdateProperty] = useState<boolean>(false);
//   const [ viewDelete, setViewDelete ] = useState<boolean>(false)
 const [ page, setPage] = useState<number>(1);
   const [searchParams, setSearchParams] = useSearchParams();
   const [localSearch, setLocalSearch] = useState(searchParams.get("search") || "");
//   const params = {
//     page: page,
//     perPage: 10,
//   };
     
//   const handleOpenUpdateProperty = () => {
//     setOpenUpdateProperty(!openUpdateProperty);
//   }
//   const { data: allProperties, isLoading } = useQuery({
//         queryKey: ['properties', page],
//         queryFn: async() => {
//           const res =  await  getAdminProperties(params)
//           console.log(res);
//           return res;
//         }
  

//   })

//   console.log(allProperties);
//   const handleDelete = () => {

//   };
//   if(isLoading){
//     return <Loader color="slate-900" />
//   }

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
     
  const handleOpenUpdateProperty = () => {
    setOpenUpdateProperty(!openUpdateProperty);
  }
  const { data: allProperties, isLoading } = useQuery({
        queryKey: ['properties', admin.userId, page, searchTerm],
        queryFn: async() => {
          const res =  await  getAdminProperties(params)
          console.log(res);
          return res;
        }
  

  })

  console.log(allProperties);

  return (
    <main className="mb-10  mx-auto md:px-8 py-6">
      <div className="flex flex-col mb-8">
        <h3 className="font-bold text-2xl text-gray-900 tracking-tight">Properties List</h3>
        <p className="text-gray-500 text-sm mt-1">{"Here's what's happening with your waste management account."}</p>
      </div>

    
      <div className="flex items-center justify-between mb-8 gap-4">
        <Card className="flex-1 max-w-sm rounded-2xl  overflow-hidden p-2">
          <div className="flex flex-row justify-between items-center px-2 py-1">
            <div>
              <p className="font-medium text-sm text-gray-500 flex justify-between"><span>Total Properties</span></p>
              <p className="font-bold text-3xl text-gray-900 py-1">{allProperties?.data.data.total || 0}</p>
            </div>
            <span className="bg-green/10 flex items-center justify-center text-green p-4 rounded-xl text-3xl shadow-sm"><PiBuildings /></span>
          </div>
        </Card>
      </div>

      <div className="bg-white border border-gray-300 rounded-2xl mb-10 overflow-hidden shadow-sm flex flex-col p-4">
        <div className="p-4 mb-4 border border-gray-300 flex justify-between rounded-lg items-center bg-gray-50/50 flex-wrap gap-4">
          <h2 className="text-xl font-bold text-gray-900 tracking-tight">All Properties</h2>
          <div className="flex gap-3 items-center w-full md:w-auto md:flex-row flex-col">
            <div className="w-full md:w-auto">
              <Input 
                iconPosition="left" 
                className="mb-2" 
                icon={<IoSearchOutline />} 
                type="text" 
                placeholder="Search Property" 
                value={localSearch}
                onChange={handleSearchChange}
              />
            </div>
            {/* <Button className="w-full md:w-auto px-5 py-2.5 text-sm mb-6 font-medium text-black bg-green rounded-lg hover:bg-green/90 transition-all shadow-sm hover:shadow-md whitespace-nowrap flex items-center gap-2 justify-center" onClick={()=>setOpenCreateProperty(!openCreateProperty)}>
              Add Property <FaLongArrowAltRight />
            </Button> */}
          </div>
        </div>

       { !isLoading && allProperties?.data.data.data.length > 0 &&  
          <div className="w-full border border-gray-300 rounded-lg overflow-x-auto shadow-sm">
            <table className="table-auto min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">S/N</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Property Address</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Ward</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Owner</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Property Code</th>
                  <th className="px-6 py-4 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">No Of Apartments</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Action</th>
                </tr>
              </thead>    
              <tbody className="bg-white divide-y divide-gray-100">
                {allProperties && allProperties.data.data.data.map((property:IProperty, index) => (
                  <tr key={index} className="hover:bg-blue-50/50 transition-colors group">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{(page - 1) * params.perPage + index + 1}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-medium">{property.propertyAddress}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      {property.wardName}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">{property.ownerFullname}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{property.propertyCode}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center font-bold text-gray-900">
                    {property.noOfDistinctApartment}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-base text-sm text-gray-500">
                    <DropdownMenu>
                      <h2 className=" px-4 py-2 font-semibold">Take Action</h2>
                      <Link
                        to={`${property.id}`}
                        state={{ property }}
                        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        <LuGlasses className="text-green" />
                        <span>View Property</span>
                      </Link>
                      <button
                        type="button"
                        onClick={() => setOpenUpdateProperty(!openUpdateProperty)}
                        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 w-full text-left"
                      >
                        <MdEdit className="text-blue-500" />
                        <span>Edit Property</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setViewDelete(!viewDelete)}
                        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 w-full text-left"
                      >
                        <MdDeleteForever className="text-red-500" />
                        <span>Delete Property</span>
                      </button>
                    </DropdownMenu>
                    {/* {openUpdateProperty && (
                      <UpdatePropertyModal
                        openModal={openUpdateProperty}
                        handleOpenModal={handleOpenUpdateProperty}
                        operator={operator}
                        property={property}
                      />
                    )} */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100">
            <p className="text-sm text-gray-500">
              Page {page} of {Math.ceil((allProperties?.data.data.total || 1) / (allProperties?.data.data.per_page || 10))}
              <span className="ml-2 text-gray-400">({allProperties?.data.data.total} total)</span>
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
                disabled={page >= Math.ceil((allProperties?.data.data.total || 1) / (allProperties?.data.data.per_page || 10))}
                className="px-4 py-2 text-sm font-semibold rounded-lg bg-green text-white hover:bg-green/90 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                Next
              </button>
            </div>
          </div>
        </div>
       }


      { allProperties?.data.data.data.length === 0  && (
        <div className="flex flex-col items-center justify-center p-12 bg-white border-t border-gray-100 border-dashed">
          <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-1">No Properties Found</h2>
          <p className="text-gray-500 text-center max-w-sm">You haven't added any properties yet. Add a new property to get started.</p>
        </div>
      ) }

      </div>
      {/* <CreatePropertyModal openModal={openCreateProperty} setOpenModal={setOpenCreateProperty} operator={operator} /> */}
    </main>



  )
};

 export default AdminProperties;
