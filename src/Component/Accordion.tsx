import React from "react";
import { IoCheckmarkDoneOutline } from "react-icons/io5";
import { TfiAngleUp, TfiAngleDown } from "react-icons/tfi";

type AccordionProps = {
  infolist: string[];
  itemNumber: string;
  titleText?: string;
  isOpen: boolean;
  onToggle: () => void;
};

export const Accordion: React.FC<AccordionProps> = ({
  infolist,
  itemNumber,
  titleText,
  isOpen,
  onToggle,
}) => {
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onToggle();
    }
  };

  return (
    <div className="flex flex-col border mt-2 gap-4 px-4 py-4 border-gray-200 rounded-2xl w-full">
      <div
        role="button"
        tabIndex={0}
        aria-expanded={isOpen}
        onClick={onToggle}
        onKeyDown={onKeyDown}
        className="flex items-center justify-between w-full cursor-pointer"
      >
        <div className="flex items-center">
          <span className="px-4 py-2 bg-green/10 rounded-md mr-4">
            {itemNumber}
          </span>
          <p className="text-xl">{titleText}</p>
        </div>

        {isOpen ? <TfiAngleUp /> : <TfiAngleDown />}
      </div>

      {isOpen && (
        <div className="transition-all duration-300">
          {infolist && infolist.map((info, index) => (
            <p key={index} className="mb-4 flex gap-2">
              <IoCheckmarkDoneOutline className="text-green text-xl" />
              <span className="text-gray-500">{info}</span>
            </p>
          ))}
        </div>
      )}
    </div>
  );
};
