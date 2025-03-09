
import React from 'react';
import { ParagraphLarge, ParagraphNoMargin } from "../Paragraph";
import { ICustomerDashboard } from "../../models/customerdash.interface";
type Props = {
  dashBoard: ICustomerDashboard;
}
const ProfileCard:React.FC<Props> = ({ dashBoard }) => {
  // const user = useSelector(selectUser);
  console.log(dashBoard)
  const { totalBills, customerFullname, totalApartment } = dashBoard;
  console.log("user", dashBoard);
  return (
    <div className="max-w-sm border-transparent text-center bg-white rounded-lg shadow-lg p-4 m-4">
      <div className="">
        <ParagraphNoMargin content={"Hello!"} />
        <ParagraphLarge
          content={customerFullname ? customerFullname : "Customer"}
        />
      </div>
      <div className="">
        <ParagraphNoMargin content={"Total Bills"} />
        <ParagraphLarge content={totalBills ? totalBills.toString() : "N0"} />
      </div>
      <div className="">
        <ParagraphNoMargin content={"Total Apartment"} />
        <ParagraphLarge content={totalApartment ? totalApartment.toString() : "0"} />
      </div>
    </div>
  );
};

export default ProfileCard;
