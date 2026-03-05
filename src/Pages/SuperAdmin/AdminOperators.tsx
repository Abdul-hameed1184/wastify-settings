// import React, { useState } from "react";
// import {
//   Modal,
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeadCell,
//   TableRow,
// } from "flowbite-react";

// import { FaPlusCircle } from "react-icons/fa";
// import { GrOverview } from "react-icons/gr";


// import { useQuery } from "@tanstack/react-query";


// import {  getPaginatedCustomers } from "../../api/customer/customer.service";
// import { ButtonsPrimaryIcon } from "../../Component/Buttons";
// import Loader from "../../Component/Loader";
// import { IApartment } from "../../models/apartment.interface";
// import CreateCustomer from "../Operator/AddCustomer/CreateCustomer";
// import { Button } from "../../Component/Button";
// import { getOperators } from "../../api/admin/admin.service";
// import { IOperator } from "../../models/operator.interface";



// const AdminOperators: React.FC = () => {
//   const admin = JSON.parse(sessionStorage.getItem("AUTH_ADMIN_DETAILS") || "");
//   const [openCreateCustomer, setOpenCreateCustomer] = useState<boolean>(false);
//   const [customerApartments, setCustomerApartments] = useState<IApartment[]>();
//   const [ openViewCustomer, setOpenViewCustomer ] = useState<boolean>(false);
//   const [page, setPage] = useState<number>(1);
//     const params = {
//     page: page,
//     perPage: 10,
//   };
//   // const [ autoX, setAutoX ] = useState<boolean>(false)


//   const { data: operators, isLoading, isError } = useQuery({
//     queryKey: ['operators', page],
//     queryFn: async () => {
//       const xy = await getOperators(params);
//       console.log(xy);
//       return xy;
//     }
//   });





//   interface Customerx {
//     customerId: string;
//     customerFullname: string;
//     customerPhone: string;
//   }



  

 

// // const comp = <div>
// //               <div className="flex justify-between items-center">
// //             </div>
// //             {isError && <p className="text-red-500">Error loading apartments</p>}
// //             <Table striped>
// //               <TableHead className="font-Poppins text-lg capitalize text-white bg-slate-900 dark:text-white">
// //                 <TableHeadCell>S/N</TableHeadCell>
// //                 <TableHeadCell>Apartment Type</TableHeadCell>
// //                 <TableHeadCell>Description</TableHeadCell>
// //               </TableHead>
// //               <TableBody className="font-Poppins text-xl">
// //                 {customerApartments && customerApartments.map((apartment:IApartment, index) => (
// //                   <TableRow
// //                     key={index}
// //                     className={
// //                       index % 2 === 0
// //                         ? "odd:bg-tableBackground"
// //                         : "bg-white dark:border-gray-700 dark:bg-gray-800"
// //                     }
// //                   >
// //                     <TableCell>{index + 1}</TableCell>
// //                     <TableCell>{apartment.apartmentTypeName}</TableCell>
// //                     <TableCell>{apartment.propertyAddress}</TableCell>
// //                   </TableRow>
// //                 ))}
// //               </TableBody>
// //             </Table> 
// // </div>



//   if (isLoading) {
//     return <Loader color="slate-900" />;
//   }

//   return (
//     <main>
//       <div className="p-5">
//                 <h3 className="text-3xl font-semibold text-slate-900">Operators</h3>
//         <div>
//           {/* <div className="grid justify-items-end my-8">
//             <div className="md:w-1/3 w-full">
//               <Button
//                 icon={<FaPlusCircle />}
//                 type="button"
//                 onClick={() => {
//                   setOpenCreateCustomer(!openCreateCustomer);
//                 }}
//                 loading={false}
//               >{"Add Customers"}</Button>
//             </div>
//           </div> */}
//         </div>

//         {(page && operators) && (
//           <div className="overflow-x-auto font-Poppins mt-3">
//             <Table striped>
//               <TableHead className=" font-Poppins text-lg capitalize text-white bg-slate-900 dark:text-white">
//                 <TableHeadCell>Business Name</TableHeadCell>
//                 <TableHeadCell>Phone </TableHeadCell>
//                 <TableHeadCell>Location</TableHeadCell>
//                 {/* <TableHeadCell>Property code</TableHeadCell> */}
            
//                 {/* <TableHeadCell>Details</TableHeadCell> */}
//               </TableHead>
//               <TableBody className=" font-Poppins text-xl ">
//                 {
//                   operators.data.data.data.map((item:IOperator, index) => (
//                     <TableRow
//                       className={
//                         index % 2 === 0
//                           ? "odd:bg-tableBackground"
//                           : "bg-white dark:border-gray-700 dark:bg-gray-800"
//                       }
//                       key={index}
//                     >
//                       {/* <TableCell>{item.id}</TableCell> */}
 
//                       <TableCell>{item.businessName}</TableCell>
//                       <TableCell>{item.phone}</TableCell>
//                                            <TableCell>{item.wardName} - {item.lgaName}{","}{item.stateName} </TableCell>
    
                     
//                       {/* <TableCell onClick={() => viewCustomer(item.customerId)}> */}
            
                        
//                         {/* <Link
//                           to={"" + item.customerId}
//                           state={{ customer: item }}
//                         >
//                           <ButtonsPrimary
//                             name={"View Details"}
//                             type={"button"}
//                             loading={undefined}
//                           />
//                         </Link> */}
//                         {/* <GrOverview />
//                       </TableCell> */}
//                       {/* <TableCell> ... </TableCell> */}
//                     </TableRow>
//                   ))}
//               </TableBody>
//             </Table>
//             {/* Pagination */}
//             <div className="flex justify-center items-center h-20 my-10 w-full ">
//               <div className="w-full h-10 flex items-center justify-center rounded-md px-5">
//                 <button
//                   className={`text-slate-900 font-weight-bold`}
//                   onClick={() => setPage(page - 1)}
//                   disabled={page === 1}
//                 >
//                   Previous
//                 </button>
//                 <div className="mx-8 h-full">
//                   {Array.from({
//                     length: Math.ceil(operators.data.data.total / operators.data.data.per_page),
//                   }).map((_, index) => (
//                     <button
//                       className={`w-8 h-full  ${
//                         page === index + 1 ? "bg-slate-900 text-white " : ""
//                       } mr-2`}
//                       key={index}
//                       onClick={() => setPage(index + 1)}
//                     >
//                       {index + 1}
//                     </button>
//                   ))}
//                 </div>
//                 <button
//                   className={`text-slate-900 font-weight-bold`}
//                   onClick={() => setPage(page + 1)}
//                   disabled={
//                     Math.ceil(operators.data.data.total / operators.data.data.per_page) <= page 
//                   }
//                 >
//                   Next
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//       {openCreateCustomer && (
//         <CreateCustomer
//           // openModal={openCreateCustomer}
//           // setOpenModal={setOpenCreateCustomer}
//         />
//       )}{" "}

//       {/* {
//      openViewCustomer &&  
//     <Modal isOpen={openViewCustomer} onClose={()=> setOpenViewCustomer(!openViewCustomer)} title="Customer Apartments">
//             {comp}
      
//     </Modal>


    
//       } */}

//     </main>
//   );
// };


// export default AdminOperators;
