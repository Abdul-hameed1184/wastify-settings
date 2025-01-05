import { Modal } from "flowbite-react";
import { ButtonsPrimary } from "../Buttons";
import React, { useState } from "react";
import { createApartmentBill } from "../../api/psp-operator/psp-operator.service";
import { ICreateApartmentBill } from "../../models/createApartmentBill.interface";
import { IApartment } from "../../models/apartment.interface";
import { IOperator } from "../../models/operator.interface";
import { toast } from "react-toastify";

type Props = {openModal: boolean, setOpenModal:(x) => void, apartmentBill: number, apartment: IApartment }
const CreateApartmentBill:React.FC<Props> = ({openModal, setOpenModal, apartmentBill,apartment }) => {
    const operator: IOperator = JSON.parse(
        sessionStorage.getItem("AUTH_ADMIN_DETAILS") || ""
      );
      const months = [
        {id: "01", name: "January"},
        {id:"02", name: "February"},
        {id:"03",name: "March"},
        {id:"04",name: "April"},
        {id:"05",name: "May"},
        {id:"06",name: "June"},
        {id:"07",name: "July"},
        {id:"08",name: "August"},
        {id:"09",name: "September"},
        {id:"10",name: "October"},
        {id:"11",name: "November"},
        {id:"12",name: "December"},
      ];
      const y = new Date().getMonth().toString()
      const getMonth:string  = y.length < 2 ? "0"+y : y 
    const [ discount, setDiscount ] = useState<number>();
    const [startMonth, setStartMonth] = useState<{id:string, name:string}>(getMonthById(getMonth));
    const [startYear, setStartYear] = useState((new Date().getFullYear()).toString());
    const [endMonth, setEndMonth] = useState<{id:string, name:string}>(getMonthById(getMonth));
    const [endYear, setEndYear] = useState((new Date().getFullYear()).toString());
    

      function getMonthById(id:string):{id:string, name:string} {
        console.log(id)
        const month = months.find((month) => month.id === id);
        return month ? month : months[0];
      }
    
      const years = Array.from(
        { length: 4 },
        (_, i) => (new Date().getFullYear() - 3 + i).toString()
      );

     const handleBillData = () => {
        if(startYear > endYear){
            toast.error("Start date should not be negative");
        }else{
            const yearDifference = Number(startYear) - Number(endYear);
            let monthDifference = 0;
           const billPeriods:string[] = [];
            if(yearDifference == 0){
                monthDifference =  Number(endMonth?.id) - Number(startMonth?.id)
               }else{
                monthDifference =  12 - Number(startMonth?.id);
                monthDifference+= Number(endMonth?.id) - Number(startMonth?.id)
               }
               billPeriods.push(startMonth.id+"-"+startYear)
               for (let i = 1; i <= monthDifference; i++) {
                let dx = startMonth?.id;
                let month = (Number(dx)+1).toString().length > 2 ?  (Number(dx)+1).toString() : "0"+(Number(dx)+1).toString()
                
                billPeriods.push(month+"-"+startYear)
           
              }
              console.log(billPeriods)
        }
      }
    
    const createBill = async () => {

        const dx:ICreateApartmentBill = {
          pspOperatorId: operator.id,
          billPeriod: "04-2025",
          billingData: [
            {
              apartmentId: apartment.id,
              billAmount: apartmentBill,
              discountPercentage: 0,
              discountAmount: 0,
              totalAmount: apartmentBill
            }
          ]
        
        }
        const createdBill = await createApartmentBill(dx)
        console.log(createdBill)
      };

    return (
        <Modal show={openModal} onClose={() => setOpenModal(false)} size={"5xl"}>
        <Modal.Header><h2 className="text-blue">Create Bill</h2></Modal.Header>
        <Modal.Body>

              
          <h2 className="text-lg font-semibold text-gray-700">
            Pick Month & Year Range
          </h2>

          <div className="flex gap-4 w-full">
            {/* Start Date */}
            <div>
              <h3 className="text-gray-600 font-medium mb-2">Start Date</h3>
              <div className="flex gap-4">
                <select
                  onChange={(e) => {
                    setStartMonth(getMonthById(e.target.value));
                    handleBillData();
                  }}
                  className="p-2 border rounded-md text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {months.map((month, index) => (
                    <option key={index} value={month.id}>
                      {month.name}
                    </option>
                  ))}
                </select>
                <select
                  value={startYear}
                  onChange={(e) => setStartYear(e.target.value)}
                  className="p-2 border rounded-md text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {years.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* End Date */}
            <div>
              <h3 className="text-gray-600 font-medium mb-2">End Date</h3>
              <div className="flex gap-4">
                <select
                  onChange={(e) =>{
                    setEndMonth(getMonthById(e.target.value));
                    handleBillData()
                  }}
                  className="p-2 border rounded-md text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {months.map((month, index) => (
                    <option key={index} value={month.id}>
                      {month.name}
                    </option>
                  ))}
                </select>
                <select
                  value={endYear}
                  onChange={(e) => setEndYear(e.target.value)}
                  className="p-2 border rounded-md text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {years.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Selected Range */}
          <div className="mt-4 text-center">
            <p className="text-gray-600">
              Selected Range:{" "}
              <span className="font-bold text-gray-800">
                {startMonth && startMonth?.name} {startYear} - {endMonth && endMonth?.name} {endYear}
              </span>
            </p>
          </div>

          

        </Modal.Body>
        {/* <Modal.Header>Property Details - {customerDetails[0]?.propertyAddress}</Modal.Header> */}
        <Modal.Footer  className="flex justify-between items-center p-4">
                  
        <div className="w-1/3">
            <ButtonsPrimary
              onClick={() => {
                setOpenModal(false);
              } }
              name={"Done"} type={undefined} loading={undefined}          />
   
  </div>
  <div className="w-1/3">
  <ButtonsPrimary
              onClick={() => {
                setOpenModal(false);
                createBill();
              } }
              name={"Create Bill"} type={undefined} loading={undefined}          />
              </div>
        </Modal.Footer>
      </Modal>
    )
}

export default CreateApartmentBill