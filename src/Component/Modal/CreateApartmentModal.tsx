
import {
  Paragraph,

  Paragraph2Xl,
  ParagraphError,
  ParagraphExtraSmallError,
  ParagraphSmall,
  ParagraphSmall2,
} from "../Paragraph";
import { IProperty } from "../../models/property.interface";
import React, {  useState } from "react";
import { getCustomers } from "../../api/customer/customer.service";
import {
  createApartment,
  getApartmentType,
} from "../../api/property/apartment.service";
import { ICustomer } from "../../models/customer.interface";
import { type FormikValues, useFormik } from "formik";
import { toast } from "react-toastify";
import { IApartmentType } from "../../models/apartmentType.interface";
import { ButtonsPrimary, ButtonsPrimaryBlack } from "../Buttons";
import { createCustomer } from "../../api/psp-operator/psp-operator.service";
import { Modal } from "./Modal";
import { Button } from "../Button";
import { useQuery } from "@tanstack/react-query";
import Input from "../InputField";

type Props = {
  openModal: boolean;
  setOpenModal: (x) => void;
  property: IProperty;
};
const CreateApartmentModal: React.FC<Props> = ({
  openModal,
  setOpenModal,
  property,
}) => {

  const [selectedCustomer, setSelectedCustomer] = useState<ICustomer>();
  const [apartmentTypeId, setApartmentTypeId] = useState<number>();
  const [errorMessage, setErrorMessage] = useState<string>();
  const [loading, setLoading] = useState<boolean>();
  const [showCreateCustomer, setShowCreateCustomer] = useState<boolean>(false);

  const {data:apartmentTypes } = useQuery({
      queryKey: ['apartments', property.id],
      queryFn: async () => {
        const apartments = await getApartmentType();
        return apartments.data.data;
      }
  })


const { data:customers } = useQuery({
    queryKey: ['customers'],
    queryFn: async () => {
      const data = await getCustomers();
      return data.data.data;
    }
})


  const handleSearchChange = (search: string) => {
    const customer = customers.find((c) => c.phone === search);
    setSelectedCustomer(customer);
  };

  const handleCreateApartment = async (xapartment: FormikValues) => {
    try {
      
      const newApartment = await createApartment({
        propertyId: xapartment.propertyId,
        apartmentData: [
          {
            customerId: selectedCustomer?.customerId||property.ownerId,
            apartmentTypeId: xapartment.apartmentTypeId,
            status: 1,
            description: "xxxx",
          },
        ],
      });
      console.log(newApartment);
      toast.success("Apartment successfully created");
      setOpenModal(!openModal);
    } catch (e: unknown) {
      toast.error("No apartment created!!!");
      setErrorMessage("No apartment created!!!");
      setOpenModal(!openModal);
    }
  };

  const handleCreateCustomer = async (dy: FormikValues) => {
    try {
      const dx = await createCustomer(dy);
      createApartmentFormik.setFieldValue(
        "customerId",
        selectedCustomer?.customerId
      );
      toast.success("Customer Created", { autoClose: 5000 });
      setShowCreateCustomer(!showCreateCustomer);
    } catch (e: unknown) {
      toast.error("Error in creating customer", { autoClose: 5000 });
      console.log(e);
    }
  };

  const CreateCustomerFormik = useFormik<FormikValues>({
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
      phone: "",
    },
    onSubmit: async (values) => {
      setLoading(true);
      const dy = await handleCreateCustomer(values);
      const data = await getCustomers();
      setCustomers(data.data.data);
      console.log(customers);
      handleSearchChange(dy.data.data.data.phone);
    },
  });
  const createApartmentFormik = useFormik<FormikValues>({
    initialValues: {
      propertyId: null,
      customerId: property.ownerId,
      apartmentTypeId: null,
      description: "",
      selectedCustomer: null,
    },
    onSubmit: (values) => {
      handleCreateApartment(values);
    },
  });

  return (
    <Modal
      isOpen={openModal}
      onClose={() => setOpenModal(false)}
      size={"md"}
      title={`Create Apartment`}
    >
      {!showCreateCustomer && (
        <form onSubmit={createApartmentFormik.handleSubmit}  className="z-0 space-y-6 bg-gray-900/50 backdrop-blur-sm m-4">
            <div className="space-y-6">
              {errorMessage && <ParagraphError content={errorMessage} />}
              <div>
                <div className="w-full lg:w-4/5">
                  <Paragraph
                    content={
                      (property?.ownerFullname?.toUpperCase() || "No name" )+
                      ", " +
                     ( property?.propertyTypeName || "No Type")
                    }
                  />
                </div>
                <div className="w-full lg:w-4/5">
                  <Paragraph
                    content={
                      property.propertyAddress +
                      ", " +
                      property.wardName +
                      " , " +
                      property.lgaName +
                      ", " +
                      property.stateName
                    }
                  />
                </div>
                <div>
                  <ParagraphSmall2 content={"Apartment Type"} />
                  <select
                    className="   border-2 px-2 py-3 pl-5 bg-grayInput shadow-sm rounded-lg font-Poppins h-14 text-black text-base mt-1
          block w-full
          border border-gray
          text-base text-gray-800
          placeholder:text-gray-400
          transition-all duration-200 ease-in-out
          focus:outline-none focus:ring-2 focus:ring-offset-1"
                    onChange={(e) => {
                      const id = parseInt(e.target.value, 10);
                      setApartmentTypeId(id);
                      createApartmentFormik.setFieldValue(
                        "apartmentTypeId",
                        id
                      );
                      createApartmentFormik.setFieldValue(
                        "propertyId",
                        property.id
                      );
                    }}
                  >
                    <option value="Apartment Type" disabled selected></option>
                    {apartmentTypes &&
                      apartmentTypes.map((apartmentType: IApartmentType) => {
                        return (
                          <option
                            key={apartmentType.id}
                            value={apartmentType.id}
                          >
                            {apartmentType.name}
                          </option>
                        );
                      })}
                  </select>
                </div>
                <div>
                  <ParagraphSmall2 content={"Customer Phone Number"} />
                  <input
                    list="customers"
               
                    onChange={(e) => {
                      handleSearchChange(e.target.value);
                      if(selectedCustomer?.customerId){
                      createApartmentFormik.setFieldValue(
                        "customerId",
                        selectedCustomer?.customerId
                      );
                    }else{
                      createApartmentFormik.setFieldValue(
                        "customerId",
                        property?.ownerId
                      );
                    }}}

                    className="border-2 px-2 py-3 pl-5 bg-grayInput shadow-sm rounded-lg block font-Poppins w-full h-14 text-black text-base mt-1"
                  />
                  <datalist id="customers">
                    {customers &&
                      customers.map((customer) => {
                        return (
                          <option
                            key={customer.customerId}
                            value={customer.phone}
                          >
                            {customer.phone + " " + customer.firstname + " " + customer.lastname}
                          </option>
                        );
                      })}
                  </datalist>
                  {selectedCustomer && (
                    <p className="text-green uppercase font-bold">
                      {
                        selectedCustomer.firstname +
                        " " +
                        selectedCustomer.lastname
                      }
                    </p>
                  )}
                </div>
                <div className="mt-2">
                  {!selectedCustomer && (
                    <Button
                      disabled={selectedCustomer !== undefined}
                      onClick={() => setShowCreateCustomer(!showCreateCustomer)}
                      type={"button"}
                      className="w-full"
                    >Create New Customer</Button>
                  )}
                </div>
              </div>
            </div>



            <div className=" w-full">
              <Button
                type="submit"  
                className="w-full"
                disabled={showCreateCustomer}
              >Create Apartment</Button>
            </div>

        </form>
      )}

      {showCreateCustomer && (
        <form onSubmit={CreateCustomerFormik.handleSubmit}>

            <div className="mt-2 md:mt-2 md:bg-white md:border-transparent md:p-5 md:rounded-lg">
              <div className="mt-4 md:mt-2 ">
                <Paragraph2Xl content={"Create New Customer Account"} />
                <ParagraphSmall
                  content={"Fill in Customer details to create an account"}
                />
              </div>
              <div className="mx-4 mt-8 md:mt-4">
                <div className="mt-4">
                  <Input
                    placeholder={"First Name"}
                    type={"text"}
                    name={"firstname"}
                    onChange={CreateCustomerFormik.handleChange}
                    value={CreateCustomerFormik.values.firstname}
                  />

                  {CreateCustomerFormik.errors.firstname ? (
                    <ParagraphExtraSmallError
                      content={CreateCustomerFormik.errors.firstname[0]}
                    />
                  ) : null}
                </div>
                <div className="mt-4">
                  <Input
                    placeholder={"Last Name"}
                    type={"text"}
                    name={"lastname"}
                    onChange={CreateCustomerFormik.handleChange}
                    value={CreateCustomerFormik.values.lastname}
                  />

                  {CreateCustomerFormik.errors.lastname ? (
                    <ParagraphExtraSmallError
                      content={CreateCustomerFormik.errors.lastname[0]}
                    />
                  ) : null}
                </div>
                <div className="mt-4">
                  <Input
                    placeholder={"Email"}
                    type={"email"}
                    name={"email"}
                    onChange={CreateCustomerFormik.handleChange}
                    value={CreateCustomerFormik.values.email}
                  />
                  {CreateCustomerFormik.errors.email ? (
                    <ParagraphExtraSmallError
                      content={CreateCustomerFormik.errors.email[0]}
                    />
                  ) : null}
                </div>
                <div className="mt-4">
                  <Input
                    placeholder={"Phone number"}
                    type={"text"}
                    name={"phone"}
                    onChange={CreateCustomerFormik.handleChange}
                    value={CreateCustomerFormik.values.phone}
                  />

                  {CreateCustomerFormik.errors.phone ? (
                    <ParagraphExtraSmallError
                      content={CreateCustomerFormik.errors.phone[0]}
                    />
                  ) : null}
                </div>
              </div>
            </div>
            <div className="my-6 gap-4 flex flex-col w-full">
              <ButtonsPrimary name={"Create Customer"} type="submit" />
              <ButtonsPrimaryBlack
                name={"Cancel"}
                type={"button"}
                onClick={() => setShowCreateCustomer(!showCreateCustomer)}
              />
            </div>

        </form>
      )}
    </Modal>
  );
};

export default CreateApartmentModal;
