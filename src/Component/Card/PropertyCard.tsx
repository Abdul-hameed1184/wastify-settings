import StatusBadge from "../../utils/StatusBadge";
import { ApartmentCard } from "./ApartmentCard";

export function PropertyCard({ property }: { property: Property }) {
  return (
    <div className="border rounded-2xl p-4 space-y-4 bg-white shadow-sm">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2 font-semibold">
          <span className="text-green-600">✔</span>
          {property.address}
        </div>
        <StatusBadge status={property.paymentStatus} />
      </div>

      {/* META */}
      <div className="grid grid-cols-3 gap-3 text-xs text-gray-500">
        <div>
          Ward
          <div className="font-medium text-gray-800">{property.ward}</div>
        </div>
        <div>
          Availability
          <div className="font-medium text-green-600">
            {property.availability}
          </div>
        </div>
        <div>
          Property Code
          <div className="font-medium text-gray-800">
            {property.propertyCode}
          </div>
        </div>
      </div>

      {/* ACTION */}
      <button className="w-full border border-lime-400 text-lime-600 py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-1">
        Hide Apartments ↑
      </button>

      {/* APARTMENTS */}
      <div className="space-y-3">
        {property.apartments.map(apartment => (
          <ApartmentCard
            key={apartment.id}
            apartment={apartment}
          />
        ))}
      </div>
    </div>
  );
}