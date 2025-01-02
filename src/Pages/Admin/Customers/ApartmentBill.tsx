import React, { useEffect, useState } from 'react';
import { ButtonsPrimaryBlack } from '../../../Component/Buttons';
import { InputFieldGreenWhite } from '../../../Component/InputField';
import { IApartment } from '../../../models/apartment.interface';
import { getPspOperatorBill } from '../../../api/bill/psp-operator-pricing';
import { IOperator } from '../../../models/operator.interface';
import { Paragraph2Xl } from '../../../Component/Paragraph';
import { useLocation } from 'react-router-dom';
import { IBills } from '../../../models/bills.interface';
import { createApartmentBill } from '../../../api/psp-operator/psp-operator.service';
import { ICreateApartmentBill } from '../../../models/createApartmentBill.interface';
import { getApartmentBillings, getBillingsByApartmentId } from '../../../api/property/apartment.service';


const ApartmentBill:React.FC = () => {
    const [bills, setBills ] = useState<IBills[]>([]);
    const operator:IOperator = JSON.parse(sessionStorage.getItem("AUTH_ADMIN_DETAILS")||"");
    const location = useLocation();
    const { state } = location; 
    console.log(state)
    const apartment:IApartment = state.apartment;
    useEffect(() => {
      (async()=>{
        const data = await getPspOperatorBill(operator.id);
        setBills(data.data.data.data)
        const dx = await getBillingsByApartmentId(apartment.id);
        console.log(dx.data)
        const dy = await getApartmentBillings(2);
        console.log(dy.data)

      })()
    },[]);

    const createBill = async () => {
      const data:IBills[]  = bills.filter(dx => dx.apartmentTypeId);
      const amount = parseInt(data[0].amount);
      const dx:ICreateApartmentBill = {
        pspOperatorId: operator.id,
        billPeriod: "02-2025",
        billingData: [
          {
            apartmentId: apartment.id,
            billAmount: amount,
            discountPercentage: 0,
            discountAmount: 0,
            totalAmount: amount
          }
        ]
      
      }
      const createdBill = await createApartmentBill(dx)
      console.log(createdBill)
    };
    return (
      <main className="mb-10">
        <div className="w-full h-full border-solid border-[1px] shadow-2xl py-8 border-black rounded-lg">
          <div className="px-4">
            <img src="/Images/billing-user" alt="user" />
            <Paragraph2Xl content={"Apartment Details"} />
          </div>
          <div className="font-medium text-md leading-7 flex justify-between">
              <p>Apartment Address</p>
              <p>{apartment.propertyAddress}</p>
            </div>
            <div className="font-medium text-md leading-7 flex justify-between">
              <p>Property Code</p>
              <p>{apartment.propertyCode}</p>
            </div>
          <div className="w-full h-7 text-white bg-black flex justify-between px-4 mt-6">
            <p>Date Registered</p>
            <p>02, Mar 23,11:10PM</p>
          </div>
          <div className="w-full mt-4 px-4">
          <div className="font-medium text-md leading-7 flex justify-between">
              <p>Apartment Description</p>
              <p>{apartment.apartmentTypeDescription}</p>
            </div>
            <div className="font-medium text-md leading-7 flex justify-between">
              <p>Apartment Type</p>
              <p>{apartment.apartmentTypeName}</p>
            </div>
            <div className="font-medium text-md leading-7 flex justify-between">
              <p>Customer Name:</p>
              <p>{apartment.customerFullname}</p>
            </div>
            <div className="font-medium mt-3 text-md leading-7 flex justify-between">
              <p>Description</p>
              <p>{apartment.description}</p>
            </div>
            <div className="font-medium mt-3 text-md leading-7 flex justify-between">
              <p>Username:</p>
              <p>Olankunle_22</p>
            </div>
            <div className="font-medium mt-3 text-md leading-7 flex justify-between">
              <p>Phone Number:</p>
              <p>{apartment.customerPhone}</p>
            </div>
            <div className="font-medium mt-3 text-md leading-7 flex justify-between">
              <p>Email:</p>
              <p>segunolakunle@yahoo.com</p>
            </div>createBillSetup
            <div className="font-medium mt-3 text-md leading-7 flex justify-between">
              <p>Current Amount To Pay:</p>
              <p>N3,000.00</p>
            </div>
          </div>
          <div className="w-full flex justify-center font-medium mt-5">
            <p>Set New Amount To Pay</p>
          </div>
          <div className="px-4 mt-5">
            <InputFieldGreenWhite placeholder="Amount (000,000.00)" />
          </div>
          <div className="flex justify-end mt-5">
            <div className="w-40 pr-4">
              <ButtonsPrimaryBlack name="Create Bill" onClick={() =>createBill()} />
            </div>
          </div>
        </div>
  
        <div className="w-full h-full border-solid border-[1px] mt-16 shadow-2xl py-8 border-black rounded-lg">
          <div className="px-4">
            <h1 className="text-2xl font-bold mt-7">Transaction History</h1>
          </div>
  
          <div className="w-full h-16 text-white bg-black flex items-center justify-between px-4 mt-6">
            <p className="w-[25%]">Date & Time</p>
            <p className="w-[25%]">Amount</p>
            <p className="w-[25%]">Mode Of Payment</p>
            <p className="w-[25%]">Status</p>
          </div>
          <div className="w-full mt-4 px-4">
            <div className="font-medium text-md leading-7 flex justify-between">
              <p className="w-[25%]">02, Mar 23,11:10PM</p>
              <p className="w-[25%]">N3,000.00</p>
              <p className="w-[25%]">Debit card</p>
              <p className="w-[25%]">Success</p>
            </div>
            <div className="font-medium mt-3 text-md leading-7 flex justify-between">
              <p className="w-[25%]">02, Mar 23,11:10PM</p>
              <p className="w-[25%]">N3,000.00</p>
              <p className="w-[25%]">Debit card</p>
              <p className="w-[25%]">Success</p>
            </div>
            <div className="font-medium mt-3 text-md leading-7 flex justify-between">
              <p className="w-[25%]">02, Mar 23,11:10PM</p>
              <p className="w-[25%]">N3,000.00</p>
              <p className="w-[25%]">Debit card</p>
              <p className="w-[25%]">Success</p>
            </div>
            <div className="font-medium mt-3 text-md leading-7 flex justify-between">
              <p className="w-[25%]">02, Mar 23,11:10PM</p>
              <p className="w-[25%]">N3,000.00</p>
              <p className="w-[25%]">Debit card</p>
              <p className="w-[25%]">Success</p>
            </div>
            <div className="font-medium mt-3 text-md leading-7 flex justify-between">
              <p className="w-[25%]">02, Mar 23,11:10PM</p>
              <p className="w-[25%]">N3,000.00</p>
              <p className="w-[25%]">Debit card</p>
              <p className="w-[25%]">Success</p>
            </div>
          </div>
        </div>
      </main>
    );
}

export default ApartmentBill;