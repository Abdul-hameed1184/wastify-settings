import { Card } from 'flowbite-react'
import React from 'react'
import { PiCopySimple } from "react-icons/pi";
import { Link } from 'react-router-dom';
import { Paragraph2, ParagraphLargeNoMargin, ParagraphSmall2 } from '../Paragraph'

const ViewPropertyCard = () => {
    return (
        <Card className="max-w-sm border-transparent text-center bg-lightGreen mt-5">
            <div className="">

                <ParagraphSmall2 content={"Property Code"} />
                <div className="flex justify-center mt[-5px]">
                    <ParagraphLargeNoMargin content={"WPLIOTCBD01"} />
                    <button>
                        <PiCopySimple className='w-8 h-8' />
                    </button>
                </div>
                <div className="flex justify-between ">
                    <ParagraphSmall2 content={"Property Address:"} />
                    <Paragraph2 content={"79 Boudillon drive …"} />
                </div>
                <div className="flex justify-between">
                    <ParagraphSmall2 content={"PSP Operator:"} />
                    <Paragraph2 content={"Touch & Clean"} />
                </div>
                <div className="flex justify-between">
                    <Link className='text-sm m-2 font-Poppins font-light not-italic text-error leading-6 underline'>Delete property</Link>
                    <Link to="/propertyreview" smooth={true} duration={500} className='text-sm m-2 font-Poppins font-light not-italic text-success leading-6 underline'> View More</Link>
                </div>
            </div>
        </Card>
    )
}

export default ViewPropertyCard