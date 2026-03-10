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
    <div className="w-full bg-white">
      <div className="px-4 py-3 border-b border-gray-500 bg-slate-900 text-white">
        <h2 className="text-lg font-semibold">{title}</h2>
      </div>

        <ul className="flex flex-row space-y-2">
          {fields && fields?.map(({ key, label }) => (
            <li
              key={key}
              className="flex flex-col space-around border border-gray-500  pb-1 "
            >
              <span className="font-medium text-gray">{label}</span>
               <span className="font-bold uppercase">{ data[key]?.toString() ? data[key]?.toString() : "-"}</span> 
            </li>
          ))}
        </ul>

    </div>
  );
};

export default DataCard;
