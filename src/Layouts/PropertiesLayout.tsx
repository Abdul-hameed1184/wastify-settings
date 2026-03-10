import React, { useState } from "react";
import { FaHouse } from "react-icons/fa6";
import { getPropertyByOperator } from "../api/psp-operator/psp-operator.service";
import AdminCard from "../Component/Card/AdminCard";
import Loader from "../Component/Loader";
import CreatePropertyModal from "../Component/Modal/CreatePropertyModal";
import { IOperator } from "../models/operator.interface";

import { useQuery } from "@tanstack/react-query";
import { Outlet } from "react-router-dom";

const PropertiesLayout:React.FC = () => {
  const operator:IOperator = JSON.parse(sessionStorage.getItem("AUTH_ADMIN_DETAILS")||"");
  const [ openCreateProperty, setOpenCreateProperty] = useState<boolean>(false);



  const params = {
    page: 1,
    per_page: 10,
  };
  const { data: allProperties, isLoading } = useQuery({
        queryKey: ['prop', operator.id],
        queryFn: () => {
         const data =  getPropertyByOperator(operator.id, params);
         console.log(data);
         return data;
          }});



  if(isLoading){
    return <Loader  />
  }

  return (

    <main className="px-4">
      <div className="flex flex-col lg:flex-row justify-between my-10">
        {/* <div className="w-full lg:w-[45%]">
                    <AdminCard heading={"Total Customers"} amount={"300"} icon={<IoPeople className='text-green w-10 h-8' />} />
                </div> */}
        <div className="w-full mt-5 lg:mt-0 ">
          <AdminCard
            heading={"Total Property"}
            amount={allProperties?.data.data.total || "0"}
            icon={<FaHouse className="text-green w-10 h-6 mt-1" />}
          />
        </div>
      </div>

      <div className="py-5 rounded-3xl my-4">
            <Outlet />
      </div>
        <CreatePropertyModal openModal={openCreateProperty} setOpenModal={setOpenCreateProperty} operator={operator} />
     </main>

  );
};

export default PropertiesLayout;
