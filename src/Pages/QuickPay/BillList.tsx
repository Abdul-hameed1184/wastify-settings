
import { Link } from 'react-router-dom'
import { TiTimes } from "react-icons/ti"
import { Paragraph2Xl } from '../../Component/Paragraph'
import CurrentBill from '../../Component/Card/CurrentBill'
import { toast } from 'react-toastify'
import { create_transaction, verifyPayment } from '../../api/paystack-payment/paystack-api'
import { paystackPublicKey } from "../../utils/apiConfig";
import PaystackPop from "@paystack/inline-js";
import { IBillData, PaymentStatus } from '../../models/billdata.interface'
import { ICustomer } from '../../models/customer.interface'
const BillList = () => {
    const customer:Partial<ICustomer> = {
        created_at:"2024-11-20T19:23:02.000000Z",
        customerId:"974120c3-d088-44f0-b04c-64b0ad167628",
        email:"jasolajohn@gmail.com",
        firstname:"John",
        lastname:"Adeniran",
        phone:"08131510308"
    }
    
    const bill:IBillData   = {
        apartmentId:55,
        apartmentTypeId:7,
        apartmentTypeName:"3 Bedroom Flat",
        billAmount: "0.00",
        billPeriod:"02-2025",
        amountPaid: 345000,
        customerName:"Black John",
    created_at:"2025-08-24 20:44:45",
    customerFullname:"Akintola Damilola Abigail",
    customerId:"9b9a09b5-d33a-4764-b87c-9406bd3b0b81",
    customerPhone:"07048026748",
    discountAmount:"0.00",
    discountPercentage:"0.00",
    id: 5,
    paymentStatus:PaymentStatus.Pending,
    propertyAddress:"15, igbeyin adun street",
    propertyCode:"WFLAALIK000038",
    propertyId:38,
    pspOperatorBusinessname:"Damilola",
    pspOperatorEmail:"akintoladamilola427@gmail.com",
    pspOperatorId:9,
    pspOperatorPhone:"07048026748",
    pspOperatorUserId:"5f9fad44-7944-4db6-8a07-c29e2503534f",
    totalAmount:"0.00",
    updated_at:"2025-08-24 20:44:45",



    }
      const handleBillPayment = async (x: IBillData) => {
        try {
          const pop = new PaystackPop();
          pop.newTransaction({
            key: paystackPublicKey,
            email: customer.email,
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
                customerId: customer.customerId,
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
                    <CurrentBill bill={bill} handlePayNow={() => handleBillPayment(bill)}/>
                    <CurrentBill  bill={bill}  handlePayNow={() => handleBillPayment(bill)}/>
                    <CurrentBill bill={bill}   handlePayNow={() => handleBillPayment(bill)}/>
                    <CurrentBill bill={bill}  handlePayNow={() => handleBillPayment(bill)} />
                    <CurrentBill bill={bill}  handlePayNow={() => handleBillPayment(bill)}/>
                    <CurrentBill bill={bill}   handlePayNow={() => handleBillPayment(bill)}/>
                </div>
            </div>
        </main>
    )
}

export default BillList