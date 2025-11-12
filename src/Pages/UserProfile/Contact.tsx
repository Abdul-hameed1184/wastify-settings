import React, { useEffect, useState } from "react";
import { IoChevronBack, IoLogoFacebook } from "react-icons/io5";
import { IoIosMail, IoLogoWhatsapp } from "react-icons/io";
import { Link } from "react-router-dom";
import { RiCustomerServiceFill, RiTwitterXLine } from "react-icons/ri";
import { useFormik } from "formik";
import { toast } from "react-toastify";

import { getCustomerReportPaginatedByCustomer, sendMessage } from "../../api/customer/customer.service";
import Input  from "../../Component/InputField";
import { customerReportSchema } from "../../utils/validators/CustomerReportSchema";
import CustomerReports from "./CustomerReports";
import { IApartment } from "../../models/apartment.interface";
import { ButtonsPrimaryBlack, ButtonsWhite } from "../../Component/Buttons";

// 🔹 Combined Page
const ContactUs: React.FC = () => {
  const customer = JSON.parse(sessionStorage.getItem("AUTH_USERDETAILS") || "{}");
  const apartments: IApartment[] = JSON.parse(sessionStorage.getItem("CUSTOMER_APARTMENT") || "[]") || [];

  const [loading, setLoading] = useState(false);
  const [viewForm, setViewform] = useState(false);
  const [apartmentId, setApartmentId] = useState<number>(apartments[0]?.id || 0);

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

  return (
    <main className="bg-green min-h-screen">
      {/* Back Button */}
      <div className="flex justify-start pt-6 pl-4">
        <Link to="/profile">
          <IoChevronBack size={28} className="bg-gray text-white rounded-2xl p-1" />
        </Link>
      </div>

      {/* Page Header */}
      <h3 className="text-3xl font-bold text-white text-center mb-6">Contact Us</h3>

      <div className="flex flex-col lg:flex-row gap-6 px-6">
        {/* 🔹 Left: Contact Options */}
        <div className="lg:w-1/4 bg-white rounded-lg shadow-md p-6 space-y-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>

          <div className="space-y-4">
            <Link to="https://www.facebook.com/yourPage" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-3 hover:text-green-600">
              <IoLogoFacebook className="text-2xl text-green" />
              <span className="font-medium">Facebook</span>
            </Link>

            <Link to="https://twitter.com/yourHandle" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-3 hover:text-green-600">
              <RiTwitterXLine className="text-2xl text-green" />
              <span className="font-medium">Twitter</span>
            </Link>

            <Link to="mailto:support@example.com" className="flex items-center space-x-3 hover:text-green-600">
              <IoIosMail className="text-2xl text-green" />
              <span className="font-medium">Email</span>
            </Link>

            <Link to="https://wa.me/2348012345678" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-3 hover:text-green-600">
              <IoLogoWhatsapp className="text-2xl text-green" />
              <span className="font-medium">WhatsApp</span>
            </Link>

            <Link to="tel:+2348012345678" className="flex items-center space-x-3 hover:text-green-600">
              <RiCustomerServiceFill className="text-2xl text-green" />
              <span className="font-medium">Call Us</span>
            </Link>
          </div>
        </div>

        {/* 🔹 Right: Reports / Form */}
        <div className="lg:w-3/4 bg-white rounded-lg shadow-md p-6">
          {viewForm ? (
            <form onSubmit={formik.handleSubmit} className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">Send Us a Message</h2>

              {/* Subject */}
              <div>
                <label htmlFor="subject" className="block text-gray-700 mb-2">
                  Subject
                </label>
                <Input
                  type="text"
                  name="subject"
                  value={formik.values.subject}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2"
                  placeholder="Enter your subject"
                />
                {formik.errors.subject && <p className="text-red-500 text-sm mt-1">{formik.errors.subject}</p>}
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  value={formik.values.message}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2"
                  placeholder="Type your message here..."
                />
                {formik.errors.message && <p className="text-red-500 text-sm mt-1">{formik.errors.message}</p>}
              </div>

              {/* Apartment */}
              <div>
                <select
                  className="w-full border border-gray-300 px-3 py-2 rounded-lg"
                  onChange={(e) => setApartmentId(parseInt(e.target.value, 10))}
                  value={apartmentId}
                >
                  {apartments.map((x) => (
                    <option key={x.id} value={x.id}>
                      {x.apartmentTypeName} - {x.propertyAddress}
                    </option>
                  ))}
                </select>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <ButtonsWhite type="submit" className="bg-green text-white px-4 py-2 rounded-lg" name={loading ? "Sending..." : "Send Message"} />
                <ButtonsPrimaryBlack onClick={() => setViewform(false)} name="Cancel" />
              </div>
            </form>
          ) : (
            <CustomerReports handleFormView={() => setViewform(true)} />
          )}
        </div>
      </div>
    </main>
  );
};

export default ContactUs;
