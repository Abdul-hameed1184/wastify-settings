import React from 'react'
import {  useNavigate } from 'react-router-dom';
import { Paragraph2, ParagraphSmall2 } from '../Paragraph'
import { ButtonsPrimary } from '../Buttons'

const CurrentBill = () => {
    const navigate = useNavigate();

    const HandlePay = () => {
        navigate("/payamount")
    };
    return (
        <div className='my-4 mx-2'>
            <div className="flex justify-between">
                <ParagraphSmall2 content={"Property Code:"} />
                <Paragraph2 content={"WBSR020423"} />
            </div>
            <div className="flex justify-between">
                <ParagraphSmall2 content={"Bill Period:"} />
                <Paragraph2 content={"December 2023"} />
            </div>
            <div className="flex justify-between ">
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
            <div className="mt-2">
                <ButtonsPrimary type={"button"} name={"Pay"} onClick={HandlePay} />
            </div>
        </div>
    )
}

export default CurrentBill