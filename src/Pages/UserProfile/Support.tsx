import React, { useEffect, useState } from "react";
import { IoChevronBack, IoLogoFacebook, IoLogoTwitter } from "react-icons/io5";
import { IoIosMail, IoLogoWhatsapp } from "react-icons/io";
import { Link } from "react-router-dom";
import { Paragraph2Xl, Paragraph2XlWhite } from "../../Component/Paragraph";
import { useFormik } from "formik";
import { RiCustomerServiceFill, RiTwitterXLine } from "react-icons/ri";
import { toast } from "react-toastify";
import { getCustomerReportPaginatedByCustomer, sendMessage } from "../../api/customer/customer.service";
import { Input } from "../../Component/InputField";
import { customerReportSchema } from "../../utils/validators/CustomerReportSchema";
import CustomerReports from "./CustomerReports";
import { IApartment } from "../../models/apartment.interface";
const Support: React.FC = () => {
  const customer = JSON.parse(sessionStorage.getItem("AUTH_USERDETAILS") || "");
  const apartments:IApartment[] = JSON.parse(sessionStorage.getItem("CUSTOMER_APARTMENT")||"")||[];
  const [loading, setLoading] = useState<boolean>(false);
  const [ viewForm, setViewform] = useState<boolean>(false);
  const [ apartmentId, setApartmentId ] = useState<number>(apartments[0].id)
  
  useEffect(() => {
    (async () => {
        const data = await getCustomerReportPaginatedByCustomer(customer.customerId);
        console.log(data.data.data)
    })()
  },[customer.customerId])
  const handleSendMessage = async (message) => {
    try {
      const res = await sendMessage(message);
      console.log(res);
          toast.success(`Report Sent`);
      setViewform(!viewForm)
    } catch (error) {
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
    onSubmit: async (values, { resetForm}) => {
      setLoading(true);
      await handleSendMessage(values);
      setLoading(false);
      resetForm();
      
    },
  });

  return (
    <main className="bg-green h-100">
      <div className="flex justify-start pt-10 ml-6">
        <Link to="/profile">
          <IoChevronBack size={28} className="bg-gray text-white rounded-2xl" />
        </Link>

      </div>
      <h3 className="text-3xl font-bold text-white text-center mb-4">Help & Support</h3>
      <div className="flex flex-col lg:flex-row gap-4">
        
        <div className="w-full lg:w-1/2 p-4">
{ viewForm &&  <form onSubmit={formik.handleSubmit} className="px-4 py-6">
          
            
            <div className="space-y-4 max-w-xl w-full mx-auto">
            <div className="">
              <p className="text-2xl font-bold text-white">Send us a message</p>
            </div>
              {/* Subject Input */}
              <div>
                <label
                  htmlFor="subject"
                  className="block text-white text-lg mb-1"
                >
                  Subject
                </label>
                <Input
                  type="text"
                  name="subject"
                  value={formik.values.subject}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full rounded-lg text-lg  border border-gray-300 px-2 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white text-gray-900"
                  placeholder="Enter your subject"
                />
                {
                    formik.errors.subject && <span className="text-white"><span className="text-2xl text-red-600">*</span>{formik.errors.subject}</span>
                }
              </div>

              {/* Message Textarea */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-white text-lg mb-1"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  value={formik.values.message}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full rounded-lg  text-lg  px-2 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white text-gray-900"
                  placeholder="Type your message here..."
                />
                           {
                    formik.errors.message && <span className="text-white"><span className="text-2xl text-red-600">*</span>{formik.errors.message}</span>
                }
              </div>

              <div>
                <select className="border-2 px-2 py-3 pl-5 bg-grayInput shadow-sm rounded-lg block font-Poppins w-full h-14 text-black text-base mt-1"
                  onChange={(e) => {
                    setApartmentId(parseInt(e.target.value,10))
                  }} 
>
                  { apartments && apartments.map((x: IApartment) =>{ return (<option key={x.id} value={x.id}>{x.apartmentTypeName} - {x.propertyAddress}</option>)})}
                </select>
              </div>

              {/* Submit Button */}
              <div className="pt-4 md:w-full">
                <button
                  type="submit"
                  className="bg-white hover:bg-green-700 text-green font-semibold px-6 py-2 rounded-lg transition duration-200"
                >
                  Send Message
                </button>
              </div>
            </div>
          </form>}
          <div>
         { !viewForm &&   <CustomerReports handleFormView={()=>setViewform(!viewForm)} />}
          </div>
        </div>
        <div className="w-full h-full lg:w-1/2 p-4">
        
        <div className="text-white space-y-4 px-4 flex flex-col justify-between">
            <div className="my-4">
                 <h2 className="text-2xl text-white font-bold">Contacts</h2>
            </div>
    <div className="mb-4">
    <a
      href="https://www.facebook.com/yourPage"
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center space-x-3"
    >
      <IoLogoFacebook className="text-[#1877F2] text-2xl" />
      <p className="text-white font-semibold text-xl">Facebook</p>
    </a>
    </div>
    <div className="mb-4">
    <a
      href="https://twitter.com/yourHandle"
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center space-x-3"
    >
      <RiTwitterXLine className="text-black text-2xl" />
      <p className="text-white font-semibold text-xl">Twitter</p>
    </a>
    </div>
    <div className="mb-4">
    <a
      href="mailto:support@example.com"
      className="flex items-center space-x-3"
    >
      <IoIosMail className="text-red-500 text-2xl" />
      <p className="text-white font-semibold text-xl">Email</p>
    </a>
    </div>
    <div className="mb-4">
    <a
      href="https://wa.me/2348012345678"
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center space-x-3"
    >
      <IoLogoWhatsapp className="text-[#25D366] text-2xl" />
      <p className="text-white font-semibold text-xl">WhatsApp</p>
    </a>
    </div>
    <div>
    <a href="tel:+2348012345678" className="flex items-center space-x-3">
      <RiCustomerServiceFill className="text-yellow-400 text-2xl" />
      <p className="text-white font-semibold text-xl">Call Us</p>
    </a>
    </div>

  </div>
        </div>


      </div>
    </main>
  );
};

export default Support;
