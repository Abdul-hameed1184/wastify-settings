import React from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { IoIosArrowRoundBack, IoIosArrowRoundForward } from 'react-icons/io';

export const RecentActivities: React.FC = () => {
  return (
    <div className="p-0 m-0 bg-white h-full ">
        <h2 className="text-2xl font-semibold mb-4 px-4 py-4  border-b border-gray">Recent Activities</h2>
  <div className=' overflow-hidden m-0 py-4 h-full'>
  <table className="min-w-full table-auto rounded-xl shadow-md border border-gray-200 m-4">
  <thead className="bg-gray-100">
    <tr className='p-4'>
      <th className="px-4 text-sm py-4 border-b text-left  text-gray-700">Activity</th>
      <th className="px-4 text-sm py-4 border-b text-left  text-gray-700">Description</th>
      <th className="px-4 text-sm py-4 border-b text-left  text-gray-700">RefId</th>
      <th className="px-4 text-sm py-4 border-b text-left  text-gray-700">Date</th>
      <th className="px-4 text-sm py-4 border-b text-left  text-gray-700">Status</th>
      <th className="px-4 text-sm py-4 border-b text-left   text-gray-700">Action</th>
    </tr>
  </thead>

  <tbody>
    <tr className="hover:bg-gray-50">
      <td className="px-4 py-4 border-b ">Login</td>
      <td className="px-4 py-4 border-b ">User logged in</td>
      <td className="px-4 py-4 border-b ">REF12345</td>
      <td className="px-4 py-4 border-b ">2024-06-15</td>
      <td className="px-4 py-4 border-b text-green-600 font-medium">Successful</td>
      <td className="px-4 py-4 border-b  text-blue-600 hover:underline cursor-pointer">
        View Details
      </td>
    </tr>

    <tr className="hover:bg-gray-50">
      <td className="px-4 py-4 border-b ">Payment</td>
      <td className="px-4 py-4 border-b ">Paid electricity bill</td>
      <td className="px-4 py-4 border-b ">REF67890</td>
      <td className="px-4 py-4 border-b ">2024-06-14</td>
      <td className="px-4 py-4 border-b text-green-600 font-medium">Successful</td>
      <td className="px-4 py-4 border-b text-blue-600 hover:underline cursor-pointer">
        View Details
      </td>
    </tr>
  </tbody>

  <tfoot className="bg-gray-50">
    <tr>

      <td colSpan={2} className="px-2 py-2 text-left">
        <button
          className="rounded-md shadow-md px-4 py-2 hover:bg-lightGreen disabled:text-gray-400"
          disabled
        >
         <p className='flex items-center'><IoIosArrowRoundBack /> <span>Previous</span></p>
        </button>
      </td>

      <td colSpan={2} className="px-4 py-3 text-center text-sm text-gray-700">
        Page 1 of 1
      </td>

      <td colSpan={2} className="px-4 py-3 text-right">
        <button
          className="rounded-md shadow-md px-4 py-2  hover:bg-lightGreen disabled:text-gray-400"
          disabled
        >
         <p className='flex items-center'> <span>Next</span><IoIosArrowRoundForward /></p>
        </button>
      </td>
    </tr>
  </tfoot>
</table>
</div>
    </div>
  );
}