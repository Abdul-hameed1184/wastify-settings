// import { useEffect, useState } from 'react'
// import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from 'flowbite-react';
// import { getCustomerReports } from '../../../api/psp-operator/psp-operator.service';
// import { Paragraph2Xl } from '../../../Component/Paragraph';
// import { IReport } from '../../../models/report.interface';
// import { IPaginatedCustomerReports } from '../../../models/paginated.customerReports.interface';
// import InfoModal from '../../../Component/Modal/InfoModal';
// import Loader from '../../../Component/Loader';
// import { useFormik } from 'formik';
// import { customerReportSchema } from '../../../utils/validators/CustomerReportSchema';
// import { toast } from 'react-toastify';
// import { sendMessage } from '../../../api/customer/customer.service';

// const Reports = () => {

//     const [ reports, setReports ] = useState<IPaginatedCustomerReports>({} as IPaginatedCustomerReports)
//     const operator = JSON.parse(sessionStorage.getItem('AUTH_ADMIN_DETAILS')||"");
//     const [ page, setPage ] = useState<number>(1);
//     const [ viewMessage, setViewMessage ] = useState<boolean>(false);
//     const [ report, setReport ] = useState<IReport>({} as IReport);
//     const [ viewForm, setViewForm ] = useState<boolean>(false);
//     const [ loading, setLoading ] = useState<boolean>(false);
//     const [ apartmentId, setApartmentId ] = useState<number>(0);
//     // console.log(operator);


//     useEffect(() => {
// (async() => {
//   try{
// console.log("Hi")
//         const reports = await getCustomerReports(operator.id);
//         setReports(reports.data.data);
//         // const customers = await getCustomers();
//         setLoading(true);
//   }catch(e){
//     console.error("Error fetching reports:", e);
//     setLoading(false);
//     // You can handle the error here, e.g., show a toast notification
//   }finally{
//     setLoading(false);
//   }
// }
//     )()
//     }, [operator.id]);

//     if(loading){
//       return <Loader />
//     }
//      const handleSendMessage = async (message) => {
//         try {
//           const res = await sendMessage(message);
//           console.log(res);
//               toast.success(`Report Sent`);
//           setViewForm(!viewForm)
//         } catch (error) {
//           console.log(error)
//           toast.error("Error sending report");
//         }
//       };

          
//       const handleViewMessage = (x:IReport) => {
//               setReport(x);
//               setViewMessage(!viewMessage)
//           }

//           const handleFormView = () => {
//               setViewForm(!viewForm);
//           }
//         const formik = useFormik({
//           initialValues: {
//             customerId: 6,
//             apartmentId: apartmentId,
//             subject: "",
//             message: "",
//           },
//           validationSchema: customerReportSchema,                             
//           onSubmit: async (values, { resetForm}) => {
//             setLoading(true);
//             await handleSendMessage(values);
//             setLoading(false);
//             resetForm();
            
//           },
//         });

        

//     return (
//         <main className='px-4'>
            
//                       { viewMessage && 
//                         <InfoModal
//               openModal={viewMessage}
//               setOpenModal={() => setViewMessage(!viewMessage)}
//               header={report.subject}
//               content={
//                 <div className="space-y-2 text-gray-700 text-lg leading-relaxed">
//                   <div>
//                     <p className="font-semibold">Message:</p>
//                     <p>{report.message}</p>
//                   </div>
//                   <div>
//                     <p className="font-semibold">Sent At:</p>
//                     <p>{new Date(report.created_at).toLocaleString()}</p>
//                   </div>
//                   <div>
//                     <p className="font-semibold">Sent By:</p>
//                     <p>{report.customerFullname} - {report.customerEmail}</p>
//                   </div>
//                         <div>
//                     <p className="font-semibold">Apartment:</p>
//                     <p>{report.apartmentTypeName} - {report.propertyAddress}</p>
//                   </div>
//                 </div>
//               }
//               buttonName="Reply"
//               handleConfirm={() =>{
//                  setViewMessage(!viewMessage)
//                  setViewForm(!viewForm)
//               }}
//             />
            
                      
//                       }


//         {  !viewForm &&       <div className="w-full h-full bg-white rounded-lg my-20 ">
   
//          { reports.data && reports.data.length > 0 &&      
//                   <div className="overflow-x-auto font-Poppins mt-3 mx-4">
//                    <div className="flex flex-column justify-between my-4"> <Paragraph2Xl content="Reports"/> 
//                    </div>
//                                 <Table striped >
//                 <TableHead className="font-Poppins text-lg capitalize text-white bg-green dark:text-white">
//   <TableHeadCell className="w-32">Date</TableHeadCell> 
//   <TableHeadCell className="w-48">Name</TableHeadCell> 
//     <TableHeadCell className="flex-grow">Subject</TableHeadCell> 
// </TableHead>

//                                 <TableBody className="divide-y font-Poppins text-lg capitalize text-black">
//   {reports.data.map((item: IReport, index) => {
//     const isEven = index % 2 === 0;
//     const baseRowClass = isEven
//       ? "odd:bg-tableBackground"
//       : "bg-white dark:border-gray-700 dark:bg-gray-800";
//     const readTextClass = item.readStatus !== 0 ? "text-gray-500" : "text-black font-semibold";

//     return (
//       <TableRow
//         key={index}
//         onClick={() => handleViewMessage(item)}
//         className={`${baseRowClass} table-responsive cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700`}
//       >
//         <TableCell className={readTextClass}>{item.dateSent}</TableCell>
//         <TableCell className={readTextClass}>{item.customerFullname}</TableCell>
//         <TableCell className={readTextClass}>{item.subject}</TableCell>
//       </TableRow>
//     );
//   })}
// </TableBody>
//                                 </Table>
//                                 <div className="flex justify-center items-center h-20 my-10 w-full ">
//                     <div className="w-full h-10 flex items-center justify-center rounded-md px-5">
//                       <button
//                         className={`text-green font-weight-bold`}
//                         onClick={() => setPage(page - 1)}
//                         disabled={page === 1}
//                       >
//                         Previous
//                       </button>
//                       <div className="mx-8 h-full">
//                         {
//                           Array.from({
//                             length: Math.ceil(
//                               (reports.total/reports.per_page)
//                             ),
//                           }).map((_, index) => (
//                             <button
//                               className={`w-8 h-full  ${
//                                 page === index + 1 ? "bg-green text-white " : ""
//                               } mr-2`}
//                               key={index}
//                               onClick={() => setPage(page + 1)}
//                             >
//                               {index + 1}
//                             </button>
//                           ))}
//                       </div>
//                       <button
//                         className={`text-green font-weight-bold`}
//                         onClick={() => setPage(page + 1)}
//                         disabled={Math.ceil(reports.total/reports.per_page) <= page + 1}
//                       >
//                         Next
//                       </button>
//                     </div>
//                   </div>
//                           </div>}

                            
                            
//                             { reports.data && reports.data.length === 0 &&
//                               <div className="text-center text-2xl text-white"><Paragraph2Xl content={"no Reports from Customers"} /></div>
//                             }
//                             </div>}
                            
        
           

//         </main>
//     )
// }

// export default Reports