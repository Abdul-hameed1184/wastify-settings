import React from "react"
import { Button } from "../Button"
import { Modal } from "./Modal"
import { IBillData } from "../../models/billdata.interface";
import { Naira } from "../../utils/format";

type Props = {
    handleBillPayment: (x:IBillData)=>void;
    bill: IBillData;
    isOpen: boolean;
    handleOpen: ()=>void;
}
export const PayBillModal:React.FC<Props> = ({ bill, isOpen, handleOpen, handleBillPayment}) => {
    return (
        <Modal isOpen={isOpen} onClose={handleOpen} title="Confirmation Page" size="lg">
            <div className="w-full">
            <h2 className="text-xl">Confirm your billing details before proceeding</h2>
            <p className="flex justify-between"><span className="font-semibold text-gray-400">Property Code</span><span className="text-black font-bold uppercase">{bill.propertyCode}</span></p>
            <p className="flex justify-between"><span className="font-semibold text-gray-400">Bill Period</span><span className="text-black font-bold uppercase">{bill.billPeriod}</span></p>
               <p className="flex justify-between"><span className="font-semibold text-gray-400">Psp Operator</span><span className="text-black font-bold uppercase">{bill.pspOperatorBusinessname}</span></p>
                  <p className="flex justify-between"><span className="font-semibold text-gray-400">Bill Address</span><span className="text-black font-bold uppercase">{bill.propertyAddress}</span></p>
                     <p className="flex justify-between"><span className="font-semibold text-gray-400">Bill Amount</span><span className="text-black font-bold uppercase">{Naira.format(parseFloat(bill.billAmount))}</span></p>
                        <p className="flex justify-between"><span className="font-semibold text-gray-400">Amount to Pay</span><span className="text-black font-bold uppercase">{Naira.format(parseFloat(bill.totalAmount))}</span></p>
                           <p className="flex justify-between"><span className="font-semibold text-gray-400">Customer Name</span><span className="text-black font-bold uppercase">{bill.customerName}</span></p>

            <label htmlFor="agree" className="my-4">
            <input type="checkbox" id="agree" className="my-4"/> I hereby agree to make the following payment
            </label>
            <Button className="w-full" onClick={()=>handleBillPayment(bill)}>Pay   {Naira.format(parseFloat(bill.totalAmount))} </Button>
            </div>
        </Modal>
    )
}