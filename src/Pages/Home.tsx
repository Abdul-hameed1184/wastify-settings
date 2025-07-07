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
import {
  InputFieldGrayHome,
} from "../Component/InputField";
import { ButtonsPrimary } from "../Component/Buttons";

const Home:React.FC = () => {
  const navigate = useNavigate();

  const HandleQuick = () => {
    navigate("/currentbills");
  };
  return (
    <Layout>
      <main className="w-full h-full pt-20 md:pt-10 font-Poppins">
        <div className="mt-20 md:flex md:ml-8 md:my-32">
          <div className="">
            <ParagraphLargeHome
              content={"Pay Your Waste bills Easily With "}
              name={"Wasteefy"}
            />
            <ParagraphSmallBlack
              content={"Enter your details and process your wastebill"}
            />
            <div className="w-full md:w-4/6">
              <div className="m-4">

                 <input type={"tel"} name={"phoneNumber"} pattern="^\+?\d{7,14}$"
                 maxLength={15}
  placeholder="Phone e.g. +234 701 234 5678"
  className={`border px-2.5 py-3.5 pl-5  bg-grayInput shadow-sm rounded-lg block font-Poppins w-full h-14 text-black text-base mt-1 ring-grayInput border-transparent placeholder:text-grayRounded focus:outline-none focus:ring-2 focus:border-purple focus:border-transparent focus:ring-grayInput`} />

              </div>
              <div className="m-4">
                <InputFieldGrayHome
                  type={"text"}
                  placeholder={"Property code"}
                />
              </div>
              <div className="m-4">
                <ButtonsPrimary name={"Quick Pay"} onClick={HandleQuick} />
              </div>
            </div>
          </div>
          <div className="hidden md:block md:m-auto">
            {/* <img src="Images/oosls.jpg" alt="image" srcSet="" /> */}
          </div>
        </div>
        <div className="mt-16 flex justify-center text-center md:mt-32">
          <div className="">
            <ParagraphLarge content={"Who We Are"} />
            <div className="block md:flex md:justify-between md:flex-wrap">
              <div className=" mx-6 my-14 md:mx-1 md:w-[30%]">
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
              <div className=" mx-6 my-14  md:mx-1 md:w-[30%]">
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
              <div className=" mx-6 my-14 md:mx-1 md:w-[30%]">
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
              <div className=" mx-6 my-14 md:mx-1 md:w-[30%]">
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
              <div className=" mx-6 my-14 md:mx-1 md:w-[30%]">
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
          <div className="">
            <ParagraphLarge content={"How It Works"} />
            <div className="block md:flex md:justify-between md:flex-wrap">
              <div className=" mx-3 my-8 md:mx-1 md:w-[30%]">
                <Paragraph2Xl content={"Operator Onboarded"} />
                <ParagraphBlack
                  content={
                    "Your waste management operator needs to be part of Wasteefy before you can make payments to them."
                  }
                />
              </div>
              <div className=" mx-3 my-8  md:mx-1 md:w-[30%]">
                <Paragraph2Xl content={"Create Account"} />
                <ParagraphBlack
                  content={
                    "Sign up with your email, phone number, address, local government, ward, your operator and receive your property code."
                  }
                />
              </div>
              <div className=" mx-3 my-8 md:mx-1 md:w-[30%]">
                <Paragraph2Xl content={"Receive Bills"} />
                <ParagraphBlack
                  content={
                    "Once your account is set up, you'll receive your waste management bills through sms and Wasteefy platform. Review the details of your bill with your property code."
                  }
                />
              </div>
              <div className=" mx-3 my-8 md:mx-1 md:w-[30%]">
                <Paragraph2Xl content={"Make Payment "} />
                <ParagraphBlack
                  content={
                    "Pay securely using different modes of payment through wasteefy."
                  }
                />
              </div>
              <div className=" mx-3 my-8 md:mx-1 md:w-[30%]">
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
