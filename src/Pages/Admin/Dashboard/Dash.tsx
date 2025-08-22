import { useEffect, useState } from "react";
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
import {
  Paragraph2XlGreen,
  Paragraph2XlGreenMargin,
  ParagraphXlGreenNoMargin,
} from "../../../Component/Paragraph";
import AdminCard from "../../../Component/Card/AdminCard";
import { ToastContainer, Zoom } from "react-toastify";
import { getPspOperatorDashboard } from "../../../api/psp-operator/psp-operator.service";
import { IPspOperatorDashboard } from "../../../models/psp-operator.dashboard.interface";
import Loader from "../../../Component/Loader";
import { Naira } from "../../../utils/format";
import { IBillData } from "../../../models/billdata.interface";
import PaymentStatusBadge from "../../../utils/PaymentStatusBadge";


const Dash = () => {
  const [currentDate, setCurrentDate] = useState("");
  const [currentTime, setCurrentTime] = useState("");
  const [dash, setDash] = useState<IPspOperatorDashboard>();
  const [ loading, setLoading] = useState<boolean>(true);
  const operator = JSON.parse(sessionStorage.getItem("AUTH_ADMIN_DETAILS")||"");



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

  useEffect(() => {

    (async() => {
      console.log(operator)
      const data = await getPspOperatorDashboard(operator.id)
      console.log(data.data)
      setDash(data.data.data);

    updateDateTime(); // Initial call to set the date and time immediately
    const intervalId = setInterval(updateDateTime, 1000); // Update every second
    return () => clearInterval(intervalId);
    })();

    setLoading(false)
  

  }, []);
  
  if(loading){
    return <Loader />
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
          <Paragraph2XlGreen content={`Wasteefy Management System`} />
          <div className="">
            <p className="flex text-base font-inter font-medium not-italic text-green leading-6 mt-4">
              {"Welcome,    "}
              <span className="text-black font-bold text-2xl">
                {" "}
                {operator ? operator.businessName : "Business Name"}.
              </span>{" "}
            </p>
          </div>
        </div>
        <div className="lg:w-[20%] flex flex-col justify-end text-end">
          <ParagraphXlGreenNoMargin content={currentDate} />
          <ParagraphXlGreenNoMargin content={currentTime} />
        </div>
      </div>
      <div className="flex flex-col lg:flex-row justify-between my-10 gap-12">
        <div className="w-full lg:w-1/3">
          <AdminCard
            heading={"Total Revenue"}
            amount={Naira.format(dash.totalRevenue)}
            icon={<RiBarChart2Fill className="text-green w-10 h-8" />}
          />
        </div>
        <div className="w-full lg:w-1/3">
          <AdminCard
            heading={"Total Property"}
            amount={dash.totalProperties}
            icon={<FaHouse className="text-green w-10 h-7 mt-1" />}
          />
        </div>
        <div className="w-full lg:w-1/3">
          <AdminCard
            heading={"Total Overdue Payments"}
            amount={Naira.format(dash.totalOverDuePayment)}
            icon={<BiTransfer className="text-green w-10 h-7 mt-1" />}
          />
        </div>
      </div>
      </div>
      }

      {/* recent transaction  */}
      <div className="py-5">
        <Paragraph2XlGreenMargin content={"Recent Transactions"} />
        <div className="overflow-x-auto font-Poppins mt-3">
          <Table striped>
            <TableHead className=" font-Poppins text-xl capitalize text-white bg-green ">
              <TableHeadCell>Date & Time</TableHeadCell>
              <TableHeadCell>Customer Name</TableHeadCell>
              <TableHeadCell>Address</TableHeadCell>
              <TableHeadCell>Bill Amount</TableHeadCell>
                            <TableHeadCell>Amount Paid</TableHeadCell>
              <TableHeadCell>Bill Period</TableHeadCell>
              <TableHeadCell>Mode of Payment</TableHeadCell>
              <TableHeadCell>Status</TableHeadCell>
              <TableHeadCell>Total Overdue Bills</TableHeadCell>
            </TableHead>
            <TableBody className="font-Poppins odd:bg-gray-300">
        {  dash && dash.recentTransactions.map((x:IBillData,index) => 
        <TableRow  className={
                    index % 2 === 0
                      ? "odd:bg-tableBackground"
                      : "bg-white dark:border-gray-700 dark:bg-gray-800"
                  }
                  key={index}>
                <TableCell>{x?.paidDateTime}</TableCell>
                <TableCell>{x.customerName}</TableCell>
                <TableCell>{x.propertyAddress}</TableCell>
                <TableCell>{Naira.format(parseFloat(x.totalAmount))}</TableCell>
                                <TableCell>{Naira.format(parseFloat(x.amountPaid))}</TableCell>
                <TableCell>January, 2025</TableCell>
                                <TableCell>{x.paymentMode}</TableCell>
                                                <TableCell><PaymentStatusBadge status={x.paymentStatus} /></TableCell>
                                                                <TableCell>{x.paymentStatusLabel}</TableCell>
              </TableRow>)}
            </TableBody>
          </Table>
        </div>
      </div>
    </main>
  );
};

export default Dash;
