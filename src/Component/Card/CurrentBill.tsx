import React from "react";

import { Button } from "../Button";
import { Naira } from "../../utils/format";
import { IBillData } from "../../models/billdata.interface";


type Props = {
  bill:IBillData
  handlePayNow: () => void
}
const CurrentBill:React.FC<Props> = ({bill, handlePayNow}) => {



  return (
    <div className="my-6 mx-3 bg-white shadow-lg rounded-2xl  max-w-xl overflow-hidden">
      {/* Header */}
      <div className="bg-green text-white px-6 py-3">
        <h2 className="text-lg font-semibold">{bill.billPeriod}</h2>
      </div>

      {/* Bill Details */}
      <div className="px-6 py-4 space-y-4 text-gray-700">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2  pb-2">
          <p className="font-medium">
            Property Code: <span className="font-normal text-gray-500">WBSR020423</span>
          </p>
        </div>

        <div className="pb-2">
          <p className="font-medium">
            Psp Operator:{" "}
            <span className="font-normal">BlackJohn Waste Services</span>
          </p>
        </div>

        <div className=" pb-2">
          <p className="font-medium">
            Property Address:{" "}
            <span className="font-normal">25 Ikorodu road</span>
          </p>
        </div>

        {/* Highlighted Amount + Pay Button */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-gray-50 rounded-lg py-3 gap-3">
         
          <div className="font-medium text-lg text-gray-800 flex flex-col">
            <span>Current Amount Due</span>
            <span className="font-bold text-red-600 text-4xl">{Naira.format(parseFloat(bill.totalAmount))}</span>
          </div>
          <Button type="button" onClick={handlePayNow}>
            Pay Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CurrentBill;
