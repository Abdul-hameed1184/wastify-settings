// import { useState } from 'react'
// import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from 'flowbite-react';
// import { ParagraphBlack } from '../../../Component/Paragraph';
// import { ButtonsPrimaryBlack } from '../../../Component/Buttons';
// import { IoIosMore } from "react-icons/io";
// import { Link } from "react-router-dom";
// import CreateBillModal from '../../../Component/Modal/CreateBillModal';
// const AllCustomers = () => {
//     const [openModal, setOpenModal] = useState(false);

//     const handleToggleOpen = () => {
//         setOpenModal(true)
//         // setSelectedCustomer(customerData);
//         // setSelectedCustomerPType(propertyType)
//     }
//     return (
//         <main className='px-4 '>
//             <div className="my-5 bg-white">
//                 <div className=' w-full flex justify-end   '>
          
//                 </div>
//                 <div className="bg-lightBackground border py-5 rounded-3xl shadow-2xl mt-10">
//                     <div className="p-2">
//                         <ParagraphBlack content={"Billing For The Month January 25 2024"} />
//                     </div>
//                     <div className="overflow-x-auto font-Poppins mt-3">
//                         <Table striped >
//                             <TableHead className=" font-Poppins text-sm capitalize text-white bg-black dark:text-white">
//                                 <TableHeadCell>User Id</TableHeadCell>
//                                 <TableHeadCell>Username</TableHeadCell>
//                                 <TableHeadCell>Property Type</TableHeadCell>
//                                 <TableHeadCell>Unit</TableHeadCell>
//                                 <TableHeadCell>Address</TableHeadCell>
//                                 <TableHeadCell>Total Overdue Bills</TableHeadCell>
//                                 <TableHeadCell>Amount To Pay</TableHeadCell>
//                                 <TableHeadCell> View More
//                                 </TableHeadCell>
//                             </TableHead>
//                             <TableBody className=" font-Poppins ">
//                                 <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">

//                                     <TableCell>00001</TableCell>
//                                     <TableCell>Olankunle_22</TableCell>
//                                     <TableCell>Flat</TableCell>
//                                     <TableCell>2</TableCell>
//                                     <TableCell>34 Sunrise Avenue, Agege...</TableCell>
//                                     <TableCell>Cleared</TableCell>
//                                     <TableCell>
//                                         N3,000.00
//                                     </TableCell>
//                                     <TableCell>
//                                         <Link to="/dashboard/billing-customer-details" ><IoIosMore className='h-4 w-4 justify-center' /></Link>

//                                     </TableCell>

//                                 </TableRow>
//                                 <TableRow className="odd:bg-tableBackground">

//                                     <TableCell>000001</TableCell>
//                                     <TableCell>Olankunle_22</TableCell>
//                                     <TableCell>Flat</TableCell>
//                                     <TableCell>2</TableCell>
//                                     <TableCell>34 Sunrise Avenue, Agege...</TableCell>
//                                     <TableCell>N75,000.00</TableCell>
//                                     <TableCell>
//                                         N3,000.00
//                                     </TableCell>
//                                     <TableCell>
//                                         <Link to="/dashboard/billing-customer-details" ><IoIosMore className='h-4 w-4 justify-center' /></Link>
//                                     </TableCell>

//                                 </TableRow>

//                                 <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">

//                                     <TableCell>000001</TableCell>
//                                     <TableCell>Olankunle_22</TableCell>
//                                     <TableCell>Flat</TableCell>
//                                     <TableCell>2</TableCell>
//                                     <TableCell>34 Sunrise Avenue, Agege...</TableCell>
//                                     <TableCell>Cleared</TableCell>
//                                     <TableCell>
//                                         N3,000.00
//                                     </TableCell>
//                                     <TableCell>
//                                         <Link to="/dashboard/billing-customer-details" ><IoIosMore className='h-4 w-4 justify-center' /></Link>
//                                     </TableCell>

//                                 </TableRow>
//                                 <TableRow className="odd:bg-tableBackground">

//                                     <TableCell>000001</TableCell>
//                                     <TableCell>Olankunle_22</TableCell>
//                                     <TableCell>Flat</TableCell>
//                                     <TableCell>2</TableCell>
//                                     <TableCell>34 Sunrise Avenue, Agege...</TableCell>
//                                     <TableCell>N98,000.00</TableCell>
//                                     <TableCell>
//                                         N3,000.00
//                                     </TableCell>
//                                     <TableCell>
//                                         <Link to="/dashboard/billing-customer-details" ><IoIosMore className='h-4 w-4 justify-center' /></Link>
//                                     </TableCell>

//                                 </TableRow>
//                                 <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">

//                                     <TableCell>000001</TableCell>
//                                     <TableCell>Olankunle_22</TableCell>
//                                     <TableCell>Flat</TableCell>
//                                     <TableCell>2</TableCell>
//                                     <TableCell>34 Sunrise Avenue, Agege...</TableCell>
//                                     <TableCell>N100,000.00</TableCell>
//                                     <TableCell>
//                                         N3,000.00
//                                     </TableCell>
//                                     <TableCell>
//                                         <Link to="/dashboard/billing-customer-details" ><IoIosMore className='h-4 w-4 justify-center' /></Link>
//                                     </TableCell>
//                                 </TableRow>
//                                 <TableRow className="odd:bg-tableBackground">

//                                     <TableCell>000001</TableCell>
//                                     <TableCell>Olankunle_22</TableCell>
//                                     <TableCell>Flat</TableCell>
//                                     <TableCell>2</TableCell>
//                                     <TableCell>34 Sunrise Avenue, Agege...</TableCell>
//                                     <TableCell>N20,000.00</TableCell>
//                                     <TableCell>
//                                         N3,000.00
//                                     </TableCell>
//                                     <TableCell>
//                                         <Link to="/dashboard/billing-customer-details" ><IoIosMore className='h-4 w-4 justify-center' /></Link>
//                                     </TableCell>

//                                 </TableRow>
//                                 <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">

//                                     <TableCell>000001</TableCell>
//                                     <TableCell>Olankunle_22</TableCell>
//                                     <TableCell>Flat</TableCell>
//                                     <TableCell>2</TableCell>
//                                     <TableCell>34 Sunrise Avenue, Agege...</TableCell>
//                                     <TableCell>Cleared</TableCell>
//                                     <TableCell>
//                                         N3,000.00
//                                     </TableCell>
//                                     <TableCell>
//                                         <Link to="/dashboard/billing-customer-details" ><IoIosMore className='h-4 w-4 justify-center' /></Link>
//                                     </TableCell>

//                                 </TableRow>
//                                 <TableRow className="odd:bg-tableBackground">

//                                     <TableCell>00001</TableCell>
//                                     <TableCell>Olankunle_22</TableCell>
//                                     <TableCell>Flat</TableCell>
//                                     <TableCell>2</TableCell>
//                                     <TableCell>34 Sunrise Avenue, Agege...</TableCell>
//                                     <TableCell>Cleared</TableCell>
//                                     <TableCell>
//                                         N3,000.00
//                                     </TableCell>
//                                     <TableCell>
//                                         <Link to="/dashboard/billing-customer-details" ><IoIosMore className='h-4 w-4 justify-center' /></Link>
//                                     </TableCell>

//                                 </TableRow>
//                             </TableBody>
//                         </Table>
//                     </div>
//                     <div className='flex justify-between py-10 px-5 '>
//                         <div className='w-32'>
//                              {/* <ButtonsPrimaryBlack name={"Back "} /> */}
//                              <Link to={'/dashboard/billing'} className='text-white bg-black  w-full h-14  justify-center px-8 py-4 text-base mt-20 md:text-sm font-normal shadow-sm ring-transparent border-transparent rounded-lg ring-2 font-Poppins border'>Back</Link>
//                         </div>
//                         <div className='w-32'> <ButtonsPrimaryBlack name={"Send Bill"} onClick={handleToggleOpen} /></div>
//                     </div>
//                     <CreateBillModal openModal={openModal} setOpenModal={setOpenModal} customer={undefined} type={undefined} />
//                 </div>
//             </div>
//         </main>
//     )
// }

// export default AllCustomers