import React, { useEffect, useState } from "react";
import axios from "axios";
import baseURL from "../../utils/apiConfig";
import { Button, Modal } from "flowbite-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";
import { ButtonsPrimary, ButtonsPrimaryBlack } from "../Buttons";
import { IApartment } from "../../models/apartment.interface";


type Props = {
  propertyId: number;
  openModal: boolean;
  setOpenModal: (x:boolean) => void;
  setOpenCreateApartmentModal: (x:boolean) => void;
}
const CustomerModal:React.FC<Props> = ({ openModal, setOpenModal, propertyId, setOpenCreateApartmentModal }) => {
  const [customerDetails, setCustomerDetails] = useState([]);

  const HandleAllPropertyCustomers = async () => {
    if (propertyId) {
      try {
        const res = await axios.get(
          baseURL + "apartment/apartment-by-property-id/" + propertyId,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const responseData = res.data.data.data;
        console.log("customer", responseData);
        setCustomerDetails(responseData);
      } catch (err) {
        console.log(err);
      }
    }
  };

  // Fetch data when the modal opens
  useEffect(() => {
    if (openModal) {
      HandleAllPropertyCustomers();
    }
  }, [openModal]);

  // Clear customerDetails when modal closes
  useEffect(() => {
    if (!openModal) {
      setCustomerDetails([]); // Clear customerDetails when modal closes
    }
  }, [openModal]);

  return (
    <Modal show={openModal} onClose={() => setOpenModal(false)} size={"5xl"}>
      <Modal.Header>Customer Details</Modal.Header>
      <Modal.Body>
        <div className="space-y-6">
          <Table striped>
            <TableHead className=" font-Poppins text-sm capitalize text-white bg-green dark:text-white">
              <TableHeadCell>Name</TableHeadCell>
              <TableHeadCell>Apartment Type</TableHeadCell>
              <TableHeadCell>Phone number</TableHeadCell>

              {/* <TableHeadCell>Total overdue Bills</TableHeadCell> */}
            </TableHead>
            <TableBody className="divide-y font-Poppins ">
              {customerDetails &&
                customerDetails?.map((item:IApartment, index) => (
                  <TableRow
                    className={
                      index % 2 === 0
                        ? "odd:bg-tableBackground"
                        : "bg-white dark:border-gray-700 dark:bg-gray-800"
                    }
                    key={index}
                  >
                    <TableCell>{item.customerFullname} </TableCell>
                    <TableCell>{item.apartmentTypeName} </TableCell>
                    <TableCell>{item.customerPhone} </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>
      </Modal.Body>
      <Modal.Footer  className="flex justify-between items-center p-4">

      <div className="w-1/3">
          <ButtonsPrimary
            onClick={() => {
              setCustomerDetails([]);
              setOpenModal(false);
            } }
            name={"Done"} type={undefined} loading={undefined}          />
 
</div>
<div className="w-1/3">
<ButtonsPrimary
            onClick={() => {
              setOpenCreateApartmentModal(true)
              setOpenModal(false);
            } }
            name={"Add Customer"} type={undefined} loading={undefined}          />
            </div>
      </Modal.Footer>
    </Modal>
  );
};

export default CustomerModal;
