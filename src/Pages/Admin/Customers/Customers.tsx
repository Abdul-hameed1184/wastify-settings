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
import Loader from "../../../Component/Loader";
import { FaPlusCircle } from "react-icons/fa";
import { GrOverview } from "react-icons/gr";

import CreateCustomer from "../../../Component/Modal/CreateCustomer";
import { useQuery } from "@tanstack/react-query";
import { IApartment } from "../../../models/apartment.interface";
import { IOperator } from "../../../models/operator.interface";
import InfoModal from "../../../Component/Modal/InfoModal";
import { getCustomers } from "../../../api/psp-operator/psp-operator.service";



const Customers: React.FC = () => {
  const operator: IOperator = JSON.parse(sessionStorage.getItem("AUTH_ADMIN_DETAILS") || "");
  const [openCreateCustomer, setOpenCreateCustomer] = useState<boolean>(false);
  const [customerApartments, setCustomerApartments] = useState<IApartment[]>();
  const [ openViewCustomer, setOpenViewCustomer ] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  //const [loading, setLoading] = useState<boolean>(true);
  // const [customers, setCustomers] = useState<IPaginatedCustomers>();

  const { data: allcustomers, isLoading, isError } = useQuery({
    queryKey: [page, operator.id],
    queryFn: async () => {
      const xy = await getCustomers(page, operator.id);
      console.log(xy);
      return xy;
    }
  });





  interface Customerx {
    customerId: string;
    customerFullname: string;
    customerPhone: string;
  }

  // function getUniqueCustomers(data: IApartment[]): Customerx[] {
  //   const uniqueMap = new Map<string, Customerx>();

  //   data.forEach(item => {
  //     if (!uniqueMap.has(item.customerId)) {
  //       uniqueMap.set(item.customerId, {
  //         customerId: item.customerId,
  //         customerFullname: item.customerFullname,
  //         customerPhone: item.customerPhone
  //       });
  //     }
  //   });

  //   return Array.from(uniqueMap.values());
  // }

  // function getCustomerApartments(customerId: string): IApartmentTypeBill {
  //   return allapartments?.data.data.data.filter(item => item.customerId === customerId);
  // }

  const viewCustomer = (customerId: string) => {
    const dy = allcustomers?.data.data.data.filter(item => item.customerId === customerId);
    setCustomerApartments(dy);
    console.log(dy)
    setOpenViewCustomer(true)
  };

  // useEffect(() => {
  //   try {
  //     (async () => {
  //       const ty = await getPaginatedCustomers(page);
  //       setCustomers(ty.data.data);

  //       setLoading(false);
  //     })();
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }, [ page]);

  if (isLoading) {
    return <Loader />;
  }

const comp = <div>
              <div className="flex justify-between items-center">
              <h3 className="text-2xl font-bold">Customer Apartments</h3>
            </div>
            {isError && <p className="text-red-500">Error loading apartments</p>}
            <Table striped>
              <TableHead className="font-Poppins text-lg capitalize text-white bg-green dark:text-white">
                <TableHeadCell>S/N</TableHeadCell>
                <TableHeadCell>Apartment Type</TableHeadCell>
                <TableHeadCell>Description</TableHeadCell>
              </TableHead>
              <TableBody className="font-Poppins text-xl">
                {customerApartments && customerApartments.map((apartment:IApartment, index) => (
                  <TableRow
                    key={index}
                    className={
                      index % 2 === 0
                        ? "odd:bg-tableBackground"
                        : "bg-white dark:border-gray-700 dark:bg-gray-800"
                    }
                  >
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{apartment.apartmentTypeName}</TableCell>
                    <TableCell>{apartment.propertyAddress}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table> 
</div>



  if (isLoading) {
    return <Loader />;
  }

  return (
    <main>
      <div className="p-5">
        <ParagraphLargeGreen content={"Customers"} />
        <div>
          <div className="grid justify-items-end my-8">
            <div className="md:w-1/3 w-full">
              <ButtonsPrimaryIcon
                icon={<FaPlusCircle />}
                type="button"
                name={"Add Customers"}
                onClick={() => {
                  setOpenCreateCustomer(!openCreateCustomer);
                }}
                loading={false}
              />
            </div>
          </div>
        </div>

        {(page && allcustomers) && (
          <div className="overflow-x-auto font-Poppins mt-3">
            <Table striped>
              <TableHead className=" font-Poppins text-lg capitalize text-white bg-green dark:text-white">
                {/* <TableHeadCell>Property ID</TableHeadCell> */}
                <TableHeadCell>Customer Name</TableHeadCell>
                {/* <TableHeadCell>LGA</TableHeadCell> */}
                <TableHeadCell>Phone Number</TableHeadCell>
                {/* <TableHeadCell>Property code</TableHeadCell> */}
            
                <TableHeadCell>Details</TableHeadCell>
              </TableHead>
              <TableBody className=" font-Poppins text-xl ">
                {page &&
                  allcustomers.data.data.data.map((item: Customerx, index) => (
                    <TableRow
                      className={
                        index % 2 === 0
                          ? "odd:bg-tableBackground"
                          : "bg-white dark:border-gray-700 dark:bg-gray-800"
                      }
                      key={index}
                    >
                      {/* <TableCell>{item.id}</TableCell> */}
                      <TableCell>
                        {item.customerFullname}{" "}
                      </TableCell>
                      {/* <TableCell>{item.lgaName} </TableCell> */}
                      <TableCell>{item.customerPhone}</TableCell>
                      {/* <TableCell>{item.propertyCode}</TableCell> */}
    
                     
                      <TableCell onClick={() => viewCustomer(item.customerId)}>
            
                        
                        {/* <Link
                          to={"" + item.customerId}
                          state={{ customer: item }}
                        >
                          <ButtonsPrimary
                            name={"View Details"}
                            type={"button"}
                            loading={undefined}
                          />
                        </Link> */}
                        <GrOverview />
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
                  {Array.from({
                    length: Math.ceil(allcustomers.data.data.total / allcustomers.data.data.per_page),
                  }).map((_, index) => (
                    <button
                      className={`w-8 h-full  ${
                        page === index + 1 ? "bg-green text-white " : ""
                      } mr-2`}
                      key={index}
                      onClick={() => setPage(index + 1)}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>
                <button
                  className={`text-green font-weight-bold`}
                  onClick={() => setPage(page + 1)}
                  disabled={
                    Math.ceil(allcustomers.data.data.total / allcustomers.data.data.per_page) <= page + 1
                  }
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      {openCreateCustomer && (
        <CreateCustomer
          openModal={openCreateCustomer}
          setOpenModal={setOpenCreateCustomer}
        />
      )}{" "}

      {
     openViewCustomer &&  

     <InfoModal 
     openModal={openViewCustomer} setOpenModal={()=> setOpenViewCustomer(!openViewCustomer)} header={"Customer Apartments"} 
     content={comp} buttonName={"Ok"} handleConfirm={()=>{}} />
    
      }
    </main>
  );
};


export default Customers;
