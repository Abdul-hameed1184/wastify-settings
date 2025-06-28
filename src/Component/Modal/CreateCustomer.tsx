import React, {  } from "react";
import { Modal } from "flowbite-react";

import {
  ParagraphSmall2,
} from "../Paragraph";
import { InputField } from "../InputField";
import { FormikValues, useFormik } from "formik";
import { IOperator } from "../../models/operator.interface";

import { createCustomer } from "../../api/customer/customer.service";
import { toast } from "react-toastify";
import { ButtonsPrimary } from "../Buttons";


type Props = {
  openModal: boolean;
  setOpenModal: (x: boolean) => void;
};
const CreateCustomer: React.FC<Props> = ({
  openModal,
  setOpenModal,
}) => {





  const handleCreateCustomer = async (values:  {phone:string, lastname:string, firstname:string, email:string}) => {
    try{

      const newCustomer = await createCustomer(values);
      console.log(newCustomer);
      toast.success("Customer successfully created")
      setOpenModal(!openModal);
    }catch(error){
      toast.error("Unable to Create Customer")
      console.log(error)
    }
  }

  const formik = useFormik<FormikValues>({
    initialValues: {
        phone:"",
        lastname:"",
        firstname:"",
        email:"" 
    },
    onSubmit: (values) => {

      console.log(values);
      handleCreateCustomer(values)
    },
  });




  return (
    <Modal
      show={openModal}
      onClose={() => setOpenModal(false)}
      size={"lg"}
      position={"top-right"}
    >
      <Modal.Header>Create Customer </Modal.Header>

      <form onSubmit={formik.handleSubmit} className="bg-white">
        <Modal.Body>
          <div className="space-y-6">
            <div>
                <ParagraphSmall2 content={"Firstname"} />
                <InputField
                  type="text"
                  placeholder="First Name"
                  name="firstname"
                  required
                  value={formik.values.firstname}
                  onChange={formik.handleChange}
                  error={""}
                />
                </div>
    <div>
                <ParagraphSmall2 content={"Lastname"} />
                <InputField
                  type="text"
                  placeholder="Last Name"
                  name="lastname"
                  required
                  value={formik.values.lastname}
                  onChange={formik.handleChange}
                  error={""}
                />
                </div>
                    <div>
                <ParagraphSmall2 content={"Phone Number"} />
                <InputField
                  type="text"
                  placeholder="Phone Number"
                  name="phone"
                  required
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  error={""}
                />
                </div>
                    <div>
                <ParagraphSmall2 content={"Customer Email"} />
                <InputField
                  type="email"
                  placeholder="Customer Email"
                  name="email"
                  required
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  error={""}
                />
                </div>

                <div>
                    <ButtonsPrimary name={"Create Customer"} type="submit"/>
                </div>
               
              </div>
        </Modal.Body>

      </form>
    </Modal>
  );
};

export default CreateCustomer;
