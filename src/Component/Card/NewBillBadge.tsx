import React from "react";

type Props = {
  amount: number;
  message?: string;
};

const NewBillBoard: React.FC<Props> = ({ amount, message }) => {
  const today = new Date();
  const day = today.getDate();
  const month = today.toLocaleString("default", { month: "long" }); // e.g. September
  const year = today.getFullYear();

  // Only show if today's date is between 1 and 5
  if (day < 1 || day > 5) {
    return null;
  }

  return (
    <div className="w-full max-w-lg mx-auto bg-red-50 border border-red-200 text-center rounded-2xl shadow-lg p-8">
      <h2 className="text-2xl font-bold text-red-700 mb-3">
        📢 New Bill Alert!
      </h2>
      <p className="text-gray-700 text-lg mb-4">
        {message || "You have a new bill to settle."}
      </p>
      <div className="bg-red-100 rounded-xl py-4">
        <p className="text-sm text-gray-600">Amount Due</p>
        <p className="text-3xl font-extrabold text-red-700">
          ₦{amount.toLocaleString()}
        </p>
        {/* <p className="text-sm text-gray-600 mt-2">for the month of</p>
        <p className="text-lg font-semibold text-gray-800">
          {month} {year}
        </p> */}
      </div>
    </div>
  );
};

export default NewBillBoard;
