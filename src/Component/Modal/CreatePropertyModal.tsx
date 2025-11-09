import React, { useEffect, useState } from "react";
import { Paragraph2Green, Paragraph2Xl, ParagraphSmall2 } from "../Paragraph";
import { Input, InputField } from "../InputField";
import { FormikValues, useFormik } from "formik";
import { ILocation } from "../../models/location.interface";
import {
  createProperty,
  getPropertyTypes,
} from "../../api/property/property.service";
import { IOperator } from "../../models/operator.interface";
import { IPropertyType } from "../../models/propertType.interface";
import { getCustomers } from "../../api/customer/customer.service";
import { toast } from "react-toastify";
import { ICustomer } from "../../models/customer.interface";
import { IProperty } from "../../models/property.interface";
import { Button } from "../Button";
import { Modal } from "./Modal";
import { useQueryClient } from "@tanstack/react-query";

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
  const [isOn, setIsOn] = useState(false);
 const queryClient = useQueryClient();
  useEffect(() => {
    (async () => {
      const propertyTypes = await getPropertyTypes();
      setPropertyTypeList(propertyTypes.data.data);

      const customersRes = await getCustomers();
      setCustomers(customersRes.data.data);
    })();
  }, []);

  const handleSearchChange = (search: string) => {
    const customer = customers.find((c) => c.phone === search);
    setSelectedCustomer(customer);
  };

  const handleCreateProperty = async (xproperty: FormikValues) => {
    try {
      if (selectedCustomer?.customerId) {
        await createProperty({
          ...xproperty,
          ownerId: selectedCustomer?.customerId,
        } as IProperty);
      } else {
        await createProperty({
          ...xproperty,
          ownerId: "02893112-ed73-44f1-82d4-3fa583bfa0ab",
        } as IProperty);
      }

      setOpenModal(false);
      toast.success("Property successfully created");
      queryClient.invalidateQueries({ queryKey: ['properties'] });
    } catch (e) {
      console.log(e);
      console.log(xproperty);
      toast.error("Unable to Create Property");
    }
  };

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
      ownerId:
        selectedCustomer?.customerId || "02893112-ed73-44f1-82d4-3fa583bfa0ab",
    },
    onSubmit: (values) => handleCreateProperty(values),
  });

  const handleToggle = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude.toString(),
          longitude: position.coords.longitude.toString(),
        });
        setIsOn((prev) => !prev);
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
      },
      {
        enableHighAccuracy: true,
        timeout: 10000, // 10 seconds
        maximumAge: 0,
      }
    );
  };

  return (
    <Modal
      title="Create Property"
      isOpen={openModal}
      onClose={() => setOpenModal(false)}
      size="lg"
    // style={{ maxWidth: "600px", width: "100%" }}
    >
      <form onSubmit={formik.handleSubmit} className="space-y-6">
        {/* Location Toggle */}
        <div className="flex items-center">
          <label className="flex items-center cursor-pointer select-none">
            <span className="mr-3 text-gray-700">
              {isOn ? "Location ON" : "Location OFF"}
            </span>
            <div className="relative">
              <input
                type="checkbox"
                checked={isOn}
                onChange={handleToggle}
                className="sr-only"
              />
              <div
                className={`w-12 h-6 rounded-full border bg-black border-green-500 transition-all duration-300 ${isOn ? "bg-green" : "bg-gray-300"
                  }`}
              >
                <div
                  className={`w-6 h-6 bg-white rounded-full shadow transform transition-transform duration-300 ${isOn ? "translate-x-6" : ""
                    }`}
                />
              </div>
            </div>
          </label>
        </div>

        {/* Property Address */}
        <div>
          <ParagraphSmall2 content="Property Address" />
          <Input
            type="text"
            placeholder="Enter property address"
            name="propertyAddress"
            required
            value={formik.values.propertyAddress}
            onChange={formik.handleChange}
            error=""
            className=" focus:border-green-500"
          />
          <Paragraph2Xl
            content={`${operator.wardName}, ${operator.lgaName}, ${operator.stateName}`}
          />
        </div>

        {/* Property Type */}
        <div>
          <ParagraphSmall2 content="Property Type" />
          <select
            id="propertyTypeId"
            className="          border-2 px-2 py-3 pl-5 bg-grayInput shadow-sm rounded-lg font-Poppins h-14 text-black text-base mt-1
          block
          w-full

          border
          border-gray
          text-base
          text-gray-800
          placeholder:text-gray-400
          transition-all
          duration-200
          ease-in-out"
            onChange={(e) => {
              const id = parseInt(e.target.value, 10);
              setPropertyTypeId(id);
              formik.setFieldValue("propertyTypeId", id);
            }}
            defaultValue=""
          >
            <option value="" disabled>
              Select type
            </option>
            {propertyTypeList.map((type) => (
              <option key={type.id} value={type.id}>
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
            className="          border-2 px-2 py-3 pl-5 bg-grayInput shadow-sm rounded-lg font-Poppins h-14 text-black text-base mt-1
          block
          w-full

          border
          border-gray
          text-base
          text-gray-800
          placeholder:text-gray-400
          transition-all
          duration-200
          ease-in-outfocus:outline-none focus:border-green-500"
          />
        </div>

        {/* No of Apartments */}
        <div>
          <ParagraphSmall2 content="Number of Apartments" />
          <Input
            type="number"
            name="noOfDistinctApartment"
            placeholder="0"
            required
            value={formik.values.noOfDistinctApartment}
            onChange={(e) =>
              formik.setFieldValue("noOfDistinctApartment", e.target.value)
            }
            className="focus:outline-none focus:border-green-500"
          />
        </div>

        {/* Owner */}
        <div>
          <ParagraphSmall2 content="Property Owner (Phone Number)" />
          <input
            list="owners"
            className="          border-2 px-2 py-3 pl-5 bg-grayInput shadow-sm rounded-lg font-Poppins h-14 text-black text-base mt-1
          block
          w-full

          border
          border-gray
          text-base
          text-gray-800
          placeholder:text-gray-400
          transition-all
          duration-200
          ease-in-out focus:outline-none focus:border-green-500"
            name="owner"
            onChange={(e) => handleSearchChange(e.target.value)}
          />
          <datalist id="owners">
            {customers.map((c) => (
              <option key={c.customerId} value={c.phone} />
            ))}
          </datalist>
          {selectedCustomer && (
            <Paragraph2Green
              content={`${selectedCustomer.firstname} ${selectedCustomer.lastname}`}
            />
          )}
        </div>

        {/* Submit */}
        {/* <button
            type="submit"
            className="w-full h-12 bg-red text-white font-medium rounded-lg shadow hover:bg-green-600 active:bg-green-700 transition-colors duration-200 focus:outline-none"
          >
            Create Property
          </button> */}

        <Button type="submit" variant="primary" className="w-full">
          Create Property
        </Button>
      </form>
    </Modal>
  );
};

export default CreatePropertyModal;
