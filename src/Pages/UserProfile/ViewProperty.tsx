import React from 'react'
import { IoChevronBack } from "react-icons/io5";
import { MdOutlineAddCircle } from "react-icons/md";
import { Link } from 'react-router-dom';
import { Paragraph2Xl } from '../../Component/Paragraph';
import ViewPropertyCard from '../../Component/Card/ViewPropertyCard';
const ViewProperty = () => {
    return (
        <main>
            <div className="flex justify-start mt-10 ml-6">
                <Link to="/profile" smooth="true" duration={500}>
                    <IoChevronBack size={28} className='bg-green text-white rounded-2xl' />
                </Link>
            </div>
            <div className=" flex justify-between px-6">
                <Paragraph2Xl content={"View Property"} />
                <div className="mt-3">
                    <MdOutlineAddCircle className='text-green w-10 h-10' />
                </div>
            </div>

            <div className="m-4">
                <ViewPropertyCard />
                <ViewPropertyCard />
                <ViewPropertyCard />
                <ViewPropertyCard />
                <ViewPropertyCard />
                <ViewPropertyCard />
                <ViewPropertyCard />
            </div>
        </main>
    )
}

export default ViewProperty