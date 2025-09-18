import { PaginatedTable } from "./PaginatedTable";

import { LuGlasses } from "react-icons/lu";
import { Link } from "react-router-dom";
import { IApartment } from "../models/apartment.interface";
import OccupancyStatusBadge from "../utils/OccupyStatusBadge";
import DropdownMenu from "./DropdownMenu";
import { MdEdit } from "react-icons/md";
import { UpdateApartmentModal } from "./Modal/UpdateApartmentModal";


export default function ApartmentList({ apartments, page, setPage }: any) {
  const handleEditApartmentModal = () => {
    console.log("Free ss")
  } 
  const columns = [
    { header: "Name", accessor: (a: IApartment) => a.customerFullname?.toUpperCase() },
    { header: "Apartment Type", accessor: "apartmentTypeName" },
    { header: "Phone Number", accessor: "customerPhone" },
    {
      header: "Status",
      accessor: (a: IApartment) => <OccupancyStatusBadge status={a.status} />,
    },
    {
      header: "Actions",
      accessor: (a: IApartment) => (

        <DropdownMenu>
                  <div className="flex flex-col  rounded-lg divide-y divide-gray-200 shadow-sm">
        <Link to={`apartments/${a.id}`} state={{ apartment: a }}  className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer">
          <LuGlasses className="text-green-100" /><span>View Apartment</span>
        </Link>
        </div>
              <div  className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                <MdEdit /><span>Edit Apartment</span>
              </div>
 
        <span>Change Customer</span>
        <span>Suspend/Reinstate Apartment</span>
        <span>View Billing</span>
        </DropdownMenu>
      ),
    },
  ];

  return (
    <>
    <PaginatedTable
      columns={columns}
      data={apartments.data.data}
      total={apartments.data.total}
      perPage={apartments.data.per_page}
      page={page}
      setPage={setPage}
      striped
      emptyMessage="No apartments found."
    />

    </>
  );
}
