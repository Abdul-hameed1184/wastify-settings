import React from "react";
import clsx from "clsx";

const statusColors: Record<string, string> = {
  Open: "bg-red-500/20 text-red-400",
  "In Progress": "bg-blue-500/20 text-blue-400",
  Resolved: "bg-green-500/20 text-green-400",
  Closed: "bg-black text-white",
};

interface StatusBadgeProps {
  status: keyof typeof statusColors;
  className?: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className }) => {
  const colorClass = statusColors[status] || "bg-gray-500/20 text-gray-400";

  return (
    <span
      className={clsx(
        "px-3 py-1 text-sm font-medium rounded-full inline-flex items-center justify-center",
        colorClass,
        className
      )}
    >
      {status}
    </span>
  );
};

export default StatusBadge;
