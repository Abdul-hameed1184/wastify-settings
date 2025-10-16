import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Input } from "./InputField";
import { Button } from "./Button";
import { Modal } from "./Modal/Modal";

type Props = {
    handleOpen: ()=>void,
    isOpen: boolean
}
const TicketForm:React.FC<Props> = ({ handleOpen, isOpen}) => {
  const initialValues = {
    subject: "",
    content: "",
    propertyId: "",
    customerId: "",
    operatorId: "",
    priority: "",
  };

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

  const handleSubmit = async (values, { resetForm }) => {
    console.log("Form Submitted:", values);
    // Example API call
    // await axios.post('/api/tickets', values);
    resetForm();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleOpen} title="Create Ticket">
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-2xl shadow-md mt-10">
      {/* <h2 className="text-xl font-semibold mb-4"></h2> */}
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue, errors, touched }) => (
          <Form className="space-y-4">
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
