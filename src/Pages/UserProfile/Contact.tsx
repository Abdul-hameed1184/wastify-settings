import React, { useEffect, useState } from "react";
import { IoArrowForward, IoCallOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { toast } from "react-toastify";

import { getCustomerReportPaginatedByCustomer, sendMessage } from "../../api/customer/customer.service";
import { customerReportSchema } from "../../utils/validators/CustomerReportSchema";
import { IApartment } from "../../models/apartment.interface";
import { FiFacebook } from "react-icons/fi";
import { FaRegCircleUser, FaWhatsapp, FaXTwitter } from "react-icons/fa6";
import { MdOutlineMailOutline } from "react-icons/md";
import { useQuery } from "@tanstack/react-query";
import { TicketTypeBadge } from "../../utils/TicketTypeBadge";
import { Button } from "../../Component/Button";
import { BsFillSendFill } from "react-icons/bs";


// 🔹 Combined Page
const ContactUs: React.FC = () => {
  const customer = JSON.parse(sessionStorage.getItem("AUTH_USERDETAILS") || "{}");
  const apartments: IApartment[] = JSON.parse(sessionStorage.getItem("CUSTOMER_APARTMENT") || "[]") || [];

  const [loading, setLoading] = useState(false);
  const [viewForm, setViewform] = useState(false);
  const [apartmentId, setApartmentId] = useState<number>(apartments[0]?.id || 0);
  const [sentMessages, setSentMessages] = useState<string[]>([]);

  useEffect(() => {
    (async () => {
      const data = await getCustomerReportPaginatedByCustomer(customer.customerId);
      console.log("Reports: ", data.data.data);
    })();
  }, [customer.customerId]);

  const handleSendMessage = async (message: any) => {
    try {
      const res = await sendMessage(message);
      console.log(res);
      setSentMessages(prev => [...prev, message.message]);
      toast.success(`Report Sent`);
      setViewform(false);
    } catch (error) {
      console.log(error);
      toast.error("Error sending report");
    }
  };

  const formik = useFormik({
    initialValues: {
      customerId: customer.customerId,
      apartmentId: apartmentId,
      subject: "",
      message: "",
    },
    validationSchema: customerReportSchema,
    onSubmit: async (values, { resetForm }) => {
      setLoading(true);
      await handleSendMessage(values);
      setLoading(false);
      resetForm();
    },
  });

  const { data: tickets } = useQuery({
    queryKey: ['customerTickets', customer.customerId],
    queryFn: async () => {
      const data = await getCustomerReportPaginatedByCustomer(customer.customerId);
      console.log("Tickets data:", data.data.data);
      return data.data.data;
    }
  });

  return (
    <div className="min-h-screen p-4">
      <div className="flex items-center flex-row flex-start border border-gray-300 rounded p-2">
        <h2 className=" p-2">Contact Us  </h2>
        <Link to="/profile" className="border border-gray-300 rounded-sm p-2 ml-2 flex items-center gap-1">
          <FiFacebook /> Facebook
        </Link>
        <Link to="/profile" className="border border-gray-300 rounded-sm p-2 ml-2 flex items-center gap-1">
          <FaXTwitter />Twitter
        </Link>
        <Link to="/profile" className="border border-gray-300 rounded-sm p-2 ml-2 flex items-center gap-1">
          <MdOutlineMailOutline /> Email
        </Link>
        <Link to="/profile" className="border border-gray-300 rounded-sm p-2 ml-2 flex items-center gap-1">
          <FaWhatsapp /> Whatsapp
        </Link>
        <Link to="/profile" className="border border-gray-300 rounded-sm p-2 ml-2 flex items-center gap-1">
          <IoCallOutline /> Call us
        </Link>
      </div>
      <div className="mt-6 flex flex-col lg:flex-row items-stretch border border-gray-200 shadow-sm rounded-2xl bg-white overflow-hidden">

        {/* Left Side: Messages */}
        <div className="w-full lg:w-1/2 p-6 flex flex-col w-128 items-start border-b lg:border-b-0 lg:border-r border-gray-200">
          <h2 className="font-semibold text-lg text-gray-800">Messages</h2>
          <div className="flex flex-row gap-4 mt-4 w-full">
            <Button variant="white" className="flex-1 border border-primary p-2.5 rounded-xl text-primary font-medium hover:bg-primary/5 transition-colors shadow-sm">Create Ticket</Button>
            <Button variant="white" className="flex-1 border border-primary p-2.5 rounded-xl text-primary font-medium hover:bg-primary/5 transition-colors shadow-sm">Report Issue</Button>
          </div>
          <div className="mt-6 w-full space-y-3 flex-1 overflow-y-auto">
            {tickets && tickets.data.length > 0 ? (
              tickets.data.map((ticket) => (
                <div key={ticket.id} className="p-4 rounded-xl flex flex-row items-center hover:bg-primary/5 border border-transparent hover:border-primary/10 gap-3 cursor-pointer transition-all duration-200">
                  <div className="bg-primary/10 text-primary rounded-full p-2.5">
                    <FaRegCircleUser size={24} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-800 truncate">{ticket.subject}</h3>
                    <div className="flex flex-row justify-between items-center w-full mt-1">
                      <p className="text-gray-500 text-sm truncate mr-2">{ticket.message}</p>
                      <TicketTypeBadge type={"Ticket"} />
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center h-40 text-gray-400">
                <MdOutlineMailOutline className="w-10 h-10 mb-2 opacity-50" />
                <p className="text-sm">No messages found.</p>
              </div>
            )}
          </div>
          {tickets && tickets.data.length > 0 && (
            <div className="flex justify-center items-center gap-6 mt-6 w-full pt-4 border-t border-gray-100">
              <button className="p-2 rounded-full hover:bg-gray-100 text-gray-500 transition-colors">
                <IoArrowForward className="rotate-180 w-5 h-5" />
              </button>
              <span className="text-sm font-medium text-gray-600">
                Page {tickets?.current_page} of {tickets?.last_page}
              </span>
              <button className="p-2 rounded-full hover:bg-gray-100 text-gray-500 transition-colors">
                <IoArrowForward className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>

        {/* Right Side: Form */}
        <div className="w-full lg:w-1/2 p-6 flex flex-col bg-gray-50/30">
          <h2 className="font-semibold text-lg text-gray-800 border-b border-gray-200 pb-3 mb-5">Customer Status</h2>
          <form onSubmit={formik.handleSubmit} className="flex flex-col flex-1 gap-5">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex flex-col gap-1.5 flex-1">
                <label htmlFor="apartmentId" className="text-sm font-medium text-gray-700">Apartment</label>
                <select name="apartmentId" id="apartmentId" value={formik.values.apartmentId} onChange={formik.handleChange} className="w-full border border-gray-200 rounded-xl p-3 bg-white text-gray-700 outline-none focus:ring-2 focus:ring-green/50 shadow-sm transition-shadow">
                  {apartments.map((apartment: IApartment) => (
                    <option key={apartment.id} value={apartment.id}>{apartment.propertyAddress} - {apartment.apartmentTypeName}</option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col gap-1.5 flex-1">
                <label htmlFor="status" className="text-sm font-medium text-gray-700">Status</label>
                <select disabled name="status" id="status" value={"active"} className="w-full border border-gray-200 rounded-xl p-3 bg-white text-gray-700 outline-none focus:ring-2 focus:ring-green/50 shadow-sm transition-shadow">
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>
            <div className="flex-1 min-h-[200px] flex flex-col bg-white border border-gray-200 rounded-2xl p-4 overflow-y-auto w-full">
              {sentMessages.length === 0 ? (
                <div className="text-gray-400 text-sm m-auto">No messages sent yet.</div>
              ) : (
                <div className="flex flex-col space-y-3 w-full">
                  {sentMessages.map((msg, idx) => (
                    <div key={idx} className="self-end bg-primary text-white p-3 rounded-2xl rounded-tr-sm max-w-[85%] break-words shadow-sm text-sm">
                      {msg}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="relative flex flex-col w-full">
              <textarea name="message" id="message" value={formik.values.message} onChange={formik.handleChange} className="w-full h-24 border border-gray-200 bg-white rounded-2xl p-4 pr-16 text-gray-700 outline-none focus:ring-2 focus:ring-green/50 shadow-sm transition-shadow resize-none" placeholder="Write a message..."></textarea>
              <button type="submit" disabled={formik.isSubmitting} className="absolute bottom-4 right-4 rounded-full w-10 h-10 flex items-center justify-center bg-primary text-white shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:hover:translate-y-0 cursor-pointer">
                <BsFillSendFill className="w-4 h-4 ml-0.5" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>



  );
};

export default ContactUs;
