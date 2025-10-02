import React, { useState } from 'react'
import { IoChevronBack } from "react-icons/io5";
import { Link, useNavigate } from 'react-router-dom';
import { Paragraph2Xl } from '../../Component/Paragraph';
import { InputField, InputFieldSecondary } from '../../Component/InputField';
import { ButtonsPrimary } from '../../Component/Buttons';
import { getPayStackSettings, initializePayment } from '../../api/paystack-payment/paystack-api';
import Paystack from '@paystack/inline-js'
import PaystackPayment from '../../Component/PaystackButton';

const PayAmount = () => {
    const navigate = useNavigate();
    const [settings, setSettings] = useState<any>(null);
    const [ isOpen, setIsOpen] = useState(false);


    const HandleContinue = async () => {
        const data = await initializePayment("jasolajohn@gmail.com", 120000);
        console.log(data)
        const access_code = data.data.data.access_code;
        console.log(access_code);
        const popup = new Paystack()
        const bx = popup.resumeTransaction(access_code);
        console.log(bx)
    };
    return (
        <main className='mt-10 mx-2'>
            <div className="flex justify-start mt-6 ml-6">
                <Link to="/currentbills">
                    <IoChevronBack size={28} className='bg-green text-white rounded-2xl' />
                </Link>
            </div>
            <div className="m-2">
                <Paragraph2Xl content={"Enter Amount"} />
                <p className='text-base m-4 font-inter font-normal not-italic text-black leading-6'>
                    You owe <strong>N69,000.00</strong> for the month of <strong>December 23,</strong> how much will you like to pay for this service?
                </p>
            </div>
            <div className="m-4">
                <InputFieldSecondary placeholder={"00,000.00"} type={"number"}  />
            </div>

            <div className="mx-4 my-24">
                <ButtonsPrimary name={"Continue"} onClick={()=>HandleContinue()} />
            
            
            </div>

        </main>
    )
}

export default PayAmount