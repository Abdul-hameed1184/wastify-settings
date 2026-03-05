// import React, { useState } from "react";
// import {
//     Button,
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeadCell,
//   TableRow,
// } from "flowbite-react";

// import { LuGlasses } from "react-icons/lu";

// import { FaPlusCircle } from "react-icons/fa";
// import { useQuery } from "@tanstack/react-query";
// import { MdDeleteForever, MdEdit } from "react-icons/md";
// import { Link } from "react-router-dom";
// import Loader from "../../Component/Loader";
// import DropdownMenu from "../../Component/DropdownMenu";
// import CreatePropertyModal from "../../Component/Modal/CreatePropertyModal";
// import InfoModal from "../../Component/Modal/InfoModal";
// import UpdatePropertyModal from "../../Component/Modal/UpdatePropertyModal";
// import { ParagraphLargeGreen } from "../../Component/Paragraph";
// import { IProperty } from "../../models/property.interface";
// import { getAdminProperties } from "../../api/admin/admin.service";



// const AdminProperties:React.FC = () => {
//   const admin = JSON.parse(sessionStorage.getItem("AUTH_ADMIN_DETAILS")||"");
//   const [ openCreateProperty, setOpenCreateProperty] = useState<boolean>(false);
//     const [ openUpdateProperty, setOpenUpdateProperty] = useState<boolean>(false);
//   const [ viewDelete, setViewDelete ] = useState<boolean>(false)
//   const [ page, setPage] = useState<number>(1);
//   const params = {
//     page: page,
//     perPage: 10,
//   };
     
//   const handleOpenUpdateProperty = () => {
//     setOpenUpdateProperty(!openUpdateProperty);
//   }
//   const { data: allProperties, isLoading } = useQuery({
//         queryKey: ['properties', page],
//         queryFn: async() => {
//           const res =  await  getAdminProperties(params)
//           console.log(res);
//           return res;
//         }
  

//   })

//   console.log(allProperties);
//   const handleDelete = () => {

//   };
//   if(isLoading){
//     return <Loader color="slate-900" />
//   }


//   return (

//     <main>
//       <div className="p-5">
//         <h3 className="text-3xl text-bold ">{"Property Records"} </h3>
//         <div>
//         <div className="grid justify-items-end my-8">
//           <div className="w-full text-right">
//       <Button 
//       icon={<FaPlusCircle />} 
//       type="button"  onClick={() => { setOpenCreateProperty(!openCreateProperty) } } loading={false}>{"Add Property"}</Button>
//       </div>
//       </div>
          
//         </div>

// {  allProperties?.data.data.data.length > 0 &&      <div className="overflow-x-auto font-Poppins mt-3">

//           <Table striped className="border-collapse rounded-lg  border-gray-900">
//             <TableHead className=" font-Poppins text-lg capitalize text-white bg-green dark:text-white">
//               {/* <TableHeadCell>Property ID</TableHeadCell> */}
//               <TableHeadCell>Property address</TableHeadCell>
//               {/* <TableHeadCell>LGA</TableHeadCell> */}
//               <TableHeadCell>Ward</TableHeadCell>
//                     <TableHeadCell>Owner</TableHeadCell>
//               <TableHeadCell>No of Apartments</TableHeadCell>{" "}
//               <TableHeadCell>Action</TableHeadCell>
//             </TableHead>
//             <TableBody className="font-Poppins text-xl ">
//               {allProperties && allProperties?.data.data.data.map((item:IProperty, index) => (
//                 <TableRow
//                   className={
//                     index % 2 === 0
//                       ? "odd:bg-tableBackground"
//                       : "bg-white dark:border-gray-700 dark:bg-gray-800"
//                   }
//                   key={index}
//                 >
//                   {/* <TableCell>{item.id}</TableCell> */}
//                   <TableCell>{item.propertyAddress} </TableCell>
//                   {/* <TableCell>{item.lgaName} </TableCell> */}
//                   <TableCell>{item.wardName}</TableCell>
//                         <TableCell className="uppercase">{item.ownerFullname}</TableCell>
//                   {/* <TableCell>{item.propertyCode}</TableCell> */}
//                   <TableCell>{item.noOfDistinctApartment}</TableCell>
//                   {/* <TableCell>{<FaCirclePlus className="text-green w-10 h-6 mt-1"  onClick={()=> handleCreateApartmentModal(item)}/>}</TableCell> */}
//                   <TableCell>

//                       <DropdownMenu>
// <div className="flex flex-col  rounded-lg divide-y divide-gray-200 shadow-sm">
//       {/* View */}
//       <Link
//         to={`${item.id}`}
//         state={{ property: item }}
//         className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer"
//       >
//         <LuGlasses className="text-green-500" />
//         <span>View Property</span>
//       </Link>

//       {/* Edit */}
//       <div className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
//         <button
//           type="button"
//           onClick={() => setOpenUpdateProperty(!openUpdateProperty)}
//           className="flex items-center gap-2 focus:outline-none"
//           aria-label="Edit Property"
//         >
//           <MdEdit className="text-blue-500" />
//           <span>Edit Property</span>
//         </button>
//       </div>
//   { 
//    openUpdateProperty &&   <UpdatePropertyModal openModal={openUpdateProperty} handleOpenModal={handleOpenUpdateProperty} operator={operator} property={item} />
// }
//       {/* Delete */}
//       <button
//         type="button"
//         onClick={() => setViewDelete(!viewDelete)}
//         className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer w-full text-left"
//         aria-label="Delete Property"
//       >
//         <MdDeleteForever className="text-red-500" />
//         <span>Delete Property</span>
//       </button>
//     </div>

//                       </DropdownMenu>
//                   </TableCell>
//                   {/* <TableCell> ... </TableCell> */}
//                 </TableRow>
//               ))}


//             </TableBody>
//           </Table>
//           {/* Pagination */}
//           <div className="flex justify-center items-center h-20 my-10 w-full ">
//             <div className="w-full h-10 flex items-center justify-center rounded-md px-5">
//               <button
//                 className={`text-green font-weight-bold`}
//                 onClick={() => setPage(page - 1)}
//                 disabled={page === 1}
//               >
//                 Previous
//               </button>
//               <div className="mx-8 h-full">
//                 {
//                   Array.from({
//                     length: Math.ceil(
//                       (allProperties?.data.data.total/allProperties?.data.data.per_page)
//                     ),
//                   }).map((_, index) => (
//                     <button
//                       className={`w-8 h-full  ${
//                         page === index + 1 ? "bg-green text-white " : ""
//                       } mr-2`}
//                       key={index}
//                       onClick={() => setPage(page + 1)}
//                     >
//                       {index + 1}
//                     </button>
//                   ))}
//               </div>
//               <button
//                 className={`text-green font-weight-bold`}
//                 onClick={() =>setPage(page+1)}
//                 disabled={page >= Math.ceil(
//     allProperties?.data.data.total / allProperties?.data.data.per_page
//   )}
//               >
//                 Next
//               </button>
//             </div>
//           </div>
//         </div>}
// { allProperties?.status === 404  && (
//   <div className="flex justify-center items-center h-96 text-4xl font-semibold text-gray-400">
//     <h2>No properties found</h2>
//   </div>
// ) }


        




//       </div>              
//   { 
//   openCreateProperty &&   <CreatePropertyModal openModal={openCreateProperty} setOpenModal={setOpenCreateProperty} operator={operator} />
// }


//       {viewDelete && (
//         <InfoModal
//           openModal={viewDelete}
//           setOpenModal={setViewDelete}
//           header={"Delete Property"}
//           content={"Do you really want to delete this property? Once deleted, it cannot be recovered."}
//           buttonName={"Delete Property"}
//           handleConfirm={handleDelete}
//         />
//       )} 



//     </main>

//   );
// };

// export default AdminProperties;
