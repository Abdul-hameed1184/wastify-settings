import React, {  } from "react";
import { customerDashboard } from "../../api/customer/customer.service";

import ProfileCard from "../../Component/Card/ProfileCard";

import { RecentActivities } from "../../Component/Card/RecentActivities";
import { useQuery } from "@tanstack/react-query";

const Dashboard: React.FC = () => {

          const customer = sessionStorage.getItem("AUTH_USERDETAILS");
          console.log(customer)


  const { data:dashboard } = useQuery({
    queryKey: ['customerDashboard'],
    queryFn: async () => {
      if (!customer) throw new Error("User session not found");
      const customerData = JSON.parse(customer);
      const x = await customerDashboard(customerData.customerId);
      return x.data.data;
    }
  });



  return (
    <div className="min-h-screen p-4">
         {dashboard &&   <ProfileCard dashBoard={dashboard} />}
 
  
{/* 
        <RecentActivities /> */}

    </div>
  );
};



export default Dashboard;
