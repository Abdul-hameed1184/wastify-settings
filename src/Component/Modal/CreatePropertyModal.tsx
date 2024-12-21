import React, { useEffect, useState } from "react";
import { Modal } from "flowbite-react";

import {
  Paragraph,
  Paragraph2,
  Paragraph2Green,
  Paragraph2Xl,
  ParagraphSmall,
  ParagraphSmall2,
  ParagraphXl,
} from "../Paragraph";
import { InputField, InputFieldSecondaryGreen } from "../InputField";
import { Form, Formik, FormikValues, useFormik } from "formik";
import { getLGA, getState, getWard } from "../../api/extras/location.service";
import { ILga, ILocation, IState } from "../../models/location.interface";
import { createProperty, getPropertyTypes } from "../../api/property/property.service";
import { IOperator } from "../../models/operator.interface";
import { IPropertyType } from "../../models/propertType.interface";
import { getCustomers } from "../../api/customer/customer.service";
import { toast } from "react-toastify";
import { ICustomer } from "../../models/customer.interface";
import { IProperty } from "../../models/property.interface";

type Props = {
  openModal: boolean;
  setOpenModal: (x: boolean) => void;
  operator: IOperator;
};
const CreatePropertyModal: React.FC<Props> = ({
  openModal,
  setOpenModal,
  operator,
}) => {

  const [propertyTypeList, setPropertyTypeList] = useState<IPropertyType[]>([]);
  const [propertyTypeId, setPropertyTypeId] = useState<number>();
  const [location, setLocation] = useState<ILocation>();
  const [customers, setCustomers] = useState<ICustomer[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<ICustomer>();

  useEffect(() => {
    (async () => {
      const propertyTypes = await getPropertyTypes();
      setPropertyTypeList(propertyTypes.data.data);

      const customers = await getCustomers();
      console.log(customers.data.data);
      setCustomers(customers.data.data);

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;

            setLocation({
              latitude: latitude.toString(),
              longitude: longitude.toString(),
            });
            console.log(location);
          },
          (error) => {
            switch (error.code) {
              case error.PERMISSION_DENIED:
                toast.error("User denied the request for Geolocation.");
                break;
              case error.POSITION_UNAVAILABLE:
                toast.error("Location information is unavailable.");
                break;
              case error.TIMEOUT:
                toast.error("The request to get user location timed out.");
                break;
              default:
                toast.error("An unknown error occurred.");
                break;
            }
          }
        );
      } else {
        toast.error("Geolocation is not supported by this browser.");
      }
    })();
  }, []);

  const handleSearchChange = (search: string) => {
    const customer = customers.find((c) => c.phone === search);
    setSelectedCustomer(customer);

  
  };

  const handleCreateProperty = async (xproperty: FormikValues) => {
    try{

      const newProperty = await createProperty({...xproperty, ownerId: selectedCustomer?.customerId} as IProperty);
      console.log(newProperty);
      toast.success("Property successfully created")
      setOpenModal(!openModal);
    }catch(error){
      toast.error("Unable to Create Property")
      console.log(error)
    }
  }

  const formik = useFormik<FormikValues>({
    initialValues: {
      pLatitude: location?.latitude || "0.001",
      pLongitude: location?.longitude || "0.001",
      propertyAddress: "",
      propertyDescription: "",
      noOfDistinctApartment: 0,
      stateId: operator.stateId,
      lgaId: operator.lgaId,
      wardId: operator.wardId,
      propertyTypeId: propertyTypeId,
      pspOperatorId: operator.id,
      ownerId: selectedCustomer?.customerId,
    },
    onSubmit: (values) => {
      console.log(location);
      console.log(values);
      console.log(selectedCustomer);
      handleCreateProperty(values)
    },
  });

  return (
    <Modal
      show={openModal}
      onClose={() => setOpenModal(false)}
      size={"md"}
      position={"top-right"}
    >
      <Modal.Header>Create Property </Modal.Header>

      <form onSubmit={formik.handleSubmit}>
        <Modal.Body>
          <div className="space-y-6">
            {/* <Paragraph2 content={"Check if you want to bill or customers or selected customers"} /> */}
            <div>
              <div className="">
                <ParagraphSmall2 content={"Property Address"} />
                <InputField
                  type="text"
                  placeholder="Property Address"
                  name="propertyAddress"
                  required
                  value={formik.values.propertyAddress}
                  onChange={formik.handleChange}
                  error={""}
                />
                <Paragraph2Xl
                  content={
                    operator.wardName +
                    " , " +
                    operator.lgaName +
                    ", " +
                    operator.stateName
                  }
                />
              </div>
              <div className="">
                <ParagraphSmall2 content={"Property Type"} />
                <select
                  name="propertyType"
                  id="propertyTypeId"
                  className="border-2 px-2 py-3 pl-5 bg-grayInput shadow-sm rounded-lg block font-Poppins w-full h-14 text-black text-base mt-1"
                  onChange={(e) => {
                    const id = parseInt(e.target.value, 10);
                    setPropertyTypeId(id)
                    formik.setFieldValue("propertyTypeId", id);

                  }} 
                >
                  <option value="" disabled selected>
                    Property type
                  </option>
                  {propertyTypeList &&
                    propertyTypeList.map((propertyType) => (
                      <option key={propertyType.id} value={propertyType.id}>
                        {propertyType.name}
                      </option>
                    ))}
                </select>
              </div>
              <div className="">
                <ParagraphSmall2 content={"Property Description"} />
                <textarea
                  name="propertyDescription"
                  value={formik.values.propertyDescription}
                  id=""
                  cols={30}
                  rows={5}
                  onChange={formik.handleChange}
                  className="border-2 px-2.5 py-3.5 pl-8  bg-white shadow-sm rounded-lg block font-Poppins w-full text-black text-base mt-1 ring-gray  placeholder:text-gray focus:outline-none focus:ring-2 focus:border-purple focus:border-transparent focus:ring-gray"
                  placeholder="Property Description"
                ></textarea>
              </div>

              <div className="">
                <ParagraphSmall2 content={"No of Apartments"} />
                <InputField
                  type="number"
                  name="noOfDistinctApartment"
                  placeholder="No of Apartments"
                  required={true}
                  onChange={(e) => {
                    formik.setFieldValue(
                      "noOfDistinctApartment",
                      e.target.value
                    );
                  }} // Manually set LGA field value
                  value={formik.values.noOfDistinctApartments} // Bind LGA to formik values
                  error={undefined} // Disable if no state is selected
                />
              </div>

              {/* Owner Selection */}
              <div className="">
                <ParagraphSmall2 content={"Property Owner"} />
                <input
                  type="datalist"
                  list="owners"
                  className="border-2 px-2 py-3 pl-5 bg-grayInput shadow-sm rounded-lg block font-Poppins w-full h-14 text-black text-base mt-1"
                  name="owner"
                  onChange={(e) => {
                    handleSearchChange(e.target.value);
                  }}
                />
                <datalist id="owners">
                  {/* <option value="" disabled selected>Select Owner</option> */}
                  {customers.map((customer: ICustomer) => {
                    return (
                      <option key={customer.customerId} value={customer.phone}>
                        {customer.phone}
                      </option>
                    );
                  })}
                </datalist>

                {selectedCustomer && <Paragraph2Green content={ selectedCustomer.firstname.toUpperCase() + " " + selectedCustomer.lastname.toUpperCase()} />}
              </div>
            </div>
          </div>
          <div className=" w-full my-4">
            {/* <ButtonsPrimary
                onClick={() => { 
                  setOpenModal(false);
                  formik.handleSubmit
                }}
                  name={"Create Property"}
                  type={"submit"}
                  loading={undefined}
                /> */}
            <button
              type="submit"
              className={`text-white bg-green  w-full h-14  justify-center px-4 md:px-2 py-4 md:py-2 text-base md:text-sm font-normal shadow-sm ring-transparent border-transparent rounded-lg ring-2 font-Poppins border 'bg-green'`}
            >
              Create Property
            </button>
          </div>
        </Modal.Body>
      </form>
    </Modal>
  );
};

export default CreatePropertyModal;
