import { useState } from "react";
import { getPspOperatorDashboard } from "../../../api/psp-operator/psp-operator.service";
import Loader from "../../../Component/Loader";
import { Naira } from "../../../utils/format";
import { useQuery } from "@tanstack/react-query";
import Card from "../../../Component/Card/Card";
import { TbCurrencyNaira, TbUsersGroup } from "react-icons/tb";
import { PiBuildingsBold } from "react-icons/pi";
import PaymentStatusBadge from "../../../utils/PaymentStatusBadge";
import { ReceiptModal } from "../../../Component/ReceiptModal";


const Dash = () => {

  const operatorData = sessionStorage.getItem("AUTH_ADMIN_DETAILS");
  const operator = operatorData ? JSON.parse(operatorData) : null;
  const [selectedTransaction, setSelectedTransaction] = useState<any>(null);




  // const updateDateTime = () => {
  //   const now = new Date();

  //   // Format date as "23 January 2023"
  //   const dateOptions: Intl.DateTimeFormatOptions = { day: "2-digit", month: "long", year: "numeric" };
  //   const formattedDate = now.toLocaleDateString("en-GB", dateOptions);

  //   // Format time as "14:23:45"
  //   const timeOptions: Intl.DateTimeFormatOptions = {
  //     hour: "2-digit",
  //     minute: "2-digit",
  //     second: "2-digit",
  //     hour12: false,
  //   };
  //   const formattedTime: string = now.toLocaleTimeString("en-GB", timeOptions);

  //   setCurrentDate(formattedDate);
  //   setCurrentTime(formattedTime);
  // };

  const { data: dash, isLoading } = useQuery({
    queryKey: ["pspOperatorDashboard", operator?.id],
    queryFn: async () => {
      if (!operator?.id) throw new Error("Operator not found");
      const data = await getPspOperatorDashboard(operator.id);
      console.log("Dashboard Data: ", data);
      return data.data;
    },
    enabled: !!operator?.id
  });


  if (isLoading) {
    return <Loader />
  }

  if (!operator) {
    return <div className="p-4">Operator details not found. Please log in again.</div>
  }

  if (!dash) {
    return <div className="p-4">Failed to load dashboard data.</div>
  }

  function getStatusColor(status: any): string | undefined {
    switch (status) {
      case "success":
      case "paid":
        return "text-green-600 bg-green-100 px-2 py-1 rounded";
      case "pending":
        return "text-yellow-600 bg-yellow-100 px-2 py-1 rounded";
      case "failed":
      case "overdue":
        return "text-red-600 bg-red-100 px-2 py-1 rounded";
      default:
        return "text-gray-600 bg-gray-100 px-2 py-1 rounded";
    }
  }

  return (

    <div className="flex flex-col gap-4 p-4">
      <div>
        <h3 className="font-semibold text-xl leading-[40px] tracking-[0] my-0">Welcome Back, <span className="font-bold">{dash?.data?.operatorsName?.toUpperCase() || ""}</span></h3>
        <p className="text-gray-500 text-lg my-0">{"Here's what's happening with your waste management account."}</p>

      </div>
      <div className="flex items-center justify-between mb-4 gap-4">
        <Card className="flex-1 w-auto">
          <div className="flex flex-row justify-between">
            <div>
              <p className="font-semibold flexjustify-between text-gray-500"><span>Total Revenue</span></p>
              <p className="font-semibold text-2xl text-black py-2">{Naira.format(parseFloat(dash?.data?.totalRevenue || "0"))}</p>

            </div>

            <span className="bg-primary/10 flex items-center justify-center text-primary p-4 rounded-lg text-2xl"><TbCurrencyNaira /></span>
          </div>
          {/* <h3 className="flex justify-between"><NavLink to="/transactions" className="text-primary hover:bg-primary/70 hover:text-white p-1 text-sm rounded-md ">{"View Transactions"}</NavLink><span className="rounded-lg bg-red-200 p-1 text-sm text-red-700">Overdue</span></h3> */}

        </Card>
        <Card className="flex-1 w-auto">
          <div className="flex flex-row justify-between">
            <div>
              <p className="font-semibold flexjustify-between text-gray-500"><span>Total Properties</span></p>
              <p className="font-semibold text-2xl text-black py-2">{dash?.data?.totalProperties || 0}</p>

            </div>

            <span className="bg-primary/10 flex items-center justify-center text-primary p-4 rounded-lg text-2xl"><PiBuildingsBold /></span>
          </div>
          {/* <h3 className="flex justify-between"><NavLink to="/transactions" className="text-primary hover:bg-primary/70 hover:text-white p-1 text-sm rounded-md ">{"View Transactions"}</NavLink><span className="rounded-lg bg-red-200 p-1 text-sm text-red-700">Overdue</span></h3> */}

        </Card>

        <Card className="flex-1 w-auto">
          <div className="flex flex-row justify-between">
            <div>
              <p className="font-semibold flexjustify-between text-gray-500"><span>Total Customers</span></p>
              <p className="font-semibold text-2xl text-black py-2">{dash?.data?.totalCustomers || 0}</p>

            </div>

            <span className="bg-primary/10 flex items-center justify-center text-primary p-4 rounded-lg text-2xl"><TbUsersGroup /></span>
          </div>
          {/* <h3 className="flex justify-between"><NavLink to="/transactions" className="text-primary hover:bg-primary/70 hover:text-white p-1 text-sm rounded-md ">{"View Transactions"}</NavLink><span className="rounded-lg bg-red-200 p-1 text-sm text-red-700">Overdue</span></h3> */}

        </Card>
        <Card className="flex-1 w-auto">
          <div className="flex flex-row justify-between">
            <div>
              <p className="font-semibold flexjustify-between text-gray-500"><span>Overdue Payment</span></p>
              <p className="font-semibold text-2xl text-black py-2">{Naira.format(parseFloat(dash?.data?.totalOverDuePayment || "0"))}</p>

            </div>

            <span className="bg-primary/10 flex items-center justify-center text-primary p-4 rounded-lg text-2xl"><TbCurrencyNaira /></span>
          </div>
          {/* <h3 className="flex justify-between"><NavLink to="/transactions" className="text-primary hover:bg-primary/70 hover:text-white p-1 text-sm rounded-md ">{"View Transactions"}</NavLink><span className="rounded-lg bg-red-200 p-1 text-sm text-red-700">Overdue</span></h3> */}

        </Card>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center">
          <h2 className="text-xl font-bold text-secondary">Recent Activities</h2>
        </div>

        {/* Navigation / Filter */}
        <div className="px-6 py-3 border-b border-gray-50 bg-gray-50/30">
          <div className="flex  justify-between space-x-6 text-sm">
            <span></span>
            <button className="text-primary font-bold border-b-2 border-primary pb-1">All</button>
            {/* Add more filters if needed */}
          </div>
        </div>

        {/* Desktop Table View */}
        <div className="hidden md:block overflow-x-auto rounded-xl border border-gray-200 m-4 overflow-hidden">
          <table className="min-w-full divide-y divide-gray-100">
            <thead className="bg-gray-300/50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Customer Name</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Address</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-50">
              {dash?.data?.recentTransactions?.map((activity, index) => (
                <tr key={activity.id} className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-gray-100 transition-colors`}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-secondary">{activity.paidDateTime}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{activity.customerName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{activity.propertyAddress}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{Naira.format(parseFloat(activity.amountPaid))}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <PaymentStatusBadge status={activity.paymentStatus} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {
                      activity.receiptNo ? (
                        <button
                          onClick={() => setSelectedTransaction(activity)}
                          className="text-primary hover:underline  transition-colors"
                        >
                          View Receipt
                        </button>
                      ) : (
                        <button className="text-red-500 hover:text-red-600 hover:underline transition-colors">
                          No Payment
                        </button>
                      )
                    }
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Card-based List View */}
        <div className="md:hidden divide-y-8">
          {dash?.data?.recentTransactions?.map((activity) => (
            <div key={activity.id} className="p-4 space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Activity</p>
                  <p className="font-bold text-secondary">{activity.type}</p>
                </div>
                <span className={getStatusColor(activity.status)}>{activity.status}</span>
              </div>

              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Description</p>
                <p className="text-sm text-gray-700">{activity.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Ref ID</p>
                  <p className="text-sm text-secondary font-medium">{activity.refId}</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Date</p>
                  <p className="text-sm text-secondary font-medium">{activity.date}</p>
                </div>
              </div>

              <div className="pt-2">
                <button className="w-full py-2.5 px-4 bg-lightGreen text-primary font-bold rounded-lg text-sm hover:bg-primary hover:text-white transition-all active:scale-[0.98]">
                  {activity.paymentStatusLabel}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Shared Pagination */}
        {/* <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between bg-white text-sm">
        <button
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          disabled={currentPage === 1}
          className="flex items-center text-secondary font-bold hover:text-primary disabled:text-gray-300 disabled:cursor-not-allowed transition-colors"
        >
          <IoIosArrowRoundBack className="text-xl mr-1" />
          <span>Previous</span>
        </button>

        <span className="text-gray-500 font-medium">
          Page {currentPage} of {totalPages}
        </span>

        <button
          onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
          disabled={currentPage === totalPages}
          className="flex items-center text-secondary font-bold hover:text-primary disabled:text-gray-300 disabled:cursor-not-allowed transition-colors"
        >
          <span>Next</span>
          <IoIosArrowRoundForward className="text-xl ml-1" />
        </button>
      </div> */}
      </div>

      {/* Receipt Modal */}
      <ReceiptModal
        isOpen={!!selectedTransaction}
        onClose={() => setSelectedTransaction(null)}
        transaction={selectedTransaction}
      />
    </div>


  );
};

export default Dash;
