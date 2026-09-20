import React, { useState } from "react";
import { ParagraphSmall2 } from "../Paragraph";
import Input from "../InputField";
import { type FormikValues, useFormik } from "formik";

import { createCustomer, uploadBulkCustomer } from "../../api/customer/customer.service";
import { toast } from "react-toastify";
import { Button } from "../Button";
import { Modal } from "./Modal";
import { RiFileExcel2Fill } from "react-icons/ri";

type Props = {
  openModal: boolean;
  setOpenModal: (x: boolean) => void;
};
const CreateCustomer: React.FC<Props> = ({ openModal, setOpenModal }) => {
  const [activeTab, setActiveTab] = useState<"single" | "bulk">("single");
  const [bulkFile, setBulkFile] = useState<File | null>(null);
  const [isAgreed, setIsAgreed] = useState(false);

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
    } catch (error: any) {
      console.log(error);
      const message = error.response?.data?.message?.[0] || "An error occurred";
      toast.error(message, { autoClose: 7000 });
      console.log(error);
    }
  };

  const handleBulkUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bulkFile) {
      toast.error("Please select a file to upload");
      return;
    }
 const forms = new FormData();
    forms.append("file", bulkFile);
    try {
      const newCustomer = await uploadBulkCustomer(forms);
      console.log(newCustomer);
      toast.success("Customer successfully created");
      setOpenModal(!openModal);
    } catch (error: any) {
      console.log(error);
      const message = error.response?.data?.message?.[0] || "An error occurred";
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
      position={"top-right"}
      title="Create Customer"
    >
      <div className="bg-white">
        <div className="flex border-2 border-gray-200 mb-6 flex justify-center rounded-xl">
          <button
            type="button"
            className={`flex-1 py-2 text-center rounded-l-xl  font-medium text-sm transition-colors ${
              activeTab === "single"
                ? "bg-primary text-black"
                : " text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
            onClick={() => setActiveTab("single")}
          >
            Add a Customer
          </button>
          <button
            type="button"
            className={`flex-1 py-2 text-center rounded-r-xl font-medium text-sm transition-colors ${
              activeTab === "bulk"
                ? "bg-primary text-black"
                : " text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
            onClick={() => setActiveTab("bulk")}
          >
            Bulk Upload
          </button>
        </div>

        {activeTab === "single" && (
          <form onSubmit={formik.handleSubmit}>
            <div className="space-y-2">
              <div>
                <Input
                  type="text"
                  placeholder="First Name"
                  name="firstname"
                  required
                  value={formik.values.firstname}
                  onChange={formik.handleChange}
                  error={""}
                  label="Firstname"
                />
              </div>
              <div>
                <Input
                  type="text"
                  placeholder="Last Name"
                  name="lastname"
                  required
                  value={formik.values.lastname}
                  onChange={formik.handleChange}
                  error={""}
                  label="Lastname"
                />
              </div>
              <div>
                <Input
                  type="text"
                  placeholder="Phone Number"
                  name="phone"
                  required
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  error={""}
                  label="Phone Number"
                />
              </div>
              <div>
                <Input
                  type="email"
                  placeholder="Customer Email"
                  name="email"
                  required
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  error={""}
                  label="Customer Email"
                />
              </div>
                <div className="flex gap-4 w-full">
                  <Button 
                  type="button" 
                  variant="white"
                  className="w-1/2"
                  onClick={() => setOpenModal(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" className="w-1/2">
                Create Customer
              </Button>
              </div>
            </div>
          </form>
        )}

        {activeTab === "bulk" && (
          <form onSubmit={handleBulkUpload}>
            <div className="space-y-6">
              <p>File Description</p>
              <p>1. Excel File</p>
              <p>2. Table Description Example</p>
              <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">firstname</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">lastname</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">email</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">phone</th>
                </tr>
                
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  <tr>
                    <td className="px-4 py-3 text-sm text-gray-600">Ismaila</td>
                    <td className="px-4 py-3 text-sm text-gray-600">Matthew</td>
                    <td className="px-4 py-3 text-sm text-gray-600">ismail@matthew.com</td>
                    <td className="px-4 py-3 text-sm text-gray-600">08012345678</td>
                  </tr>

                </tbody>
              </table>
              <p>
                <table>
                  <tr></tr>
                </table>
              </p>
              
              <div className="w-full">
                <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg className="w-10 h-10 mb-4 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                    </svg>
                    <p className="mb-2 text-sm text-gray-500"><span className="font-semibold text-primary">Click to upload</span> or drag and drop</p>
                    <p className="text-xs text-gray-500">CSV or Excel files only</p>

                             {bulkFile && (
                  <p className="mt-2 text-lg text-green-600 text-center font-medium">
               
                    <p className="flex items-center gap-2 justify-center"><span><RiFileExcel2Fill className="text-primary" /> </span><span>{bulkFile.name}</span></p>
                  </p>
                )}
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                    onChange={(e) => setBulkFile(e.target.files?.[0] || null)}
                  />
                </label>
       
              </div>
                <div>
                 
                  <input
                    id="agree"
                    type="checkbox"
                    name="agree"
                    required
                    className="scale-150 mx-2 cursor-pointer"
                    checked={isAgreed}
                    onChange={(e) => setIsAgreed(e.target.checked)}
                  />
                   <label htmlFor="agree" className="px-4 cursor-pointer">I hereby agree to the terms and conditions</label>
                </div>
              <div className="flex gap-4 w-full">
                <Button 
                  type="button" 
                  variant="white"
                  className="w-1/2"
                  onClick={() => setOpenModal(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" className="w-1/2" disabled={!isAgreed}>
                  Upload Customers
                </Button>
              </div>
            </div>
          </form>
        )}
      </div>
    </Modal>
  );
};

export default CreateCustomer;
