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
import { IOperator } from "../../../models/operator.interface";
import Loader from "../../../Component/Loader";
import { Link } from "react-router-dom";
import { FaPlusCircle } from "react-icons/fa";
import {
  getPaginatedCustomers,
} from "../../../api/customer/customer.service";

import { IPaginatedCustomers } from "../../../models/paginatedcustomer.interface";
import { ICustomerData } from "../../../models/customerdata.interface";
import CreateCustomer from "../../../Component/Modal/CreateCustomer";

const Customers: React.FC = () => {
  const operator: IOperator = JSON.parse(
    sessionStorage.getItem("AUTH_ADMIN_DETAILS") || ""
  );
  const [openCreateCustomer, setOpenCreateCustomer] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [customers, setCustomers] = useState<IPaginatedCustomers>();

  useEffect(() => {
    try {
      (async () => {
        const ty = await getPaginatedCustomers(page);
        setCustomers(ty.data.data);

        setLoading(false);
      })();
    } catch (error) {
      console.log(error);
    }
  }, [ page]);

  if (loading) {
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

        {page && customers && (
          <div className="overflow-x-auto font-Poppins mt-3">
            <Table striped>
              <TableHead className=" font-Poppins text-lg capitalize text-white bg-green dark:text-white">
                {/* <TableHeadCell>Property ID</TableHeadCell> */}
                <TableHeadCell>Customer Name</TableHeadCell>
                {/* <TableHeadCell>LGA</TableHeadCell> */}
                <TableHeadCell>Phone Number</TableHeadCell>
                {/* <TableHeadCell>Property code</TableHeadCell> */}
                <TableHeadCell>Total Overdue Bill</TableHeadCell>{" "}
                {/* <TableHeadCell>Add/View Apartment</TableHeadCell>{" "} */}
                {/*Number of Customers Changed*/}
                {/* <TableHeadCell>Customer details</TableHeadCell> */}
                <TableHeadCell>Details</TableHeadCell>
              </TableHead>
              <TableBody className="divide-y font-Poppins text-xl ">
                {page &&
                  customers.data.map((item: ICustomerData, index) => (
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
                        {item.lastname == null
                          ? "No Name"
                          : item.firstname + " " + item.lastname}{" "}
                      </TableCell>
                      {/* <TableCell>{item.lgaName} </TableCell> */}
                      <TableCell>{item.phone}</TableCell>
                      {/* <TableCell>{item.propertyCode}</TableCell> */}
                      <TableCell>{item.totalOverdueBill}</TableCell>
                      {/* <TableCell>{<FaCirclePlus className="text-green w-10 h-6 mt-1"  onClick={()=> handleCreateApartmentModal(item)}/>}</TableCell> */}
                      <TableCell>
                        <Link
                          to={"" + item.customerId}
                          state={{ customer: item }}
                        >
                          <ButtonsPrimary
                            name={"View Details"}
                            type={"button"}
                            loading={undefined}
                          />
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
                  {Array.from({
                    length: Math.ceil(customers.total / customers.per_page),
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
                    Math.ceil(customers.total / customers.per_page) <= page + 1
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
    </main>
  );
};

export default Customers;
