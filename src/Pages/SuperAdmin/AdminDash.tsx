import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../Component/Loader";
import { getAdminDashboard } from "../../api/admin/admin.service";
import { ReceiptModal } from "../../Component/ReceiptModal";
import { TbCurrencyNaira, TbUsersGroup } from "react-icons/tb";
import { PiBuildingsBold } from "react-icons/pi";
import Card from "../../Component/Card/Card";
import { dateformat, Naira } from "../../utils/format";
import PaymentStatusBadge from "../../utils/PaymentStatusBadge";



const AdminDash = () => {

  const adminData = sessionStorage.getItem("AUTH_ADMIN_DETAILS");
  const admin = adminData ? JSON.parse(adminData) : null;
  const [selectedTransaction, setSelectedTransaction] = useState<any>(null);
  const [activityFilter, setActivityFilter] = useState("All");


  const { data: dash, isLoading } = useQuery({
    queryKey: ["adminDashboard", admin?.id],
    queryFn: async () => {
      if (!admin?.userId) throw new Error("Admin not found");
      const data = await getAdminDashboard(admin.userId);
      console.log("Dashboard Data: ", data);
      console.log("Recent Transactions: ", data?.data?.data.recentTransactions);
      return data.data.data;
    },
    enabled: !!admin?.userId
  });


  if (isLoading) {
    return <Loader />
  }

  // if (!admin) {
  //   return <div className="p-4">Operator details not found. Please log in again.</div>
  // }

  // if (!dash) {
  //   return <div className="p-4">Failed to load dashboard data.</div>
  // }

  // const filteredTransactions = dash?.data?.recentTransactions?.filter((activity: any) => {
  //   if (activityFilter === "All") return true;
  //   return activity.paymentStatus?.toLowerCase() === activityFilter.toLowerCase();
  // });


  if (isLoading) {
    return <Loader />
  }

  if (!dash) {
    return <div className="p-4">Admin details not found. Please log in again.</div>
  }

  if (!dash) {
    return <div className="p-4">Failed to load dashboard data.</div>
  }

  const filteredTransactions = dash?.recentTransactions?.filter((activity: any) => {
    if (activityFilter === "All") return true;
    return activity.paymentStatus?.toLowerCase() === activityFilter.toLowerCase();
  });


  return (
    <main className="mb-10 mx-auto md:px-8 px-2 py-6">
      <div className="flex flex-col mb-8">
        <h3 className="text-2xl text-gray-900 tracking-tight">Welcome Back, <span className="text-green">{ "Super Admin"}</span></h3>
        <p className="text-gray-500 text-sm mt-1">{"Here's what's happening with your waste management account."}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 items-center justify-between mb-8 gap-4">
        <Card className="rounded-2xl overflow-hidden p-2">
          <div className="flex flex-row justify-between items-center px-4 py-2">
            <div>
              <p className="font-medium text-sm text-gray-500">Total Overdue</p>
              <p className="text-2xl text-gray-900 py-1">{Naira.format(parseFloat(dash?.totalOverDue || "0"))}</p>
            </div>
            <span className="bg-green/10 flex items-center justify-center text-green p-2 rounded-xl text-xl shadow-sm">
              <TbCurrencyNaira />
            </span>
          </div>
        </Card>

        <Card className="rounded-2xl overflow-hidden p-2">
          <div className="flex flex-row justify-between items-center px-4 py-2">
            <div>
              <p className="font-medium text-sm text-gray-500">Total Properties</p>
              <p className="text-2xl text-gray-900 py-1">{dash?.totalProperties || 0}</p>
            </div>
            <span className="bg-green/10 flex items-center justify-center text-green p-2 rounded-xl text-xl shadow-sm">
              <PiBuildingsBold />
            </span>
          </div>
        </Card>

        <Card className="rounded-2xl overflow-hidden p-2">
          <div className="flex flex-row justify-between items-center px-4 py-2">
            <div>
              <p className="font-medium text-sm text-gray-500">Total Customers</p>
              <p className="text-2xl text-gray-900 py-1">{dash?.totalCustomers || 0}</p>
            </div>
            <span className="bg-green/10 flex items-center justify-center text-green p-2 rounded-xl text-xl shadow-sm">
              <TbUsersGroup />
            </span>
          </div>
        </Card>

        <Card className="rounded-2xl overflow-hidden p-2">
          <div className="flex flex-row justify-between items-center px-4 py-2">
            <div>
              <p className="font-medium text-sm text-gray-500">Overdue Payment</p>
              <p className="text-2xl text-gray-900 py-1">{Naira.format(parseFloat(dash?.totalOverDuePayment || "0"))}</p>
            </div>
            <span className="bg-green/10 flex items-center justify-center text-green p-2 rounded-xl text-xl shadow-sm">
              <TbCurrencyNaira />
            </span>
          </div>
        </Card>
      </div>

      <div className="bg-white  mb-10 overflow-hidden shadow-sm flex flex-col p-4">
        <div className="p-4 mb-4  flex justify-between items-center bg-gray-50/50 flex-wrap gap-4">
          <h2 className="text-2xl text-gray-900 tracking-tight">Recent Activities</h2>
          <div className="flex gap-2 text-sm">
             <select 
               className="text-black font-medium border p-2 rounded-xl border-gray-200 bg-transparent focus:outline-none cursor-pointer"
               value={activityFilter}
               onChange={(e) => setActivityFilter(e.target.value)}
             >
               <option value="All">All Transactions</option>
               <option value="Paid">Paid</option>
               <option value="Pending">Pending</option>
               <option value="Overdue">Overdue</option>
             </select>
          </div>
        </div>

        <div className="w-full border border-gray-300 rounded-lg overflow-x-auto shadow-sm custom-scrollbar">
          <table className="table-auto min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Customer Name</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Address</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {filteredTransactions?.map((activity: any) => (
                <tr key={activity.id} className="hover:bg-blue-50/50 transition-colors group">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{dateformat(activity.paidDateTime)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">{activity.customerName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{activity.propertyAddress}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-bold">{Naira.format(parseFloat(activity.amountPaid))}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <PaymentStatusBadge status={activity.paymentStatus} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    {activity.receiptNo ? (
                      <button
                        onClick={() => setSelectedTransaction(activity)}
                        className="px-4 py-2 text-sm font-semibold text-green hover:bg-green/10 rounded-lg transition-all border border-transparent hover:border-green/20"
                      >
                        View Receipt
                      </button>
                    ) : (
                      <span className="text-xs font-medium text-red-500 bg-red-50 px-3 py-1.5 rounded-full border border-red-100 italic">
                        No Payment
                      </span>
                    )}
                  </td>
                </tr>
              ))}
              {(!filteredTransactions || filteredTransactions.length === 0) && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mb-3">
                        <TbCurrencyNaira className="text-2xl text-gray-300" />
                      </div>
                      <p className="text-gray-500 text-sm italic">No recent activities found.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <ReceiptModal
        isOpen={!!selectedTransaction}
        onClose={() => setSelectedTransaction(null)}
        transaction={selectedTransaction}
      />
    </main>
  );
};
export default AdminDash;
