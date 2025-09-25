import React, { useEffect, useState } from "react";
import { IApartment } from "../../models/apartment.interface";
import { Modal } from "./Modal";
import { Button } from "../Button";
import { Input } from "../InputField";
import { useFormik } from "formik";
import { getCustomers } from "../../api/customer/customer.service";
import { IApartmentType } from "../../models/apartmentType.interface";
import { ICustomer } from "../../models/customer.interface";
import { getApartmentType } from "../../api/property/apartment.service";

// Mock customer list (replace with API data)
const customers = [
  { id: "1", name: "John Doe" },
  { id: "2", name: "Jane Smith" },
  { id: "3", name: "Michael Johnson" },
];

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
    const [ apartmentTypeId, setApartmentTypeId ] = useState<number>(apartment.apartmentTypeId);
    const [ apartmentTypes, setApartmentTypes ] = useState<IApartmentType[]>();
    const [ customers, setCustomers ] = useState<ICustomer[]>();
    const [ selectedCustomer, setSelectedCustomer ] = useState<ICustomer>();
      useEffect(() => {
        (async () => {
          const apartments = await getApartmentType();
          setApartmentTypes(apartments.data.data);
          const data = await getCustomers();
          setCustomers(data.data.data);
        })();
      }, []);
  const handleUpdateApartment = (values) => {
    console.log("Updated values:", values);
    // TODO: call API
  };

  const formik = useFormik({
    initialValues: {
      customerId: apartment.customerId || "",
      description: apartment.description || "",
      apartmentTypeId: apartment.apartmentTypeId || "",
      status: apartment.status || false,
    },
    onSubmit: (values) => handleUpdateApartment(values),
  });
  const handleSearchChange = (search: string) => {
    const customer = customers.find((c) => c.phone === search);
    setSelectedCustomer(customer);
  };
  return (
    <Modal
      isOpen={openModal}
      onClose={handleUpdateModal}
      title="Update Apartment"
    >
  <form onSubmit={formik.handleSubmit}  className="z-0 space-y-6 bg-gray-900/50 backdrop-blur-sm m-4">
            <div className="space-y-6">
              <div>
                <div>
                  <h2>{"Apartment Type"} </h2>
                  <select
                    className="border-2 px-2 py-3 pl-5 bg-grayInput shadow-sm rounded-lg block font-Poppins w-full h-14 text-black text-base mt-1"
                    onChange={(e) => {
                      const id = parseInt(e.target.value, 10);
                      setApartmentTypeId(id);
                      formik.setFieldValue(
                        "apartmentTypeId",
                        id
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
                  <p>{"Customer Phone Number"} </p>
                  <input
                    list="customers"
                     className="border-2 px-2 py-3 pl-5 bg-grayInput shadow-sm rounded-lg block font-Poppins w-full h-14 text-black text-base mt-1"

                    onChange={(e) => {
                      handleSearchChange(e.target.value);
                
                      formik.setFieldValue(
                        "customerId",
                        selectedCustomer?.customerId
                      );
                    }}
                    

                                     />
                  <datalist id="customers">
                    {customers &&
                      customers.map((customer) => {
                        return (
                          <option
                            key={customer.customerId}
                            value={customer.phone}
                          >
                            {customer.phone}
                          </option>
                        );
                      })}
                  </datalist>
                  {selectedCustomer && (
                    <p>
                      {
                        selectedCustomer.firstname +
                        " " +
                        selectedCustomer.lastname
                      }
                    </p>
                  )}
                </div>
                <div className="mt-2">
                  {/* {!selectedCustomer && (
                    <ButtonsPrimary
                      disabled={selectedCustomer !== undefined}
                      name={"Create New Customer"}
                      onClick={() => setShowCreateCustomer(!showCreateCustomer)}
                      type={"button"}
                    />
                  )} */}
                </div>
              </div>
            </div>



            <div className=" w-full">
              <Button
                type="submit">Update Apartment</Button>
            </div>

        </form>
    </Modal>
  );
};
