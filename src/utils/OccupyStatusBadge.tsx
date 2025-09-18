import React from 'react';

const statusMap = {
  0: { label: 'Vacant', className: 'bg-red-100 text-red-600' },
  1: { label: 'Occupied', className: 'bg-green text-white' },
};

const OccupancyStatusBadge: React.FC<{ status: number }> = ({ status }) => {
  const badge = statusMap[status] || { label: 'Unknown', className: 'bg-gray-100 text-gray-600' };

  return (
    <span className={`inline-block px-4 py-2 text-xl font-medium rounded-full ${badge.className}`}>
      {badge.label}
    </span>
  );
};

export default OccupancyStatusBadge;
