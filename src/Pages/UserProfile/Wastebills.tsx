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
import { create_transaction, initializePayment, verifyPayment } from "../../api/paystack-payment/paystack-api";
import PaystackPop from '@paystack/inline-js'
import { ICustomer } from "../../models/customer.interface";
import { toast } from "react-toastify";

function classNames(...classes:string[]) {
  return classes.filter(Boolean).join(" ");
}

const Wastebills:React.FC = () => {
  const [ page, setPage ] = useState<number>(1);
  const [ accessCode, setAccessCode ] = useState<string>("")
  const [ apartmentBills, setApartmentBills ] = useState<IPaginatedApartmentBills>({} as IPaginatedApartmentBills)

  const customer:ICustomer = JSON.parse(sessionStorage.getItem("AUTH_USERDETAILS")||"");
  const customerApartments = JSON.parse(sessionStorage.getItem("CUSTOMER_APARTMENT")||""); 

  const fetchBills = useCallback(() => {
   customerApartments.map(async (dx) => {
      const data = await getBillingsByApartmentId(dx.id)
      console.log(data.data.data);
      setApartmentBills(data.data.data);
   })

  },[customerApartments]);

  const getCustomerDetails =  useCallback(() =>  {
   customerDetails(customer.customerId)
   .then(dx => console.log(dx))
  },[customer.customerId])

  useEffect(() => {
    fetchBills();
    getCustomerDetails();
  },[]);

      const handleBillPayment = async (x: IBillData) => {
        try{
          const data = await initializePayment(customer.email, Number(x.billAmount) );
          console.log(data)
          const{ access_code, reference }= data.data.data;
          const popup = new PaystackPop();
          
          popup.resumeTransaction(access_code);
          const dx = await verifyPayment(reference)
          console.log(dx.data,data);
          await createTransaction(x, dx.data.data);
         
      }catch(err){
        console.log(err?.message)
      }
      };

      const createTransaction = async (x:IBillData, dy) => {
        try{
          const billPaymentData = [
            {
                "apartmentBillingId": x.apartmentId,
                "customerId":customer.customerId,
                "transactionId": dy.id,
                "amountPaid":dy.amount,
                "paymentMode":"Bank Transfer", 
                "paymentStatus":1      
            }];
            const transaction = await create_transaction(billPaymentData);
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
                                                <TableCell>{item.paymentStatus}</TableCell>
                                                <TableCell>{item.billAmount}</TableCell>
                                                <TableCell><ButtonsPrimary name={"Pay"} onClick={()=>handleBillPayment(item)}/></TableCell>
                                    
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
