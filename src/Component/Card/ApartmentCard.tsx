import { IApartment } from "../../models/apartment.interface";
import StatusBadge from "../../utils/StatusBadge";

export const ApartmentCard = ({ apartment }: { apartment: IApartment }) => {
  return (
    <div className="border rounded-xl p-4 space-y-3 bg-white">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2 font-medium">
          <span className="text-green-600">✔</span>
          {apartment.customerFullname}
        </div>
        <StatusBadge status={apartment.status} />
      </div>

      <div className="grid grid-cols-2 gap-y-2 text-xs text-gray-500">
        <div>
          Availability
          <div className={`font-medium ${apartment.availability === "Vacant" ? "text-red-500" : "text-green-600"}`}>
            {apartment.availability}
          </div>
        </div>

        <div>
          Building Type
          <div className="font-medium text-gray-800">
            {apartment.buildingType}
          </div>
        </div>

        <div>
          Phone Number
          <div className="font-medium text-gray-800">
            {apartment.phone}
          </div>
        </div>
      </div>

      <button className="w-full border border-lime-400 text-lime-600 py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-1">
        Take Action →
      </button>
    </div>
  );
}