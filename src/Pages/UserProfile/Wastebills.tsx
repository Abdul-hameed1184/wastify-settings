import React, { useCallback, useEffect, useState } from "react";
import { IoChevronBack } from "react-icons/io5";
import { Link } from "react-router-dom";
import { Tab } from "@headlessui/react";
import CurrentBill from "../../Component/Card/CurrentBill";
import { customerDetails } from "../../api/customer/customer.service";
import { getBillingsByApartmentId } from "../../api/property/apartment.service";
import { IPaginatedApartmentBills } from "../../models/paginatedApartmentBillsForCustomer";
import { Table, TableHead, TableHeadCell, TableBody, TableRow, TableCell } from "flowbite-react";
import { ButtonsPrimary } from "../../Component/Buttons";
import { Paragraph2Xl } from "../../Component/Paragraph";
import { IBillData } from "../../models/billdata.interface";
import { create_transaction, getPayStackSettings, initializePayment, verifyPayment } from "../../api/paystack-payment/paystack-api";
import PaystackPop from '@paystack/inline-js'
import { ICustomer } from "../../models/customer.interface";
import { toast } from "react-toastify";
import { paystackPublicKey } from "../../utils/apiConfig";
import PaymentStatusBadge from "../../utils/PaymentStatusBadge";


function classNames(...classes:string[]) {
  return classes.filter(Boolean).join(" ");
}

const Wastebills:React.FC = () => {
  const [ page, setPage ] = useState<number>(1);
  const [ apartmentBills, setApartmentBills ] = useState<IPaginatedApartmentBills>({} as IPaginatedApartmentBills)

  const customer:ICustomer = JSON.parse(sessionStorage.getItem("AUTH_USERDETAILS")||"");
  const customerApartments = JSON.parse(sessionStorage.getItem("CUSTOMER_APARTMENT")||""); 



  // const getCustomerDetails =  useCallback(() =>  {
  //  customerDetails(customer.customerId)
  //  .then(dx => console.log(dx))
  // },[customer.customerId])

  useEffect(() => {
 ( async() => {
      const data = await getBillingsByApartmentId(customerApartments[0].id);
      console.log(data);
      setApartmentBills(data.data.data);
  })()
   
  },[customerApartments[0].id, page]);

      const handleBillPayment = async (x: IBillData) => {
        try{
          const pop = new PaystackPop()
          pop.newTransaction({
            key: paystackPublicKey,
            email: customer.email,
            amount: parseFloat(x.billAmount) * 100,
            onSuccess: async(transaction) =>     {
              console.log("Payment Successful", transaction);
              const data = await createTransaction(x, transaction);
              console.log("Transaction Data: ", data);
              toast.success("Payment Successful");
              //createTransaction(x, transaction);
            },
            onLoad: async (response) => {
              const data = await verifyPayment(response.reference);
              console.log("Payment Verification Response: ", data);
    console.log("onLoad: ", response);

  },
  onCancel: () => {
    console.log("onCancel");
  },
  onError: (error) => {
    console.log("Error: ", error.message);
  }
          })
          
         
      }catch(err){
        console.log(err?.message)
      }
      };

      const createTransaction = async (x:IBillData, dy) => {
        try{
          const billPaymentData = [
            {
                "apartmentBillingId": x.id,
                "customerId":customer.customerId,
                "transactionId": "TXN"+dy.transaction,
                "amountPaid":parseFloat(parseFloat(x.billAmount).toFixed(2)) *100,
                "paymentMode":"PayStack Payment", 
                "paymentStatus":1      
            }];
            const transaction = await create_transaction({billPaymentData});
            console.log(transaction)
            toast.success("Payment Successfully Confirmed")


        }catch(error){
          console.log(error)
        }
      }

  return (
    <main>
      <div className="flex justify-start mt-10 ml-6">
        <Link to="/profile">
          <IoChevronBack
            size={28}
            className="bg-green text-white rounded-xl"
          />
        </Link>
      </div>
      {/* <div className="m-4">
        <Tab.Group>
          <Tab.List className="flex space-x-1 bg-white">
            <Tab
              className={({ selected }) =>
                classNames(
                  "w-full py-2.5 text-lg font-bold leading-5 font-Poppins",
                  "focus:outline-none focus:ring-0",
                  selected
                    ? "border-green border-b-2 text-green"
                    : "text-lightgrayer"
                )
              }
              onClick={() => setActiveTab("current")}
            >
              Current Bill
            </Tab>

            <Tab
              className={({ selected }) =>
                classNames(
                  "w-full py-2.5 text-lg font-bold leading-5 font-Poppins",
                  "focus:outline-none focus:ring-0",
                  selected
                    ? "border-green border-b-2 text-green"
                    : "text-lightgrayer"
                )
              }
              onClick={() => setActiveTab("overdue")}
            >
              Overdue Bill
            </Tab>
          </Tab.List>
          <Tab.Panels className="mt-2">
            <Tab.Panel>
              <CurrentBill />
              <CurrentBill />
              <CurrentBill />
              <CurrentBill />
              <CurrentBill />
              <CurrentBill />
              <CurrentBill />
              <CurrentBill />
            </Tab.Panel>

            <Tab.Panel>
              <CurrentBill />
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div> */}
      <div>
         { apartmentBills ?       
                  <div className="overflow-x-auto font-Poppins mt-3 mx-4">
                                <Table striped >
                                    <TableHead className=" font-Poppins text-sm capitalize text-white bg-green dark:text-white">
                                        <TableHeadCell>Period</TableHeadCell>
                                        <TableHeadCell>Apartment Type</TableHeadCell>
                                        <TableHeadCell>Status</TableHeadCell>
                                        <TableHeadCell>Amount</TableHeadCell>
                                        <TableHeadCell>Action</TableHeadCell>
                                    </TableHead>
                                    <TableBody className="divide-y font-Poppins ">
                             
                                    {apartmentBills.data && apartmentBills.data.map((item:IBillData, index) => (
                                            <TableRow className={index % 2 === 0 ? "odd:bg-tableBackground" : "bg-white dark:border-gray-700 dark:bg-gray-800"} key={index}>
                                                <TableCell>{item.billPeriod}</TableCell>
                                                <TableCell>{item.apartmentTypeName} </TableCell>
                                                <TableCell><PaymentStatusBadge status={item.paymentStatus} /></TableCell>
                                                <TableCell>{item.billAmount}</TableCell>
                                                <TableCell>
                                                <ButtonsPrimary name={"Pay"} onClick={()=>handleBillPayment(item)}/>
                                                </TableCell>                   
                                    
                                            </TableRow>
                                        ))}
        
                                    </TableBody>
                                </Table>
                                <div className="flex justify-center items-center h-20 my-10 w-full ">
                    <div className="w-full h-10 flex items-center justify-center rounded-md px-5">
                      <button
                        className={`text-green font-weight-bold`}
                        onClick={() => setPage(page - 1)}
                        disabled={page === 1}
                      >
                        Previous
                      </button>
                      <div className="mx-8 h-full">
                        {
                          Array.from({
                            length: Math.ceil(
                              (apartmentBills.total/apartmentBills.per_page)
                            ),
                          }).map((_, index) => (
                            <button
                              className={`w-8 h-full  ${
                                page === index + 1 ? "bg-green text-white " : ""
                              } mr-2`}
                              key={index}
                              onClick={() => setPage(page + 1)}
                            >
                              {index + 1}
                            </button>
                          ))}
                      </div>
                      <button
                        className={`text-green font-weight-bold`}
                        onClick={() => setPage(page + 1)}
                        disabled={Math.ceil(apartmentBills.total/apartmentBills.per_page) <= page + 1}
                      >
                        Next
                      </button>
                    </div>
                  </div>
                            </div> : <Paragraph2Xl content={"no Billing for Customers"} />
        }
      </div>        
    </main>
  );
};

export default Wastebills;
