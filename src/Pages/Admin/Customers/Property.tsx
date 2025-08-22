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
import {
  ButtonsPrimaryBlack,
} from "../../../Component/Buttons";
import { IApartment } from "../../../models/apartment.interface";
import CreateApartmentModal from "../../../Component/Modal/CreateApartmentModal";
import { IProperty } from "../../../models/property.interface";
import Loader from "../../../Component/Loader";
import { LuGlasses } from "react-icons/lu";

const Property: React.FC = () => {
  const { propertyId } = useParams();
  const location = useLocation();
  const { state } = location;
  console.log(state);
  const property: IProperty = state.property;

  const [openCreateApartmentModal, setOpenCreateApartmentModal] =
    useState<boolean>(false);
  useEffect(() => {
    (async () => {
      const id = parseInt(propertyId || "");
      const data = await getPropertyApartments(id);
      setApartments(data.data.data.data);
      console.log(data.data.data);
    })();
  }, []);


  const [apartments, setApartments] = useState<IApartment[]>([]);

  return (
    <div className="p-4 ">
      <div className="">
        {property && <fieldset className="border border-2 border-gray rounded-md p-4">
          <legend className="text-2xl font-semibold text-gray px-2">
            Property Information
          </legend>
          <div>
            <span className="block text-xl font-medium text-gray-700">
              Property Owner
            </span>
            <span className="block text-2xl">
              {property?.ownerFullname?.toUpperCase() || "No Name"}
            </span>
          </div>
          <div>
            <span className="block text-xl font-medium text-gray-700">
              Property Address
            </span>
            <span className="block text-2xl">{property.propertyAddress}</span>
          </div>
        </fieldset>}
      </div>
      <div>
        <div className="grid justify-items-end my-8">
          <div className="md:w-1/3 w-full">
            <ButtonsPrimaryBlack
              onClick={() => {
                setOpenCreateApartmentModal(true);
              }}
              name={"Add Apartment"}
              type={"button"}
              loading={undefined}
            />
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <Table striped>
          <TableHead className=" font-Poppins text-xl capitalize text-white bg-slate-900 dark:text-white">
            <TableHeadCell>Name</TableHeadCell>
            <TableHeadCell>Apartment Type</TableHeadCell>
            <TableHeadCell>Phone number</TableHeadCell>
            <TableHeadCell>Bill</TableHeadCell>
            {/* <TableHeadCell>Total overdue Bills</TableHeadCell> */}
          </TableHead>
          <TableBody className="divide-y font-Poppins text-xl">
            {!apartments && <Loader color="black" />}
            {apartments &&
              apartments.map((item: IApartment, index) => (
                <TableRow
                  className={
                    index % 2 === 0
                      ? "odd:bg-tableBackground"
                      : "bg-white dark:border-gray-700 dark:bg-gray-800"
                  }
                  key={index}
                >
                  <TableCell>{item.customerFullname.toUpperCase()} </TableCell>
                  <TableCell>{item.apartmentTypeName} </TableCell>
                  <TableCell>{item.customerPhone} </TableCell>
                  <TableCell>
          
                                   <Link        to={`apartments/${item.id}`}
                      state={{ apartment: item }}><LuGlasses className="text-green-100" /></Link>
                      {/* <Buttonx name={"View Bill"} className="bg-slate-900" /> */}
         
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
     

      {property && (
        <CreateApartmentModal
          openModal={openCreateApartmentModal}
          setOpenModal={setOpenCreateApartmentModal}
          property={property}
        />
      )}
    </div>
  );
};

export default Property;
