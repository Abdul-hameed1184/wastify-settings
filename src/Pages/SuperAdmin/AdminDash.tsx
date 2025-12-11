import { useState } from "react";
import { RiBarChart2Fill } from "react-icons/ri";
import { FaHouse } from "react-icons/fa6";
import { BiTransfer } from "react-icons/bi";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";
import { useQuery } from "@tanstack/react-query";
import { IoPersonCircleOutline } from "react-icons/io5";
import { ToastContainer, Zoom } from "react-toastify";
import AdminCard from "../../Component/Card/AdminCard";
import Loader from "../../Component/Loader";
import { IRecentTransaction } from "../../models/recentTransaction.interface";
import { Naira } from "../../utils/format";
import PaymentStatusBadge from "../../utils/PaymentStatusBadge";
import { getAdminDashboard } from "../../api/admin/admin.service";



const Dash = () => {
  const [currentDate, setCurrentDate] = useState("");
  const [currentTime, setCurrentTime] = useState("");
  const admin = JSON.parse(sessionStorage.getItem("AUTH_ADMIN_DETAILS")||"");
  console.log(admin)



  const updateDateTime = () => {
    const now = new Date();

    // Format date as "23 January 2023"
    const dateOptions: Intl.DateTimeFormatOptions = { day: "2-digit", month: "long", year: "numeric" };
    const formattedDate = now.toLocaleDateString("en-GB", dateOptions);

    // Format time as "14:23:45"
    const timeOptions:Intl.DateTimeFormatOptions = {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    };
    const formattedTime: string  = now.toLocaleTimeString("en-GB", timeOptions);

    setCurrentDate(formattedDate);
    setCurrentTime(formattedTime);
  };

  const { data: dash, isLoading } = useQuery({
    queryKey: ["adminDashboard", admin.userId],
    queryFn: async () => {
      const data = await getAdminDashboard(admin.userId);
      console.log(data.data);
            return data.data;
    }
  });


  if(isLoading){
    return  <Loader color="slate-900" />
  }

  return (
    <main className="px-4">
       <ToastContainer 
       position="top-center"
       autoClose={5000}
       hideProgressBar
       newestOnTop={false}
       closeOnClick
       rtl={false}
       pauseOnFocusLoss
       draggable
       pauseOnHover
       theme="light"
       transition={Zoom}
      />
{   dash &&    
  <div>
    <div className="flex flex-col lg:flex-row gap-5">
        <div className="lg:w-[80%]">
          <h2 className="text-bold text-3xl uppercase">{`Wasteefy Management System`}</h2>
          <div className="">
            <p className="flex text-base font-inter font-medium not-italic text-slate-900 leading-6 mt-4 items-center">
              <span>{"Welcome ,"}</span>
              <span className="text-black font-bold text-2xl">
                {" "}
                {admin &&  admin.firstname + " " + admin.lastname}.
              </span>{" "}
            </p>
          </div>
        </div>
        <div className="lg:w-[20%] flex flex-col justify-end text-end">
          <h3 className="text-2xl text-semibold">{currentDate}</h3>
          <h3  className="text-2xl text-semibold">{currentTime}</h3>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row justify-between my-10 gap-12">
        <div className="w-full lg:w-1/3">
          <AdminCard
            heading={"Total Revenue"}
            amount={Naira.format(dash.data.totalRevenue)}
            icon={<RiBarChart2Fill className="text-slate-900 w-10 h-8" />}
            className="text-slate-900"
          />
        </div>
        <div className="w-full lg:w-1/3">
          <AdminCard
            heading={"Total Property"}
            amount={dash.data.totalProperties}
            icon={<FaHouse className="text-slate-900 w-10 h-7 mt-1" />}
                      className="text-slate-900"
          />
        </div>
             <div className="w-full lg:w-1/3">
          <AdminCard
            heading={"Total Customers"}
            amount={dash.data.totalCustomers}
            icon={<IoPersonCircleOutline className="text-slate-900 w-10 h-7 mt-1" />}
                      className="text-slate-900"
          />
        </div>
        <div className="w-full lg:w-1/3">
          <AdminCard
            heading={"Total Overdue Payments"}
            amount={Naira.format(dash.data.totalOverDuePayment)}
            icon={<BiTransfer className="text-slate-900 w-10 h-7 mt-1" />}
                      className="text-slate-900"
          />
        </div>
      </div>
      </div>
      }

      {/* recent transaction  */}
      <div className="py-5">
        <h3 className="text-3xl font-semibold text-slate-900">Recent Transactions</h3>
        <div className="overflow-x-auto font-Poppins mt-3 shadow-2xl rounded-2xl">
          <Table striped>
            <TableHead className="text-lg text-normal text-white bg-slate-900 ">
              <TableHeadCell>Date & Time</TableHeadCell>
              <TableHeadCell >Customer Name</TableHeadCell>
              <TableHeadCell>Address</TableHeadCell>
              <TableHeadCell>Bill Amount</TableHeadCell>
              <TableHeadCell>Amount Paid</TableHeadCell>
              <TableHeadCell>Bill Period</TableHeadCell>
              <TableHeadCell>Mode of Payment</TableHeadCell>
              <TableHeadCell>Status</TableHeadCell>
              <TableHeadCell>Total Overdue Bills</TableHeadCell>
            </TableHead>
            <TableBody className="font-Poppins odd:bg-gray-300">
        {  dash.data.recentTransactions && dash.data.recentTransactions.length > 0 ? (dash.data.recentTransactions.map((x:IRecentTransaction,index) => 
        <TableRow  className={
                    index % 2 === 0
                      ? "odd:bg-tableBackground"
                      : "bg-white dark:border-gray-700 dark:bg-gray-800"
                  }
                  key={index}>
                <TableCell>{x?.updated_at}</TableCell>
                <TableCell>{x?.customerName}</TableCell>
                <TableCell>{x.propertyAddress}</TableCell>
                <TableCell>{Naira.format(parseFloat(x.totalAmount))}</TableCell>
                                <TableCell>{Naira.format(parseFloat(x.totalAmount))}</TableCell>
                <TableCell>{x.billPeriod}</TableCell>
                                <TableCell>{x.paymentMode}</TableCell>
                                                <TableCell><PaymentStatusBadge status={x.paymentStatus} /></TableCell>
                                                                <TableCell>{x.paymentStatusLabel}</TableCell>
              </TableRow>)) : (
                <TableRow>
                  <TableCell colSpan={9} className="px-6 py-4 text-center text-sm text-gray-500">
                   <h2 className="text-xl font-semibold text-gray-100">No recent transactions found.</h2>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </main>
  );
};

export default Dash;
