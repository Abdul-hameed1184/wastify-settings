import React from "react";
import { Button } from "../Button";
import { formatDate, Naira } from "../../utils/format";
import { IBillData } from "../../models/billdata.interface";
import { IoBusinessOutline, IoLocationOutline, IoQrCodeOutline, IoArrowForwardOutline } from "react-icons/io5";


type Props = {
  bill: IBillData;
  handlePayNow: () => void;
};

const CurrentBill: React.FC<Props> = ({ bill, handlePayNow }) => {
  return (
    <div className="my-6 mx-3 bg-white shadow-xl rounded-2xl max-w-xl overflow-hidden border border-gray-100 group hover:shadow-2xl transition-all duration-300">
      {/* Header */}
      <div className="bg-green px-6 py-4 flex justify-between items-center">
        <h2 className="text-xl font-bold text-black font-Poppins">{formatDate(bill.billPeriod)}</h2>
        <div className="px-3 py-1 bg-black/10 rounded-full">
          <span className="text-xs font-bold text-black uppercase tracking-widest font-Poppins">Waste Bill</span>
        </div>
      </div>

      {/* Bill Details */}
      <div className="px-6 py-6 space-y-5">
        <div className="grid grid-cols-1 gap-4">
          <DetailRow 
            icon={<IoQrCodeOutline className="text-green text-xl" />} 
            label="Property Code" 
            value={bill.propertyCode} 
          />
          <DetailRow 
            icon={<IoBusinessOutline className="text-green text-xl" />} 
            label="PSP Operator" 
            value={bill.pspOperatorBusinessname} 
          />
          <DetailRow 
            icon={<IoLocationOutline className="text-green text-xl" />} 
            label="Property Address" 
            value={bill.propertyAddress} 
          />
        </div>

        {/* Highlighted Amount + Pay Button */}
        <div className="mt-8 p-6 bg-gray-50 rounded-2xl border border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col items-center md:items-start">
            <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider font-Poppins">Current Amount Due</span>
            <span className="font-black text-red-600 text-4xl mt-1 font-Poppins">{Naira.format(parseFloat(bill.totalAmount))}</span>
          </div>
          
          <Button 
            type="button" 
            onClick={handlePayNow} 
            disabled={parseFloat(bill.totalAmount) <= 0}
            className={`px-8 py-4 rounded-xl text-lg font-bold shadow-lg transition-all flex items-center gap-2
              ${parseFloat(bill.totalAmount) > 0 
                ? "bg-green text-black hover:bg-green/90 hover:shadow-green/20" 
                : "bg-gray-200 text-gray-400 cursor-not-allowed shadow-none"
              }`}
          >
            Pay Now
            <IoArrowForwardOutline className="text-xl group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </div>
  );
};

const DetailRow = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) => (
  <div className="flex items-start gap-4 group/row">
    <div className="p-2 bg-gray-50 rounded-lg group-hover/row:bg-green/10 transition-colors">
      {icon}
    </div>
    <div className="flex flex-col">
      <span className="text-xs font-bold text-gray-400 uppercase tracking-widest font-Poppins">{label}</span>
      <span className="text-sm font-semibold text-gray-800 font-Poppins leading-tight">{value}</span>
    </div>
  </div>
);

export default CurrentBill;
