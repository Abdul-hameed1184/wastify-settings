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

  const toggleAll = () => {
    const allIds = data.flatMap(p => p.apartments.map(a => a.id));
    setSelected(
      allIds.every(id => selected.has(id))
        ? new Set()
        : new Set(allIds)
    );
  };

  return (
    <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-50 border-b">
          <tr className="text-gray-500">
            <th className="px-4 py-3">
              <input type="checkbox" onChange={toggleAll} />
            </th>
            <th className="px-4 py-3 text-left">Address</th>
            <th className="px-4 py-3 text-left">Ward</th>
            <th className="px-4 py-3 text-left">Availability</th>
            <th className="px-4 py-3 text-left">Property Code</th>
            <th className="px-4 py-3 text-left">Payment Status</th>
            <th className="px-4 py-3"></th>
          </tr>
        </thead>

        <tbody>
          {data.map(property => (
            <>
              {/* PROPERTY ROW */}
              <tr
                key={property.id}
                className="bg-gray-50 font-medium border-b cursor-pointer hover:bg-gray-100"
                onClick={() => toggleExpand(property.id)}
              >
                <td className="px-4 py-3">
                  <input
                    type="checkbox"
                    checked={property.apartments.every(a =>
                      selected.has(a.id)
                    )}
                    onChange={() => toggleProperty(property)}
                    onClick={(e) => e.stopPropagation()}
                  />
                </td>
                <td className="px-4 py-3 flex items-center gap-2">
                  {expandedProperties.has(property.id) ? (
                    <IoChevronDown className="text-gray-400" />
                  ) : (
                    <IoChevronForward className="text-gray-400" />
                  )}
                  {property.address}
                </td>
                <td className="px-4 py-3">{property.ward}</td>
                <td className="px-4 py-3">
                  <StatusBadge status={property.availability} />
                </td>
                <td className="px-4 py-3 text-gray-600">
                  {property.propertyCode}
                </td>
                <td className="px-4 py-3">
                  <StatusBadge status={property.paymentStatus} />
                </td>
                <td className="px-4 py-3 text-right text-gray-400">
                  ⋮
                </td>
              </tr>

              {/* APARTMENT ROWS */}
              {expandedProperties.has(property.id) &&
                property.apartments.map(apartment => (
                  <tr
                    key={apartment.id}
                    className="border-b last:border-b-0 bg-white"
                  >
                    <td className="px-4 py-3">
                      <input
                        type="checkbox"
                        checked={selected.has(apartment.id)}
                        onChange={() => toggleItem(apartment.id)}
                      />
                    </td>
                    <td className="px-4 py-3 pl-10 font-medium">
                      {apartment.name}
                    </td>
                    <td className="px-4 py-3 text-gray-600">
                      {apartment.type}
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge status={apartment.availability} />
                    </td>
                    <td className="px-4 py-3 text-gray-600">
                      {apartment.phone}
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge status={apartment.paymentStatus} />
                    </td>
                    <td className="px-4 py-3 text-right text-gray-400">
                      ⋮
                    </td>
                  </tr>
                ))}
            </>
          ))}
        </tbody>
      </table>
      <div>
          {
            data && data.length > 0 && data.map((property:IProperty) =>{
              return <PropertyCard property={property} />
            }) 
          }
      </div>
    </div>
  );
};
