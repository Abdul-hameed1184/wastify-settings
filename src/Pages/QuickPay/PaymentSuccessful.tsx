import React from 'react'
import { IoMdDownload } from "react-icons/io";
import { TfiShare } from "react-icons/tfi";
import { Paragraph2, ParagraphLarge, ParagraphSmall, ParagraphSmall2 } from '../../Component/Paragraph'
import { ButtonsPrimaryIcon, ButtonsSecondaryIcon, ButtonsWhite } from '../../Component/Buttons'

const PaymentSuccessful = () => {
    return (
        <main className='mt-10 mx-4'>
            <div className="">
                <div className="mx-4 flex justify-center h-40">
                    <img src="Images/completed.gif" alt="completed" />
                </div>
                <div className="text-center">
                    <ParagraphSmall content={"Payment Successful"} />
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
                        <Paragraph2 content={"Card Payment"} />
                    </div>

                </div>
                <div className="m-4 text-center">
                    <Paragraph2 content={"Total"} />
                    <hr />
                    <ParagraphLarge content={"NGN 69,500.00"} />
                    <hr />
                </div>
                <div className="m-4 flex justify-between gap-4">
                    <ButtonsPrimaryIcon name={"Download"} icon={<IoMdDownload color='white' className='h-5 w-5 ml-3' />
} />
                    <ButtonsSecondaryIcon name={"Share"} icon={<TfiShare color='white' className='h-5 w-5 ml-3'/>
}/>
                </div>
                <div className="m-4">
                    <ButtonsWhite name={"Done"} />
                </div>
            </div>
        </main>
    )
}

export default PaymentSuccessful