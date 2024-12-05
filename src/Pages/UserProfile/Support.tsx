import React from 'react'
import { IoChevronBack } from "react-icons/io5";
import { Link } from 'react-router-dom';
import { Paragraph2Xl, Paragraph2XlWhite } from '../../Component/Paragraph';
const Support = () => {
    return (
        <main className='bg-green'>
            <div className="flex justify-start pt-10 ml-6">
                <Link to="/profile">
                    <IoChevronBack size={28} className='bg-gray text-white rounded-2xl' />
                </Link>
            </div>
            <div className="mx-4">
                <Paragraph2XlWhite content={"Help & Support"} />
            </div>
        </main>
    )
}

export default Support