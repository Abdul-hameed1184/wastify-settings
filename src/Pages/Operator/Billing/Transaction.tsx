import { useCallback, useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";
import {
  Paragraph2Xl,
  Paragraph2XlGreenMargin,
} from "../../../Component/Paragraph";

import { getBillingByOperator } from "../../../api/bill/psp-operator-pricing";
import { IOperator } from "../../../models/operator.interface";
import { IPaginatedApartmentBills } from "../../../models/paginatedApartmentBillsForCustomer";
import { Link } from "react-router-dom";
import { ButtonsPrimary } from "../../../Component/Buttons";
import { Naira } from "../../../utils/format";
import PaymentStatusBadge from "../../../utils/PaymentStatusBadge";
import Loader from "../../../Component/Loader";
import { toast } from "react-toastify";
import { GrOverview } from "react-icons/gr";
import { IBillData } from "../../../models/billdata.interface";
import InfoModal from "../../../Component/Modal/InfoModal";

const Transaction = () => {
  const operator: IOperator = JSON.parse(
    sessionStorage.getItem("AUTH_ADMIN_DETAILS") || ""
  );
  const [billData, setBillData] = useState<IPaginatedApartmentBills>(
    {} as IPaginatedApartmentBills
  );
  const [page, setPage] = useState<number>(1);
  const [loader, setLoader] = useState<boolean>(true);
  const [showDetails, setShowDetails] = useState<boolean>(false);
  const [billpayment, setBillPayment] = useState<IBillData>({} as IBillData);

 const getBillings =  useCallback(async (page: number) => {
  try {
      const properties = await getBillingByOperator(operator.id, page);
      setBillData(properties.data.data);
  }catch(error) {
  toast.error("Error fetching billings", { position: "top-right" });
 setBillData({} as IPaginatedApartmentBills);
 console.log("Error fetching billings:", error);
  }finally {
      setLoader(false);
  }
 }  , [operator.id]);
  useEffect(() => {
    getBillings(page); 
  }, [getBillings, page]);
  const handleAutoBilling = () => {
    // Logic for auto billing can be implemented here
    console.log("Auto Billing Clicked");
  }

  if(loader){
    return <Loader />;
  }

  const handleViewDetails = (item) => {
    setBillPayment(item);
    setShowDetails(true);
  }


  return (
    <main className="px-4 ">
      {
        showDetails && <InfoModal openModal={showDetails} setOpenModal={setShowDetails} header={"Bill Data Details"} 
                      content={<div className="row g-3">
          <div className="col-md-6">
            <strong>Property:</strong> {billpayment.propertyCode} - {billpayment.propertyAddress}
          </div>
          <div className="col-md-6">
            <strong>Apartment ID:</strong> {billpayment.apartmentId}
          </div>

          <div className="col-md-6">
            <strong>Apartment Type:</strong> {billpayment.apartmentTypeName || "N/A"}
          </div>

          <div className="col-md-6">
            <strong>Bill Period:</strong> {billpayment.billPeriod}
          </div>
          <div className="col-md-6">
            <strong>Bill Amount:</strong> ₦{billpayment.billAmount}
          </div>

          <div className="col-md-6">
            <strong>Discount:</strong> {billpayment.discountPercentage}% (₦{billpayment.discountAmount})
          </div>
          <div className="col-md-6">
            <strong>Total Amount:</strong> ₦{billpayment.totalAmount}
          </div>

          <div className="col-md-6">
            <strong>Customer:</strong> {billpayment.customerFullname}
          </div>
          <div className="col-md-6">
            <strong>Phone:</strong> {billpayment.customerPhone}
          </div>

          <div className="col-md-6">
            <strong>Email:</strong> {billpayment.customerPhone}
          </div>


        </div>} buttonName={'Close'} handleConfirm={() => setShowDetails(!showDetails)}></InfoModal>
      }
      <div className="my-10">
        <div className="py-5">
          <div className="flex justify-between items-center">
          <Paragraph2XlGreenMargin content={"Customer Billings"} />
          <div>
          <ButtonsPrimary name={"Auto Billing"}  onClick={handleAutoBilling}/>
          </div>
          </div>
          {billData ? (
            <div className="overflow-x-auto font-Poppins mt-3">
              <Table striped>
                <TableHead className=" font-Poppins text-sm capitalize text-white bg-green dark:text-white">
                  <TableHeadCell>Bill Period</TableHeadCell>
                  <TableHeadCell>Property address</TableHeadCell>
                           <TableHeadCell>Customer</TableHeadCell>
                  <TableHeadCell>Amount</TableHeadCell>
                  <TableHeadCell>discounted</TableHeadCell>
         
                  {/* <TableHeadCell>Customer Phone number</TableHeadCell> */}
                            <TableHeadCell>Status</TableHeadCell>
                  <TableHeadCell>Action</TableHeadCell>
                </TableHead>
                <TableBody className="divide-y font-Poppins ">
                  {billData.data &&
                    billData.data.map((item, index) => (
                      <TableRow
                        className={
                          index % 2 === 0
                            ? "odd:bg-tableBackground"
                            : "bg-white dark:border-gray-700 dark:bg-gray-800"
                        }
                        key={index}
                      >
                        <TableCell>{item.billPeriod}</TableCell>
                        <TableCell>{item.propertyAddress} </TableCell>
                                               <TableCell>{item.customerFullname}</TableCell>
                        <TableCell>{Naira.format(Number(item.billAmount))} </TableCell>
                        <TableCell>{Naira.format(Number(item.totalAmount))}   </TableCell>
 
                        {/* <TableCell>{item.customerPhone}</TableCell> */}
                              <TableCell><PaymentStatusBadge status={item.paymentStatus} /></TableCell>
                        <TableCell onClick={() => handleViewDetails(item)}>
                          {/* <Link
                            to={"/dashboard/billing-customer-all"}
                            className="text-white bg-green  w-full h-14  justify-center px-10  py-2 text-base md:text-sm font-normal shadow-sm ring-transparent border-transparent rounded-lg ring-2 font-Poppins border"
                          >
                            Bill
                          </Link> */}
                          {/* <ButtonsPrimary name={"Bill"} /> */}
                          <GrOverview />
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
              <div className="flex justify-center items-center h-20 my-10 w-full ">
                <div className="w-full h-10 flex items-center justify-center rounded-md px-5">
                  <button
                    className={`text-green font-weight-bold`}
                    onClick={async () => {
                      setPage(page - 1);
                      getBillings(page -1)               
                    }}
                    disabled={page === 1}
                  >
                    Previous
                  </button>
                  <div className="mx-8 h-full">
                    {Array.from({
                      length: Math.ceil(billData.total / billData.per_page),
                    }).map((_, index) => (
                      <button
                        className={`w-8 h-full  ${
                          page === index + 1 ? "bg-green text-white " : ""
                        } mr-2`}
                        key={index}
                        onClick={() =>{
                           setPage(index+1);
                           getBillings(page);
                        }}
                      >
                        {index + 1}
                      </button>
                    ))}
                  </div>
                  <button
                    className={`text-green font-weight-bold`}
                           onClick={async () => {
                      setPage(page + 1);
                      getBillings(page + 1)               
                    }}
                    disabled={
                      Math.ceil(billData.total / billData.per_page) < page + 1
                    }
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <Paragraph2Xl content={"no Billing for Customers"} />
          )}
        </div>
      </div>
    </main>
  );
};

export default Transaction;
