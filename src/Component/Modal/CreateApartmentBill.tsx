import { Modal } from "flowbite-react";
import {  ButtonsPrimaryBlack } from "../Buttons";
import React, { useEffect, useState } from "react";
import { ICreateApartmentBill } from "../../models/createApartmentBill.interface";
import { IApartment } from "../../models/apartment.interface";
import { IOperator } from "../../models/operator.interface";
import { toast } from "react-toastify";
import { createApartmentBill } from "../../api/psp-operator/psp-operator.service";

type Props = { openModal: boolean, setOpenModal: (x) => void, apartmentBill: number, apartment: IApartment }
const CreateApartmentBill: React.FC<Props> = ({ openModal, setOpenModal, apartmentBill, apartment }) => {
  const operator: IOperator = JSON.parse(
    sessionStorage.getItem("AUTH_ADMIN_DETAILS") || ""
  );
  useEffect(() => {
    console.log(apartmentBill);

  },[])
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
  const y = new Date().getMonth().toString()
  const getMonth: string = y.length < 2 ? "0" + y : y
  const [discount, setDiscount] = useState<number>(0);
  const [ month, setMonth] = useState<{ id: string, name: string }>(getMonthById(getMonth));
  const [ year, setYear] = useState<string>((new Date().getFullYear()).toString())
  


  function getMonthById(id: string): { id: string, name: string } {
    const month = months.find((month) => month.id === id);
    return month ? month : months[0];
  }

  let Naira = new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
});

  

  const years = Array.from(
    { length: 2 },
    (_, i) => (new Date().getFullYear() - 1 + i).toString()
  );

  const handleMonthlyBill = (e:{target: {value:string}}) => {
    const dx = getMonthById(e.target.value)
    setMonth(dx);
    
  }

 

  const createBill = async () => {
    
    if(0 <= discount && discount <= 100){
    const dx: ICreateApartmentBill = {
      pspOperatorId: operator.id,
      billPeriod: `${month.id}-${year}`,
      billingData: [
      {
        apartmentId: apartment.id,
        billAmount: apartmentBill,
        discountPercentage: discount,
        discountAmount: discount * apartmentBill/100 ,
        totalAmount: apartmentBill - (discount * apartmentBill/100)
        }
    ]}

    
    const createdBill = await createApartmentBill(dx)
    console.log(createdBill)

    toast.success(`${month.name}, ${year} bill was created successfully`)

  }else{
    toast.error("Check the discount percentage")
  }
  };

  const handleDiscount = (e:{target: {value:string}}) => { 
    const dx = parseInt(e.target.value)
    setDiscount(dx)
  
  }

  return (
    <Modal show={openModal} onClose={() => setOpenModal(false)} size={"2xl"}>
      <Modal.Header  className="text-gray-600 text-3xl font-medium mb-2">Create Monthly Bill</Modal.Header>
      <Modal.Body>
        <div className="flex gap-4 w-full">
        </div>

        <div>

          <div className="flex flex-col ">
          <p className="m-0 p-0 font-bold">Month</p>
            <select
              onChange={handleMonthlyBill}
              className="p-2 border text-xl mb-4 rounded-md p-2 text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {months.map((month, index) => (
                <option key={index} value={month.id}>
                  {month.name}
                </option>
              ))}
            </select>

            <p className="m-0 p-0 font-bold">Year</p>
            <select
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="p-2 border text-xl rounded-md  mb-4 text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>

            <p className="m-0 p-0 font-bold">Discount(Percentage)</p>
            <input 
                type="number"
                value={discount} 
               id="quantity"
               min="1"
               max="100"
               step="1"
               className="w-full text-xl border border-gray-300 rounded-md px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
               placeholder="Enter a discount in percentage"onChange={handleDiscount} />
          </div>
          <div>

       
          </div>
        </div>
        {

          <div className="mt-4">
          <p className="text-xl font-semibold">Apartment Bill: {Naira.format(apartmentBill)}</p>
          <p  className="text-xl font-semibold">Discount Amount: { Naira.format(discount * apartmentBill/100) }</p>
          <p className="text-xl font-semibold">Bill : {Naira.format(apartmentBill - (discount * apartmentBill/100)) }</p>
        </div>}
      </Modal.Body>
      {/* <Modal.Header>Property Details - {customerDetails[0]?.propertyAddress}</Modal.Header> */}
      <Modal.Footer className="flex justify-between items-center p-4">

        <div className="w-1/3">
          <ButtonsPrimaryBlack
            onClick={() => {
              setOpenModal(false);
            }}
            name={"Cancel"} type={undefined} loading={undefined} />

        </div>
        <div className="w-1/3">
          <ButtonsPrimaryBlack
            onClick={() => {
              setOpenModal(false);
              createBill();
            }}
            name={"Create Bill"} type={undefined} loading={undefined} />
        </div>

      </Modal.Footer>
    </Modal>
  )
}

export default CreateApartmentBill