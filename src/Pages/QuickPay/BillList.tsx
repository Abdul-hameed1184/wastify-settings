
import { Link, useLocation } from 'react-router-dom'
import { TiTimes } from "react-icons/ti"
import { Paragraph2Xl } from '../../Component/Paragraph'
import CurrentBill from '../../Component/Card/CurrentBill'
import { toast } from 'react-toastify'
import { create_transaction, verifyPayment } from '../../api/paystack-payment/paystack-api'
import { paystackPublicKey } from "../../utils/apiConfig";
import PaystackPop from "@paystack/inline-js";
import { IBillData } from '../../models/billdata.interface'
const BillList = () => {
      const { data } = useLocation().state;
      const handleBillPayment = async (x: IBillData) => {
        try {
          const pop = new PaystackPop();
          pop.newTransaction({
            key: paystackPublicKey,
            email: x.pspOperatorEmail,
            amount: parseFloat(x.totalAmount) * 100,
            onSuccess: async (transaction) => {
              await createTransaction(x, transaction);
              toast.success("Payment Successful");
            },
            onLoad: async (response) => {
              await verifyPayment(response.reference);
            },
            onCancel: () => {
              console.log("Payment cancelled");
            },
            onError: (error) => {
              console.error("Payment error:", error.message);
              toast.error("Error during payments");
            },
          });
        } catch (err) {
          console.error(err);
          toast.error("Error initializing payment");
        }
      };

        const createTransaction = async (x: IBillData, transaction) => {
          try {
            const billPaymentData = [
              {
                apartmentBillingId: x.id,
                customerId: x.customerId,
                transactionId: "TXN" + transaction.transaction,
                amountPaid: parseFloat(parseFloat(x.totalAmount).toFixed(2)),
                paymentMode: "PayStack Payment",
                paymentStatus: 1,
              },
            ];
            const response = await create_transaction({ billPaymentData });
            console.log("Transaction response:", response);
          } catch (error) {
            console.error("Transaction error:", error);
          }
        };
      
    return (
        <main className='m-4'>
            <div className="mt-6">
                <div className="flex justify-end mr-3">
                    <Link to="/">
                        <TiTimes size={24} className='bg-green text-white rounded-2xl' />
                    </Link>
                </div>
                <div className="text-center text-3xl">
                    <Paragraph2Xl content={"Current Bill"} />
                </div>
                <div className="m-4 flex flex-col w-full items-center">
                    {data && data.map((x:IBillData) => <CurrentBill key={x.id} bill={x} handlePayNow={() => handleBillPayment(x)}/>)}
                </div>
            </div>
        </main>
    )
}

export default BillList