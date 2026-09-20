import { Link, useLocation, useNavigate } from "react-router-dom";
import { TiTimes } from "react-icons/ti";
import { Paragraph2Xl } from "../../Component/Paragraph";
import CurrentBill from "../../Component/Card/CurrentBill";
import { toast } from "react-toastify";
import { quickpay_create_payment, verifyPayment } from "../../api/paystack-payment/paystack-api";
import { paystackPublicKey } from "../../utils/apiConfig";
import PaystackPop from "@paystack/inline-js";
import { IBillData } from "../../models/billdata.interface";
import { PayBillModal } from "../../Component/Modal/PayBillModal";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getPropertyQuickPay } from "../../api/quickpay/quickpay.service";
import Loader from "../../Component/Loader";

const BillList = () => {
  const navigate = useNavigate();
  const { data } = useLocation().state;
    const [selectedBill, setSelectedBill] = useState<IBillData>({} as IBillData);
  const [isBillModalOpen, setIsBillModalOpen] = useState<boolean>(false);

  const { data: bills, isError, isLoading, refetch } = useQuery({
    queryKey: ["quickPayBills", data.phoneNumber, data.propertyCode],
    queryFn: async () => {
      const bills = await getPropertyQuickPay(data.phoneNumber, data.propertyCode);
      return bills.data.data;
    },
    retry: 1
  });

  if(isLoading) return <Loader />;

    if (isError) {
      toast.error("Failed to fetch quick pay data. Please check your details and try again.");
      navigate("/");
    }




  const handleBillPayment = async () => {
    try {
      const pop = new PaystackPop();
      pop.newTransaction({
        key: paystackPublicKey,
        email: selectedBill.pspOperatorEmail,
        amount: parseFloat(selectedBill.totalAmount) * 100,
        onSuccess: async (transaction) => {
          await verifyPayment(transaction.reference);
          await createTransaction(selectedBill, transaction);
          toast.success("Payment Successful");
        },
        onCancel: () => toast.info("Payment cancelled"),
        onError: (error) => {
          console.error("Payment error:", error.message);
          toast.error("Error during payment");
        },
      });
    } catch (err) {
      console.error(err);
      toast.error("Error initializing payment");
    }
    setIsBillModalOpen(false);
    refetch();
  };

  const createTransaction = async (x: IBillData, transaction: any) => {
    try {
      const billPaymentData = [
        {
          apartmentBillingId: x.id,
          customerPhone: x.customerPhone,
          customerId: x.customerId,
          propertyCode: x.propertyCode,
          transactionId: "TXN" + transaction.reference,
          amountPaid: parseFloat(parseFloat(x.totalAmount).toFixed(2)),
          paymentMode: "Quickpay PayStack Payment",
          paymentStatus: 1,
        },
      ];
      const response = await quickpay_create_payment({ billPaymentData });
      console.log("Transaction response:", response);
    } catch (error) {
      console.error("Transaction error:", error);
    }
  };

  return (
    <main className="m-4">
      <div className="mt-6">
        <div className="flex justify-end mr-3">
          <Link to="/">
            <TiTimes size={24} className="bg-green text-white rounded-2xl" />
          </Link>
        </div>

        <div className="text-center text-3xl">
          <Paragraph2Xl content="Current Bill" />
        </div>

        <div className="m-4 flex flex-col w-full items-center">
          {bills && bills.length > 0 ? (
            bills
              .filter((x: IBillData) => parseFloat(x.totalAmount) !== 0)
              .map((x: IBillData) => (
                <CurrentBill
                  key={x.id}
                  bill={x}
                  handlePayNow={() => {
                    setSelectedBill(x);
                    setIsBillModalOpen(true);
                  }}
                />
              ))
          ) : (
            <h2 className="font-bold text-gray-900">No bills available</h2>
          )}
        </div>
      </div>

      <PayBillModal
        handleBillPayment={handleBillPayment}
        bill={selectedBill}
        isOpen={isBillModalOpen}
        onClose={() => setIsBillModalOpen(!isBillModalOpen)}
      />
    </main>
  );
};

export default BillList;
