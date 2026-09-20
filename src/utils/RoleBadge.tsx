import React from "react";
import clsx from "clsx";

const roleConfig: Record<number, { label: string; classes: string }> = {
    0: { label: "Admin", classes: "bg-slate-800 text-white" },
    1: { label: "Customer", classes: "bg-primary/20 text-primary" },
    2: { label: "Operator", classes: "bg-support/20 text-support" },
};

interface RoleBadgeProps {
    role: number | string;
    className?: string;
}

const RoleBadge: React.FC<RoleBadgeProps> = ({ role, className }) => {
    const roleId = typeof role === "string" ? parseInt(role, 10) : role;
    const { label, classes } = roleConfig[roleId] || { label: "Unknown", classes: "bg-gray-100 text-gray-500" };

    return (
        <span
            className={clsx(
                "px-3 py-1 text-[10px] font-bold rounded-full inline-flex items-center justify-center uppercase tracking-wider",
                classes,
                className
            )}
        >
            {label}
        </span>
    );
};

export default RoleBadge;
