import React from 'react'
import { Paragraph2Green, ParagraphLargeGreen } from '../Paragraph'


type AdminCardProps = {
    heading: string,
    amount: string,
    icon: React.ReactNode
}
const AdminCard:React.FC<AdminCardProps> = ({ heading, amount, icon }) => {
    return (
        <div className=" rounded-lg shadow-xl w-full px-4 py-3 h-44">
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