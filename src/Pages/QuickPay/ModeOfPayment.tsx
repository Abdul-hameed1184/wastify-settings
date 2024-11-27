import React, { useState } from 'react'
import { IoChevronBack } from "react-icons/io5";
import { Link, useNavigate } from 'react-router-dom';
import { Paragraph2, Paragraph2Xl, ParagraphSmall } from '../../Component/Paragraph';
import { ButtonsPrimary } from '../../Component/Buttons';

const ModeOfPayment = () => {
    const navigate = useNavigate();
    const [selectedType, setSelectedType] = useState('');

    //handle type selection
    const HandleTypeSelection = (e) => {
        const value = e.target.value;
        setSelectedType(value);
    }


    const HandleProceedPay = () => {
        navigate("/cardpayment")
    };

    return (
        <main className='mt-10 mx-4'>
            <div className="flex justify-start mt-6 ml-6">
                <Link to="/confirmation" smooth="true" duration={500}>
                    <IoChevronBack size={28} className='bg-green text-white rounded-2xl' />
                </Link>
            </div>

            <div className="mt-4 mx-2">
                <Paragraph2Xl content={"Mode Of Payment"} />
                <ParagraphSmall content={"How will you like to pay for this service"} />
            </div>

            <div className="">
                <div className="my-6">
                    <label className=" cursor-pointer w-full gap-4">
                        <input type="radio" className="peer sr-only" name="paymenttype" value={'card'} checked={selectedType === 'card'} onChange={HandleTypeSelection} />
                        <div className="flex  justify-between py-3 px-4 overflow-hidden rounded-lg bg-lightGreen ring-2 ring-lightGreen border shadow-md  transition-all active:scale-95 peer-checked:ring-black peer-checked:ring-4">

                            <svg xmlns="http://www.w3.org/2000/svg" className="fill-white stroke-black mt-2" width="32" height="32" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <circle cx="12" cy="12" r="9" />
                                <path d="M9 12l2 2l4 -4" />
                            </svg>

                            <p className='text-base font-inter font-bold not-italic text-gray leading-6 mt-3'>Card Payment</p>

                            <div className="bg-lightGreen rounded-md h-10 w-10 mt-2 ml-10">
                                <img src="Images/card.png" alt="card" className='w-full h-full' />
                            </div>
                        </div>
                    </label>
                </div>
                <div className="my-6">
                    <label className=" cursor-pointer w-full gap-4">
                        <input type="radio" className="peer sr-only" name="paymenttype" value={'transfer'} checked={selectedType === 'transfer'} onChange={HandleTypeSelection} />
                        <div className="flex  justify-between py-3 px-4 overflow-hidden rounded-lg bg-lightGreen ring-2 ring-lightGreen border shadow-md  transition-all active:scale-95 peer-checked:ring-black peer-checked:ring-4">

                            <svg xmlns="http://www.w3.org/2000/svg" className="fill-white stroke-black mt-2" width="32" height="32" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <circle cx="12" cy="12" r="9" />
                                <path d="M9 12l2 2l4 -4" />
                            </svg>

                            <p className='text-base font-inter font-bold not-italic text-gray leading-6 mt-3'>Bank Transfer</p>

                            <div className="bg-lightGreen rounded-md h-10 w-10 mt-2 ml-10">
                                <img src="Images/bank.png" alt="bank" className='w-full h-full' />
                            </div>
                        </div>
                    </label>
                </div>
          
            </div>

            <div className="mt-40">
                <ButtonsPrimary type={"button"} name={"Proceed to Pay"} onClick={HandleProceedPay} />
            </div>

        </main>
    )
}

export default ModeOfPayment