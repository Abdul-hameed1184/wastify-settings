import React, { useEffect, useState } from "react";
import { IoChevronBack } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { getCustomerReportPaginatedByCustomer, sendMessage } from "../../api/customer/customer.service";
import { Input } from "../../Component/InputField";
import { customerReportSchema } from "../../utils/validators/CustomerReportSchema";
import CustomerReports from "./CustomerReports";
import { IApartment } from "../../models/apartment.interface";
import { ButtonsPrimaryBlack, ButtonsWhite } from "../../Component/Buttons";
import { Button } from "../../Component/Button";
const Supportx: React.FC = () => {
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
    onSubmit: async (values, { resetForm}) => {
      setLoading(true);
      await handleSendMessage(values);
      setLoading(false);
      resetForm();
      
    },
  });

  return (
    <main className="bg-green h-screen">
      {/* <div className="flex justify-start pt-10 ml-6">
        <Link to="/profile">
          <IoChevronBack size={28} className="bg-gray text-white rounded-2xl" />
        </Link>

      </div>
      <h3 className="text-3xl font-bold text-white text-center mb-4">Help & Support</h3>
      <div className="flex flex-col lg:flex-row gap-4">
        
        <div className="w-full p-4">
{ viewForm &&  <form onSubmit={formik.handleSubmit} className="px-4 py-6">
          
            
            <div className="max-w-xl w-100 mx-auto">              
            <div className="flex justify-between">
              <p className="text-2xl font-bold text-white">Send us a message</p>

            </div>

              <div>
                <label
                  htmlFor="subject"
                  className="block text-white text-lg mb-3"
                >
                  Subject
                </label>
                <Input
                  type="text"
                  name="subject"
                  value={formik.values.subject}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full rounded-lg text-xl border border-gray-300 px-2 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
                  placeholder="Enter your subject"
                />
                {
                    formik.errors.subject && <span className="text-white"><span className="text-2xl text-red-600">*</span>{formik.errors.subject}</span>
                }
              </div>


              <div className="mb-3">
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

              <div className="pt-4 md:w-full">
                <ButtonsWhite
                  type="submit"
                  className="bg-white hover:bg-green-700 text-green font-semibold px-6 py-2 rounded-lg transition duration-200"
                  name={"Send Message"}
                
                />
            
              </div>
                 <div className="mt-2">                          <ButtonsPrimaryBlack onClick={() => setViewform(!viewForm)} name={"Cancel"} /></div>

            </div>
         
          </form>}
          
          <div className="w-full">
         { !viewForm &&   <CustomerReports handleFormView={()=>setViewform(!viewForm)} />}
          </div>
        </div>


      </div> */}

      <Button>Create Ticket</Button>
    </main>
  );
};

export default Supportx;
