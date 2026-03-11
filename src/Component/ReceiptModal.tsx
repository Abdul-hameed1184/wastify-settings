import React, { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Modal } from "./Modal/Modal";
import { Naira } from "../utils/format";
import PaymentStatusBadge from "../utils/PaymentStatusBadge";
import { FiDownload, FiImage } from "react-icons/fi";
import { Logo, LogoWithText } from "./Logo";

interface Transaction {
  id: string;
  receiptNo?: string;
  customerName: string;
  propertyAddress: string;
  propertyCode: string;
  amountPaid?: string;
  totalAmount?: string;
  paidDateTime?: string;
  paymentStatus: string;
}

interface ReceiptModalProps {
  isOpen: boolean;
  onClose: () => void;
  transaction: Transaction | null;
}

export const ReceiptModal: React.FC<ReceiptModalProps> = ({
  isOpen,
  onClose,
  transaction,
}) => {
  const receiptRef = useRef<HTMLDivElement>(null);

  if (!transaction) return null;

  const downloadAsImage = async () => {
    if (!receiptRef.current) return;
    const canvas = await html2canvas(receiptRef.current, {
      scale: 2,
      backgroundColor: "#ffffff",
    });
    const link = document.createElement("a");
    link.download = `receipt-${transaction.receiptNo || transaction.id}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  const downloadAsPDF = async () => {
    if (!receiptRef.current) return;
    const canvas = await html2canvas(receiptRef.current, {
      scale: 2,
      backgroundColor: "#ffffff",
    });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`receipt-${transaction.receiptNo || transaction.id}.pdf`);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Payment Receipt"
      size="md"
    >
      {/* Receipt content – this div is captured for download */}
      <div ref={receiptRef} className="bg-white p-2">
        {/* Header */}
        <div className="text-center border-b border-dashed border-gray-300 pb-2">
          <div className="text-2xl flex justify-center font-bold text-green text-center m-auto"><Logo /></div>
          <p className="text-sm text-gray-500 mt-1">Payment Receipt</p>
        </div>

        {/* Receipt Number */}
        {transaction.receiptNo && (
          <div className="text-center mb-2">
            <span className="text-xs text-gray-400 uppercase tracking-wider">
              Receipt No
            </span>
            <p className="text-lg font-bold text-secondary">
              {transaction.receiptNo}
            </p>
          </div>
        )}

        {/* Details */}
        <div className="space-y-3">
          <div className="flex justify-between items-center py-1 border-b border-gray-100">
            <span className="text-sm text-gray-500">Customer</span>
            <span className="text-sm font-semibold text-black">
              {transaction.customerName}
            </span>
          </div>
          <div className="flex justify-between items-center py-1 border-b border-gray-100">
            <span className="text-sm text-gray-500">Property Address</span>
            <span className="text-sm font-semibold text-black text-right max-w-[200px]">
              {transaction.propertyAddress}
            </span>
          </div>
          <div className="flex justify-between items-center py-1 border-b border-gray-100">
            <span className="text-sm text-gray-500">Date</span>
            <span className="text-sm font-semibold text-black">
              {transaction.paidDateTime}
            </span>
          </div>
          <div className="flex justify-between items-center py-1 border-b border-gray-100">
            <span className="text-sm text-gray-500">Status</span>
            <PaymentStatusBadge status={Number(transaction.paymentStatus)} />
          </div>
          <div className="flex justify-between items-center py-2 bg-gray-50 rounded-lg px-3 mt-2">
            <span className="text-sm font-semibold text-gray-600">
              Amount Paid
            </span>
            <span className="text-xl font-bold text-green">
              {transaction.amountPaid ? Naira.format(parseFloat(String(transaction.amountPaid))) : Naira.format(parseFloat(String(transaction.totalAmount)))}
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-2 pt-2 border-t border-dashed border-gray-300">
          <p className="text-xs text-gray-400">
            Thank you for your payment!
          </p>
          <p className="text-xs text-gray-400 mt-1">
            support@wasteefy.com
          </p>
        </div>
      </div>

      {/* Download Buttons */}
      <h2 className="text-center">Download Receipt</h2>
      <div className="flex gap-3 p-2 border-t border-gray-100">
        <button
          onClick={downloadAsPDF}
          className="flex-1 flex items-center justify-center gap-2 bg-green text-white py-2 px-4 rounded-lg font-semibold hover:bg-green/90 transition-colors"
        >
          <FiDownload className="text-lg" />
          PDF
        </button>
        <button
          onClick={downloadAsImage}
          className="flex-1 flex items-center justify-center gap-2 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
        >
          <FiImage className="text-lg" />
          JPEG(Image)
        </button>
      </div>
    </Modal>
  );
};
