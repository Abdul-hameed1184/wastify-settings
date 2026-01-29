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
      
        <h3 className="font-semibold text-xl">Welcome Back, {dashBoard.customerFullname.toLocaleUpperCase() || ""}</h3>
        <p className="text-gray-500 text-lg">{"Here's what's happening with your waste management account."}</p>
    
 

 {  dashBoard &&   <div className="flex m-0 md:flex-row flex-col p-0 gap-4">
              <Card className="flex-1">
   
        <h3 className="font-semibold flex justify-between text-gray-500"><span>Total Bills</span><span>{formatDateWithSuffix(new Date())}</span></h3>
        <p className="font-semibold text-2xl text-black py-2">{Naira.format(parseFloat(dashBoard.totalBills))}</p>
        <h3 className="flex justify-between"><NavLink to="/transactions" className="text-primary hover:bg-primary/70 hover:text-white p-1 text-sm rounded-md ">{"View Transactions"}</NavLink><span className="rounded-lg bg-red-200 p-1 text-sm text-red-700">Overdue</span></h3>

            </Card>
                          <Card className="flex-1 w-auto">
   
        <h3 className="font-semibold flex justify-between text-gray-500"><span>Total Apartment</span><span>Jan 1st 2026</span></h3>
        <p className="text-black text-2xl font-semibold py-2">{dashBoard.totalApartment}</p>
        <p className="flex justify-between"><NavLink to="/apartment" className="text-primary hover:bg-primary/70 hover:text-white p-1  text-sm rounded-md">{"View Apartment"}</NavLink><span className="rounded-lg bg-red-200 p-1 text-sm text-red-700">Overdue</span></p>

            </Card>
                          <Card className="flex-1  w-auto">
  
        <h3 className="font-semibold flex justify-between text-gray-500"><span>Total Bills</span><span>January, 2026</span></h3>
        <p className="text-black text-2xl font-semibold py-2">{Naira.format(parseFloat(dashBoard.totalBills))}</p>
        <p className="flex justify-between"><NavLink to="/transactions" className="text-primary hover:bg-primary/70 hover:text-white p-1 text-sm  rounded-md  ">{"View Transactions"}</NavLink><span className="rounded-lg bg-red-200 p-1  text-sm text-red-700">Overdue</span></p>
 
            </Card>

        </div>}
  
{/* 
      <div className="p-4">
      <div className=" bg-white rounded-xl shadow-md px-6 py-5">

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <p className="text-sm text-gray-500">Welcome</p>
          <h2 className="text-xl font-semibold text-gray-800">
            <span className="text-gray-600 text-2xl">Hello,</span> <span className="text-slate">{customerFullname}</span>
          </h2>
        </div>
        </div>
        </div>
      </div> */}
    </div>

 );
};

export default ProfileCard;
