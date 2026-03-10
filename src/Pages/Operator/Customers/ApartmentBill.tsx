import React, { useState } from "react";
import { IOperator } from "../../../models/operator.interface";
import { useLocation, useParams } from "react-router-dom";
import { getApartmentById, getApartmentTypePrice, getBillingsByApartmentId } from "../../../api/property/apartment.service";
import { IBillData } from "../../../models/billdata.interface";
import Loader from "../../../Component/Loader";
import { MdDeleteForever } from "react-icons/md";
import PaymentStatusBadge from "../../../utils/PaymentStatusBadge";
import { Naira } from "../../../utils/format";

import { Button } from "../../../Component/Button";
import OccupancyStatusBadge from "../../../utils/OccupyStatusBadge";
import DataCard from "../../../Component/DataCard";
import { UpdateApartmentModal } from "../../../Component/Modal/UpdateApartmentModal";
import { useQuery } from "@tanstack/react-query";
import CreateApartmentBill from "../../../Component/Modal/CreateApartmentBill";
import { toast } from "react-toastify";


const ApartmentBill: React.FC = () => {
    const { apartmentId } = useParams();
  const [ updateModal, setUpdateModal ] = useState<boolean>(false)
  const [openCreateBillModal, setOpenCreateBillModal] =
    useState<boolean>(false);
  const operator: IOperator = JSON.parse(
    sessionStorage.getItem("AUTH_ADMIN_DETAILS") || ""
  );
  const location = useLocation();
  const { state: { property} } = location;
  const [ page, setPage ] = useState<number>(1);
  console.log(property)


  const { data:apartment } = useQuery({
    queryKey: ['apartment'],
    queryFn: async () => {
      const data = await getApartmentById(apartmentId);
      console.log(data);
      return data.data.data;
    }
  })





  

  const [viewDelete, setViewDelete] = useState<boolean>(false);
  // const [ currentBill, setCurrentBill ] = useState<string>("0")
  const months = [
    { id: "01", name: "January" },
    { id: "02", name: "February" },
    { id: "03", name: "March" },
    { id: "04", name: "April" },
    { id: "05", name: "May" },
    { id: "06", name: "June" },
    { id: "07", name: "July" },
    { id: "08", name: "August" },
    { id: "09", name: "September" },
    { id: "10", name: "October" },
    { id: "11", name: "November" },
    { id: "12", name: "December" },
  ];

  const params = {
    page: page,
    perPage: 10,
  };
  const { data : bill = null } = useQuery({
        queryKey: ['bill', property],
        queryFn: async() => {
          const data =  await getApartmentTypePrice(apartment.apartmentTypeId, operator.id, property?.propertyTypeId)
          console.log(data);
          return data.data.data[0];
        },
        placeholderData: null
  })


const { data: billHistory, isLoading } = useQuery({
  queryKey: ['billHistory', apartmentId, page],
  queryFn: async () => {
    try {
      const history = await getBillingsByApartmentId(apartment.id, params);
      console.log(history)
      return history;
    } catch (error: any) {
      if (error.response && error.response.status === 404) {
        return { data: { data: { data: [] } } }; // empty array fallback
      }
      throw error;
    }
  },
});

if(isLoading){
  return <Loader />;
}

const apartmentField = [
  { key: "apartmentTypeName", label: "Apartment Type"},
  {key: "propertyAddress", label:"Property Address"},
  { key: "propertyCode", label: "Property Code"},
  { key:"customerFullname", label:"Customer Name"},
  { key: "customerPhone", label: "Customer Phone"}
]


  function formatDate(dx: string): string {
    const splitted = dx.split("-");
    return getMonthById(splitted[0]).name + ", " + splitted[1];
  }

  function getMonthById(id: string): { id: string; name: string } {
    const month = months.find((month) => month.id === id);
    return month ? month : months[0];
  }



  return (
    <main className="mb-10">
      {
        <div>
          <div className="">
            <div className="px-4">

              <h2 className="text-3xl font-bold flex">Apartment Details        
                 <span className="block text-2xl mx-4">
                      {apartment && <OccupancyStatusBadge status={apartment?.status} />}
                    </span></h2>
            </div>
            <div className="flex lg:flex-row md:justify-between p-4 flex-wrap">

                            { apartment &&   <DataCard title={"Apartment Details"} data={apartment} fields={apartmentField}  />}
                  <div className="flex flex-col justify-between">                 
                     <Button variant="black" onClick={()=>setUpdateModal(!updateModal)}>Edit Apartment</Button>
                    <span></span>
                  </div>

            
            </div>

            <div className="flex justify-between my-4 items-center ">
              <h3 className="text-2xl font-bold text-slate-900">Apartment Bill</h3>
              <div className=" pr-4">
                <Button
                  variant="black"
                  onClick={() =>{
                    if(bill == null){
                        toast.error("No price setup for this customer")
                    }else{
                     setOpenCreateBillModal(true);
                    } 
                  }}
                >CreateBill</Button>
              </div>
            </div>
          </div>


          
        </div>
      }
 
      {
      
        openCreateBillModal && <CreateApartmentBill openModal={openCreateBillModal} setOpenModal={setOpenCreateBillModal} apartmentBill={bill.amount||"0.00"} apartment={apartment} />
      }


      {
        updateModal && <UpdateApartmentModal apartment={apartment} openModal={updateModal} handleUpdateModal={()=>setUpdateModal(!updateModal)} owing={ billHistory?.data.data.data.filter(x => x.paymentStatus = 0)} />
      }
      
    </main>
  );
};

export default ApartmentBill;
