import React, { useEffect, useState } from "react";
import { IApartment } from "../../models/apartment.interface";
import { Modal } from "./Modal";
import { Button } from "../Button";
import { useFormik } from "formik";
import { getCustomers } from "../../api/customer/customer.service";
import { IApartmentType } from "../../models/apartmentType.interface";
import { ICustomer } from "../../models/customer.interface";
import { getApartmentType, updateApartment } from "../../api/property/apartment.service";
import { toast } from "react-toastify";

type Props = {
  apartment: IApartment;
  openModal: boolean;
  handleUpdateModal: () => void;
};

export const UpdateApartmentModal: React.FC<Props> = ({
  apartment,
  openModal,
  handleUpdateModal,
}) => {
  const [apartmentTypes, setApartmentTypes] = useState<IApartmentType[]>();
  const [customers, setCustomers] = useState<ICustomer[]>();
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedCustomer, setSelectedCustomer] = useState<ICustomer>();

  useEffect(() => {
    (async () => {
      const apartments = await getApartmentType();
      setApartmentTypes(apartments.data.data);
      const data = await getCustomers();
      setCustomers(data.data.data);
    })();
  }, []);

  // sync selectedCustomer when modal opens
  useEffect(() => {
    if (apartment && customers) {
      const customer = customers.find(
        (c) => c.customerId === apartment.customerId
      );
      setSelectedCustomer(customer);
    }
  }, [apartment, customers]);

  const handleUpdateApartment = async (values) => {
    setLoading(true);
    try {
      console.log("Updating apartment with:", values);
    await updateApartment(apartment.id, apartment.propertyId, values)
    toast.success("Apartment updated")
    } catch (e) {
       toast.error("Apartment Error")
      console.error(e);
    }
    setLoading(false);
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      customerId: apartment.customerId || "",
      description: apartment.description || "",
      apartmentTypeId: apartment.apartmentTypeId || "",
      status: apartment.status,
    },
    onSubmit: (values) => handleUpdateApartment(values),
  });

  const handleSearchChange = (search: string) => {
    const customer = customers?.find((c) => c.phone === search);
    if (customer) {
      setSelectedCustomer(customer);
      formik.setFieldValue("customerId", customer.customerId);
    }
  };

  return (
    <Modal
      isOpen={openModal}
      onClose={handleUpdateModal}
      title="Update Apartment"
    >
      <form
        onSubmit={formik.handleSubmit}
        className="z-0 space-y-6 bg-gray-900/50 backdrop-blur-sm m-4"
      >
        <div className="space-y-6">
          <div>
            {/* Apartment Type */}
            <h2>Apartment Type</h2>
            <select
              className="border-2 px-2 py-3 pl-5 bg-grayInput shadow-sm rounded-lg block font-Poppins w-full h-14 text-black text-base mt-1"
              value={formik.values.apartmentTypeId}
              onChange={(e) => {
                const id = parseInt(e.target.value, 10);
                formik.setFieldValue("apartmentTypeId", id);
              }}
            >
              <option value="" disabled>
                Select Apartment Type
              </option>
              {apartmentTypes &&
                apartmentTypes.map((apartmentType) => (
                  <option key={apartmentType.id} value={apartmentType.id}>
                    {apartmentType.name}
                  </option>
                ))}
            </select>

            {/* Customer Phone */}
            <p>Customer Phone Number</p>
            <input
              list="customers"
              className="border-2 px-2 py-3 pl-5 bg-grayInput shadow-sm rounded-lg block font-Poppins w-full h-14 text-black text-base mt-1"
              value={
                selectedCustomer?.phone ||
                customers?.find(
                  (c) => c.customerId === formik.values.customerId
                )?.phone ||
                ""
              }
              onChange={(e) => handleSearchChange(e.target.value)}
            />
            <datalist id="customers">
              {customers &&
                customers.map((customer) => (
                  <option
                    key={customer.customerId}
                    value={customer.phone}
                  ></option>
                ))}
            </datalist>
            {selectedCustomer && (
              <p>
                {selectedCustomer.firstname} {selectedCustomer.lastname}
              </p>
            )}
          </div>
        </div>

        {/* Status */}
        <div className="flex flex-col">
          <label htmlFor="status">Status</label>
          <select
            id="status"
            value={formik.values.status ? 1 : 0}
            onChange={(e) =>
              formik.setFieldValue("status", e.target.value === "1")
            }
            className="border-2 px-2 py-3 pl-5 bg-grayInput shadow-sm rounded-lg block font-Poppins w-full h-14 text-black text-base mt-1"
          >
            <option value={0}>Vacant</option>
            <option value={1}>Occupied</option>
          </select>
        </div>

        <Button type="submit" className="w-full" loading={loading}>
          Update Apartment
        </Button>
      </form>
    </Modal>
  );
};
