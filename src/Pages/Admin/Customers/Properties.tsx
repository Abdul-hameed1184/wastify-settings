import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";
import { ParagraphLargeGreen } from "../../../Component/Paragraph";
import { ButtonsPrimary, ButtonsPrimaryIcon } from "../../../Component/Buttons";
import CreatePropertyModal from "../../../Component/Modal/CreatePropertyModal";
import { IProperty } from "../../../models/property.interface";
import { IOperator } from "../../../models/operator.interface";
import { getPropertyByOperator } from "../../../api/psp-operator/psp-operator.service";
import { IPaginatedProperty } from "../../../models/paginatedPropertyByOperator.interface";
import Loader from "../../../Component/Loader";
import { Link } from "react-router-dom";
import { FaPlusCircle } from "react-icons/fa";

const Properties:React.FC = () => {
  const operator:IOperator = JSON.parse(sessionStorage.getItem("AUTH_ADMIN_DETAILS")||"");
  const [ openCreateProperty, setOpenCreateProperty] = useState<boolean>(false);
  const [ page, setPage] = useState<number>(1);
  const [ properties, setProperties ] = useState<IPaginatedProperty>();
  const [ loading, setLoading] = useState<boolean>(true);
     

  useEffect(() => {
    
      (async () => {
  
      const data = await getPropertyByOperator(operator.id, page);
      setProperties(data.data.data);
      setLoading(false)
    
      })()
  }, [operator.id, page]);

  if(loading){
    return <Loader />
  }

  return (

    <main>
      <div className="p-5 rounded-3xl shadow-2xl ">
        <ParagraphLargeGreen content={"Property Records"} />
        <div>
        <div className="grid justify-items-end my-8">
          <div className="w-1/3">
      <ButtonsPrimaryIcon icon={<FaPlusCircle />
} type="button" name={"Add Property"} onClick={() => { setOpenCreateProperty(!openCreateProperty) } } loading={false}/>
      </div>
      </div>
          
        </div>

{  properties &&      <div className="overflow-x-auto font-Poppins mt-3">
          <Table striped>
            <TableHead className=" font-Poppins text-lg capitalize text-white bg-green dark:text-white">
              {/* <TableHeadCell>Property ID</TableHeadCell> */}
              <TableHeadCell>Property address</TableHeadCell>
              {/* <TableHeadCell>LGA</TableHeadCell> */}
              <TableHeadCell>Ward</TableHeadCell>
              {/* <TableHeadCell>Property code</TableHeadCell> */}
              <TableHeadCell>No of Apartments</TableHeadCell>{" "}
              {/* <TableHeadCell>Add/View Apartment</TableHeadCell>{" "} */}
              {/*Number of Customers Changed*/}
              {/* <TableHeadCell>Customer details</TableHeadCell> */}
              <TableHeadCell>Details</TableHeadCell>
            </TableHead>
            <TableBody className="divide-y font-Poppins text-xl ">
              {properties.data.map((item:IProperty, index) => (
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
                    <Link to={""+item.id} state={{property: item}}>
                    <ButtonsPrimary
                      name={"View Details"}
                     type={"button"} loading={undefined} />
                      </Link>
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
                      (properties.total/properties.per_page)
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
                disabled={Math.ceil(properties.total/properties.per_page) <= page + 1}
              >
                Next
              </button>
            </div>
          </div>
        </div>}
      </div>              
  { 
  openCreateProperty &&   <CreatePropertyModal openModal={openCreateProperty} setOpenModal={setOpenCreateProperty} operator={operator} />
}     </main>

  );
};

export default Properties;
