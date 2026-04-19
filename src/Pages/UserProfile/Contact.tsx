import React, { useEffect, useState } from "react";
import { IoArrowForward, IoCallOutline } from "react-icons/io5";
import { Link, NavLink } from "react-router-dom";
import { useFormik } from "formik";
import { toast } from "react-toastify";

import { getCustomerReportPaginatedByCustomer, sendMessage } from "../../api/customer/customer.service";
import { customerReportSchema } from "../../utils/validators/CustomerReportSchema";
import { IApartment } from "../../models/apartment.interface";
import { FiFacebook } from "react-icons/fi";
import { FaRegCircleUser, FaWhatsapp, FaXTwitter } from "react-icons/fa6";
import { MdOutlineMailOutline } from "react-icons/md";
import { useQuery, useQueryClient } from "@tanstack/react-query";
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
  const [selectedTicket, setSelectedTicket] = useState<any>(null);

  const queryClient = useQueryClient();

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
      toast.success(`Report Sent`);
      setViewform(false);
      queryClient.invalidateQueries({ queryKey: ['customerTickets', customer.customerId] });
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
      <div className="flex items-center flex-row flex-start border border-gray-300 rounded p-2 flex-wrap">
        <h2 className=" p-2">Contact Us  </h2>
        <NavLink to="https://facebook.com/wasteefy"  target="_blank" rel="noopener noreferrer" className="border border-gray-300 rounded-sm p-2 ml-2 flex items-center gap-1">
          <FiFacebook /> Facebook
        </NavLink>
        <NavLink to="https://x.com/wasteefy"  target="_blank" rel="noopener noreferrer"  className="border border-gray-300 rounded-sm p-2 ml-2 flex items-center gap-1">
          <FaXTwitter />Twitter
        </NavLink>
        <NavLink to="https://mail.google.com/"  target="_blank" rel="noopener noreferrer" className="border border-gray-300 rounded-sm p-2 ml-2 flex items-center gap-1">
          <MdOutlineMailOutline /> Email
        </NavLink>
        <NavLink to="https://wa.me/2348131415012"  target="_blank" rel="noopener noreferrer" className="border border-gray-300 rounded-sm p-2 ml-2 flex items-center gap-1">
          <FaWhatsapp /> Whatsapp
        </NavLink>
        <NavLink to="tel:+2348131415012"  target="_blank" rel="noopener noreferrer" className="border border-gray-300 rounded-sm p-2 ml-2 flex items-center gap-1">
          <IoCallOutline /> Call us
        </NavLink>
      </div>
      <div className="mt-6 flex flex-col lg:flex-row items-stretch border border-gray-200 shadow-sm rounded-2xl bg-white overflow-hidden">

        {/* Left Side: Messages */}
        <div className="w-full lg:w-1/2 p-6 flex flex-col flex-1 w-128 items-start border-b lg:border-b-0 lg:border-r border-gray-200">
          <h2 className="font-semibold text-lg text-gray-800">Messages</h2>
          <div className="flex flex-row gap-4 mt-4 w-full">
            <Button variant="white" onClick={() => { setViewform(true); setSelectedTicket(null); }} className="flex-1 border border-primary p-2.5 rounded-xl text-primary font-medium hover:bg-primary/5 transition-colors shadow-sm">Create Ticket</Button>
            <Button variant="white" onClick={() => { setViewform(true); setSelectedTicket(null); }}  className="flex-1 border border-primary p-2.5 rounded-xl text-primary font-medium hover:bg-primary/5 transition-colors shadow-sm">Report Issue</Button>
          </div>
          <div className="mt-6 w-full space-y-3 flex-1 overflow-y-auto">
            {tickets && tickets.data.length > 0 ? (
              tickets.data.map((ticket) => (
                <div key={ticket.id} onClick={() => { setSelectedTicket(ticket); setViewform(false); }} className={`p-4 rounded-xl flex flex-row items-center cursor-pointer transition-all duration-200 border gap-3 ${selectedTicket?.id === ticket.id ? 'bg-primary/5 border-primary/20 shadow-sm' : 'border-transparent hover:bg-gray-50 hover:border-gray-200'}`}>
                  <div className={`rounded-full p-2.5 ${selectedTicket?.id === ticket.id ? 'bg-primary/20 text-primary' : 'bg-gray-100 text-gray-500'}`}>
                    <FaRegCircleUser size={24} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center mb-0.5">
                      <h3 className={`font-semibold truncate ${selectedTicket?.id === ticket.id ? 'text-primary' : 'text-gray-800'}`}>{ticket.subject || `Ticket #${ticket.id}`}</h3>
                      <span className="text-xs text-gray-400 font-medium">#{ticket.id}</span>
                    </div>
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

        {/* Right Side: Form or Chat */}
        <div className="w-full lg:w-1/2 p-4 lg:p-6 flex flex-col h-[600px] lg:h-auto bg-gray-50/30">
          
          {viewForm ? (
            <div className="flex flex-col h-full bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-5">
                <h2 className="font-semibold text-lg text-gray-800">Create New Ticket</h2>
                <button type="button" onClick={() => setViewform(false)} className="text-sm text-gray-400 hover:text-gray-700 font-medium transition-colors cursor-pointer">Close</button>
              </div>

              <form onSubmit={formik.handleSubmit} className="flex flex-col flex-1 gap-5 overflow-hidden">
                <div className="flex flex-col gap-4 flex-1 overflow-y-auto pr-2 custom-scrollbar">
                  <div className="flex flex-col gap-1.5 w-full">
                    <label htmlFor="subject" className="text-sm font-medium text-gray-700">Subject</label>
                    <input type="text" name="subject" id="subject" value={formik.values.subject} onChange={formik.handleChange} className="w-full border border-gray-200 rounded-xl p-3 bg-gray-50 text-gray-700 outline-none focus:bg-white focus:ring-2 focus:ring-primary/50 shadow-sm transition-all" placeholder="Brief summary of your issue" />
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex flex-col gap-1.5 flex-1">
                      <label htmlFor="apartmentId" className="text-sm font-medium text-gray-700">Property</label>
                      <select name="apartmentId" id="apartmentId" value={formik.values.apartmentId} onChange={formik.handleChange} className="w-full border border-gray-200 rounded-xl p-3 bg-gray-50 text-gray-700 outline-none focus:bg-white focus:ring-2 focus:ring-primary/50 shadow-sm transition-all">
                        {apartments.map((apartment: IApartment) => (
                          <option key={apartment.id} value={apartment.id}>{apartment.propertyAddress} - {apartment.apartmentTypeName}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5 flex-1 w-full min-h-[150px]">
                    <label htmlFor="message" className="text-sm font-medium text-gray-700">Message</label>
                    <textarea name="message" id="message" value={formik.values.message} onChange={formik.handleChange} className="w-full flex-1 border border-gray-200 bg-gray-50 rounded-xl p-4 text-gray-700 outline-none focus:bg-white focus:ring-2 focus:ring-primary/50 shadow-sm transition-all resize-none" placeholder="Describe your issue in detail..."></textarea>
                  </div>
                </div>

                <div className="flex justify-end pt-4 border-t border-gray-100">
                  <Button type="submit" disabled={formik.isSubmitting || !formik.values.message || !formik.values.subject} className="px-6 py-2.5 bg-primary text-white rounded-xl shadow-sm hover:shadow transition-all font-medium flex items-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">
                    {formik.isSubmitting ? "Sending..." : "Submit Ticket"}
                    <BsFillSendFill className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </form>
            </div>
          ) : selectedTicket ? (
            <div className="flex flex-col h-full bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              {/* Chat Header */}
              <div className="flex items-center justify-between p-4 lg:p-5 border-b border-gray-100 bg-white">
                <div className="flex items-center gap-3 w-full overflow-hidden">
                  <div className="bg-primary/10 text-primary w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                    <FaRegCircleUser size={24} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-800 text-lg truncate pr-2">{selectedTicket.subject || `Ticket #${selectedTicket.id}`}</h3>
                    <p className="text-xs text-gray-500 font-medium">Ticket ID: #{selectedTicket.id}</p>
                  </div>
                  <div className="flex-shrink-0">
                    <TicketTypeBadge type={"Active"} />
                  </div>
                </div>
              </div>
              
              {/* Messages Area */}
              <div className="flex-1 p-4 lg:p-6 overflow-y-auto bg-[#F8F9FA] flex flex-col space-y-4">
                {/* Initial Ticket Message */}
                <div className="flex flex-col space-y-1 mb-2">
                  <span className="text-xs text-gray-400 font-medium ml-1 self-end">You</span>
                  <div className="self-end bg-primary text-white p-3.5 sm:p-4 rounded-2xl rounded-tr-sm max-w-[85%] break-words shadow-sm text-[15px] leading-relaxed">
                    {selectedTicket.message}
                  </div>
                </div>

                {/* Simulated Response or placeholder if we have responses in future */}
                {selectedTicket.comment && (
                  <div className="flex flex-col space-y-1 mt-4">
                    <span className="text-xs text-gray-400 font-medium ml-1 self-start">Support Team</span>
                    <div className="self-start bg-white text-gray-800 border border-gray-200 p-3.5 sm:p-4 rounded-2xl rounded-tl-sm max-w-[85%] break-words shadow-sm text-[15px] leading-relaxed">
                      {selectedTicket.comment}
                    </div>
                  </div>
                )}
              </div>
              
              {/* Chat Input (Disabled for now unless API supports reply) */}
             <div className="relative flex flex-grow flex-col w-full">
              <textarea name="message" id="message" value={formik.values.message} onChange={formik.handleChange} className="w-full h-24 border border-gray-200 bg-white rounded-2xl p-4 pr-16 text-gray-700 outline-none focus:ring-2 focus:ring-green/50 shadow-sm transition-shadow resize-none" placeholder="Write a message..."></textarea>
              <button type="submit" disabled={formik.isSubmitting} className="absolute bottom-4 right-4 rounded-full w-10 h-10 flex items-center justify-center bg-primary text-white shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:hover:translate-y-0 cursor-pointer">
                <BsFillSendFill className="w-4 h-4 ml-0.5" />
              </button>
              </div>
            </div>
          ) : (
             <div className="flex-1 p-4 lg:p-6 overflow-y-auto bg-[#F8F9FA] flex flex-col space-y-4">
                {/* Initial Ticket Message */}
                <div className="flex flex-col space-y-1 mb-2">
                  <span className="text-xs text-gray-400 font-medium ml-1 self-end">You</span>
                  <div className="self-end bg-primary text-white p-3.5 sm:p-4 rounded-2xl rounded-tr-sm max-w-[85%] break-words shadow-sm text-[15px] leading-relaxed">
                    {selectedTicket?.message}
                  </div>
                </div>
            </div>
          )}
        </div>
      </div>
    </div>



  );
};

export default ContactUs;
