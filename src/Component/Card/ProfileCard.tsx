import React from 'react';
import { ParagraphLarge, ParagraphNoMargin } from "../Paragraph";
import { ICustomerDashboard } from "../../models/customerdash.interface";
import { Naira } from '../../utils/format';
import NewBillBadge from './NewBillBadge';

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
    <section
      className="w-full max-w-sm bg-white rounded-2xl shadow-lg p-6 border border-gray-100 text-center transition-all hover:shadow-xl"
      aria-label="Customer profile summary"
    >
      {/* Greeting Section */}
      <header className="mb-6">
        <ParagraphNoMargin content="Hello!" />
        <ParagraphLarge content={customerFullname} />
      </header>

      {/* Total Bills */}
      <div className="mb-4">
        <ParagraphNoMargin content="Total Bills" />
        <ParagraphLarge content={Naira.format(Number(totalBills))} />
      </div>

      {/* Total Apartments */}
      <div>
        <ParagraphNoMargin content="Total Apartments" />
        <ParagraphLarge content={totalApartment.toString()} />
      </div>

      <div>
        <NewBillBadge amount={totalBills} />
      </div>
    </section>
  );
};

export default ProfileCard;
