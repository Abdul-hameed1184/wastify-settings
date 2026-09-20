import { useState } from "react";
import StatusBadge from "../utils/StatusBadge";
import { IoChevronDown, IoChevronForward } from "react-icons/io5";
import { PropertyCard } from "./Card/PropertyCard";
import { IProperty } from "../models/property.interface";





export const ApartmentsTable = () => {
  const data: IProperty[] = [
    {
      id: "property-1",
      address: "89, Igbeyin Adun Street",
      ward: "Ikotun / Igogun",
      propertyCode: "WFLAALIK00038",
      availability: "Occupied",
      paymentStatus: "Owing",
      apartments: [
        {
          id: "apt-1",
          name: "DAM OYINDA",
          type: "1 Bedroom Flat",
          phone: "07048026748",
          availability: "Vacant",
          paymentStatus: "Paid",
        },
        {
          id: "apt-2",
          name: "TAIWO BAMGBOSE",
          type: "3 Bedroom Flat",
          phone: "07026891356",
          availability: "Occupied",
          paymentStatus: "Owing",
        },
      ],
    },
    {
      id: "property-2",
      address: "49, Igbeyin Adun Street",
      ward: "Ikotun / Igogun",
      propertyCode: "WFLAALIK00038",
      availability: "Occupied",
      paymentStatus: "Owing",
      apartments: [
        {
          id: "apt001-2",
          name: "TAIWO BAMGBOSE",
          type: "3 Bedroom Flat",
          phone: "07026891356",
          availability: "Occupied",
          paymentStatus: "Owing",
        },
      ],
    },
    {
      id: "property-3",
      address: "89, Igbeyin Adun Street",
      ward: "Ikotun / Igogun",
      propertyCode: "WFLAALIK00038",
      availability: "Occupied",
      status: "Owing",
      apartments: [
        {
          id: "apt002-1",
          name: "DAM OYINDA",
          type: "1 Bedroom Flat",
          phone: "07048026748",
          availability: "Vacant",
          paymentStatus: "Paid",
        },
        {
          id: "apt002-2",
          name: "TAIWO BAMGBOSE",
          type: "3 Bedroom Flat",
          phone: "07026891356",
          availability: "Occupied",
          paymentStatus: "Owing",
        },
        {
          id: "apt002-4",
          name: "DAM OYINDA",
          type: "1 Bedroom Flat",
          phone: "07048026748",
          availability: "Vacant",
          paymentStatus: "Paid",
        },
        {
          id: "apt002-3",
          name: "TAIWO BAMGBOSE",
          type: "3 Bedroom Flat",
          phone: "07026891356",
          availability: "Occupied",
          paymentStatus: "Owing",
        },
      ],
    },
  ];

  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [expandedProperties, setExpandedProperties] = useState<Set<string>>(new Set());

  const toggleExpand = (propertyId: string) => {
    const copy = new Set(expandedProperties);
    copy.has(propertyId) ? copy.delete(propertyId) : copy.add(propertyId);
    setExpandedProperties(copy);
  };

  const toggleItem = (id: string) => {
    const copy = new Set(selected);
    copy.has(id) ? copy.delete(id) : copy.add(id);
    setSelected(copy);
  };

  const toggleProperty = (property: any) => {
    const copy = new Set(selected);
    const allChecked = property.apartments.every((a: any) =>
      copy.has(a.id)
    );

    property.apartments.forEach((a: any) =>
      allChecked ? copy.delete(a.id) : copy.add(a.id)
    );

    setSelected(copy);
  };
  const { data: properties, isLoading } = useQuery({
    queryKey: ['properties'],
    queryFn: async () => {
      const xy = await getProperties();
      console.log(xy);
      return xy.data.data;
    }
  })
  const toggleAll = () => {
    const allIds = data.flatMap(p => p.apartments.map(a => a.id));
    setSelected(
      allIds.every(id => selected.has(id))
        ? new Set()
        : new Set(allIds)
    );
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-lg overflow-hidden">
      <table className="min-w-full text-sm text-left border-collapse whitespace-nowrap">
        <thead className="bg-gray-50 text-gray-600 text-xs tracking-wider uppercase border-b border-gray-100">
          <tr>
            <th className="px-6 py-4 font-semibold w-10">
              <input type="checkbox" onChange={toggleAll} className="w-4 h-4 text-green bg-gray-100 border-gray-300 rounded focus:ring-green focus:ring-2 cursor-pointer transition-colors" />
            </th>
            <th className="px-6 py-4 font-semibold">Address</th>
            <th className="px-6 py-4 font-semibold">Ward</th>
            <th className="px-6 py-4 font-semibold">Availability</th>
            <th className="px-6 py-4 font-semibold">Property Code</th>
            <th className="px-6 py-4 font-semibold">Payment Status</th>
            <th className="px-6 py-4"></th>
          </tr>
        </thead>

        <tbody>
          {data.map(property => (
            <>
              {/* PROPERTY ROW */}
              <tr
                key={property.id}
                className="bg-gray-50/40 font-medium border-b border-gray-100 cursor-pointer hover:bg-green-50/20 transition-colors duration-200"
                onClick={() => toggleExpand(property.id)}
              >
                <td className="px-6 py-5">
                  <input
                    type="checkbox"
                    checked={property.apartments.every(a =>
                      selected.has(a.id)
                    )}
                    onChange={() => toggleProperty(property)}
                    onClick={(e) => e.stopPropagation()}
                    className="w-4 h-4 text-green bg-gray-100 border-gray-300 rounded focus:ring-green focus:ring-2 cursor-pointer"
                  />
                </td>
                <td className="px-6 py-5 flex items-center gap-3 text-gray-800">
                  <span className="flex items-center justify-center bg-white shadow-sm border border-gray-200 rounded p-1">
                    {expandedProperties.has(property.id) ? (
                      <IoChevronDown className="text-gray-500 w-3 h-3 transition-transform" />
                    ) : (
                      <IoChevronForward className="text-gray-500 w-3 h-3 transition-transform" />
                    )}
                  </span>
                  {property.address}
                </td>
                <td className="px-6 py-5 text-gray-600">{property.ward}</td>
                <td className="px-6 py-5">
                  <StatusBadge status={property.availability} />
                </td>
                <td className="px-6 py-5 text-gray-600 font-mono text-sm tracking-wide">
                  {property.propertyCode}
                </td>
                <td className="px-6 py-5">
                  <StatusBadge status={property.paymentStatus} />
                </td>
                <td className="px-6 py-5 text-right text-gray-400">
                  <button className="p-1.5 rounded-md hover:bg-gray-200 hover:text-gray-700 transition-colors">⋮</button>
                </td>
              </tr>

              {/* APARTMENT ROWS */}
              {expandedProperties.has(property.id) &&
                property.apartments.map(apartment => (
                  <tr
                    key={apartment.id}
                    className="border-b border-gray-100 last:border-none bg-white hover:bg-gray-50/80 transition-colors duration-200"
                  >
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={selected.has(apartment.id)}
                        onChange={() => toggleItem(apartment.id)}
                        className="w-4 h-4 text-green bg-gray-100 border-gray-300 rounded focus:ring-green focus:ring-2 ml-1 cursor-pointer"
                      />
                    </td>
                    <td className="px-6 py-4 pl-[4.5rem] font-medium text-gray-700">
                      {apartment.name}
                    </td>
                    <td className="px-6 py-4 text-gray-500">
                      {apartment.type}
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={apartment.availability} />
                    </td>
                    <td className="px-6 py-4 text-gray-500 font-mono text-sm">
                      {apartment.phone}
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={apartment.paymentStatus} />
                    </td>
                    <td className="px-6 py-4 text-right text-gray-400">
                      <button className="p-1.5 rounded-md hover:bg-gray-100 hover:text-gray-700 transition-colors">⋮</button>
                    </td>
                  </tr>
                ))}
            </>
          ))}
        </tbody>
      </table>
      {/* <div>
        {
          data && data.length > 0 && data.map((property: IProperty) => {
            return <PropertyCard property={property} />
          })
        }
      </div> */}
    </div>
  );
};
