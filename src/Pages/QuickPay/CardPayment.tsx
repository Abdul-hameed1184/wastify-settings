import React from 'react'
import { IoChevronBack } from "react-icons/io5";
import { Link, useNavigate } from 'react-router-dom';
import { Paragraph2Xl, ParagraphSmall, ParagraphSmall2 } from '../../Component/Paragraph';
import { InputField, InputFieldSecondary } from '../../Component/InputField';
import { ButtonsPrimary } from '../../Component/Buttons';

const CardPayment = () => {
    const navigate = useNavigate();

    const HandlePay = () => {
        navigate("/paymentsuccessful")
    };

    return (
        <main className='mt-10 mx-4'>
            <div className="flex justify-start mt-6 ml-6">
                <Link to="/paymentmode" smooth="true" duration={500}>
                    <IoChevronBack size={28} className='bg-green text-white rounded-2xl' />
                </Link>
            </div>

            <div className="mt-4 mx-4">
                <Paragraph2Xl content={"Mode Of Payment"} />
                <ParagraphSmall content={"How will you like to pay for this service"} />
            </div>
            <div className="mx-4 my-5">
                <ParagraphSmall2 content={"Card Number"} />
                <InputFieldSecondary placeholder={"0000 0000 0000 0000"} />
            </div>
            <div className="mx-4 mt-5 flex justify-between gap-6">
                <div className="">
                    <ParagraphSmall2 content={"Exp Date"} />
                    <InputFieldSecondary placeholder={"MM/YY"} />
                </div>
                <div className="">
                    <ParagraphSmall2 content={"CVV "} />
                    <InputFieldSecondary placeholder={"123"} />
                </div>
            </div>

            <div className="mt-24 mx-4">
                <ButtonsPrimary name={"PAY NGN 69,500.00"} onClick={HandlePay} />
            </div>
        </main>
    )
}

export default CardPayment