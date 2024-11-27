import React, { useEffect, useState } from 'react'
import { IoFilterSharp } from "react-icons/io5";
import { BsFileEarmarkTextFill } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from 'flowbite-react';
import { ButtonsPrimary } from '../../../Component/Buttons'
import baseURL from '../../../utils/apiConfig';
import axios from 'axios';

const Reports = () => {
    const [isActive, setIsActive] = useState("all")
    const [AllUsers, setAllUsers] = useState([])
    const operator = JSON.parse(sessionStorage.getItem('AUTH_ADMIN_DETAILS'));
    // console.log(operator);
    const handleOptionClick = (option) => {
        setIsActive(option);
    };

    //function to fetch all state
    const HandleAllUserRecords = () => {
        axios.get(baseURL + 'customer/psp-operator/' + operator.pspOperatorId, {
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => {
                const responseData = res.data?.data;
                console.log(responseData);
                setAllUsers()
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        // HandleAllUserRecords()
    }, [operator])
    return (
        <main className='px-4'>
            <div className="w-full h-[400px]  shadow-2xl  bg-white rounded-lg my-6 px-6 xl:px-10 py-6 ">
                <div className="w-full h-full">
                    <textarea name="messages" id='messages' rows="7" className='w-full border-black border resize-none my-5 px-6 py-6 outline-none focus:border-black focus:border focus:ring-transparent' placeholder='Leave a message...'></textarea>
                    <ButtonsPrimary name={"Send"} />
                </div>
            </div>
            <div className="w-full h-full bg-white shadow-2xl rounded-lg my-20 ">
                <div className='w-full h-32'>
                    <div className="w-full pt-10 flex flex-col lg:flex-row items-center justify-between font-semibold px-4">
                        <div className='w-full lg:w-3/5 flex'>
                            <p
                                className={`cursor-pointer ${isActive === "all" ? "border-b-2 border-b-solid border-b-black border-spacing-x-4" : ""}`}
                                onClick={() => handleOptionClick("all")}
                            >
                                All (500)
                            </p>
                            <p
                                className={`ml-16 cursor-pointer ${isActive === "unread" ? "border-b-2 border-b-solid border-b-black " : ""
                                    }`}
                                onClick={() => handleOptionClick("unread")}
                            >
                                Unread (100)
                            </p>
                        </div>
                        <div className='lg:w-2/5 w-full mt-3 flex justify-between'>
                            <div className='h-8 flex items-center justify-center cursor-pointer'>
                                <IoFilterSharp className=' text-grayRounded' />
                                <p className='text-grayRounded ml-2'>Filter</p>
                            </div>
                            <div className='h-8 flex items-center justify-center cursor-pointer'>
                                <BsFileEarmarkTextFill className=' text-grayRounded' />
                                <p className='text-grayRounded ml-2'>Mark as read</p>
                            </div>
                            <div className='h-8 flex items-center justify-center cursor-pointer'>
                                <MdDelete className=' text-grayRounded' />
                                <p className='text-grayRounded ml-2'>Delete</p>
                            </div>
                        </div>
                    </div>
                    <div className={`pt-5 border-b-2 border-b-grayRounded `}></div>
                </div>
                <div className="">
                    <div className="overflow-x-auto font-Poppins mt-1">
                        <Table striped >
                            <TableHead className=" font-Poppins text-sm capitalize text-white bg-green dark:text-white">
                                <TableHeadCell></TableHeadCell>
                                <TableHeadCell>Date & Time</TableHeadCell>
                                <TableHeadCell>User ID Number</TableHeadCell>
                                <TableHeadCell>Username</TableHeadCell>
                                <TableHeadCell>Topic</TableHeadCell>
                                <TableHeadCell>Description</TableHeadCell>
                                <TableHeadCell>Action</TableHeadCell>

                            </TableHead>
                            <TableBody className="divide-y font-Poppins ">
                                {
                                    AllUsers.length > 0 ? (
                                        <>
                                            {AllUsers.map((row, index) => (
                                                <TableRow key={row.id} className={`${index % 2 === 0 ? 'odd:bg-tableBackground' : ''} bg-white dark:border-gray-700 dark:bg-gray-800 ${row.colorClass}`}>
                                                    <TableCell className='flex mt-4'>
                                                        <input type="checkbox" name="first" id="first" />
                                                        <div className="ml-2 rounded-full h-4 w-4 bg-readgray"></div>
                                                    </TableCell>
                                                    <TableCell>{row.date}</TableCell>
                                                    <TableCell>{row.number}</TableCell>
                                                    <TableCell>{row.user}</TableCell>
                                                    <TableCell>{row.status}</TableCell>
                                                    <TableCell>{row.description}</TableCell>
                                                    <TableCell>
                                                        <ButtonsPrimary name={"View"} />
                                                    </TableCell>
                                                </TableRow>
                                            ))}


                                        </>
                                    ) :

                                        (
                                            <>
                                                <TableRow className="odd:bg-tableBackground">
                                                    <TableCell className='flex mt-4'>
                                                        <input type="checkbox" name="first" id="first" />
                                                        <div className="ml-2 rounded-full h-4 w-4 bg-readgray"></div>
                                                    </TableCell>
                                                    <TableCell>02, mar 23, 10:30 </TableCell>
                                                    <TableCell>#0000001</TableCell>
                                                    <TableCell>Olankunle_22</TableCell>
                                                    <TableCell>Unreceived tokens</TableCell>
                                                    <TableCell>i have not received my...</TableCell>
                                                    <TableCell>
                                                        <ButtonsPrimary name={"View"} />
                                                    </TableCell>
                                                </TableRow>
                                            </>
                                        )
                                }

                            </TableBody>
                        </Table>
                    </div>
                </div>
            </div>

        </main>
    )
}

export default Reports