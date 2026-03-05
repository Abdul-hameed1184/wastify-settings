// import React, { useState } from 'react'
// import { Button, Checkbox, Label, Modal, Radio, TextInput } from "flowbite-react";
// import { ButtonsPrimaryBlack } from '../Buttons';
// import { Paragraph2, ParagraphSmall2, ParagraphXl } from '../Paragraph';


// type Props = {
//     openModal: boolean;
//     setOpenModal: ()=>void;

// }
// const CreateBillModal = ({ openModal, setOpenModal, customer, type }) => {

//     const [Billtype, setBillType] = useState('all');

//     const changeType = (bill) => {
//         setBillType(bill)
//     }
//     return (
//         <Modal show={openModal} onClose={() => setOpenModal(false)} size={'md'} position={'top-right'}>
//             <Modal.Header>Bill All Customers </Modal.Header>
//             <Modal.Body>
//                 <div className="space-y-6">
//                     {/* <Paragraph2 content={"Check if you want to bill or customers or selected customers"} /> */}
//                     <div>
//                         <div className="">
//                             <ParagraphSmall2 content={"Select billing month"} />
//                             <select name="" id="" className='border-2 px-3 py-3 pl-3  bg-white shadow-sm rounded-lg block font-Poppins w-full h-14 text-black text-base mt-1 ring-gray  placeholder:text-green focus:outline-none focus:ring-2 focus:border-purple focus:border-transparent focus:ring-gray '>
//                                 <option value="january">January</option>
//                                 <option value="Febuary">Febuary</option>
//                                 <option value="March">March</option>
//                                 <option value="April">April</option>
//                                 <option value="May">May</option>
//                                 <option value="June">June</option>
//                                 <option value="July">July</option>
//                                 <option value="August">August</option>
//                                 <option value="September">September</option>
//                                 <option value="October">October</option>
//                                 <option value="November">November</option>
//                                 <option value="December">December</option>
//                             </select>
//                         </div>
//                         <div className="">
//                             <ParagraphSmall2 content={"Select billing type"} />
//                             <div className="flex justify-between">
//                                 <div className="flex items-center gap-2">
//                                     <Radio id="all" name='type' value={'all'} onChange={() => changeType('all')} />
//                                     <Label htmlFor="type">Bill All Customers</Label>
//                                 </div>
//                                 <div className="flex items-center gap-2">
//                                     <Radio id="all" name='type' value={'specific'} onChange={() => changeType('specific')} />
//                                     <Label htmlFor="type">Bill Specific Customers</Label>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                     {
//                         Billtype == 'specific' &&
//                         <div className="flex justify-end">
//                             <div className="flex items-center gap-2">
//                                 <Checkbox id="remember" />
//                                 <Label htmlFor="remember">Solomon Sunmola</Label>
//                             </div>

//                         </div>

//                     }


//                 </div>
//             </Modal.Body>
//             <Modal.Footer>
//                 <div className=" w-full">
//                     <ButtonsPrimaryBlack onClick={() => setOpenModal(false)} name={"Bill Now"} />
//                 </div>
//             </Modal.Footer>
//         </Modal>

//     )
// }

// export default CreateBillModal