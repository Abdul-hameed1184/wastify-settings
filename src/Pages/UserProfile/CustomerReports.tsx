import React, { useState, useEffect } from "react";
import { getCustomerReportPaginatedByCustomer } from "../../api/customer/customer.service";
import { IPaginatedCustomerReports } from "../../models/paginated.customerReports.interface";
import { IReport } from "../../models/report.interface";
import { Table, TableHead, TableHeadCell, TableBody, TableRow, TableCell, Modal, ModalHeader, ModalBody, ModalFooter } from "flowbite-react";
import { FaReadme } from "react-icons/fa6";
import { ButtonsPrimary, ButtonsWhite } from "../../Component/Buttons";
import { Paragraph2Green, Paragraph2Xl } from "../../Component/Paragraph";
import { IBillData } from "../../models/billdata.interface";
import { useNavigate } from "react-router-dom";
import Loader from "../../Component/Loader";
import InfoModal from "../../Component/Modal/InfoModal";

type Props = {
  handleFormView : () => void;
}

// eslint-disable-next-line react/prop-types
const CustomerReports:React.FC<Props> = ({ handleFormView }) =>{
      const customer = JSON.parse(sessionStorage.getItem("AUTH_USERDETAILS") || "");
      const [loading, setLoading] = useState<boolean>(false);
      const [ reportsData, setReportsData] = useState<IPaginatedCustomerReports>({} as IPaginatedCustomerReports)
      const [ viewForm, setViewform] = useState<boolean>(false);
      const [ page, setPage ]= useState<number>(1)
      const [ report, setReport] = useState<IReport>({} as IReport);
      const [ viewMessage, setViewMessage] = useState<boolean>(false);

      
      
      useEffect(() => {
        (async () => {
            const data = await getCustomerReportPaginatedByCustomer(customer.customerId);
            console.log(data.data.data)
            setReportsData(data.data.data)

        })()
        setLoading(false)
      },[customer.customerId, setLoading])

      const handleViewMessage = (x:IReport) => {
          setReport(x);
          setViewMessage(!viewMessage)
      }
    return (
        <div>

        
         { reportsData ?       
                  <div className="overflow-x-auto font-Poppins mt-3 mx-4">
                   <div className="flex flex-column justify-between my-4"> <Paragraph2Green content="Customer Reports"/> <div><ButtonsWhite name={"Create Report"} onClick={handleFormView}/></div></div>
                                <Table striped >
                                    <TableHead className=" font-Poppins text-sm capitalize text-white bg-green dark:text-white">
                                        <TableHeadCell>Date</TableHeadCell>
                                        <TableHeadCell>Name</TableHeadCell>
                                        <TableHeadCell>Subject</TableHeadCell>
                                        <TableHeadCell>Status</TableHeadCell>
                                        <TableHeadCell>Action</TableHeadCell>
                                    </TableHead>
                                    <TableBody className="divide-y font-Poppins ">
                             
                                    {reportsData.data && reportsData.data.map((item:IReport, index) => (
                           
                                            <TableRow  onClick={() => handleViewMessage(item)} className={index % 2 === 0 ? "odd:bg-tableBackground" : "bg-white dark:border-gray-700 dark:bg-gray-800"} key={index}>
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
                              (reportsData.total/reportsData.per_page)
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
                        disabled={Math.ceil(reportsData.total/reportsData.per_page) <= page + 1}
                      >
                        Next
                      </button>
                    </div>
                  </div>
                            </div> : <Paragraph2Xl content={"no Reports from Customers"} />
        }



  


</div>




      
    )
} 


export default CustomerReports;

const ReportDetails = () => {
  return (
    <div>
      <h2>CustomerEmail</h2>
      <p>Subject</p>
      <p>Message</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam ipsam dignissimos temporibus et voluptatibus assumenda aspernatur officia aliquam doloribus voluptatum ratione mollitia minus, voluptates tempora soluta pariatur ipsa quidem nobis?</p>

    </div>
  )
}