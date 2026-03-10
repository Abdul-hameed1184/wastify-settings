import React, { useState } from "react";
import { IProperty } from "../../../models/property.interface";
import { IOperator } from "../../../models/operator.interface";
import { getPropertyByOperator } from "../../../api/psp-operator/psp-operator.service";
import Loader from "../../../Component/Loader";
import { LuGlasses } from "react-icons/lu";

import { useQuery } from "@tanstack/react-query";
import { MdDeleteForever, MdEdit } from "react-icons/md";
import { Link } from "react-router-dom";
import DropdownMenu from "../../../Component/DropdownMenu";
import UpdatePropertyModal from "../../../Component/Modal/UpdatePropertyModal";
import Card from "../../../Component/Card/Card";
import { TbCurrencyNaira } from "react-icons/tb";
import { IoEllipsisVertical, IoSearchOutline } from "react-icons/io5";
import { PiBuildings } from "react-icons/pi";
import { Button } from "../../../Component/Button";
import Input from "../../../Component/InputField";
import { FaLongArrowAltRight } from "react-icons/fa";


const Properties:React.FC = () => {
  const operator:IOperator = JSON.parse(sessionStorage.getItem("AUTH_ADMIN_DETAILS")||"");
  // const [ openCreateProperty, setOpenCreateProperty] = useState<boolean>(false);
    const [ openUpdateProperty, setOpenUpdateProperty] = useState<boolean>(false);
  const [ viewDelete, setViewDelete ] = useState<boolean>(false)
  const [ page, setPage] = useState<number>(1);
  const params = {
    page: page,
    perPage: 10,
  };
     
  const handleOpenUpdateProperty = () => {
    setOpenUpdateProperty(!openUpdateProperty);
  }
  const { data: allProperties, isLoading } = useQuery({
        queryKey: ['properties', operator.id, page],
        queryFn: async() => {
          const res =  await  getPropertyByOperator(operator.id,params)
          console.log(res);
          return res;
        }
  

  })

  console.log(allProperties);
  if(isLoading){
    return <Loader />
  }


  return (

          <div className="flex flex-col p-4">
        <h3 className="font-semibold text-xl leading-[40px] tracking-[0] my-0">Properties List</h3>
        <p className="text-gray-500 text-lg my-0">{"Here's what's happening with your waste management account."}</p>

    
      <div className="flex items-center justify-between mb-4 gap-4">
        <Card className="flex-1 max-w-sm">
          <div className="flex flex-row justify-between">
            <div>
              <p className="font-semibold flexjustify-between text-gray-500"><span>Total Properties</span></p>
              <p className="font-semibold text-2xl text-black py-2">{allProperties?.data.data.total}</p>

            </div>

            <span className="bg-primary/10 flex items-center justify-center text-primary p-4 rounded-lg text-2xl"><PiBuildings /></span>
          </div>
          {/* <h3 className="flex justify-between"><NavLink to="/transactions" className="text-primary hover:bg-primary/70 hover:text-white p-1 text-sm rounded-md ">{"View Transactions"}</NavLink><span className="rounded-lg bg-red-200 p-1 text-sm text-red-700">Overdue</span></h3> */}

        </Card>

        </div>
        <div className="flex justify-between items-center md:flex-row flex-col">
          <h2 className="font-semibold text-2xl leading-[40px] tracking-[0] my-0">Properties</h2>
          <div className="flex gap-2  items-center justify-center md:flex-row flex-col">
            <Input iconPosition="left" icon={<IoSearchOutline />} type="text" placeholder="Search Property"/>
          <Button className="w-full md:w-auto p-4 mb-4">Add Property <FaLongArrowAltRight /></Button>
          </div>
        </div>

       { allProperties?.data.data.data.length > 0 &&  
                  <div className="hidden md:block overflow-x-auto rounded-xl border border-gray-200 m-4 overflow-hidden">
          <table className="table-auto min-w-full divide-y divide-gray-100">
            <thead className="bg-gray-300/50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">S/N</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Property Address</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Ward</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Owner</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Property Code</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">No Of Apartments</th>

                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>    
            <tbody className="bg-white divide-y divide-gray-50">
              {allProperties && allProperties.data.data.data.map((property:IProperty, index) => (
                <tr key={index} className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-gray-100 transition-colors`}>
                  <td className="px-6 py-4 whitespace-nowrap text-base font-semibold text-secondary">{(page - 1) * params.perPage + index + 1}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-base text-gray-600">{property.propertyAddress}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-base text-gray-500">{property.wardName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-base text-gray-500">{property.ownerFullname}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-base text-gray-500">{property.propertyCode}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-base text-center text-gray-500">
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
                    {openUpdateProperty && (
                      <UpdatePropertyModal
                        openModal={openUpdateProperty}
                        handleOpenModal={handleOpenUpdateProperty}
                        operator={operator}
                        property={property}
                      />
                    )}
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


{ allProperties?.status === 404  && (
  <div className="flex justify-center items-center h-96 text-4xl font-semibold text-gray-400">
    <h2>No properties found</h2>
  </div>
) }


        




      </div>              
//   { 
//   openCreateProperty &&   <CreatePropertyModal openModal={openCreateProperty} setOpenModal={setOpenCreateProperty} operator={operator} />
// }


      // {viewDelete && (
      //   <InfoModal
      //     openModal={viewDelete}
      //     setOpenModal={setViewDelete}
      //     header={"Delete Property"}
      //     content={"Do you really want to delete this property? Once deleted, it cannot be recovered."}
      //     buttonName={"Delete Property"}
      //     handleConfirm={handleDelete}
      //   />
      // )} 


  );
};

export default Properties;
