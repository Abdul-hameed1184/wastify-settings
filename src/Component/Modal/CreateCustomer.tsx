import React from "react";
import { ParagraphSmall2 } from "../Paragraph";
import { Input } from "../InputField";
import { type FormikValues, useFormik } from "formik";

import { createCustomer } from "../../api/customer/customer.service";
import { toast } from "react-toastify";
import { Button } from "../Button";
import { Modal } from "./Modal";

type Props = {
  openModal: boolean;
  setOpenModal: (x: boolean) => void;
};
const CreateCustomer: React.FC<Props> = ({ openModal, setOpenModal }) => {
  const handleCreateCustomer = async (values: {
    phone: string;
    lastname: string;
    firstname: string;
    email: string;
  }) => {
    try {
      const newCustomer = await createCustomer(values);
      console.log(newCustomer);
      toast.success("Customer successfully created");
      setOpenModal(!openModal);
    } catch (error) {
      console.log(error);
      const message = error.response.data?.message[0];
      toast.error(message, { autoClose: 7000 });
      console.log(error);
    }
  };

  const formik = useFormik<FormikValues>({
    initialValues: {
      phone: "",
      lastname: "",
      firstname: "",
      email: "",
    },
    onSubmit: (values) => {
      console.log(values);
      handleCreateCustomer(values);
    },
  });

  return (
    <Modal
      isOpen={openModal}
      onClose={() => setOpenModal(false)}
      size={"lg"}
      // position={"top-right"}
      title="Create Customer"
    >
      <form onSubmit={formik.handleSubmit} className="bg-white">
        <div className="space-y-6">
          <div>
            <ParagraphSmall2 content={"Firstname"} />
            <Input
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
            <Input
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
            <Input
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
            <Input
              type="email"
              placeholder="Customer Email"
              name="email"
              required
              value={formik.values.email}
              onChange={formik.handleChange}
              error={""}
            />
          </div>

          <Button type="submit" className="w-full">Create Customer</Button>
        </div>
      </form>
    </Modal>
  );
};

export default CreateCustomer;
