import React from 'react';
export enum OccupancyStatus  {
  "Vacant" = 0,
  "Occupied"= 1
}
const statusMap = {
  0: { label: 'Vacant', className: 'bg-red-100 text-red-600' },
  1: { label: 'Occupied', className: 'bg-green text-white' },
};

const OccupancyStatusBadge: React.FC<{ status: number }> = ({ status }) => {
  const badge = statusMap[status] || { label: 'Unknown', className: 'bg-gray-100 text-gray-600' };

  return (
    <span className={`inline-block px-2 py-1 text-sm rounded-full ${badge.className}`}>
      {badge.label}
    </span>
  );
};

export const LabelBadge: React.FC<{ label: string, className?: string }> = ({ label, className }) => {
  return (
    <span className={`inline-block px-2 py-1 text-sm font-medium rounded-full bg-blue-100 text-blue-600 ${className}`}>
      {label}
    </span>
  );
}

export default OccupancyStatusBadge;
