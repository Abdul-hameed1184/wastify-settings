import React, { useEffect, useState } from "react";
import { IApartment } from "../../models/apartment.interface";
import { Modal } from "./Modal";
import { Button } from "../Button";
import { useFormik } from "formik";
import { getCustomers } from "../../api/customer/customer.service";
import { ICustomer } from "../../models/customer.interface";
import { getApartmentType, updateApartment } from "../../api/property/apartment.service";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";

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

  const [loading, setLoading] = useState<boolean>(false);
  const [selectedCustomer, setSelectedCustomer] = useState<ICustomer>();
  const { data: apartmentTypes } = useQuery({
    queryKey: ['apartmentTypes'],
    queryFn: async () => {
            const apartments = await getApartmentType();
            return apartments.data.data;
    }
  });

    const { data: customers, isLoading } = useQuery({
    queryKey: ['customers'],
    queryFn: async () => {
            const x = await getCustomers();
            console.log(x.data.data)
            return x.data.data;
    }
  })


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
  try{
  console.log("Submitting values:", values);
  const data = await updateApartment(apartment.id, apartment.propertyId, values);
  console.log(data)
  handleUpdateModal();
    toast.success(data.data.data);
  }catch(error){
    console.log(error)
    toast.error("Apartment update error")
  }
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
    formik.setFieldValue("customerId", customer.customerId);
  } else {
    formik.setFieldValue("customerId", ""); // clear if not found
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
{/* Customer Phone */}
<p>Customer Phone Number</p>
<input
  list="customers"
  name="customerPhone"
  className="border-2 px-2 py-3 pl-5 bg-grayInput shadow-sm rounded-lg block font-Poppins w-full h-14 text-black text-base mt-1"
  value={
    customers?.find(
      (c) => c.customerId === formik.values.customerId
    )?.phone || ""
  }
  onChange={(e) => handleSearchChange(e.target.value)}
/>

<datalist id="customers">
  {customers &&
    customers.map((customer) => (
      <option key={customer.customerId} value={customer.phone}></option>
    ))}
</datalist>
{formik.values.customerId && (
  <p>
    {
      customers?.find(
        (c) => c.customerId === formik.values.customerId
      )?.firstname
    }{" "}
    {
      customers?.find(
        (c) => c.customerId === formik.values.customerId
      )?.lastname
    }
  </p>
)}

          </div>
        </div>

        {/* Status */}
<div className="flex flex-col">
  <label htmlFor="status">Status</label>
  <select
    id="status"
    value={formik.values.status}
    onChange={(e) =>
      formik.setFieldValue("status", parseInt(e.target.value, 10))
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
