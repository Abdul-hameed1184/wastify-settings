import React, { useState, useEffect } from "react";
import { getCustomerReportPaginatedByCustomer, updateMessageReadStatus } from "../../api/customer/customer.service";
import { IPaginatedCustomerReports } from "../../models/paginated.customerReports.interface";
import { IReport } from "../../models/report.interface";
import { Table, TableHead, TableHeadCell, TableBody, TableRow, TableCell } from "flowbite-react";
import { ButtonsWhite } from "../../Component/Buttons";
import { Paragraph2Green, Paragraph2Xl } from "../../Component/Paragraph";
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

      const handleViewMessage = async (x:IReport) => {
          setReport(x);
          setViewMessage(!viewMessage)
          await updateMessageReadStatus(x.id);
      }

      if(loading){
        return <h2>Loading...</h2>
      }
    return (
        <div>
                                { viewMessage && 
                        <InfoModal
              openModal={viewMessage}
              setOpenModal={() => setViewMessage(!viewMessage)}
              header={report.subject}
              content={
                <div className="space-y-2 text-gray-700 text-lg leading-relaxed">
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
                 setViewform(!viewForm)
              }}
            />}

        
         { reportsData.data ?       
                  <div className="overflow-x-auto font-Poppins mt-3 mx-4">
                   <div className="flex flex-column justify-between my-4"> <Paragraph2Green content="Customer Reports"/> <div><ButtonsWhite name={"Create Report"} onClick={handleFormView}/></div></div>
                                <Table striped >
                <TableHead className="font-Poppins text-lg capitalize text-white bg-green dark:text-white">
  <TableHeadCell className="w-32">Date</TableHeadCell> 
  <TableHeadCell className="w-48">Name</TableHeadCell> 
    <TableHeadCell className="flex-grow">Subject</TableHeadCell> 
</TableHead>

                                <TableBody className="divide-y font-Poppins text-lg capitalize text-black">
  {reportsData.data.map((item: IReport, index) => {
    const isEven = index % 2 === 0;
    const baseRowClass = isEven
      ? "odd:bg-tableBackground"
      : "bg-white dark:border-gray-700 dark:bg-gray-800";
    const readTextClass = item.readStatus !== 0 ? "text-gray-500" : "text-black font-semibold";

    return (
      <TableRow
        key={index}
        onClick={() => handleViewMessage(item)}
        className={`${baseRowClass} table-responsive cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700`}
      >
        <TableCell className={readTextClass}>{item.dateSent}</TableCell>
        <TableCell className={readTextClass}>{item.customerFullname}</TableCell>
        <TableCell className={readTextClass}>{item.subject}</TableCell>
      </TableRow>
    );
  })}
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
                            </div> : <div className="text-center text-2xl text-white"><Paragraph2Xl content={"no Reports from Customers"} /></div>
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