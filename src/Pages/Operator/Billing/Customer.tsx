import React, { useEffect } from "react";
import { InputFieldGreenWhite } from "../../../Component/InputField";
import { ButtonsPrimaryBlack } from "../../../Component/Buttons";
import { customerDetails } from "../../../api/customer/customer.service";

const Customer:React.FC<{customerId: string}> = ({customerId}) => {


  useEffect(()=> {
  (async () => {
    const dx = await customerDetails(customerId);
    console.log(dx.data.data);
    console.log(dx.data.data)

  }
    
  )();
  },[]);

  return (
    <main className="mb-10">
      <div className="w-full h-full border-solid border-[1px] shadow-2xl py-8 border-black rounded-lg">
        <div className="px-4">
          <img src="/Images/billing-user" alt="user" />
          <h1 className="text-2xl font-bold mt-7">Customer Information</h1>
        </div>
        <div className="w-full h-7 text-white bg-black flex justify-between px-4 mt-6">
          <p>Date Registered</p>
          <p>02, Mar 23,11:10PM</p>
        </div>
        <div className="w-full mt-4 px-4">
          <div className="font-medium text-md leading-7 flex justify-between">
            <p>Name:</p>
            <p>Segun Olakunle</p>
          </div>
          <div className="font-medium mt-3 text-md leading-7 flex justify-between">
            <p>User ID:</p>
            <p>000001</p>
          </div>
          <div className="font-medium mt-3 text-md leading-7 flex justify-between">
            <p>Username:</p>
            <p>Olankunle_22</p>
          </div>
          <div className="font-medium mt-3 text-md leading-7 flex justify-between">
            <p>Phone Number:</p>
            <p>08067865498</p>
          </div>
          <div className="font-medium mt-3 text-md leading-7 flex justify-between">
            <p>Email:</p>
            <p>segunolakunle@yahoo.com</p>
          </div>
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
            <ButtonsPrimaryBlack name="Save" />
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
};

export default Customer;
