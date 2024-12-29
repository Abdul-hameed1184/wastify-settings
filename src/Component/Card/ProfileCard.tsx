import { Card } from "flowbite-react";
import { ParagraphLarge, ParagraphNoMargin } from "../Paragraph";

const ProfileCard = ({ dashBoard }) => {
  // const user = useSelector(selectUser);
  const user = JSON.parse(sessionStorage.getItem("AUTH_USERDETAILS"));
  const { totalBills, customerFullname, totalProperty } = dashBoard;
  console.log("user", dashBoard);
  return (
    <Card className="max-w-sm border-transparent text-center">
      <div className="">
        <ParagraphNoMargin content={"Hello!"} />
        <ParagraphLarge
          content={customerFullname ? customerFullname : "Customer"}
        />
      </div>
      <div className="">
        <ParagraphNoMargin content={"Total Bills"} />
        <ParagraphLarge content={totalBills ? totalBills : "N 0"} />
      </div>
      <div className="">
        <ParagraphNoMargin content={"Total Property"} />
        <ParagraphLarge content={totalProperty ? totalProperty : "0"} />
      </div>
    </Card>
  );
};

export default ProfileCard;
