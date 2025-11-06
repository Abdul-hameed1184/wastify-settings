import React, { useState } from "react";
import { Button } from "../Button";
import { Modal } from "./Modal";
import { IBillData } from "../../models/billdata.interface";
import { Naira } from "../../utils/format";

type Props = {
  handleBillPayment: (x: IBillData) => void;
  bill: IBillData;
  isOpen: boolean;
  handleOpen: () => void;
};

export const PayBillModal: React.FC<Props> = ({ bill, isOpen, handleOpen, handleBillPayment }) => {
  const [isAgreed, setIsAgreed] = useState(false);

  return (
    <Modal isOpen={isOpen} onClose={handleOpen} title="Confirmation Page" size="lg">
      <div className="w-full space-y-3">
        <h2 className="text-xl font-semibold text-gray-700 mb-2">
          Confirm your billing details before proceeding
        </h2>
                <p className="flex justify-between">
          <span className="font-semibold text-gray-400">Customer name</span>
          <span className="text-black font-bold uppercase">{bill.customerFullname}</span>
        </p>

        <p className="flex justify-between">
          <span className="font-semibold text-gray-400">Property Code</span>
          <span className="text-black font-bold uppercase">{bill.propertyCode}</span>
        </p>
        <p className="flex justify-between">
          <span className="font-semibold text-gray-400">Bill Period</span>
          <span className="text-black font-bold uppercase">{bill.billPeriod}</span>
        </p>
        <p className="flex justify-between">
          <span className="font-semibold text-gray-400">PSP Operator</span>
          <span className="text-black font-bold uppercase">{bill.pspOperatorBusinessname}</span>
        </p>
        <p className="flex justify-between">
          <span className="font-semibold text-gray-400">Bill Address</span>
          <span className="text-black font-bold uppercase">{bill.propertyAddress}</span>
        </p>
        <p className="flex justify-between">
          <span className="font-semibold text-gray-400">Bill Amount</span>
          <span className="text-black font-bold uppercase">
            {Naira.format(parseFloat(bill.billAmount))}
          </span>
        </p>
        <p className="flex justify-between">
          <span className="font-semibold text-gray-400">Amount to Pay</span>
          <span className="text-black font-bold uppercase">
            {Naira.format(parseFloat(bill.totalAmount))}
          </span>
        </p>
        <p className="flex justify-between">
          <span className="font-semibold text-gray-400">Customer Name</span>
          <span className="text-black font-bold uppercase">{bill.customerName}</span>
        </p>

        {/* Checkbox */}
        <label htmlFor="agree" className="flex items-center gap-2 mt-4 text-gray-700">
          <input
            type="checkbox"
            id="agree"
            checked={isAgreed}
            onChange={(e) => setIsAgreed(e.target.checked)}
            className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          I hereby agree to make the following payment
        </label>

        {/* Button */}
        <Button
          className={`w-full mt-4 ${
            !isAgreed ? "opacity-60 cursor-not-allowed" : ""
          }`}
          onClick={() => handleBillPayment(bill)}
          disabled={!isAgreed}
        >
          Pay {Naira.format(parseFloat(bill.totalAmount))}
        </Button>
      </div>
    </Modal>
  );
};
