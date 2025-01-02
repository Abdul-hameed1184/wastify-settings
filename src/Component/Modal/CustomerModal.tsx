import React, { useEffect, useState } from "react";
import { Modal } from "flowbite-react";
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
import { getPropertyApartments } from "../../api/property/apartment.service";


type Props = {
  propertyId: number;
  openModal: boolean;
  setOpenModal: (x:boolean) => void;
  setOpenCreateApartmentModal: (x:boolean) => void;
  setApartment: (x:IApartment) => void;
  setViewCustomer: (x:boolean) => void
}
const CustomerModal:React.FC<Props> = ({ openModal, setOpenModal, propertyId, setOpenCreateApartmentModal, setApartment, setViewCustomer }) => {
  const [apartments, setApartments] = useState<IApartment[]>([]);


  const viewCustomer = (item:IApartment) => {
    setApartment(item);
    setViewCustomer(true)
  }


  // Fetch data when the modal opens
  useEffect(() => {
    if (openModal) {
      (async() => {
        const data = await getPropertyApartments(propertyId);
        console.log(data.data.data.data);
        setApartments(data.data.data.data);

      })()
    }
  });

  // // Clear customerDetails when modal closes
  // useEffect(() => {
  //   if (!openModal) {
  //     setCustomerDetails([]); // Clear customerDetails when modal closes
  //   }
  // }, [openModal]);

  return (
    <Modal show={openModal} onClose={() => setOpenModal(false)} size={"5xl"}>
      <Modal.Header>Property Details - {apartments[0].propertyAddress}</Modal.Header>
      <Modal.Body>
        <div className="space-y-6">
          <Table striped>
            <TableHead className=" font-Poppins text-lg capitalize text-white bg-green dark:text-white">
              <TableHeadCell>Name</TableHeadCell>
              <TableHeadCell>Apartment Type</TableHeadCell>
              <TableHeadCell>Phone number</TableHeadCell>

              {/* <TableHeadCell>Total overdue Bills</TableHeadCell> */}
            </TableHead>
            <TableBody className="divide-y font-Poppins ">
              {apartments &&
                apartments.map((item:IApartment, index) => (
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
                    <TableCell><ButtonsPrimaryBlack name={"View Bill"} onClick={()=>viewCustomer(item)}/></TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>
      </Modal.Body>
      {/* <Modal.Header>Property Details - {customerDetails[0]?.propertyAddress}</Modal.Header> */}
      <Modal.Footer  className="flex justify-between items-center p-4">
                
      <div className="w-1/3">
          <ButtonsPrimary
            onClick={() => {
              setApartments([]);
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
            name={"Add Apartment"} type={undefined} loading={undefined}          />
            </div>
      </Modal.Footer>
    </Modal>
  );
};

export default CustomerModal;
