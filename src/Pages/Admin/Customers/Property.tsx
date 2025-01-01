import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";
import { Link, useLocation, useParams } from "react-router-dom";
import { getPropertyApartments } from "../../../api/property/apartment.service";
import { ButtonsPrimaryBlack } from "../../../Component/Buttons";
import { IApartment } from "../../../models/apartment.interface";
import CreateApartmentModal from "../../../Component/Modal/CreateApartmentModal";
import { IProperty } from "../../../models/property.interface";
import { Paragraph2Xl } from "../../../Component/Paragraph";


const Property:React.FC = () => {
  const { propertyId } = useParams();  
  const location = useLocation();
  const { state } = location;
  console.log(state)
  const property:IProperty = state.property;

  const [ openCreateApartmentModal, setOpenCreateApartmentModal ] = useState<boolean>(false);
  useEffect(()=> {
    (async() => {
      const id = parseInt(propertyId||"");
      const data = await getPropertyApartments(id);
      setApartments(data.data.data.data);
      console.log(data.data.data)

    })()
  },[])
  const [apartments, setApartments] = useState<IApartment[]>([]);


  return (
    <div>
    <div className="flex flex-column justify-between">
<Paragraph2Xl content={"Property Details - " + property.propertyAddress} />
<div className="w-1/3">
<ButtonsPrimaryBlack
    onClick={() => {
      setOpenCreateApartmentModal(true)
    } }
    name={"Add Apartment"} type={undefined} loading={undefined}          />
    </div>
    </div>

<div className="space-y-6">
  <Table striped>
    <TableHead className=" font-Poppins text-xl capitalize text-white bg-black dark:text-white">
      <TableHeadCell>Name</TableHeadCell>
      <TableHeadCell>Apartment Type</TableHeadCell>
      <TableHeadCell>Phone number</TableHeadCell>
      <TableHeadCell>Bill</TableHeadCell>
      {/* <TableHeadCell>Total overdue Bills</TableHeadCell> */}
    </TableHead>
    <TableBody className="divide-y font-Poppins text-xl">
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
            <TableCell><Link to={"bill"} state={{apartment: item}}><ButtonsPrimaryBlack name={"View Bill"} /></Link></TableCell>
          </TableRow>
        ))}
    </TableBody>
  </Table>
</div>

    {property && <CreateApartmentModal openModal={openCreateApartmentModal} setOpenModal={setOpenCreateApartmentModal} property={property}  />
  } 
    </div>
  );
};

export default Property;


