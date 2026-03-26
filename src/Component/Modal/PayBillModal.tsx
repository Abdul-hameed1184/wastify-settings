import React, { useState } from "react";
import { Button } from "../Button";
import { Modal } from "./Modal";
import { IBillData } from "../../models/billdata.interface";
import { formatDate, Naira } from "../../utils/format";
import { IoCalendarOutline, IoWalletOutline, IoPersonOutline, IoBusinessOutline, IoLocationOutline, IoCheckmarkCircleOutline } from "react-icons/io5";

type Props = {
  handleBillPayment: () => void;
  bill: IBillData;
  isOpen: boolean;
  onClose: () => void;
};

export const PayBillModal: React.FC<Props> = ({ bill, isOpen, onClose, handleBillPayment }) => {
  const [isAgreed, setIsAgreed] = useState(false);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Payment Confirmation" size="lg">
      <div className="w-full space-y-6">
        <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
          <div className="p-3 bg-green/10 rounded-full text-green">
            <IoWalletOutline className="text-2xl" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900 font-Poppins">Confirm Billing Details</h2>
            <p className="text-sm text-gray-500 font-Poppins">Please review the details below before proceeding to payment.</p>
          </div>
        </div>

     { bill &&  
     <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 px-1">
          <DetailItem 
            icon={<IoPersonOutline className="text-green" />} 
            label="Customer Name" 
            value={bill.customerFullname} 
          />
          <DetailItem 
            icon={<IoCalendarOutline className="text-green" />} 
            label="Bill Period" 
            value={formatDate(bill.billPeriod)} 
          />
          <DetailItem 
            icon={<IoBusinessOutline className="text-green" />} 
            label="PSP Operator" 
            value={bill.pspOperatorBusinessname} 
          />
          <DetailItem 
            icon={<IoLocationOutline className="text-green" />} 
            label="Property Code" 
            value={bill.propertyCode} 
          />
          <div className="md:col-span-2">
            <DetailItem 
              icon={<IoLocationOutline className="text-green" />} 
              label="Billing Address" 
              value={bill.propertyAddress} 
            />
          </div>
        </div>}

        <div className="bg-gray-50/80 rounded-2xl p-6 border border-gray-100 space-y-3">
          <div className="flex justify-between items-center text-gray-600">
            <span className="font-medium font-Poppins">Base Bill Amount</span>
            <span className="font-semibold font-Poppins">{Naira.format(parseFloat(bill.billAmount))}</span>
          </div>
          {parseFloat(bill.discountAmount) > 0 && (
            <div className="flex justify-between items-center text-green-600">
              <span className="font-medium font-Poppins flex items-center gap-2">
                Discount ({bill.discountPercentage}%)
              </span>
              <span className="font-semibold font-Poppins">-{Naira.format(parseFloat(bill.discountAmount))}</span>
            </div>
          )}
          <div className="flex justify-between items-center text-green border-t border-gray-200/50 pt-3">
            <span className="text-lg font-bold font-Poppins">Total Amount to Pay</span>
            <span className="text-2xl font-bold font-Poppins">{Naira.format(parseFloat(bill.totalAmount))}</span>
          </div>
        </div>

        <div className="px-1">
          <label 
            htmlFor="agree" 
            className={`flex items-start gap-3 p-4 rounded-xl border-2 transition-all cursor-pointer group
              ${isAgreed ? 'border-green bg-green/5' : 'border-gray-100 hover:border-gray-200 bg-white'}`}
          >
            <div className="relative flex items-center h-5 mt-0.5">
              <input
                type="checkbox"
                id="agree"
                checked={isAgreed}
                onChange={(e) => setIsAgreed(e.target.checked)}
                className="w-5 h-5 text-green border-gray-300 rounded focus:ring-green cursor-pointer"
              />
            </div>
            <div className="flex flex-col">
              <span className={`text-sm font-semibold font-Poppins select-none transition-colors
                ${isAgreed ? 'text-gray-900' : 'text-gray-600 group-hover:text-gray-900'}`}>
                I confirm that I have reviewed the details above
              </span>
              <span className="text-xs text-gray-500 font-Poppins mt-0.5">
                By ticking this, you agree to make the payment of {Naira.format(parseFloat(bill.totalAmount))}
              </span>
            </div>
          </label>
        </div>

        <div className="pt-2">
          <Button
            className={`w-full py-4 rounded-xl text-lg font-bold shadow-lg transition-all flex items-center justify-center gap-2
              ${!isAgreed 
                ? "bg-gray-200 text-gray-400 cursor-not-allowed shadow-none" 
                : "bg-green text-black hover:bg-green/90 hover:shadow-green/20"
              }`}
            onClick={handleBillPayment}
            disabled={!isAgreed}
          >
            {isAgreed && <IoCheckmarkCircleOutline className="text-xl" />}
            Pay {Naira.format(parseFloat(bill.totalAmount))}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

const DetailItem = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) => (
  <div className="flex items-start gap-3 group">
    <div className="mt-1 p-2 bg-gray-50 rounded-lg group-hover:bg-green/5 transition-colors">
      {icon}
    </div>
    <div className="flex flex-col">
      <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider font-Poppins">{label}</span>
      <span className="text-sm font-bold text-black uppercase font-Poppins leading-tight truncate max-w-[200px] md:max-w-none">
        {value || "N/A"}
      </span>
    </div>
  </div>
);
