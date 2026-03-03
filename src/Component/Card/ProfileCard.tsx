import React from "react";
import { ICustomerDashboard } from "../../models/customerdash.interface";
import { formatDateWithSuffix, Naira } from "../../utils/format";
import Card from "./Card";
import { NavLink } from "react-router-dom";

type Props = {
  dashBoard: ICustomerDashboard;
};

const ProfileCard: React.FC<Props> = ({ dashBoard }) => {

console.log("Dashboard data in ProfileCard:", dashBoard); // Debugging line
  return (
    <div className="">
      
          <h3 className="font-semibold text-xl leading-[40px] tracking-[0] my-0">Welcome Back, {dashBoard.customerFullname.toLocaleUpperCase() || ""}</h3>
          <p className="text-gray-500 text-lg my-0">{"Here's what's happening with your waste management account."}</p>
    
 

 {  dashBoard &&   <div className="flex my-2 md:flex-row flex-col p-0 gap-4">
              <Card className="flex-1 w-auto">
   
        <h3 className="font-semibold flexjustify-between text-gray-500"><span>Total Bills</span><span>{formatDateWithSuffix(new Date())}</span></h3>
        <p className="font-semibold text-2xl text-black py-2">{Naira.format(parseFloat(dashBoard.totalBills))}</p>
        <h3 className="flex justify-between"><NavLink to="/transactions" className="text-primary hover:bg-primary/70 hover:text-white p-1 text-sm rounded-md ">{"View Transactions"}</NavLink><span className="rounded-lg bg-red-200 p-1 text-sm text-red-700">Overdue</span></h3>

            </Card>
                          <Card className="flex-1 w-auto">
   
        <h3 className="font-semibold flex justify-between text-gray-500"><span>Total Apartments</span><span>Jan 1st 2026</span></h3>
        <p className="text-black text-2xl font-semibold py-2">{dashBoard.totalApartment}</p>
        <p className="flex justify-between"><NavLink to="/apartment" className="text-primary hover:bg-primary/70 hover:text-white p-1  text-sm rounded-md">{"View Apartment"}</NavLink><span className="rounded-lg bg-red-200 p-1 text-sm text-red-700">Overdue</span></p>

            </Card>
                          <Card className="flex-1  w-auto">
  
        <h3 className="font-semibold flex justify-between text-gray-500"><span>New Bill Alert</span><span>January, 2026</span></h3>
        <p className="text-black text-2xl font-semibold py-2">{Naira.format(parseFloat(dashBoard.totalBills))}</p>
        <p className="flex justify-between"><NavLink to="/transactions" className="text-primary hover:bg-primary/70 hover:text-white p-1 text-sm  rounded-md  ">{"View Transactions"}</NavLink><span className="rounded-lg bg-red-200 p-1  text-sm text-red-700">Overdue</span></p>
 
            </Card>

        </div>}
  

    </div>

 );
};

export default ProfileCard;
