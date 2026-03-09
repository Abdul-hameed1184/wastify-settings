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
import { BsPhone } from "react-icons/bs";
import { Accordion } from "../Component/Accordion";



const Home: React.FC = () => {
  const navigate = useNavigate();
  const [openCustomer, setOpenCustomer] = React.useState<number | null>(null);
  const [openOperator, setOpenOperator] = React.useState<number | null>(null);

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
        <div className="w-full px-6 md:px-12 lg:px-20 h-100">
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
                  <span className="text-gray-500 font-extrabold text-[1.5em] p-0 m-0 text-lg tracking-tight">
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
            <Card className="max-w-lg rounded-xl shadow-lg border p-4 ">
              <form onSubmit={formik.handleSubmit}>
                <div className="px-4">
                  <h3 className="font-bold text-[1.5em] p-0 m-0 pt-2 text-lg tracking-tight">
                    QuickPay
                  </h3>
                  <p className="font-normal text-[0.875em] pt-2 text-gray-500">
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

        <div className="mt-32  flex justify-center text-center" id="whoWeAre">
          <div className="w-[960px] mx-auto">
                        <p className="text-green"><span className="bg-green/20 rounded-lg py-2 px-4 ">Features</span></p>
            <h3 className="font-semibold text-[3em] tracking-[-0.02em] p-0 m-0 pt-2 text-lg leading-[58px] text-center">
              Who We Are
            </h3>
            <p className="font-normal text-gray w-full text-center p-4 m-4">
              Wasteefy helps residents pay waste bills easily and helps PSP
              operators (waste collectors) efficiently manage properties,
              customers, payments, and daily operations in one place.
            </p>
            <div className="flex flex-col md:flex-row gap-4 w-full p-0 justify-center md:justify-between space-y-4 space-x-4">
              <CardTextIcon
                className="flex-1 max-w-sm"
                icon={<LuCreditCard />}
                title="Easy Wastebill Payment"
                description="We're on a mission to simplify the waste bill payment process. We understand the hassles and fraustrations that often comes with waste payment and managing waste bills."
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

    <div className="flex flex-col justify-center text-center md:my-24" id="howItWorks">
          <div className="mx-auto">
            <p className="text-green"><span className="bg-green/20 rounded-lg py-2 px-4 ">Things you should know</span></p>
            <h3 className="font-semibold text-[3em] tracking-[-0.02em] p-0 m-0 pt-2 text-lg leading-[58px] text-center">
              How It Works
            </h3>
            <p className="font-normal text-gray w-full text-center p-4 m-4 max-w-2xl w-full">
              Managing your waste bills has never been easier. Follow these
              simple steps to take control of your payments today.
            </p>
          </div>
          <div className="flex flex-col md:flex-row gap-4 w-full p-4 items-stretch">
            <div className="bg-green flex-1 rounded-2xl m-4 flex flex-col">
              <h3 className="font-bold text-xl p-2">Customers</h3>
              <div className="bg-white rounded-2xl border border-green p-4 flex-1">
                                <Accordion 
                  itemNumber={"1"}
                  titleText="Get Onboarded"
                  infolist={[
                    "Your psp operator registers your property on Wasteefy.",
                    "You’ll receive bills linked to your phone number and property code."
                  ]} 
                  isOpen={openCustomer == 1} 
                  onToggle={() => setOpenCustomer(openCustomer === 1 ? null : 1)} />
                                                  <Accordion 
                  itemNumber={"2"}
                  titleText={"Login or Quickpay (No login required)"}
                  infolist={[
                    "Enter your registered phone number and last name as password to log in or use QuickPay."
                  ]} 
                      isOpen={openCustomer == 2} 
                  onToggle={() => setOpenCustomer(openCustomer === 2 ? null : 2)}
                  />
                                                  <Accordion 
                  itemNumber={"3"}
                  titleText="Pay & Stay Updated"
                  infolist={[
                    "Pay your waste bill securely and receive instant confirmation.",
                    "Get SMS reminders so you never miss a payment."
                  ]}
                      isOpen={openCustomer == 3} 
                  onToggle={() => setOpenCustomer(openCustomer === 3 ? null : 3)}
                  />

              </div>
            </div>
                        <div className="bg-green flex-1 rounded-2xl m-4 flex flex-col">
              <h3 className="font-bold text-xl p-2">Operators</h3>
              <div className="bg-white rounded-2xl border border-green p-4 flex-1">
                <Accordion 
                  itemNumber={"1"}
                  titleText="Create an Operator Account"
                  infolist={[
                    "Register your business on Wasteefy to access the operator dashboard.",
                    "This account is used to manage properties, customers, and billings."
                  ]}
                      isOpen={openOperator == 1} 
                  onToggle={() => setOpenOperator(openOperator === 1 ? null : 1)}
                  />

                                  <Accordion 
                  itemNumber={"2"}
                  titleText={"Register Properties & Customers"}
                  infolist={[
                    "Add properties (estates or buildings) and register households under each property using their phone numbers.",
                    "Each property is assigned a unique property code for billing and payments."
                  ]}
                    isOpen={openOperator == 2} 
                  onToggle={() => setOpenOperator(openOperator === 2 ? null : 2)}
                  />

                   <Accordion 
                  itemNumber={"3"}
                  titleText={"Generate & Send Bills"}
                  infolist={[
                    "Create waste bills and send them to customers via the Wasteefy platform."
                  ]}
                    isOpen={openOperator == 3} 
                  onToggle={() => setOpenOperator(openOperator === 3 ? null : 3)}
                  />

              <Accordion 
                  itemNumber={"4"}
                  titleText={"Track Payments"}
                  infolist={[
                    "Monitor payments in real time and access transaction history per property or customer."
                  ]} 
                  
                    isOpen={openOperator ==4} 
                  onToggle={() => setOpenOperator(openOperator === 4 ? null : 4)}
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
