import React from 'react'
import { IoChevronBack } from "react-icons/io5";
import { Link, useNavigate } from 'react-router-dom';
import { Paragraph2, Paragraph2Xl, ParagraphLarge, ParagraphSmall, ParagraphSmall2 } from '../../Component/Paragraph';
import { ButtonsPrimary } from '../../Component/Buttons';
import axios from 'axios';

const Confirmation = () => {
    const navigate = useNavigate();

    const HandleProceedPay = async (data:{ email:  string, password: string}) => {
        // navigate("/paymentmode")
        const payment = await axios.post("https://api.paystack.co/transaction/initialize",data, { headers: {
            "Authorization": "Bearer YOUR_SECRET_KEY",
            "Content-Type": "application/json"
        }});
        console.log(payment)

    };
    return (
        <main className='mt-10 mx-4'>
            <div className="flex justify-start mt-6 ml-6">
                <Link to="/payamount" smooth="true" duration={500}>
                    <IoChevronBack size={28} className='bg-green text-white rounded-2xl' />
                </Link>
            </div>
            <div className="mt-4 mx-2">
                <Paragraph2Xl content={"Confirmation Page"} />
                <ParagraphSmall content={"Confirm your billing details before proceeding"} />
            </div>
            <div className='m-4'>
                <div className="flex justify-between">
                    <ParagraphSmall2 content={"Property Code:"} />
                    <Paragraph2 content={"WBSR020423"} />
                </div>
                <div className="flex justify-between">
                    <ParagraphSmall2 content={"Bill Period:"} />
                    <Paragraph2 content={"December 2023"} />
                </div>
                <div className="flex justify-between">
                    <ParagraphSmall2 content={"Psp Operator:"} />
                    <Paragraph2 content={"Touch and clean Limited"} />
                </div>
                <div className="flex justify-between">
                    <ParagraphSmall2 content={"Property Address:"} />
                    <Paragraph2 content={"79 Boudillon drive"} />
                </div>
                <div className="flex justify-between">
                    <ParagraphSmall2 content={"Current Amount Due:"} />
                    <Paragraph2 content={"NGN 69,000.00"} />
                </div>
                <div className="flex justify-between">
                    <ParagraphSmall2 content={"Amount to Pay:"} />
                    <Paragraph2 content={"NGN 69,000.00"} />
                </div>
                <div className="flex justify-between">
                    <ParagraphSmall2 content={"Customer Name:"} />
                    <Paragraph2 content={"Adekunle Durojaiye"} />
                </div>
                <div className="flex justify-between">
                    <ParagraphSmall2 content={"Service Charge:"} />
                    <Paragraph2 content={"NGN 500"} />
                </div>
                <div className="flex justify-between">
                    <ParagraphSmall2 content={"Payment Type:"} />
                    <Paragraph2 content={"Card payment"} />
                </div>

            </div>
            <div className="m-4 text-center">
                <Paragraph2 content={"Total"} />
                <hr />
                <ParagraphLarge content={"NGN 69,500.00"} />
                <hr />
            </div>
            <div className="mt-10">
                <ButtonsPrimary type={"button"} name={"Proceed to Pay"} onClick={HandleProceedPay} />
            </div>
        </main>
    )
}

export default Confirmation