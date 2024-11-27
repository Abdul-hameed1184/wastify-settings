import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Paragraph2, Paragraph2Xl, ParagraphLargeWhite, ParagraphSmall, ParagraphXl } from '../../Component/Paragraph'
import { ButtonsPrimary } from '../../Component/Buttons'

const SignUpComplete = () => {
    const navigate = useNavigate();

    const HandleGetStarted = () => {
        navigate("/login")
    };

    return (
        <main className="mt-10 mx-2 md:m-0 md:bg-green md:h-screen md:bg-bgdesktop-pattern md:bg-cover">
            <div className="md:mt-0 md:py-5 md:px-10 md:flex md:justify-between">
                <div className="hidden md:block md:p-10">
                    <ParagraphLargeWhite content={"Sign Up"} />
                </div>

                <div className="md:mt-1 md:w-2/6 md:bg-white md:border-transparent md:p-5 md:rounded-lg">
                    <div className="mt-4 mx-2 md:text-center">
                        <Paragraph2Xl content={"Sign Up Complete!"} />
                        <Paragraph2 content={"Congratulations your registration is complete start paying your waste bill seamlessly with Wasteefy"} />
                    </div>
                    <div className="flex flex-col text-center mt-28 md:mt-5">
                        <div className="mx-14 flex justify-center h-40 md:mx-2 md:h-40">
                            <img src="Images/completed.gif" alt="completed" />
                        </div>
                        <ParagraphXl content={"Seemless Payments, Cleaner Tomorrow"} />
                    </div>
                    <div className="my-6 mx-4">
                        <ButtonsPrimary name={"Get Started"} onClick={HandleGetStarted} />
                    </div>
                </div>
            </div>
        </main>
    )
}

export default SignUpComplete