import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Input  from "./InputField";
import { Button } from "./Button";
import { Modal } from "./Modal/Modal";
import { IApartment } from "../models/apartment.interface";
import { ICustomer } from "../models/customer.interface";
import { createTicket } from "../api/customer/ticket.service";
import { toast } from "react-toastify";

type Props = {
    handleOpen: ()=>void,
    isOpen: boolean
}
const TicketForm:React.FC<Props> = ({ handleOpen, isOpen}) => {
      const customer: ICustomer = JSON.parse(
      sessionStorage.getItem("AUTH_USERDETAILS") || "{}"
    );
    const customerApartments:IApartment[] = JSON.parse(
      sessionStorage.getItem("CUSTOMER_APARTMENT") || "[]"
    );
      const [ apartment, setApartment ] = useState<IApartment>(customerApartments[0])
      console.log(customerApartments[0])
  const initialValues = {
    subject: "",
    content: "",
    propertyId: apartment.propertyId,
    customerId: customer.customerId,
    operatorId:apartment.pspOperatorId,
    priority: "",
  };



  // const { data, isLoading } = useQuery<>

  const validationSchema = Yup.object({
    subject: Yup.string().required("Subject is required"),
    content: Yup.string().required("Content is required"),
    propertyId: Yup.number().required("Property ID is required"),
    customerId: Yup.string().required("Customer ID is required"),
    operatorId: Yup.number().required("Operator ID is required"),
    priority: Yup.string()
      .oneOf(["High", "Medium", "Low", "Critical"])
      .required("Priority is required"),
  });

    const handleSelectedApartment = (e) => {
      const id = parseInt(e.target.value);
      const apartment = customerApartments.find(x => x.id  == id)||{} as IApartment;
      setApartment(apartment);
    }

  const handleSubmit = async (values, { resetForm }) => {
    try{
      const payload = {
        ...values,
           propertyId: apartment.propertyId,
    customerId: customer.customerId,
    operatorId:apartment.pspOperatorId,
     
      };
      console.log("Form Submitted with Payload:", payload);
      await createTicket(payload)
      toast.success("Ticket sent")
      resetForm();
    }catch(e){
      console.log(e);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={handleOpen} title="Create Ticket" size="lg">
    <div className="max-w-2xl mx-auto bg-white p-4 mt-2">
      {/* <h2 className="text-xl font-semibold mb-4"></h2> */}
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue, errors, touched }) => (
          <Form className="space-y-2">
            <div>
              <label htmlFor="apartmentId">Apartment</label>
              <select 
                              onChange={handleSelectedApartment}
              id="apartmentId" className=" border-2 px-2 py-3 pl-5 bg-grayInput shadow-sm rounded-lg font-Poppins h-14 text-black text-base mt-1
          block
          w-full

          border
          border-gray
          text-base
          text-gray-800
          placeholder:text-gray-400
          transition-all
          duration-200
          ease-in-out
          focus:outline-none
          focus:ring-2
          focus:ring-offset-1">
                {
                  customerApartments && customerApartments.map((x:IApartment, index) => <option key={index} value={x.id}>
        {x.propertyAddress} - {x.apartmentTypeName}
      </option>)
                }
              </select>
            </div>
            <div>
                          <label className="block mb-1 text-sm font-medium" htmlFor="subject">Subject</label>
            <Input
              name="subject"
              value={values.subject}
              onChange={(e) => setFieldValue("subject", e.target.value)}
              error={touched.subject && errors.subject}
            />
            </div>
            <div>
            <label className="block mb-1 text-sm font-medium " htmlFor="content">Content</label>
            <textarea
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              name="content"
              value={values.content}
              rows={5}
              onChange={(e) => setFieldValue("content", e.target.value)}
            >
                </textarea>
                        </div>

            <div>
              <label className="block mb-1 text-sm font-medium" htmlFor="priority">Priority</label>
              <select
                name="priority"
                value={values.priority}
                onChange={(e) => setFieldValue("priority", e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="">Select Priority</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Critical">Critical</option>
              </select>
              {touched.priority && errors.priority && (
                <p className="text-sm text-red-500 mt-1">{errors.priority}</p>
              )}
            </div>

            <div className="pt-4">
              <Button type="submit" className="w-full">
                Submit Ticket
              </Button>
            </div>
          </Form>
        )}
      </Formik>
      
    </div>
    </Modal>
  );
};

export default TicketForm;
