import React from 'react'
import { Paragraph2Green, ParagraphLargeGreen } from '../Paragraph'


type AdminCardProps = {
    heading: string,
    amount: string,
    icon: React.ReactNode,
    className?: string
}
const AdminCard:React.FC<AdminCardProps> = ({ heading, amount, icon, className }) => {
    return (
        <div className={`rounded-lg shadow-xl w-full px-4 py-3 h-44 bg-white flex flex-col justify-between ${className}`}>
            <div className="flex justify-between">
                <div className=" ">
                    <h3 className='text-xl text-bold'>{heading}</h3>
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
                                <h3 className='text-4xl text-extrabold'>{amount}</h3>
            </div>
        </div>


    )
}

export default AdminCard