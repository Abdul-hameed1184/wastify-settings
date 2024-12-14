import React, { useEffect, useState } from "react";
import { RiBarChart2Fill } from "react-icons/ri";
import { FaHouse } from "react-icons/fa6";
import { BiTransfer } from "react-icons/bi";
import axios from "axios";
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
  ParagraphLargeGreen,
  ParagraphXlGreenNoMargin,
} from "../../../Component/Paragraph";
import AdminCard from "../../../Component/Card/AdminCard";
import baseURL from "../../../utils/apiConfig";

const Dash = () => {
  const [currentDate, setCurrentDate] = useState("");
  const [currentTime, setCurrentTime] = useState("");
  const [dash, setDash] = useState([]);
  const operator = JSON.parse(sessionStorage.getItem("AUTH_ADMIN_DETAILS")||"");

  //   console.log(operator); --- why is operator logging all times here
  const FetchDash = () => {
    axios
      .get(baseURL + "dashboard/psp-operator/" + operator.id, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        const responseData = res.data?.data;
        // console.log(responseData);
        setDash(responseData);
        // setbills()
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateDateTime = () => {
    const now = new Date();

    // Format date as "23 January 2023"
    const dateOptions = { day: "2-digit", month: "long", year: "numeric" };
    const formattedDate = now.toLocaleDateString("en-GB", dateOptions);

    // Format time as "14:23:45"
    const timeOptions = {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    };
    const formattedTime = now.toLocaleTimeString("en-GB", timeOptions);

    setCurrentDate(formattedDate);
    setCurrentTime(formattedTime);
  };

  useEffect(() => {
    console.log('Dash')
    FetchDash();

    updateDateTime(); // Initial call to set the date and time immediately
    const intervalId = setInterval(updateDateTime, 1000); // Update every second

    return () => clearInterval(intervalId);
  }, []);

  return (
    <main className="px-4">
      <div className="flex flex-col lg:flex-row gap-5">
        <div className="lg:w-[80%]">
          <Paragraph2XlGreen content={`Wasteefy Management System`} />
          <div className="">
            <p className="flex text-base font-inter font-medium not-italic text-green leading-6 mt-4">
              Welcome,{"   "}
              <span className="text-grayRounded font-bold text-2xl">
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
            amount={`N${dash?.totalRevenue}`}
            icon={<RiBarChart2Fill className="text-green w-10 h-8" />}
          />
        </div>
        <div className="w-full lg:w-1/3">
          <AdminCard
            heading={"Total Property"}
            amount={dash?.totalProperties}
            icon={<FaHouse className="text-green w-10 h-7 mt-1" />}
          />
        </div>
        <div className="w-full lg:w-1/3">
          <AdminCard
            heading={"Total Overdue Payments"}
            amount={`N${dash?.totalOverDuePayment}`}
            icon={<BiTransfer className="text-green w-10 h-7 mt-1" />}
          />
        </div>
      </div>

      {/* recent transaction  */}
      <div className="bg-lightBackground py-5 rounded-3xl shadow-2xl">
        <Paragraph2XlGreenMargin content={"Recent Transactions"} />
        <div className="overflow-x-auto font-Poppins mt-3">
          <Table striped>
            <TableHead className=" font-Poppins text-xl capitalize text-white bg-green dark:text-white">
              <TableHeadCell>Date & Time</TableHeadCell>
              <TableHeadCell>Username</TableHeadCell>
              <TableHeadCell>Address</TableHeadCell>
              <TableHeadCell>Amount</TableHeadCell>
              <TableHeadCell>Bill Type</TableHeadCell>
              <TableHeadCell>Mode of Payment</TableHeadCell>
              <TableHeadCell>Status</TableHeadCell>
              <TableHeadCell>Total Overdue Bills</TableHeadCell>
            </TableHead>
            <TableBody className="divide-y font-Poppins ">
              <TableRow className="odd:bg-tableBackground">
                <TableCell>Today,10:30PM</TableCell>
                <TableCell>Olankunle_22</TableCell>
                <TableCell>34 Sunrise Avenue, Agege...</TableCell>
                <TableCell>N13,100.00</TableCell>
                <TableCell>Current bill</TableCell>
                <TableCell>debit card</TableCell>
                <TableCell>
                  <span className="text-success">Succesful</span>
                </TableCell>
                <TableCell>Cleared</TableCell>
              </TableRow>
              <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <TableCell>02, Mar 23,11:10PM</TableCell>
                <TableCell>Segun_10</TableCell>
                <TableCell>34 Sunrise Avenue, Agege...</TableCell>
                <TableCell>N57,100.00</TableCell>
                <TableCell>Current bill</TableCell>
                <TableCell>bank transfer</TableCell>
                <TableCell>
                  <span className="text-pending">Pending</span>
                </TableCell>
                <TableCell>Cleared</TableCell>
              </TableRow>

              <TableRow className="odd:bg-tableBackground">
                <TableCell>10, Mar 23, 04:10PM</TableCell>
                <TableCell>Olankunle_22</TableCell>
                <TableCell>34 Sunrise Avenue, Agege...</TableCell>
                <TableCell>N100,100.00</TableCell>
                <TableCell>Current bill</TableCell>
                <TableCell>debit card</TableCell>
                <TableCell>
                  <span className="text-failed">Failed</span>
                </TableCell>
                <TableCell>N75,000.00</TableCell>
              </TableRow>
              <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <TableCell>02, Mar 23,11:10PM</TableCell>
                <TableCell>Segun_10</TableCell>
                <TableCell>34 Sunrise Avenue, Agege...</TableCell>
                <TableCell>N57,100.00</TableCell>
                <TableCell>Current bill</TableCell>
                <TableCell>bank transfer</TableCell>
                <TableCell>
                  <span className="text-success">Succesful</span>
                </TableCell>
                <TableCell>Cleared</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </main>
  );
};

export default Dash;
