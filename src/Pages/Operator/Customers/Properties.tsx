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
import { IoEllipsisVertical } from "react-icons/io5";


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

            <span className="bg-primary/10 flex items-center justify-center text-primary p-4 rounded-lg text-2xl"><TbCurrencyNaira /></span>
          </div>
          {/* <h3 className="flex justify-between"><NavLink to="/transactions" className="text-primary hover:bg-primary/70 hover:text-white p-1 text-sm rounded-md ">{"View Transactions"}</NavLink><span className="rounded-lg bg-red-200 p-1 text-sm text-red-700">Overdue</span></h3> */}

        </Card>

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
              {allProperties && allProperties.data.data.data.map((property, index) => (
                <tr key={index} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-base font-semibold text-secondary">{index + 1}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-base text-gray-600">{property.propertyAddress}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-base text-gray-500">{property.wardName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-base text-gray-500">{property.ownerFullname}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-base text-gray-500">{property.propertyCode}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-base text-gray-500">
                    {property.noOfDistinctApartment}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-base text-sm text-gray-500">
                    <IoEllipsisVertical />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
       }

{  allProperties?.data.data.data.length > 0 &&      <div className="overflow-x-auto font-Poppins mt-3">

          <table  className="table-auto border-collapse rounded-lg  border-gray-900">
            <thead className=" font-Poppins text-lg capitalize text-white bg-green dark:text-white">
              {/* <TableHeadCell>Property ID</TableHeadCell> */}
              <th>Property address</th>
              {/* <TableHeadCell>LGA</TableHeadCell> */}
              <th>Ward</th>
                    <th>Owner</th>
              <th>No of Apartments</th>{" "}
              <th>Action</th>
            </thead>
            <tbody className="font-Poppins text-xl ">
              {allProperties && allProperties?.data.data.data.map((item:IProperty, index) => (
                <tr
                  className={
                    index % 2 === 0
                      ? "odd:bg-tableBackground"
                      : "bg-white dark:border-gray-700 dark:bg-gray-800"
                  }
                  key={index}
                >
                  {/* <TableCell>{item.id}</TableCell> */}
                  <td>{item.propertyAddress} </td>
                  {/* <TableCell>{item.lgaName} </TableCell> */}
                  <td>{item.wardName}</td>
                        <td className="uppercase">{item.ownerFullname}</td>
                  {/* <TableCell>{item.propertyCode}</TableCell> */}
                  <td>{item.noOfDistinctApartment}</td>
                  {/* <TableCell>{<FaCirclePlus className="text-green w-10 h-6 mt-1"  onClick={()=> handleCreateApartmentModal(item)}/>}</TableCell> */}
                  <td>

                      <DropdownMenu>
<div className="flex flex-col  rounded-lg divide-y divide-gray-200 shadow-sm">
      {/* View */}
      <Link
        to={`${item.id}`}
        state={{ property: item }}
        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer"
      >
        <LuGlasses className="text-green-500" />
        <span>View Property</span>
      </Link>

      {/* Edit */}
      <div className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
        <button
          type="button"
          onClick={() => setOpenUpdateProperty(!openUpdateProperty)}
          className="flex items-center gap-2 focus:outline-none"
          aria-label="Edit Property"
        >
          <MdEdit className="text-blue-500" />
          <span>Edit Property</span>
        </button>
      </div>
  { 
   openUpdateProperty &&   <UpdatePropertyModal openModal={openUpdateProperty} handleOpenModal={handleOpenUpdateProperty} operator={operator} property={item} />
}
      {/* Delete */}
      <button
        type="button"
        onClick={() => setViewDelete(!viewDelete)}
        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer w-full text-left"
        aria-label="Delete Property"
      >
        <MdDeleteForever className="text-red-500" />
        <span>Delete Property</span>
      </button>
    </div>

                      </DropdownMenu>
                  </td>
                  {/* <TableCell> ... </TableCell> */}
                </tr>
              ))}


            </tbody>
          </table>
          {/* Pagination */}
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
                      (allProperties?.data.data.total/allProperties?.data.data.per_page)
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
                onClick={() =>setPage(page+1)}
                disabled={page >= Math.ceil(
    allProperties?.data.data.total / allProperties?.data.data.per_page
  )}
              >
                Next
              </button>
            </div>
          </div>
        </div>}
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
