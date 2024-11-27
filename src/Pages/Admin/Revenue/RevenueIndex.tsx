import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from 'flowbite-react';
import AdminCard from '../../../Component/Card/AdminCard';
import { Paragraph2XlGreenMargin } from '../../../Component/Paragraph';
import FirstChart from '../../../Component/Charts/FirstChart';
import FirstPieChart from '../../../Component/Charts/FirstPieChart';


const RevenueIndex = () => {
    return (
        <main className='px-4'>
            <div className="flex justify-end">
                <div className="max-w-md">
                    <select id="countries" className='border-green rounded-md ring-green text-green focus:ring-green focus:border-green focus:outline-none'>
                        <option>Monthly</option>
                        <option>Weekly</option>
                        <option>Yearly</option>

                    </select>
                </div>
            </div>
            <div className="my-5">
                <AdminCard heading={"Total Current Revenue"} amount={"N100,000,000.00"} />
            </div>
            <div className="my-5 flex flex-col lg:flex-row justify-between">
                <div className="w-full lg:w-[65%]">
                    <FirstChart />
                </div>
                <div className="w-full mt-5 lg:mt-0 lg:w-[30%]">
                    <FirstPieChart />
                </div>
            </div>

            <div className="my-5 bg-lightBackground py-5 rounded-3xl shadow-2xl">
                <Paragraph2XlGreenMargin content={"Revenue History"} />
                <div className="overflow-x-auto font-Poppins mt-3">
                    <Table striped >
                        <TableHead className=" font-Poppins text-sm capitalize text-white bg-green dark:text-white">
                            <TableHeadCell>Month</TableHeadCell>
                            <TableHeadCell>Current Bills</TableHeadCell>
                            <TableHeadCell>Overdue Bills</TableHeadCell>
                            <TableHeadCell>Total Amount</TableHeadCell>
                            <TableHeadCell>Total Amount</TableHeadCell>

                        </TableHead>
                        <TableBody className="divide-y font-Poppins ">
                            <TableRow className="odd:bg-tableBackground">

                                <TableCell>January</TableCell>
                                <TableCell>N200,000.00</TableCell>
                                <TableCell>N300,000.00</TableCell>
                                <TableCell>N500,000.00</TableCell>
                                <TableCell>N500,000.00</TableCell>


                            </TableRow>
                            <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                <TableCell>
                                    February
                                </TableCell>
                                <TableCell>N200,000.00</TableCell>
                                <TableCell>N300,000.00</TableCell>
                                <TableCell>N57,100.00</TableCell>
                                <TableCell>N57,100.00</TableCell>

                            </TableRow>

                            <TableRow className="odd:bg-tableBackground">

                                <TableCell>March</TableCell>
                                <TableCell>N200,000.00</TableCell>
                                <TableCell>N300,000.00</TableCell>
                                <TableCell>N500,000.00</TableCell>
                                <TableCell>N500,000.00</TableCell>

                            </TableRow>
                            <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                <TableCell>
                                    April
                                </TableCell>
                                <TableCell>N200,000.00</TableCell>
                                <TableCell>N300,000.00</TableCell>
                                <TableCell>N500,000.00</TableCell>
                                <TableCell>N500,000.00</TableCell>

                            </TableRow>

                        </TableBody>
                    </Table>
                </div>
            </div>
        </main>
    )
}

export default RevenueIndex