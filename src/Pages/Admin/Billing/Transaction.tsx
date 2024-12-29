import { useEffect, useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from 'flowbite-react';
import { Paragraph2Xl, Paragraph2XlGreenMargin } from '../../../Component/Paragraph';
import { ButtonsPrimary } from '../../../Component/Buttons';

import { getBillingByOperator } from '../../../api/bill/psp-operator-pricing';
import { IOperator } from '../../../models/operator.interface';
import { IPaginatedProperty } from '../../../models/paginatedPropertyByOperator.interface';

const Transaction = () => {
    const [properties, setProperties] = useState<IPaginatedProperty>();
    const operator: IOperator = JSON.parse(sessionStorage.getItem('AUTH_ADMIN_DETAILS') || "");
    const [currentPage, setCurrentPage] = useState(1);
    const [transactionsPerPage] = useState(10);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [selectedCustomerPType, setSelectedCustomerPType] = useState(null);
    const [ page, setPage ] = useState<number>(1)

    useEffect(() => {
        (async () => {
            const properties = await getBillingByOperator(operator.id);
            console.log(properties);
        })()
    }, [])

    const handleNavigate = (customerData, propertyType) => {
        setSelectedCustomer(customerData);
        setSelectedCustomerPType(propertyType)
        console.log("customerData", customerData);
        console.log("propertyType", propertyType);
    }



    return (
        <main className='px-4 '>
     
            <div className="my-10">
                <div className="bg-lightBackground py-5 rounded-3xl shadow-2xl">
                    <Paragraph2XlGreenMargin content={"Customer Billings"} />
         { properties ?       
          <div className="overflow-x-auto font-Poppins mt-3">
                        <Table striped >
                            <TableHead className=" font-Poppins text-sm capitalize text-white bg-green dark:text-white">
                                <TableHeadCell>Property ID</TableHeadCell>
                                <TableHeadCell>Property address</TableHeadCell>
                                <TableHeadCell>LGA</TableHeadCell>
                                <TableHeadCell>Ward</TableHeadCell>
                                <TableHeadCell>Property Code</TableHeadCell>
                                <TableHeadCell>Number of customers</TableHeadCell>
                                <TableHeadCell>Action</TableHeadCell>
                            </TableHead>
                            <TableBody className="divide-y font-Poppins ">
                                {properties.data.map((item, index) => (
                                    <TableRow className={index % 2 === 0 ? "odd:bg-tableBackground" : "bg-white dark:border-gray-700 dark:bg-gray-800"} key={index}>
                                        <TableCell>{item.id}</TableCell>
                                        <TableCell>{item.propertyAddress} </TableCell>
                                        <TableCell>{item.lgaName} </TableCell>
                                        <TableCell>{item.wardName}</TableCell>
                                        <TableCell>{item.propertyCode}</TableCell>
                                        <TableCell>{item.noOfDistinctApartment}</TableCell>
                                        <TableCell>
                                            {/* <Link to={'/dashboard/billing-customer-all'} className='text-white bg-green  w-full h-14  justify-center px-10  py-2 text-base md:text-sm font-normal shadow-sm ring-transparent border-transparent rounded-lg ring-2 font-Poppins border'>
                                                
                                            </Link> */}
                                            <ButtonsPrimary name={"Bill"} />

                                        </TableCell>
                                    </TableRow>
                                ))}


                            </TableBody>
                        </Table>
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
                    </div> : <Paragraph2Xl content={"no Billing for Customers"} />
}
                </div>
            </div>
        </main>
    )
}

export default Transaction