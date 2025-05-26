import React, { useEffect, useState } from 'react'
import { IoFilterSharp } from "react-icons/io5";
import { BsFileEarmarkTextFill } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from 'flowbite-react';
import { ButtonsPrimary, ButtonsWhite } from '../../../Component/Buttons'
import baseURL from '../../../utils/apiConfig';
import axios from 'axios';
import { getCustomerReports } from '../../../api/psp-operator/psp-operator.service';
import { Paragraph2Green, Paragraph2Xl } from '../../../Component/Paragraph';
import { IReport } from '../../../models/report.interface';
import { IPaginatedCustomerReports } from '../../../models/paginated.customerReports.interface';
import { FaReadme } from 'react-icons/fa';
import InfoModal from '../../../Component/Modal/InfoModal';

const Reports = () => {
    const [isActive, setIsActive] = useState("all")
    const [ reports, setReports ] = useState<IPaginatedCustomerReports>({} as IPaginatedCustomerReports)
    const operator = JSON.parse(sessionStorage.getItem('AUTH_ADMIN_DETAILS')||"");
    const [ page, setPage ] = useState<number>(1);
    const [ viewMessage, setViewMessage ] = useState<boolean>(false);
    const [ report, setReport ] = useState<IReport>({} as IReport);
    const [ viewForm, setViewForm ] = useState<boolean>(false);
    // console.log(operator);


    useEffect(() => {
(async() => {

        const reports = await getCustomerReports(operator.id);
        setReports(reports.data.data)
}
    )()
    }, [operator.id]);

          
      const handleViewMessage = (x:IReport) => {
              setReport(x);
              setViewMessage(!viewMessage)
          }

        

    return (
        <main className='px-4'>
            
                      { viewMessage && 
                        <InfoModal
              openModal={viewMessage}
              setOpenModal={() => setViewMessage(!viewMessage)}
              header={report.subject}
              content={
                <div className="space-y-2 text-gray-700 text-sm leading-relaxed">
                  <div>
                    <p className="font-semibold">Message:</p>
                    <p>{report.message}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Sent At:</p>
                    <p>{new Date(report.created_at).toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Sent By:</p>
                    <p>{report.customerFullname} - {report.customerEmail}</p>
                  </div>
                        <div>
                    <p className="font-semibold">Apartment:</p>
                    <p>{report.apartmentTypeName} - {report.propertyAddress}</p>
                  </div>
                </div>
              }
              buttonName="Reply"
              handleConfirm={() =>{
                 setViewMessage(!viewMessage)
                 setViewForm(!viewForm)
              }}
            />
            
                      
                      }
            {/* <div className="w-full h-[400px]  shadow-2xl  bg-white rounded-lg my-6 px-6 xl:px-10 py-6 ">
                <div className="w-full h-full">
                    <textarea name="messages" id='messages' rows="7" className='w-full border-black border resize-none my-5 px-6 py-6 outline-none focus:border-black focus:border focus:ring-transparent' placeholder='Leave a message...'></textarea>
                    <ButtonsPrimary name={"Send"} />
                </div>
            </div> */}
            <div className="w-full h-full bg-white rounded-lg my-20 ">
        
         { reports ?       
                  <div className="overflow-x-auto font-Poppins mt-3 mx-4">
                   <div className="flex flex-column justify-between my-4"> 
                    <Paragraph2Green content="Customer Reports"/> <div></div></div>
                                <Table striped >
                                    <TableHead className=" font-Poppins text-sm capitalize text-white bg-green dark:text-white">
                                        <TableHeadCell>Date</TableHeadCell>
                                        <TableHeadCell>Name</TableHeadCell>
                                        <TableHeadCell>Subject</TableHeadCell>
                                        <TableHeadCell>Status</TableHeadCell>
                                        <TableHeadCell>Action</TableHeadCell>
                                    </TableHead>
                                    <TableBody className="divide-y font-Poppins ">
                             
                                    {reports.data && reports.data.map((item:IReport, index) => (
                           
                                            <TableRow onClick={() => handleViewMessage(item)}  className={index % 2 === 0 ? "odd:bg-tableBackground" : "bg-white dark:border-gray-700 dark:bg-gray-800"} key={index}>
                                                <TableCell>{item.dateSent}</TableCell>
                                                <TableCell>{item.customerFullname} </TableCell>
                                                <TableCell>{item.subject}</TableCell>
                                                <TableCell>{item.readStatus}</TableCell>
                                                <TableCell><FaReadme /></TableCell>
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
                              (reports.total/reports.per_page)
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
                        disabled={Math.ceil(reports.total/reports.per_page) <= page + 1}
                      >
                        Next
                      </button>
                    </div>
                  </div>
                            </div> : <Paragraph2Xl content={"no Reports from Customers"} />
        }
            </div>

        </main>
    )
}

export default Reports