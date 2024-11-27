import { Card } from 'flowbite-react'
import React from 'react'
import { IoChevronForwardSharp } from "react-icons/io5"

const PaymentHistoryCard = ({ type, successful }) => {
    return (
        <Card className="max-w-sm border-transparent text-center bg-lightGreen mt-5">
            <div className="flex gap-5">
                <div className="w-[15%]">
                    {
                        type === "card" ?
                            <img src="Images/card.png" alt="card" />
                            :
                            <img src="Images/bank.png" alt="card" />
                    }

                </div>
                <div className="w-3/4">
                    <div className="flex gap-3">
                        <p className='text-sm font-Poppins font-light not-italic text-black leading-6'>09 Aug 2023/ 17:55:16</p>


                        <p className={`${successful ? 'text-success ' : 'text-error '}text-sm font-Poppins font-light not-italic leading-6`}>{successful ? "Successful" : "Failed"}
                         </p>

                    </div>
                    <div className="flex gap-2">
                        <p className='text-sm font-Poppins font-bold not-italic text-black leading-6'>

                            {
                                type === "card" ?
                                    "Card Payment"
                                    :
                                    "Bank Transfer"
                            }

                        </p>
                        <p className='text-sm font-Poppins font-bold not-italic text-black leading-6'>NGN 69,000.00</p>
                    </div>
                </div>
                <div className="w-[10%] mt-1">
                    <IoChevronForwardSharp className='w-8 h-8' />
                </div>
            </div>

        </Card>
    )
}

export default PaymentHistoryCard