
import React from 'react'
import { IoChevronForwardSharp } from "react-icons/io5"
import { IApartmentBillingTransaction } from '../../models/billdata.interface'
import Card from './Card'

const PaymentHistoryCard:React.FC<{data: IApartmentBillingTransaction}> = ({data}) => {
    return (
        <Card className="max-w-sm border-transparent text-center bg-lightGreen mt-5">
            <div className="flex gap-5">
                <div className="w-[15%]">
      {                    data.paymentMode }

                </div>
                <div className="w-3/4">
                    <div className="flex gap-3">
                        <p className='text-sm font-Poppins font-light not-italic text-black leading-6'>{data.paidDateTime}</p>


                        <p className={`${data.paymentStatusLabel == "Successful" ? 'text-success ' : 'text-error '}text-sm font-Poppins font-light not-italic leading-6`}>{data.paymentStatusLabel}</p>
         

                    </div>
                    <div className="flex gap-2">
                        <p className='text-sm font-Poppins font-bold not-italic text-black leading-6'>

                            {
                                data.paymentMode
                            }

                        </p>
                        <p className='text-sm font-Poppins font-bold not-italic text-black leading-6'>{data.amountPaid }</p>
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