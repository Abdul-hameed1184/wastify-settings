import React from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../Layouts/Layout";
import {
  Paragraph2Xl,
  ParagraphBlack,
  ParagraphLarge,
  ParagraphLargeHome,
  ParagraphLargeMarginItalic,
  ParagraphLargeWhite,
  ParagraphLargeWhite4xl,
  ParagraphSmallBlack,
} from "../Component/Paragraph";
import { ButtonsPrimary } from "../Component/Buttons";

const Home:React.FC = () => {
  const navigate = useNavigate();

  const HandleQuick = () => {
    navigate("/currentbills");
  };
  return (
    <Layout>
      <main className="w-full h-full pt-20 md:pt-10 font-Poppins">
   <div className="mt-4 w-full px-6 md:px-12 lg:px-20">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-screen items-center md:my-8">

    <div className="text-center md:text-left mx-2 my-2">
      <h2 className="flex flex-col font-semibold text-[3em] font-Poppins text-center"><span>Pay your waste bills easily with</span>
      <span className="font-bold text-green lg:text-[2.5em]">Wasteefy</span></h2>
    
    </div>
    <div className="mx-2 my-2">
      <ParagraphBlack
        content={"Enter your details and process your wastebill"}
      />
      <div className="w-full md:w-5/6">
        <div className="m-4">
          <input
            type="tel"
            name="phoneNumber"
            pattern="^\+?\d{7,14}$"
            maxLength={15}
            placeholder="Phone e.g. +234 701 234 5678"
            className="border px-2.5 py-3.5 pl-5 bg-grayInput shadow-sm rounded-lg block text-xl font-Poppins w-full h-14 text-black text-base mt-1 placeholder:text-grayRounded focus:outline-none focus:ring-2 focus:ring-purple"
          />
        </div>
        <div className="m-4">
          <input
            type="text"
            name="propertyCode"
            placeholder="Property code"
            className="border px-2.5 py-3.5 pl-5 bg-grayInput text-xl shadow-sm rounded-lg block font-Poppins w-full h-14 text-black text-base mt-1 placeholder:text-grayRounded focus:outline-none focus:ring-2 focus:ring-purple"
          />
        </div>
        <div className="m-4">
          <ButtonsPrimary name="Quick Pay" onClick={HandleQuick} />
        </div>
      </div>
    </div>



  </div>
</div>

        <div className="mt-16 flex justify-center text-center md:mt-32">
          <div className="">
            <ParagraphLarge content={"Who We Are"} />
            <div className="block md:flex md:justify-between md:flex-wrap p-4">
              <div className=" mx-6 my-14 md:mx-1 md:w-[30%]   shadow-lg rounded-lg p-4 m-4">
                <img
                  src="Images/easy.png"
                  className="w-20 h-20 m-auto "
                  alt="Wastebill"
                />
                {/* <ParagraphLarge content={"Easy Wastebill Payment"} /> */}
                <p className="text-3xl font-Poppins font-normal not-italic text-green leading-8 m-4">
                  Easy Wastebill Payment
                </p>
                <ParagraphBlack
                  content={
                    "we're on a mission to simplify the waste bill payment process. We understand the hassles and fraustrations that often comes with waste payment and managing waste bills."
                  }
                />
              </div>
              <div className=" mx-6 my-14  md:mx-1 md:w-[30%]   shadow-lg rounded-lg p-4 m-4">
                <img
                  src="Images/pay.png"
                  className="w-20 h-20 m-auto "
                  alt="Payment"
                />
                {/* <ParagraphLarge content={"Secure Payment"} /> */}
                <p className="text-3xl font-Poppins font-normal not-italic text-secureblue leading-8 m-4">
                  Secure Payment
                </p>
                <ParagraphBlack
                  content={
                    "Wasteefy prioritize the security of the payment, we use high encryption technology to safeguard your payment details and transaction."
                  }
                />
              </div>
              <div className=" mx-6 my-14 md:mx-1 md:w-[30%]   shadow-lg rounded-lg p-4 m-4">
                <img
                  src="Images/not.png"
                  className="w-20 h-20 m-auto"
                  alt="Notification"
                />
                {/* <ParagraphLarge content={"Recieve Timely Bill Notifications"} /> */}
                <p className="text-3xl font-Poppins font-normal not-italic text-support leading-8 m-4">
                  Recieve Timely Bill Notifications
                </p>
                <ParagraphBlack
                  content={
                    "Never miss a bill! Get instant bill code notification through sms alerts and emails for bill payments, so you're always ahead of yours waste managemet bills."
                  }
                />
              </div>
              <div className=" mx-6 my-14 md:mx-1 md:w-[30%]   shadow-lg rounded-lg p-4 m-4">
                <img
                  src="Images/sup.png"
                  className="w-20 h-20 m-auto"
                  alt="Support"
                />
                {/* <ParagraphLarge content={"24 Hours Customer Support "} /> */}
                <p className="text-3xl font-Poppins font-normal not-italic text-black leading-8 m-4">
                  24 Hours Customer Support{" "}
                </p>
                <ParagraphBlack
                  content={
                    "Our experience and friendly support team is ready to answer your questions, provide assistannce, and address any concerns you may have."
                  }
                />
              </div>
              <div className=" mx-6 my-14 md:mx-1 md:w-[30%]   shadow-lg rounded-lg p-4 m-4">
                <img
                  src="Images/cardpay.png"
                  className="w-20 h-20 m-auto"
                  alt="Payment"
                />
                {/* <ParagraphLarge content={"Track Your Payment"} /> */}
                <p className="text-3xl font-Poppins font-normal not-italic text-error leading-8 m-4">
                  Track Your Payment{" "}
                </p>
                <ParagraphBlack
                  content={
                    "Track your payment history effortlessly. Wasteefy keeps a  record of all your transactions for easy reference and peace of mind."
                  }
                />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-18 flex justify-center text-center md:mt-32">
          <div className="p-4 m-4">
            <ParagraphLarge content={"How It Works"} />
            <div className="block md:flex md:justify-between md:flex-wrap">
              <div className=" mx-3 my-8 md:mx-1 md:w-[30%]  shadow-lg rounded-lg p-4 m-4">
                <Paragraph2Xl content={"Operator Onboarded"} />
                <ParagraphBlack
                  content={
                    "Your waste management operator needs to be part of Wasteefy before you can make payments to them."
                  }
                />
              </div>
              <div className=" mx-3 my-8  md:mx-1 md:w-[30%]   shadow-lg rounded-lg p-4 m-4">
                <Paragraph2Xl content={"Create Account"} />
                <ParagraphBlack
                  content={
                    "Sign up with your email, phone number, address, local government, ward, your operator and receive your property code."
                  }
                />
              </div>
              <div className=" mx-3 my-8 md:mx-1 md:w-[30%] shadow-lg rounded-lg p-4 m-4">
                <Paragraph2Xl content={"Receive Bills"} />
                <ParagraphBlack
                  content={
                    "Once your account is set up, you'll receive your waste management bills through sms and Wasteefy platform. Review the details of your bill with your property code."
                  }
                />
              </div>
              <div className=" mx-3 my-8 md:mx-1 md:w-[30%]   shadow-lg rounded-lg p-4 m-4">
                <Paragraph2Xl content={"Make Payment "} />
                <ParagraphBlack
                  content={
                    "Pay securely using different modes of payment through wasteefy."
                  }
                />
              </div>
              <div className=" mx-3 my-8 md:mx-1 md:w-[30%]   shadow-lg rounded-lg p-4 m-4">
                <Paragraph2Xl content={"Stay Updated"} />
                <ParagraphBlack
                  content={
                    "Receive timely notifications for upcoming bills and payment reminders to stay informed and ensure you never miss a payment deadline."
                  }
                />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-10 bg-black text-center px-3 py-10 ">
          <ParagraphLargeWhite content={"Partners"} />

          {/* <img src='Images/budpay.png' className='w-6/12 h-20 md:w-1/5' alt='budpay' /> */}
          {/* <img src='Images/pep.png' className='w-6/12 h-20 md:w-1/5' alt='Pep Operator' /> */}
          <p className="text-center font-Poppins text-xl leading-5 text-failed">
            Psp Operators
          </p>
        </div>
        <div className="text-center py-5 md:hidden">
          {/* <img src='Images/download.png' className='h-full w-full' alt='budpay' /> */}
          <ParagraphLarge content={"Download The Wasteefy app"} />
          <ParagraphSmallBlack content={"waste payment made easy"} />
          <div className=" flex justify-center ">
            <img
              src="Images/mobilephone.png"
              alt="mobilephone"
              className="w-full h-full"
            />
          </div>

          <div className="flex justify-between px-6">
            <div className="">
              <img src="Images/googlesoon.png" alt="google soon" className="" />
            </div>
            <div className="">
              <img src="Images/applesoon.png" alt="google soon" className="" />
            </div>
          </div>
        </div>
        <div className="hidden md:flex px-20 py-10 items-center">
          <div className="">
            <img
              src="Images/mobilephone.png"
              alt="mobilephone"
              className="w-full h-full"
            />
          </div>

          <div className=" text-center">
            <ParagraphLargeWhite4xl content={"Download The Wasteefy App"} />
            <ParagraphLargeMarginItalic content={"waste payment made easy"} />
            <div className="flex gap-5 px-6 mt-10 justify-center">
              <div className="">
                <img
                  src="Images/googlesoon.png"
                  alt="google soon"
                  className=""
                />
              </div>
              <div className="">
                <img
                  src="Images/applesoon.png"
                  alt="google soon"
                  className=""
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default Home;
