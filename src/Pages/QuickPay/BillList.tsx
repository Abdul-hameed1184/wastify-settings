import React from 'react'
import { Link } from 'react-router-dom'
import { TiTimes } from "react-icons/ti"
import { Paragraph2Xl } from '../../Component/Paragraph'
import CurrentBill from '../../Component/Card/CurrentBill'

const BillList = () => {
    return (
        <main className='m-4'>
            <div className="mt-6">
                <div className="flex justify-end mr-3">
                    <Link to="/" smooth="true" duration={500}>
                        <TiTimes size={24} className='bg-green text-white rounded-2xl' />
                    </Link>
                </div>
                <div className="">
                    <Paragraph2Xl content={"Current Bill"} />
                </div>
                <div className="m-4">
                    <CurrentBill />
                    <CurrentBill />
                    <CurrentBill />
                    <CurrentBill />
                    <CurrentBill />
                    <CurrentBill />
                </div>
            </div>
        </main>
    )
}

export default BillList