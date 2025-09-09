import { PaginatedTable } from "./PaginatedTable";

import { LuGlasses } from "react-icons/lu";
import { Link } from "react-router-dom";
import { IApartment } from "../models/apartment.interface";
import OccupancyStatusBadge from "../utils/OccupyStatusBadge";


export default function ApartmentList({ apartments, page, setPage }: any) {
  const columns = [
    { header: "Property Code", accessor: "propertyCode" },
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
        <Link to={`apartments/${a.id}`} state={{ apartment: a }}>
          <LuGlasses className="text-green-100" />
        </Link>
      ),
    },
  ];

  return (
    <PaginatedTable<IApartment>
      columns={columns}
      data={apartments.data.data}
      total={apartments.data.total}
      perPage={apartments.data.per_page}
      page={page}
      setPage={setPage}
      striped
      emptyMessage="No apartments found."
    />
  );
}
