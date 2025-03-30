import React from 'react'
import { Link } from 'react-router-dom'
import { IoChevronBack } from "react-icons/io5";
import { Paragraph2Xl } from '../../Component/Paragraph'
import PaymentHistoryCard from '../../Component/Card/PaymentHistoryCard';

const PaymentHistory:React.FC = () => {
    return (
        <main>
            <div className="flex justify-start mt-10 ml-6">
                <Link to="/profile">
                    <IoChevronBack size={28} className='bg-green text-white rounded-2xl' />
                </Link>
            </div>
            <div className="mx-4">
                <Paragraph2Xl content={"Payment History"} />
            </div>
            <div className="m-4">
                <PaymentHistoryCard type={"card"} successful={true} />
                <PaymentHistoryCard type={"card"} successful={false} />
                <PaymentHistoryCard type={"bank"} successful={true} />
                <PaymentHistoryCard type={"card"} successful={false} />
                <PaymentHistoryCard type={"bank"} successful={true} />
                <PaymentHistoryCard type={"card"} successful={false} />
                <PaymentHistoryCard type={"bank"} successful={true} />
                <PaymentHistoryCard type={"card"} successful={false} />
                <PaymentHistoryCard type={"bank"} successful={true} />
                <PaymentHistoryCard type={"card"} successful={false} />
                <PaymentHistoryCard type={"bank"} successful={true} />
                <PaymentHistoryCard type={"card"} successful={false} />
                <PaymentHistoryCard type={"bank"} successful={true} />
            </div>
        </main>
    )
}

export default PaymentHistory