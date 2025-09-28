import React from "react";
import { useNavigate } from "react-router-dom";
import { Paragraph2, ParagraphSmall2 } from "../Paragraph";
import { ButtonsPrimary } from "../Buttons";
import { Button } from "../Button";

const CurrentBill = () => {
  const navigate = useNavigate();

  const HandlePay = () => {
    navigate("/payamount");
  };

  return (
    <div className="my-6 mx-3 bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-200">
      {/* Header */}
      <div>
        <h2 className="text-lg font-semibold">Current Bill</h2>
      </div>

      {/* Bill Details */}
      <div className="px-6 py-4 space-y-3 text-gray-700">
        <div className="flex justify-between pb-2">
          <p>Property Code: {"WBSR020423"}</p>
          <p>Bill Period: {"December 2023"}</p>
        </div>

        <div className="flex justify-between pb-2">
          <ParagraphSmall2 content="Psp Operator:" />
          <Paragraph2 content="Touch and Clean Limited" />
        </div>

        <div className="flex justify-between pb-2">
          <p>Property Address:{"79 Boudillon Drive" } </p>
        </div>

        {/* Highlighted Amount */}
        <div className="flex justify-between items-center bg-gray-50 rounded-lg px-4 py-3">
          <p>Current Amount Due:{"₦69,000"}</p>
        <Button type="button" onClick={HandlePay}>Pay Now</Button>
        </div>
      </div>

      {/* Pay Button */}
      <div className="px-6 py-4 border-t bg-gray-50 flex justify-end">

      </div>
    </div>
  );
};

export default CurrentBill;
