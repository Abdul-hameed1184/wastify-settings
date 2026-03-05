import { IoChevronBack } from "react-icons/io5";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { PiCopySimple } from "react-icons/pi";
import { ToastContainer, toast } from "react-toastify";
import { Paragraph2, Paragraph2Xl, ParagraphExtraSmall, ParagraphLarge, ParagraphLargeWhite, ParagraphSmall, ParagraphSmall2 } from '../../Component/Paragraph';
import { ButtonsPrimary } from '../../Component/Buttons';

const PropertyPreview = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const result = location.state && location.state.data;
    // console.log(result);
    const HandleConfirm = () => {
        navigate("/completed")
    };

    const handleCopyClick = async () => {
        try {
          await navigator.clipboard.writeText(result?.propertyCode);
          toast.success('Text copied to clipboard', { autoClose: 5000 });
        } catch (err) {
          toast.error('Unable to copy text to clipboard', { autoClose: 5000 });
        }
      };
    return (
        <main className="mt-4 mx-2 md:m-0 md:bg-green md:h-full md:bg-bgdesktop-pattern md:bg-cover">
            <div className="md:mt-0 md:py-5 md:px-10 md:flex md:justify-between">
                <div className="hidden md:block md:p-10">
                    <ParagraphLargeWhite content={"Sign Up"} />
                </div>

                <div className="md:mt-1 md:w-2/6 md:bg-white md:border-transparent md:p-5 md:rounded-lg md:mb-20">
                    <div className="flex justify-start mt-6 ml-4 md:mt-2">
                        <Link to="/propertyunit">
                            <IoChevronBack size={28} className='bg-green text-white rounded-2xl' />
                        </Link>
                    </div>
                    <div className="mt-4 mx-2 md:mt-2">
                        <Paragraph2Xl content={"Set Up Your Property Account"} />
                        <ParagraphSmall content={"Confirm your waste pay information before Creating account"} />
                    </div>
                    <div className="flex flex-col text-center mt-6 md:mt-2">
                        <div className="h-100 w-8/12 mx-14 md:h-20 md:w-2/6 md:m-auto">
                            <img src="Images/previewimg.png" alt="alt-image" />
                        </div>
                        <ParagraphExtraSmall content={"Property Code"} />
                    </div>
                    <div className="mt-4 flex justify-center md:mt-2">
                        <ParagraphLarge content={result?.propertyCode} />
                        {
                            result?.propertyCode &&
                            <button onClick={handleCopyClick}>
                                <PiCopySimple className='w-8 h-8' />
                            </button>
                        }

                    </div>
                    <div className="mt-2 mx-2">
                        <div className="flex justify-between">
                            <ParagraphSmall2 content={"Customer name:"} />
                            <Paragraph2 content={result?.CustomerName} />
                        </div>
                        <div className="flex justify-between">
                            <ParagraphSmall2 content={"Property Type:"} />
                            <Paragraph2 content={result?.propertyType} />
                        </div>
                        <div className="flex justify-between">
                            <ParagraphSmall2 content={"Property Unit:"} />
                            <Paragraph2 content={result?.noOfFlats} />
                        </div>
                        <div className="flex justify-between">
                            <ParagraphSmall2 content={"Property Address:"} />
                            <Paragraph2 content={result?.propertyAddress} />
                        </div>
                        <div className="flex justify-between">
                            <ParagraphSmall2 content={"State:"} />
                            <Paragraph2 content={result?.state} />
                        </div>
                        <div className="flex justify-between">
                            <ParagraphSmall2 content={"LGA/LCDA:"} />
                            <Paragraph2 content={result?.lga} />
                        </div>
                        <div className="flex justify-between">
                            <ParagraphSmall2 content={"Wards:"} />
                            <Paragraph2 content={result?.ward} />
                        </div>
                        <div className="flex justify-between">
                            <ParagraphSmall2 content={"PSP Operator:"} />
                            <Paragraph2 content={result?.pspOperator} />
                        </div>
                    </div>
                    <div className="my-8 mx-4 md:my-4">
                        <ButtonsPrimary name={"Confirm"} onClick={HandleConfirm} />
                    </div>
                </div>
            </div>
        </main>
    )
}

export default PropertyPreview