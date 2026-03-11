import React from "react";

type Field = {
  key: string;   // the object key
  label: string; // the display label
};

type DataCardProps = {
  data: object;
  fields: Field[];
};

const DataCard: React.FC<DataCardProps> = ({ data, fields }) => {
  return (


        <ul className="flex md:flex-row flex-col justify-between w-full border border-gray-300 rounded-lg">
          {fields && fields?.map(({ key, label }) => (
            <li
              key={key}
              className="flex flex-col flex-1  px-3 py-2 border md:border-x border-y border-gray-300 "
            >
              <span className="font-medium text-gray-500">{label}</span>
               <span className="font-medium uppercase">{ data[key]?.toString() ? data[key]?.toString() : "-"}</span> 
            </li>
          ))}
        </ul>

  );
};

export default DataCard;
