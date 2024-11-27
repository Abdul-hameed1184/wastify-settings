import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from 'flowbite-react';
import { Paragraph2XlGreenMargin, ParagraphBlack } from '../../../Component/Paragraph';
import { InputField, InputFieldSecondary } from '../../../Component/InputField';
import { ButtonsPrimary, ButtonsPrimaryBlack, ButtonsWhite } from '../../../Component/Buttons';
import baseURL from '../../../utils/apiConfig';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Transaction = () => {
    const [bills, setbills] = useState([]);
    const [allproperties, setAllProperties] = useState([]);
    const operator = JSON.parse(sessionStorage.getItem('AUTH_ADMIN_DETAILS'));
    const [currentPage, setCurrentPage] = useState(1);
    const [transactionsPerPage] = useState(10);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [selectedCustomerPType, setSelectedCustomerPType] = useState(null);


    const handleNavigate = (customerData, propertyType) => {
        setSelectedCustomer(customerData);
        setSelectedCustomerPType(propertyType)
        console.log("customerData", customerData);
        console.log("propertyType", propertyType);
    }

    const FetchOperatorsills = () => {
        axios.get(baseURL + 'customerBilling/' + operator.pspOperatorId, {
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => {
                const responseData = res.data?.data;
                console.log(responseData);
                // setAllProperties(responseData)
            })
            .catch((err) => {
                console.log(err);
            });
    };
    // const FetchOperatorsills = () => {
    //     axios.get(baseURL + 'customer/psp-operator/' + operator.pspOperatorId, {
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //     })
    //         .then((res) => {
    //             const responseData = res.data?.data;
    //             console.log(responseData);
    //             setAllProperties(responseData)
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         });
    // };

    useEffect(() => {
        FetchOperatorsills()
    }, [])

    const indexOfLastTransaction = currentPage * transactionsPerPage;
    const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
    const currentTransactions =
        allproperties && allproperties.length
            ? allproperties.slice(indexOfFirstTransaction, indexOfLastTransaction)
            : [];

    const paginate = (pageNumber) => {
        if (pageNumber < 1) {
            setCurrentPage(1);
        } else if (
            pageNumber > Math.ceil(allproperties.length / transactionsPerPage)
        ) {
            setCurrentPage(Math.ceil(allproperties.length / transactionsPerPage));
        } else {
            setCurrentPage(pageNumber);
        }
    };
    return (
        <main className='px-4 '>
            <div className="my-10">
                <div className="bg-lightBackground py-5 rounded-3xl shadow-2xl">
                    <Paragraph2XlGreenMargin content={"Customer Billing"} />
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
                                {currentTransactions.map((item, index) => (
                                    <TableRow className={index % 2 === 0 ? "odd:bg-tableBackground" : "bg-white dark:border-gray-700 dark:bg-gray-800"} key={index}>
                                        <TableCell>{item.id}</TableCell>
                                        <TableCell>{item.propertyAddress} </TableCell>
                                        <TableCell>{item.lgaName} </TableCell>
                                        <TableCell>{item.wardName}</TableCell>
                                        <TableCell>{item.propertyCode}</TableCell>
                                        <TableCell>{item.customer_properties.length}</TableCell>
                                        <TableCell>
                                            {/* <Link to={'/dashboard/billing-customer-all'} className='text-white bg-green  w-full h-14  justify-center px-10  py-2 text-base md:text-sm font-normal shadow-sm ring-transparent border-transparent rounded-lg ring-2 font-Poppins border'>
                                                
                                            </Link> */}
                                            <ButtonsPrimary name={"Bill"} onClick={() => handleNavigate(item.customer_properties, item.propertyTypeName)} />

                                        </TableCell>
                                    </TableRow>
                                ))}


                            </TableBody>
                        </Table>
                        <div className="flex justify-center items-center h-20 my-10 w-1/4 ">
                            <div className="w-full h-10 border border-primary2 flex items-center justify-center rounded-md px-5">
                                <button
                                    className={` `}
                                    onClick={() => paginate(currentPage - 1)}
                                    disabled={currentPage === 1}
                                >
                                    Previous
                                </button>
                                <div className="ml-4 h-full">
                                    {allproperties &&
                                        allproperties.length &&
                                        Array.from({
                                            length: Math.ceil(
                                                allproperties.length / transactionsPerPage
                                            ),
                                        }).map((_, index) => (
                                            <button
                                                className={`w-8 h-full  ${currentPage === index + 1
                                                    ? "bg-green text-white "
                                                    : ""
                                                    } mr-2`}
                                                key={index}
                                                onClick={() => paginate(index + 1)}
                                            >
                                                {index + 1}
                                            </button>
                                        ))}
                                </div>
                                <button
                                    className={`ml-3 `}
                                    onClick={() => paginate(currentPage + 1)}
                                    disabled={
                                        !allproperties ||
                                        currentPage ===
                                        Math.ceil(
                                            (allproperties?.length || 0) / transactionsPerPage
                                        )
                                    }
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Transaction