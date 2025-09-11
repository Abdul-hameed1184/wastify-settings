import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";
import { ParagraphLargeGreen } from "../../../Component/Paragraph";
import { ButtonsPrimaryIcon } from "../../../Component/Buttons";
import CreatePropertyModal from "../../../Component/Modal/CreatePropertyModal";
import { IProperty } from "../../../models/property.interface";
import { IOperator } from "../../../models/operator.interface";
import { getPropertyByOperator } from "../../../api/psp-operator/psp-operator.service";
import Loader from "../../../Component/Loader";
import { LuGlasses } from "react-icons/lu";

import { FaPlusCircle } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import { MdDeleteForever, MdEdit } from "react-icons/md";
import { Link } from "react-router-dom";
import InfoModal from "../../../Component/Modal/InfoModal";
import DropdownMenu from "../../../Component/DropdownMenu";
import UpdatePropertyModal from "../../../Component/Modal/UpdatePropertyModal";


const Properties:React.FC = () => {
  const operator:IOperator = JSON.parse(sessionStorage.getItem("AUTH_ADMIN_DETAILS")||"");
  const [ openCreateProperty, setOpenCreateProperty] = useState<boolean>(false);
    const [ openUpdateProperty, setOpenUpdateProperty] = useState<boolean>(false);
  const [ viewDelete, setViewDelete ] = useState<boolean>(false)
  const [ page, setPage] = useState<number>(1);
  const params = {
    page: page,
    per_page: 10,
  };
     
  const handleOpenUpdateProperty = () => {
    setOpenUpdateProperty(!openUpdateProperty);
  }
  const { data: allProperties, isLoading, isError } = useQuery({
        queryKey: ['properties', operator.id],
        queryFn: () => {
         const data =  getPropertyByOperator(operator.id,params);
         return data;
        }

  })
  console.log(allProperties);
  const handleDelete = () => {

  };
  if(isLoading){
    return <Loader />
  }


  return (

    <main>
      <div className="p-5">
        <ParagraphLargeGreen content={"Property Records"} />
        <div>
        <div className="grid justify-items-end my-8">
          <div className="md:w-1/3 w-full">
      <ButtonsPrimaryIcon icon={<FaPlusCircle />
} type="button" name={"Add Property"} onClick={() => { setOpenCreateProperty(!openCreateProperty) } } loading={false}/>
      </div>
      </div>
          
        </div>

{  allProperties?.data.data.data.length > 0 &&      <div className="overflow-x-auto font-Poppins mt-3">

          <Table striped className="border-collapse rounded-lg  border-gray-900">
            <TableHead className=" font-Poppins text-lg capitalize text-white bg-green dark:text-white">
              {/* <TableHeadCell>Property ID</TableHeadCell> */}
              <TableHeadCell>Property address</TableHeadCell>
              {/* <TableHeadCell>LGA</TableHeadCell> */}
              <TableHeadCell>Ward</TableHeadCell>
              <TableHeadCell>No of Apartments</TableHeadCell>{" "}
              <TableHeadCell>Action</TableHeadCell>
            </TableHead>
            <TableBody className="font-Poppins text-xl ">
              {allProperties?.data.data.data.map((item:IProperty, index) => (
                <TableRow
                  className={
                    index % 2 === 0
                      ? "odd:bg-tableBackground"
                      : "bg-white dark:border-gray-700 dark:bg-gray-800"
                  }
                  key={index}
                >
                  {/* <TableCell>{item.id}</TableCell> */}
                  <TableCell>{item.propertyAddress} </TableCell>
                  {/* <TableCell>{item.lgaName} </TableCell> */}
                  <TableCell>{item.wardName}</TableCell>
                  {/* <TableCell>{item.propertyCode}</TableCell> */}
                  <TableCell>{item.noOfDistinctApartment}</TableCell>
                  {/* <TableCell>{<FaCirclePlus className="text-green w-10 h-6 mt-1"  onClick={()=> handleCreateApartmentModal(item)}/>}</TableCell> */}
                  <TableCell>
                    {/* <Link to={""+item.id} state={{property: item}}>
                    <ButtonsPrimary
                      name={"View Details"}
                     type={"button"} loading={undefined} />
                      </Link> */}

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
                  </TableCell>
                  {/* <TableCell> ... </TableCell> */}
                </TableRow>
              ))}


            </TableBody>
          </Table>
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
                onClick={() => setPage(page + 1)}
                disabled={Math.ceil(allProperties?.data.data.total/allProperties?.data.data.per_page) <= page + 1}
              >
                Next
              </button>
            </div>
          </div>
        </div>}
        {
        // allProperties?.data.data.data.length == 0 
        isError
        && (
          <div className="flex justify-center items-center h-96 text-4xl font-semibold text-gray-500">
            <h2> {"No properties found"} </h2>
          </div>
        )}

        




      </div>              
  { 
  openCreateProperty &&   <CreatePropertyModal openModal={openCreateProperty} setOpenModal={setOpenCreateProperty} operator={operator} />
}


      {viewDelete && (
        <InfoModal
          openModal={viewDelete}
          setOpenModal={setViewDelete}
          header={"Delete Property"}
          content={"Do you really want to delete this property? Once deleted, it cannot be recovered."}
          buttonName={"Delete Property"}
          handleConfirm={handleDelete}
        />
      )} 



    </main>

  );
};

export default Properties;
