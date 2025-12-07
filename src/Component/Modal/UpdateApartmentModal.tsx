import React, { useEffect, useState } from "react";
import { IApartment } from "../../models/apartment.interface";
import { Modal } from "./Modal";
import { Button } from "../Button";
import { useFormik } from "formik";
import { getCustomers } from "../../api/customer/customer.service";
import { ICustomer } from "../../models/customer.interface";
import { getApartmentType, updateApartment } from "../../api/property/apartment.service";
import { toast } from "react-toastify";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import Input  from "../InputField";
import { checkApartmentStatus } from "../../api/bill/psp-operator-pricing";

type Props = {
  apartment: IApartment;
  openModal: boolean;
  handleUpdateModal: () => void;
  owing: boolean
};

export const UpdateApartmentModal: React.FC<Props> = ({
  apartment,
  openModal,
  handleUpdateModal,
  owing
}) => {
const queryClient = useQueryClient();

  const [selectedCustomer, setSelectedCustomer] = useState<ICustomer>();
  const { data: apartmentTypes } = useQuery({
    queryKey: ['apartmentTypes'],
    queryFn: async () => {
            const apartments = await getApartmentType();
            return apartments.data.data;
    }
  });

  const { data:status } = useQuery({
    queryKey: ['apartmentStatus'],
    queryFn: async () => {
            const statuses = await checkApartmentStatus(apartment.customerId, apartment.id);
            console.log(statuses.data.data);
            return statuses.data.data;
    }});

    const { data: customers } = useQuery({
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
       queryClient.invalidateQueries({
    queryKey: ["apartment"],
  });
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
              className="
               border-2 px-2 py-3 pl-5 bg-grayInput shadow-sm rounded-lg font-Poppins h-14 text-black text-base mt-1
          block w-full
          border border-gray
          text-base text-gray-800
          placeholder:text-gray-400
          transition-all duration-200 ease-in-out
          focus:outline-none focus:ring-2 focus:ring-offset-1
              "
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
<p className="font-bold text-gray">Customer Phone Number</p>
<Input
              list="customers"
              name="customerPhone"
              className="border-2 px-2 py-3 pl-5 bg-grayInput shadow-sm rounded-lg block font-Poppins w-full h-14 text-black text-base mt-1"
              onChange={(e) => handleSearchChange(e.target.value)}  />

<datalist id="customers">
  {customers &&
    customers?.map((customer) => (
        <option key={customer.customerId} value={customer.phone}>{customer.phone + " - " + customer.firstname + " " + customer.lastname}</option>

    ))}
</datalist>
{formik.values.customerId && (
  <p className="text-green font-bold uppercase">
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
{!status ? <div className="flex flex-col">
  <label htmlFor="status" className="font-bold text-gray">Status</label>
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
</div> :
<h2 className="font-bold text-center text-red-500 text-lg">Customer is owing</h2>
}
        <Button type="submit" className="w-full" loading={formik.isSubmitting}>
          Update Apartment
        </Button>
      </form>
    </Modal>
  );
};
