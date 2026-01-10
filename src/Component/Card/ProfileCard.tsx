import React from "react";
import { ParagraphLarge, ParagraphNoMargin } from "../Paragraph";
import { ICustomerDashboard } from "../../models/customerdash.interface";
import { Naira } from "../../utils/format";
import NewBillBadge from "./NewBillBadge";

type Props = {
  dashBoard: ICustomerDashboard;
};

const ProfileCard: React.FC<Props> = ({ dashBoard }) => {
  const {
    customerFullname = "Customer",
    totalBills = 0,
    totalApartment = 0,
  } = dashBoard;

  return (
    <div className="w-full">
      <div className="p-4">
      <div className="w-full bg-white rounded-xl shadow-md px-6 py-5">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <p className="text-sm text-gray-500">Welcome</p>
          <h2 className="text-xl font-semibold text-gray-800">
            <span className="text-gray-600 text-2xl">Hello,</span> <span className="text-slate">{customerFullname}</span>
          </h2>
        </div>

        <NewBillBadge amount={totalBills} />
      </div>

      {/* Divider */}
      <div className="my-4 h-px bg-gray-200" />

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        
        {/* Total Bills */}
        <div>
          <ParagraphNoMargin content="Total Bills" />
          <ParagraphLarge content={Naira.format(Number(totalBills))} />
        </div>

        {/* Total Apartments */}
        <div>
          <ParagraphNoMargin content="Total Apartments" />
          <ParagraphLarge content={totalApartment.toString()} />
        </div>

      </div>
      </div>
    </div>
    </div>);
};

export default ProfileCard;
