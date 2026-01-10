import React from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../Layouts/Layout";
import * as Yup from "yup";
import Input from "../Component/InputField";
import { Button } from "../Component/Button";
import { useFormik } from "formik";
import Card, { CardTextIcon } from "../Component/Card/Card";
import { LuCreditCard } from "react-icons/lu";
import { RiSecurePaymentLine } from "react-icons/ri";
import { IoMdKeypad, IoMdNotificationsOutline } from "react-icons/io";
import { MdOutlineAccessTime } from "react-icons/md";
import { GrNotes } from "react-icons/gr";
import { FaCaretDown } from "react-icons/fa";
import { BsPhone } from "react-icons/bs";

const Home: React.FC = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      phoneNumber: "",
      propertyCode: "",
    },
    validationSchema: Yup.object({
      phoneNumber: Yup.string()
        .matches(/^\+?\d{7,14}$/, "Invalid phone number")
        .required("Phone number is required"),
      propertyCode: Yup.string().required("Property code is required"),
    }),
    onSubmit: (values) => {
      navigate("/currentbills", { state: { data: values } });
    },
  });
  return (
    <Layout>
      <main className="w-full">
        <div className="w-full px-6 md:px-12 lg:px-20">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex flex-col max-w-2xl text-center md:text-left mx-2 mt-4 md:mt-0">
              <h2 className="flex flex-col font-extrabold text-[3.5em] p-0 m-0 tracking-tight leading loose">
                Pay & Manage Waste Bills Easily With
              </h2>

              <h2>
                <span className="font-extrabold text-[1.5em] p-0 m-0 text-lg tracking-tight">
                  <span className="text-green font-extrabold text-[1.5em] p-0 m-0 text-lg tracking-tight">
                    Was
                  </span>
                  <span className="text-gray font-extrabold text-[1.5em] p-0 m-0 text-lg tracking-tight">
                    teefy
                  </span>
                </span>
              </h2>
              <p className="font-normal text-[1.25em] text-gray">
                The modern way to track, pay, and manage waste bills for your
                home or business. Stay compliant, save time, and go paperless
                with our secure digital platform.
              </p>
            </div>
            <Card className="max-w-lg rounded-xl shadow-lg border p-4">
              <form onSubmit={formik.handleSubmit}>
                <div className="px-4">
                  <h3 className="font-bold text-[1.5em] p-0 m-0 pt-2 text-lg tracking-tight">
                    QuickPay
                  </h3>
                  <p className="font-normal text-[0.875em] pt-2 text-gray">
                    QuickPay lets you pay your waste bill instantly using your
                    phone number and property code, no login required.
                  </p>
                  <div className="w-full">
                    <div className="mt-4">
                      <Input
                      icon={<BsPhone />}
                      iconPosition="left"
                        type="tel"
                        name="phoneNumber"
                        pattern="^\+?\d{7,14}$"
                        maxLength={15}
                        onChange={formik.handleChange}
                        value={formik.values.phoneNumber}
                        placeholder={"  Enter your phone number"}
                        className="border px-2.5 py-3.5 pl-5 shadow-sm rounded-lg block text-xl  w-full h-14 text-black text-base mt-1 placeholder:text-grayRounded focus:outline-none focus:ring-2 focus:ring-purple"
                      />
                    </div>
                    <div className="mt-4">
                      <Input
                      icon={<IoMdKeypad />}
                      iconPosition="left"
                        type="text"
                        name="propertyCode"
                        onChange={formik.handleChange}
                        value={formik.values.propertyCode}
                        placeholder={"  Enter Property code"}
                        className="border px-2.5 py-3.5 pl-5 shadow-sm rounded-lg block text-xl  w-full h-14 text-black text-base mt-1 placeholder:text-grayRounded focus:outline-none focus:ring-2 focus:ring-purple"
                      />
                    </div>
                    <div className="w-full mt-4">
                      <Button
                        type="submit"
                        loading={formik.isSubmitting}
                        className="w-full"
                      >
                       Quick Pay &#8594;                 </Button>
                    </div>
                  </div>
                </div>
              </form>
            </Card>
          </div>
        </div>

        <div className="mt-16 flex justify-center text-center md:mt-32">
          <div className="w-[960px] mx-auto">
            <h3 className="font-semibold text-[3em] tracking-[-0.02em] p-0 m-0 pt-2 text-lg leading-[58px] text-center">
              Who We Are
            </h3>
            <p className="font-normal text-gray w-full text-center p-4 m-4">
              Wasteefy helps residents pay waste bills easily and helps PSP
              operators (waste collectors) efficiently manage properties,
              customers, payments, and daily operations in one place.
            </p>
            <div className="flex flex-col md:flex-row gap-4 w-full p-0 justify-center md:justify-between">
              <CardTextIcon
                className="flex-1 max-w-sm"
                icon={<LuCreditCard />}
                title="Easy Wastebill Payment"
                description="we're on a mission to simplify the waste bill payment process. We understand the hassles and fraustrations that often comes with waste payment and managing waste bills."
              />
              <CardTextIcon
                className="flex-1 max-w-sm"
                icon={<RiSecurePaymentLine />}
                title="Secure Payment"
                description="Wasteefy prioritize the security of the payment, we use high encryption technology to safeguard your payment details and transaction."
              />
              <CardTextIcon
                className="flex-1 max-w-sm"
                icon={<IoMdNotificationsOutline />}
                title="Recieve Timely Bill Notifications"
                description="Never miss a bill! Get instant bill code notification through sms alerts and emails for bill payments, so you're always ahead of yours waste managemet bills."
              />
            </div>
            <div className="flex flex-col md:flex-row gap-4 w-full p-0 justify-center md:justify-between mt-4">
              <CardTextIcon
                className="flex-1 max-w-lg"
                icon={<MdOutlineAccessTime />}
                title="24 Hours Customer Support"
                description="Our experience and friendly support team is ready to answer your questions, provide assistannce, and address any concerns you may have."
              />
              <CardTextIcon
                className="flex-1 max-w-lg`"
                icon={<GrNotes />}
                title="Track Your Payment"
                description="Track your payment history effortlessly. Wasteefy keeps a  record of all your transactions for easy reference and peace of mind."
              />
            </div>
          </div>
        </div>

    <div className="flex flex-col justify-center text-center md:my-24">
          <div className="mx-auto">
            <p className="text-green">Things you should know</p>
            <h3 className="font-semibold text-[3em] tracking-[-0.02em] p-0 m-0 pt-2 text-lg leading-[58px] text-center">
              How It Works
            </h3>
            <p className="font-normal text-gray w-full text-center p-4 m-4 max-w-2xl w-full">
              Managing your waste bills has never been easier. Follow these
              simple steps to take control of your payments today.
            </p>
          </div>
          <div className="flex flex-col md:flex-row  gap-4 w-full p-4 justify-center md:justify-between">
            <div className="bg-green flex-1 rounded-2xl m-4 ">
              <h3 className="font-bold text-xl p-2">Customers</h3>
              <div className="bg-white rounded-2xl border border-green p-4">
                <div className="flex flex-row items-center justify-between border mt-2 px-4 py-4 border-gray-200 rounded-2xl">
                  <div className="flex items-center ">
                    <span className="text-center px-4 py-2 bg-green/10 rounded-md mr-4">
                      1
                    </span>
                    <span>
                      <p className="text-xl">Get Onboarded</p>
                    </span>
                  </div>
                  <span>
                    <FaCaretDown className="text-lg" />
                  </span>
                </div>

                <div className="flex flex-row items-center justify-between border border-gray-200 mt-2 px-4 py-4 rounded-2xl">
                  <div className="flex items-center ">
                    <span className="text-center px-4 py-2 bg-green/10 rounded-md mr-4">
                      2
                    </span>
                    <span>
                      <p className="text-xl">
                        {"Login or Quickpay (No login required)"}
                      </p>
                    </span>
                  </div>
                  <span>
                    <FaCaretDown className="text-lg" />
                  </span>
                </div>
                <div className="flex flex-row items-center justify-between mt-2 border px-4 py-4 border-gray-200 rounded-2xl">
                  <div className="flex items-center ">
                    <span className="text-center px-4 py-2 bg-green/10 rounded-md mr-4">
                      3
                    </span>
                    <span>
                      <p className="text-xl">Pay & Stay Updated</p>
                    </span>
                  </div>
                  <span>
                    <FaCaretDown className="text-lg" />
                  </span>
                </div>
                        <div className="flex flex-row items-center justify-between  px-4 py-[2.55em]">
                  <div className="flex items-center ">
                    
                  </div>
             
                </div>
              </div>
            </div>
                        <div className="bg-green flex-1 rounded-2xl m-4 ">
              <h3 className="font-bold text-xl p-2">Operators</h3>
              <div className="bg-white  rounded-2xl border border-green p-4">
                <div className="flex flex-row items-center justify-between border mt-2 px-4 py-4 border-gray-200 rounded-2xl">
                  <div className="flex items-center ">
                    <span className="text-center px-4 py-2 bg-green/10 rounded-md mr-4">
                      1
                    </span>
                    <span>
                      <p className="text-xl">Create an Operator Account</p>
                    </span>
                  </div>
                  <span>
                    <FaCaretDown className="text-lg" />
                  </span>
                </div>

                <div className="flex flex-row items-center justify-between border border-gray-200 mt-2 px-4 py-4 rounded-2xl">
                  <div className="flex items-center ">
                    <span className="text-center px-4 py-2 bg-green/10 rounded-md mr-4">
                      2
                    </span>
                    <span>
                      <p className="text-xl">
                        {"Register Properties & Customers"}
                      </p>
                    </span>
                  </div>
                  <span>
                    <FaCaretDown className="text-lg" />
                  </span>
                </div>
                <div className="flex flex-row items-center justify-between mt-2 border px-4 py-4 border-gray-200 rounded-2xl">
                  <div className="flex items-center ">
                    <span className="text-center px-4 py-2 bg-green/10 rounded-md mr-4">
                      3
                    </span>
                    <span>
                      <p className="text-xl">Generate & Send Bills</p>
                    </span>
                  </div>
                  <span>
                    <FaCaretDown className="text-lg" />
                  </span>
                </div>
                                <div className="flex flex-row items-center justify-between mt-2 border px-4 py-4 border-gray-200 rounded-2xl">
                  <div className="flex items-center ">
                    <span className="text-center px-4 py-2 bg-green/10 rounded-md mr-4">
                      4
                    </span>
                    <span>
                      <p className="text-xl">Track Payments</p>
                    </span>
                  </div>
                  <span>
                    <FaCaretDown className="text-lg" />
                  </span>
                </div>
              </div>
            </div>
          </div>
      
        </div>

      </main>
    </Layout>
  );
};

export default Home;
