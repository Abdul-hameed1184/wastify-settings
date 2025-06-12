import React from 'react';
const statusMap = {
  0: { label: 'Pending', className: 'bg-yellow-100 text-yellow-600' },
  1: { label: 'Paid', className: 'bg-emerald-700 text-white  border-white' },
  2: { label: 'Failed', className: 'bg-red-100 text-red-600' },
  3: { label: 'Processing', className: 'bg-blue-100 text-blue-600' },
  4: { label: 'Cancelled', className: 'bg-gray-200 text-gray-600' },
};

const PaymentStatusBadge:React.FC<{status: number}> = ({ status }) => {
  const badge = statusMap[status] || { label: 'Unknown', className: 'bg-gray-100 text-gray-600' };

  return (
    <span className={`inline-block px-4 py-2 text-xs font-medium rounded-full ${badge.className}`}>
      {badge.label}
    </span>
  );
};

export default PaymentStatusBadge;
