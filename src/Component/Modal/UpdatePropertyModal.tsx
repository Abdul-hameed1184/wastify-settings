import React, { useEffect, useState } from "react";
import { Paragraph2Green, Paragraph2Xl, ParagraphSmall2 } from "../Paragraph";
import { InputField } from "../InputField";
import {  useFormik } from "formik";
import { ILocation } from "../../models/location.interface";
import {  getPropertyTypes, updateProperty } from "../../api/property/property.service";
import { IOperator } from "../../models/operator.interface";
import { IPropertyType } from "../../models/propertType.interface";
import { getCustomers } from "../../api/customer/customer.service";
import { toast } from "react-toastify";
import { ICustomer } from "../../models/customer.interface";
import { IProperty } from "../../models/property.interface";
import { Button } from "../Button";
import { Modal } from "./Modal";

type Props = {
  openModal: boolean;
  handleOpenModal: () => void;
  operator: IOperator;
  property: IProperty
};

const UpdatePropertyModal: React.FC<Props> = ({ openModal, handleOpenModal, operator, property }) => {
  const [propertyTypeList, setPropertyTypeList] = useState<IPropertyType[]>([]);
  const [location, setLocation] = useState<ILocation>();
  const [customers, setCustomers] = useState<ICustomer[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<ICustomer>();
  const [isOn, setIsOn] = useState(false);

  useEffect(() => {
    (async () => {
      const propertyTypes = await getPropertyTypes();
      setPropertyTypeList(propertyTypes.data.data);

      const customersRes = await getCustomers();
      setCustomers(customersRes.data.data);
      var customer = customersRes.data.data.find(x => x.customerId == property.ownerId)
      setSelectedCustomer(customer)
    })();
  }, []);

  const handleSearchChange = (search: string) => {
    const customer = customers.find((c) => c.phone === search);
    setSelectedCustomer(customer);
    formik.setFieldValue("customerId", customer?.customerId)
  };

  const handleUpdateProperty = async (xproperty) => {
    try {
      await updateProperty({ ...xproperty, ownerId: selectedCustomer?.customerId } as IProperty, property.id);
      toast.success("Property successfully Updated");
      handleOpenModal();
    } catch(e) {
      console.log(e)
      toast.error("Unable to Update Property");
    }
  };

  const formik = useFormik({
    initialValues: {
      pLatitude: location?.latitude || "0.001",
      pLongitude: location?.longitude || "0.001",
      propertyAddress: property.propertyAddress,
      propertyDescription: property.propertyDescription,
      noOfDistinctApartment: property.noOfDistinctApartment,
      stateId: operator.stateId,
      lgaId: operator.lgaId,
      wardId: operator.wardId,
      propertyTypeId: property.propertyTypeId,
      pspOperatorId: operator.id,
      ownerId: property.ownerId,
    },
    onSubmit: (values) => handleUpdateProperty(values),
  });

  const handleToggle = () => {
    setIsOn(!isOn);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude.toString(),
            longitude: position.coords.longitude.toString(),
          });
        },
        (error) => {
          toast.error(
            error.code === error.PERMISSION_DENIED
              ? "User denied location request."
              : error.code === error.POSITION_UNAVAILABLE
              ? "Location unavailable."
              : error.code === error.TIMEOUT
              ? "Location request timed out."
              : "Unknown location error."
          );
        }
      );
    }
  };

  return (
    <Modal
      isOpen={openModal}
      onClose={handleOpenModal}
      size="lg"
      title="Update Property"
    >

        <form onSubmit={formik.handleSubmit} className="space-y-6">
          {/* Location Toggle */}
          <div className="flex items-center">
            <label className="flex items-center cursor-pointer select-none">
              <span className="mr-3 text-gray-700">{isOn ? "Location ON" : "Location OFF"}</span>
              <div className="relative">
                <input type="checkbox" checked={isOn} onChange={handleToggle} className="sr-only" />
                <div
                  className={`w-12 h-6 rounded-full border bg-black border-green-500 transition-all duration-300 ${
                    isOn ? "bg-green-500" : "bg-gray-300"
                  }`}
                >
                  <div
                    className={`w-6 h-6 bg-white rounded-full shadow transform transition-transform duration-300 ${
                      isOn ? "translate-x-6" : ""
                    }`}
                  />
                </div>
              </div>
            </label>
          </div>

          {/* Property Address */}
          <div>
            <ParagraphSmall2 content="Property Address" />
            <InputField
              type="text"
              placeholder="Enter property address"
              name="propertyAddress"
              required
              value={formik.values.propertyAddress}
              onChange={formik.handleChange}
              error=""
              className=" focus:border-green-500"
            />
            <Paragraph2Xl content={`${operator.wardName}, ${operator.lgaName}, ${operator.stateName}`} />
          </div>

          {/* Property Type */}
          <div>
            <ParagraphSmall2 content="Property Type" />
            <select
              id="propertyTypeId"
              className="border px-3 py-2 bg-gray-50 rounded-lg w-full focus:outline-none focus:border-green-500"
              onChange={(e) => {
                const id = parseInt(e.target.value, 10);
                formik.setFieldValue("propertyTypeId", id);
              }}
            >
              <option value="" disabled>
                Select type
              </option>
              {propertyTypeList.map((type) => (
                <option key={type.id} value={type.id} defaultValue={property.propertyTypeId}>
                  {type.name}
                </option>
              ))}
            </select>
          </div>

          {/* Description */}
          <div>
            <ParagraphSmall2 content="Property Description" />
            <textarea
              name="propertyDescription"
              rows={4}
              value={formik.values.propertyDescription}
              onChange={formik.handleChange}
              placeholder="Describe the property..."
              className="border px-3 py-2 bg-white rounded-lg w-full focus:outline-none focus:border-green-500"
            />
          </div>

          {/* No of Apartments */}
          <div>
            <ParagraphSmall2 content="Number of Apartments" />
            <InputField
              type="number"
              name="noOfDistinctApartment"
              placeholder="0"
              required
              value={formik.values.noOfDistinctApartment.toString()}
              onChange={(e) => formik.setFieldValue("noOfDistinctApartment", e.target.value)}
              className="focus:outline-none focus:border-green-500"
            />
          </div>

          {/* Owner */}
          <div>
            <ParagraphSmall2 content="Property Owner (Phone Number)" />
            <input
              list="owners"
              className="border px-3 py-2 bg-gray-50 rounded-lg w-full focus:outline-none focus:border-green-500"
              name="owner"
              onChange={(e) =>{ 
                 handleSearchChange(e.target.value);
                }}
            />
            <datalist id="owners">
              {customers.map((c) => (
                <option key={c.customerId} value={c.phone} />
              ))}
            </datalist>
            {selectedCustomer && (
              <Paragraph2Green content={`${selectedCustomer.firstname} ${selectedCustomer.lastname}`} />
            )}
          </div>

          <Button type="submit" variant="primary" className="w-full">Update Property</Button>
        </form>
    </Modal>
  );
};

export default UpdatePropertyModal;
