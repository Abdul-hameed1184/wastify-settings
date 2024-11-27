import React from 'react'
import { Paragraph2Green, ParagraphLargeGreen } from '../Paragraph'
const AdminCard = ({ heading, amount, icon }) => {
    return (
        <div className="border-green rounded-lg w-full border px-4 py-3 h-44">
            <div className="flex justify-between">
                <div className=" ">
                    <Paragraph2Green content={heading} />
                </div>
                {
                    icon ?
                        <div className="rounded-full border-green border">
                            {icon}
                        </div>

                        :
                        ""
                }

            </div>
            <div className="">
                <ParagraphLargeGreen content={amount} />
            </div>
        </div>


    )
}

export default AdminCard