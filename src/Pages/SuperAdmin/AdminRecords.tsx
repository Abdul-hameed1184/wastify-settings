// import React, { useEffect, useState } from "react";
// import { FaHouse } from "react-icons/fa6";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeadCell,
//   TableRow,
// } from "flowbite-react";
// import { FaPlusCircle } from "react-icons/fa";
// import { IoPeople } from "react-icons/io5";
// import { getPropertyByOperator } from "../../api/psp-operator/psp-operator.service";
// import { ButtonsPrimaryIcon, ButtonsPrimary } from "../../Component/Buttons";
// import AdminCard from "../../Component/Card/AdminCard";
// import Loader from "../../Component/Loader";
// import CreateApartmentModal from "../../Component/Modal/CreateApartmentModal";
// import CustomerModal from "../../Component/Modal/CustomerModal";
// import { Paragraph2XlGreenMargin } from "../../Component/Paragraph";
// import { IApartment } from "../../models/apartment.interface";
// import { IPaginatedProperty } from "../../models/paginatedPropertyByOperator.interface";
// import { IProperty } from "../../models/property.interface";


// const AdminRecords:React.FC = () => {
//   const admin = JSON.parse(sessionStorage.getItem("AUTH_ADMIN_DETAILS")||"");

//   const [openModal, setOpenModal] = useState<boolean>(false);
//   const [ openCreateProperty, setOpenCreateProperty] = useState<boolean>(false);
//   const [ page, setPage] = useState<number>(1);
//   const [ apartment, setApartment] = useState<IApartment>();
//   const [ viewCustomer, setViewCustomer] = useState<boolean>(false)


//   const [ properties, setProperties ] = useState<IPaginatedProperty>();
//   const [selectedPropertyId, setSelectedPropertyId] = useState<number>();
//   const [selectedProperty, setSelectedProperty] = useState<IProperty>();
//   const [ loading, setLoading ] = useState<boolean>(true)
  
//   const [ openCreateApartmentModal, setOpenCreateApartmentModal ] = useState<boolean>(false);
//   const handleToggleOpen = (property:IProperty) => {
//     setOpenModal(true);
//     setSelectedPropertyId(property.id);
//     setSelectedProperty(property)
//   };

//   const getProperties = async () => {
//     const data = await getPropertyByOperator(admin.userId, page);
//   setProperties(data.data.data);
//    console.log(data);

//   }
    

//   useEffect(() => {
//     try{
//     getProperties();
//     }catch(e){
//       console.log(e)
//     }
//     setLoading(false)
//   }, [getProperties]);



//   if(loading){
//     return <Loader  />
//   }

//   return (
//     <>    

//     <main className="px-4">
//       <div className="flex flex-col lg:flex-row justify-between my-10">
//         <div className="w-full lg:w-[45%]">
//                     <AdminCard heading={"Total Customers"} amount={"300"} icon={<IoPeople className='text-green w-10 h-8' />} />
//                 </div>
//         <div className="w-full mt-5 lg:mt-0 ">
//           <AdminCard
//             heading={"Total Property"}
//             amount={properties?.total.toString() || "0"}
//             icon={<FaHouse className="text-green w-10 h-6 mt-1" />}
//           />
//         </div>
//       </div>
//       <div className="grid justify-items-end mb-4">
//           <div className="w-1/3">
//       <ButtonsPrimaryIcon icon={<FaPlusCircle />
// } type="button" name={"Add Property"} onClick={() => { setOpenCreateProperty(!openCreateProperty) } } loading={false}/>
//       </div>
//       </div>
//       <div className="bg-lightBackground py-5 rounded-3xl shadow-2xl">
//         <Paragraph2XlGreenMargin content={"Property Records"} />
//         <div>
          
//         </div>
// {  properties &&      <div className="overflow-x-auto font-Poppins mt-3">
//           <Table striped>
//             <TableHead className=" font-Poppins text-xl capitalize text-white bg-green dark:text-white">
//               {/* <TableHeadCell>Property ID</TableHeadCell> */}
//               <TableHeadCell>Property address</TableHeadCell>
//               <TableHeadCell>LGA</TableHeadCell>
//               <TableHeadCell>Ward</TableHeadCell>
//               <TableHeadCell>Property code</TableHeadCell>
//               <TableHeadCell>Number of Distinct Apartment</TableHeadCell>{" "}
//               {/* <TableHeadCell>Add/View Apartment</TableHeadCell>{" "} */}
//               {/*Number of Customers Changed*/}
//               {/* <TableHeadCell>Customer details</TableHeadCell> */}
//               <TableHeadCell>Add/View Apartment</TableHeadCell>
//             </TableHead>
//             <TableBody className="divide-y font-Poppins text-xl ">
//               {properties.data.map((item:IProperty, index) => (
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
//                   <TableCell>{item.lgaName} </TableCell>
//                   <TableCell>{item.wardName}</TableCell>
//                   <TableCell>{item.propertyCode}</TableCell>
//                   <TableCell>{item.noOfDistinctApartment}</TableCell>
//                   {/* <TableCell>{<FaCirclePlus className="text-green w-10 h-6 mt-1"  onClick={()=> handleCreateApartmentModal(item)}/>}</TableCell> */}
//                   <TableCell>
//                     <ButtonsPrimary
//                       name={"+ / View More"}
//                       onClick={() => handleToggleOpen(item)} type={"button"} loading={undefined} />
//                   </TableCell>
//                   {/* <TableCell> ... </TableCell> */}
//                 </TableRow>
//               ))}

//        { selectedPropertyId &&      
       
//        <CustomerModal
//                 openModal={openModal}
//                 setOpenModal={setOpenModal}
//                 propertyId={selectedPropertyId}
//                 setOpenCreateApartmentModal={setOpenCreateApartmentModal}
//                 setApartment={setApartment}
//                 setViewCustomer={setViewCustomer}

//               />}

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
//                       (properties.total/properties.per_page)
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
//                 onClick={() => setPage(page + 1)}
//                 disabled={Math.ceil(properties.total/properties.per_page) <= page + 1}
//               >
//                 Next
//               </button>
//             </div>
//           </div>
//         </div>}
//       </div>
//    {selectedProperty && <CreateApartmentModal openModal={openCreateApartmentModal} setOpenModal={setOpenCreateApartmentModal} property={selectedProperty}  />
// }              
//       {/* <CreatePropertyModal openModal={openCreateProperty} setOpenModal={setOpenCreateProperty} operator={operator} /> */}
//      </main>

//      </>

//   );
// };

// export default AdminRecords;
