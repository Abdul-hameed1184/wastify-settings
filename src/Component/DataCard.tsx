import React from "react";

type Field = {
  key: string;   // the object key
  label: string; // the display label
};

type DataCardProps = {
  title: string;
  data: object;
  fields: Field[];
};

const DataCard: React.FC<DataCardProps> = ({ title, data, fields }) => {
  return (
    <div className="w-full max-w-md rounded-2xl shadow-md border border-gray-200 bg-white">
      <div className="px-4 py-3 border-b border-gray-200 bg-slate-900 text-white">
        <h2 className="text-lg font-semibold">{title}</h2>
      </div>
      <div className="px-4 py-3">
        <ul className="space-y-2">
          {fields && fields.map(({ key, label }) => (
            <li
              key={key}
              className="flex justify-between  pb-1 "
            >
              <span className="font-medium text-gray-700">{label}</span>
               <span className="text-gray-600">{ data[key]?.toString() ? data[key]?.toString() : "-"}</span> 
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DataCard;
