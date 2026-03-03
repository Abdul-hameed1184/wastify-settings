import React, { useState } from 'react';
import { IoIosArrowRoundBack, IoIosArrowRoundForward } from 'react-icons/io';

interface Activity {
  id: string;
  type: string;
  description: string;
  refId: string;
  date: string;
  status: 'Completed' | 'Pending' | 'Failed';
  actionLabel: string;
}

const activities: Activity[] = [
  {
    id: '1',
    type: 'Payment',
    description: 'Payment of ₦12,000 completed',
    refId: 'TX-09823',
    date: 'Jan 5, 2026',
    status: 'Completed',
    actionLabel: 'View Receipt',
  },
  {
    id: '2',
    type: 'Payment',
    description: 'Waste collected successfully',
    refId: 'PK-3441',
    date: 'Jan 3, 2026',
    status: 'Completed',
    actionLabel: 'View Details',
  },
  {
    id: '3',
    type: 'Bill',
    description: 'January waste bill generated',
    refId: 'WB-1021',
    date: 'Jan 1, 2026',
    status: 'Pending',
    actionLabel: 'Pay Now',
  },
];

export const RecentActivities: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 1;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'text-green font-semibold bg-lightGreen px-2 py-1 rounded-full text-xxs';
      case 'Pending':
        return 'text-support font-semibold bg-yellow-50 px-2 py-1 rounded-full text-xxs';
      case 'Failed':
        return 'text-error font-semibold bg-red-50 px-2 py-1 rounded-full text-xxs';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden h-full flex flex-col">
      {/* Header */}
      <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center bg-gray-50/10">
        <h2 className="text-xl font-bold text-gray-800">Recent Activities</h2>
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
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-100">
          <thead className="bg-gray-50/50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Activity</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Description</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Ref ID</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-50">
            {activities.map((activity) => (
              <tr key={activity.id} className="hover:bg-primary/5 hover:shadow-sm hover:-translate-y-0.5 transition-all duration-200 cursor-default">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-800">{activity.type}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{activity.description}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{activity.refId}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{activity.date}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={getStatusColor(activity.status)}>{activity.status}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <button className="text-primary hover:text-green font-bold transition-colors hover:underline">
                    {activity.actionLabel}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card-based List View */}
      <div className="md:hidden p-4 space-y-4 bg-gray-50/30">
        {activities.map((activity) => (
          <div key={activity.id} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 space-y-3 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1 flex items-center gap-1">Activity</p>
                <p className="font-bold text-gray-800">{activity.type}</p>
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
                {activity.actionLabel}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Shared Pagination */}
      <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between bg-white text-sm">
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
      </div>
    </div>
  );
};
