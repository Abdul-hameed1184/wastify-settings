// ...existing code...
import { IoCheckmarkDoneOutline } from "react-icons/io5"
import React from "react"
import { TfiAngleDown, TfiAngleUp } from "react-icons/tfi";

type AccordionProps = {
    infolist: string[];
    itemNumber: string;
    titleText?: string;
    defaultOpen?: boolean;
}

export const Accordion:React.FC<AccordionProps>  = ({  infolist, itemNumber, titleText, defaultOpen = false }) => {
   const [ open, setOpen ] = React.useState<boolean>(defaultOpen);
   const toggle = () => setOpen(v => !v);
   const onKeyDown = (e: React.KeyboardEvent) => {
     if (e.key === "Enter" || e.key === " ") {
       e.preventDefault();
       toggle();
     }
   }

    return (
      <div className="flex flex-col items-center justify-between border mt-2 gap-4 px-4 py-4 border-gray-200 rounded-2xl w-full">
        <div
          role="button"
          tabIndex={0}
          aria-expanded={open}
          onClick={toggle}
          onKeyDown={onKeyDown}
          className="flex items-center justify-between w-full focus:outline-none"
        >
        <div className="flex items-center">
                    <span className="text-center px-4 py-2 bg-green/10 rounded-md mr-4">
                      {itemNumber}
                    </span>
                    <span>
                      <p className="text-xl">{titleText}</p>
                    </span>
                  </div>
          <span aria-hidden>
            {open ? <TfiAngleUp className="text-lg" /> : <TfiAngleDown className="text-lg" />}
          </span>
        </div>

  { open &&     <div
          className={
          "flex items-center w-full focus:outline-none text-left bg-white/10 p-0  rounded-2xl overflow-hidden transition-all duration-300 " +
            (open ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0")
          }
          aria-hidden={!open}
        >
          <div className="text-left  m-0 p-0">
            {
                infolist && infolist.map((info, index) => (
                    <p key={index} className="mb-4 flex items-start  text-left justify-left">
                        <span className="text-2xl text-green m-0 p-0"><IoCheckmarkDoneOutline /></span>
                        <span className="text-gray-500 m-0 p-0">{info}</span>
                    </p>
                ))
            }
          </div>
        </div>}
      </div>
    )
}
// ...existing code...